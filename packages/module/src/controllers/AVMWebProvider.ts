import { generate as generateUUID } from '@agoralabs-sh/uuid';
import { VIP030026PublicKeyCredential } from '@agoralabs-sh/vip030026';
import { decode as decodeBase64 } from '@stablelib/base64';

// controllers
import BaseController from './BaseController';

// enums
import { VIP030027MessageTypeEnum, VIP030027MethodEnum } from '@/enums';

// errors
import { BaseVIP030027Error, VIP030027UnknownError } from '@/errors';

// messages
import {
  DiscoverRequestMessage,
  ResponseMessageWithError,
  ResponseMessageWithResult,
  ResponseMessageWithResultAndSignature,
} from '@/messages';

// types
import type {
  IAuthenticateParams,
  IAuthenticateResult,
  IAVMWebProviderConfig,
  IAVMWebProviderInitOptions,
  IDisableParams,
  IDisableResult,
  IDiscoverResult,
  IEnableParams,
  IEnableResult,
  IPostTransactionsParams,
  IPostTransactionsResult,
  IProviderCallbackOptions,
  IProviderCallbackResult,
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

  private _addListener<Params extends TParams | undefined, Result = TResults>(
    method: VIP030027MethodEnum,
    callback: TProviderCallback<Params, Result>
  ): string {
    const __function = '_addListener';
    const listener: TProviderCustomEventListener<Params> = (event) => {
      this._logger.debug(
        `[${this._config.credential.id()}]${AVMWebProvider.name}#${__function}: received request:`,
        event.detail
      );

      return this._sendResponseMessage({
        callback,
        request: event.detail,
      });
    };
    const listenerID = generateUUID();
    const reference = createMessageReference(method, VIP030027MessageTypeEnum.Request);

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
  private async _sendResponseMessage<Params = TParams | undefined, Result = TResults>({
    callback,
    request,
  }: ISendResponseMessageOptions<Params, Result>): Promise<void> {
    const __function = '_sendResponseMessage';
    const responseID = generateUUID();
    const responseReference = createMessageReference(request.method, VIP030027MessageTypeEnum.Response);

    // if this is not a discover request and if the credential from the request does not match the initialized credential, ignore
    if (request.credential !== this._config.credential.toString()) {
      this._logger.debug(
        `[${this._config.credential.id()}]${AVMWebProvider.name}#${__function}: message credential "${request.credential}" does not match initialized credentials "${this._config.credential.toString()}", ignoring request`
      );

      return;
    }

    try {
      const { result, signature } = await callback({
        challenge: request.challenge,
        credential: request.credential,
        id: request.id,
        method: request.method,
        params: request.params,
      });

      // dispatch a response event with the result
      window.dispatchEvent(
        new CustomEvent(responseReference, {
          detail: JSON.stringify(
            new ResponseMessageWithResultAndSignature<Result>({
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

      // if we have a vip-03-0027 error, send it in the response
      if ((error as BaseVIP030027Error).isVIP030027Error) {
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
              error: new VIP030027UnknownError({
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
    return this._addListener<IAuthenticateParams, IAuthenticateResult>(VIP030027MethodEnum.Authenticate, callback);
  }

  /**
   * Listens to `disable` messages sent from clients.
   * @param {TProviderCallback<IDisableParams, IDisableResult>} callback - the callback to handle requests from
   * the client.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onDisable(callback: TProviderCallback<IDisableParams | undefined, IDisableResult>): string {
    return this._addListener<IDisableParams | undefined, IDisableResult>(VIP030027MethodEnum.Disable, callback);
  }

  /**
   * Listens to `discover` messages sent from clients.
   * @param {(options: IProviderCallbackOptions<undefined>) => IProviderCallbackResult<IDiscoverResult> | Promise<IProviderCallbackResult<IDiscoverResult>>} callback - the callback to handle requests from
   * the client.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onDiscover(
    callback: (
      options: IProviderCallbackOptions<undefined>
    ) => IProviderCallbackResult<IDiscoverResult> | Promise<IProviderCallbackResult<IDiscoverResult>>
  ): string {
    const __function = '_addListener';
    const method = VIP030027MethodEnum.Discover;
    const listener = async (event: CustomEvent<DiscoverRequestMessage>) => {
      const request = event.detail;
      const responseID = generateUUID();
      const responseReference = createMessageReference(method, VIP030027MessageTypeEnum.Response);

      this._logger.debug(
        `[${this._config.credential.id()}]${AVMWebProvider.name}#${__function}: received request event:`,
        request
      );

      try {
        const { result } = await callback({
          id: request.id,
          method,
          params: request.params,
        });

        // dispatch a response event with the result
        window.dispatchEvent(
          new CustomEvent(responseReference, {
            detail: JSON.stringify(
              new ResponseMessageWithResult<IDiscoverResult>({
                id: responseID,
                reference: responseReference,
                requestID: request.id,
                result,
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

        // if we have a vip-03-0027 error, send it in the response
        if ((error as BaseVIP030027Error).isVIP030027Error) {
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
                error: new VIP030027UnknownError({
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
    };
    const listenerID = generateUUID();
    const reference = createMessageReference(VIP030027MethodEnum.Discover, VIP030027MessageTypeEnum.Request);

    // start listening to request events and add the listener to the map
    window.addEventListener(reference, listener);
    this._listeners.set(listenerID, {
      listener,
      reference,
    });

    return listenerID;
  }

  /**
   * Listens to `enable` messages sent from clients.
   * @param {TProviderCallback<IEnableParams, IEnableResult>} callback - the callback to handle requests from
   * the client.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onEnable(callback: TProviderCallback<IEnableParams | undefined, IEnableResult>): string {
    return this._addListener<IEnableParams | undefined, IEnableResult>(VIP030027MethodEnum.Enable, callback);
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
      VIP030027MethodEnum.PostTransactions,
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
      VIP030027MethodEnum.SignAndPostTransactions,
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
    return this._addListener<ISignMessageParams, ISignMessageResult>(VIP030027MethodEnum.SignMessage, callback);
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
      VIP030027MethodEnum.SignTransactions,
      callback
    );
  }
}
