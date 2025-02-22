import { generate as generateUUID } from '@agoralabs-sh/uuid';
import { VIP030026PublicKeyCredential } from '@agoralabs-sh/vip030026';
import { decode as decodeBase64 } from '@stablelib/base64';

// controllers
import BaseController from './BaseController';

// enums
import { ARC0027MessageTypeEnum, ARC0027MethodEnum } from '@/enums';

// errors
import { ARC0027UnknownError, BaseARC0027Error } from '@/errors';

// messages
import { ResponseMessageWithError, ResponseMessageWithResult } from '@/messages';

// types
import type {
  IAuthenticateParams,
  IAuthenticateResult,
  IAVMWebProviderInitOptions,
  IAVMWebProviderConfig,
  IDisableParams,
  IDisableResult,
  IDiscoverResult,
  IEnableParams,
  IEnableResult,
  IPostTransactionsParams,
  IPostTransactionsResult,
  ISendResponseMessageOptions,
  ISignMessageParams,
  ISignMessageResult,
  ISignTransactionsParams,
  ISignTransactionsResult,
  TParams,
  TProviderCallback,
  TProviderCustomEventListener,
  TResults,
} from '@/types';

// utils
import { createMessageReference } from '@/utilities';

export default class AVMWebProvider extends BaseController<IAVMWebProviderConfig> {
  private constructor(config: IAVMWebProviderConfig) {
    super(config);
  }

  /**
   * private methods
   */

  private _addListener<Params = TParams, Result = TResults>(
    method: ARC0027MethodEnum,
    callback: TProviderCallback<Params, Result>
  ): string {
    const __function = '_addListener';
    const listener: TProviderCustomEventListener<Params> = (event) => {
      this._logger.debug(
        `[${this._config.credential.id()}]${AVMWebProvider.name}#${__function}: received request event:`,
        event.detail
      );

      return this._sendResponseMessage({
        callback,
        request: event.detail,
      });
    };
    const listenerID = generateUUID();
    const reference = createMessageReference(method, ARC0027MessageTypeEnum.Request);

    // start listening to request events and add the listener to the map
    window.addEventListener(reference, listener);
    this._listeners.set(listenerID, {
      listener,
      reference,
    });

    return listenerID;
  }

  /**
   * Dispatches an event to the web page with the result/error from the `options.callback` function.
   * NOTE: the event uses the detail property of the `CustomEvent` but due to Firefox's limitation of only allowing
   * non-string properties, the response message MUST be a serializable object as it will be stringified to allow
   * transport.
   * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Sharing_objects_with_page_scripts}
   * @private
   */
  private async _sendResponseMessage<Params = TParams, Result = TResults>({
    callback,
    request,
  }: ISendResponseMessageOptions<Params, Result>): Promise<void> {
    const __function = '_sendResponseMessage';
    const responseID = generateUUID();
    const responseReference = createMessageReference(request.method, ARC0027MessageTypeEnum.Response);

    // if this is not a discover request and if the credential from the request does not match the initialized credential, ignore
    if (request.method !== ARC0027MethodEnum.Discover && request.credential !== this._config.credential.toString()) {
      this._logger.debug(
        `[${this._config.credential.id()}]${AVMWebProvider.name}#${__function}: message credential "${request.credential}" does not match initialized credentials "${this._config.credential.toString()}", ignoring request`
      );

      return;
    }

    try {
      const { result, signature } = await callback(
        request.method !== ARC0027MethodEnum.Discover
          ? {
              challenge: request.challenge,
              credential: request.credential,
              id: request.id,
              method: request.method,
              params: request.params,
            }
          : {
              id: request.id,
              method: request.method,
              params: request.params,
            }
      );

      // dispatch a response event with the result
      window.dispatchEvent(
        new CustomEvent(responseReference, {
          detail: JSON.stringify(
            new ResponseMessageWithResult<Result>({
              id: responseID,
              reference: responseReference,
              requestID: request.id,
              result,
              signature,
            })
          ),
        })
      );

      this._logger.debug(
        `[${this._config.credential.id()}]${AVMWebProvider.name}#${__function}: dispatched response message "${responseReference}" with id "${responseID}"`
      );

      return;
    } catch (error) {
      this._logger.error(error);

      // if we have an arc-0027 error, send it in the response
      if ((error as BaseARC0027Error).code) {
        window.dispatchEvent(
          new CustomEvent(responseReference, {
            detail: JSON.stringify(
              new ResponseMessageWithError({
                error,
                id: responseID,
                reference: responseReference,
                requestID: request.id,
              })
            ),
          })
        );

        return;
      }

      // otherwise, wrap the message in an unknown error
      window.dispatchEvent(
        new CustomEvent(responseReference, {
          detail: JSON.stringify(
            new ResponseMessageWithError({
              error: new ARC0027UnknownError({
                message: error.message,
              }),
              id: responseID,
              reference: responseReference,
              requestID: request.id,
            })
          ),
        })
      );

      return;
    }
  }

  /**
   * public static methods
   */

  /**
   * Initializes the provider. The provider **MUST** be initialized with a base64 encoded public key credential that
   * conforms to the VIP-03-0026 standard. This credential acts as an identifier to clients and will be used to filter
   * requests intended for other providers.
   * @param {IAVMWebProviderInitOptions} options - The base64 encoded public key credential that conforms to the
   * VIP-03-0026 standard.
   * @returns {AVMWebProvider} An initialized AVMWebProvider.
   * @throws {VIP030026InvalidCredentialLengthError} If the public key credential is invalid.
   * @see {@link https://vips.voi.community/03/0026/}
   * @static
   * @public
   */
  public static init({ credential, debug = false }: IAVMWebProviderInitOptions): AVMWebProvider {
    return new AVMWebProvider({
      credential: VIP030026PublicKeyCredential.fromBytes(decodeBase64(credential)),
      debug: debug || false,
    });
  }

  /**
   * public methods
   */

  /**
   * Listens to `authenticate` messages sent from clients.
   * @param {TProviderCallback<IAuthenticateParams, IAuthenticateResult>} callback - the callback to handle requests from
   * the client.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onAuthenticate(callback: TProviderCallback<IAuthenticateParams, IAuthenticateResult>): string {
    return this._addListener<IAuthenticateParams, IAuthenticateResult>(ARC0027MethodEnum.Authenticate, callback);
  }

  /**
   * Listens to `disable` messages sent from clients.
   * @param {TProviderCallback<IDisableParams, IDisableResult>} callback - the callback to handle requests from
   * the client.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onDisable(callback: TProviderCallback<IDisableParams | undefined, IDisableResult>): string {
    return this._addListener<IDisableParams, IDisableResult>(ARC0027MethodEnum.Disable, callback);
  }

  /**
   * Listens to `discover` messages sent from clients.
   * @param {TProviderCallback<undefined, IDiscoverResult>} callback - the callback to handle requests from
   * the client.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onDiscover(callback: TProviderCallback<undefined, IDiscoverResult>): string {
    return this._addListener<undefined, IDiscoverResult>(ARC0027MethodEnum.Discover, callback);
  }

  /**
   * Listens to `enable` messages sent from clients.
   * @param {TProviderCallback<IEnableParams, IEnableResult>} callback - the callback to handle requests from
   * the client.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onEnable(callback: TProviderCallback<IEnableParams | undefined, IEnableResult>): string {
    return this._addListener<IEnableParams | undefined, IEnableResult>(ARC0027MethodEnum.Enable, callback);
  }

  /**
   * Listens to `post_transactions` messages sent from clients.
   * @param {TProviderCallback<IPostTransactionsParams, IPostTransactionsResult>} callback - the callback to handle requests from
   * the client.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onPostTransactions(callback: TProviderCallback<IPostTransactionsParams, IPostTransactionsResult>): string {
    return this._addListener<IPostTransactionsParams, IPostTransactionsResult>(
      ARC0027MethodEnum.PostTransactions,
      callback
    );
  }

  /**
   * Listens to `sign_and_post_transactions` messages sent from clients.
   * @param {TProviderCallback<ISignTransactionsParams, IPostTransactionsResult>} callback - the callback to handle requests from
   * the client.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onSignAndPostTransactions(
    callback: TProviderCallback<ISignTransactionsParams, IPostTransactionsResult>
  ): string {
    return this._addListener<ISignTransactionsParams, IPostTransactionsResult>(
      ARC0027MethodEnum.SignAndPostTransactions,
      callback
    );
  }

  /**
   * Listens to `sign_message` messages sent from clients.
   * @param {TProviderCallback<ISignMessageParams, ISignMessageResult>} callback - the callback to handle requests from
   * the client.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onSignMessage(callback: TProviderCallback<ISignMessageParams, ISignMessageResult>): string {
    return this._addListener<ISignMessageParams, ISignMessageResult>(ARC0027MethodEnum.SignMessage, callback);
  }

  /**
   * Listens to `sign_transactions` messages sent from clients.
   * @param {TProviderCallback<ISignTransactionsParams, ISignTransactionsResult>} callback - the callback to handle requests from
   * the client.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onSignTransactions(callback: TProviderCallback<ISignTransactionsParams, ISignTransactionsResult>): string {
    return this._addListener<ISignTransactionsParams, ISignTransactionsResult>(
      ARC0027MethodEnum.SignTransactions,
      callback
    );
  }
}
