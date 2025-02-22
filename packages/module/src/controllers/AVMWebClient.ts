import { decode as decodeBase64 } from '@stablelib/base64';
import { generate as generateUUID } from '@agoralabs-sh/uuid';
import { VIP030026PublicKeyCredential } from '@agoralabs-sh/vip030026';

// constants
import { DEFAULT_REQUEST_TIMEOUT } from '@/constants';

// controllers
import BaseController from './BaseController';

// enums
import { ARC0027MessageTypeEnum, ARC0027MethodEnum } from '@/enums';

// errors
import { ARC0027UnauthorizedProviderCredentialError, ARC0027UnknownError } from '@/errors';

// messages
import {
  RequestMessageWithCredential,
  RequestMessageWithoutCredential,
  ResponseMessageWithError,
  ResponseMessageWithResult,
} from '@/messages';

// types
import type {
  IAuthenticateParams,
  IAuthenticateResult,
  IAVMWebClientConfig,
  IAVMWebClientInitOptions,
  IDisableParams,
  IDisableResult,
  IDiscoverResult,
  IEnableParams,
  IEnableResult,
  IPostTransactionsParams,
  IPostTransactionsResult,
  IRequestOptions,
  ISendRequestMessageOptions,
  ISignMessageParams,
  ISignMessageResult,
  ISignTransactionsParams,
  ISignTransactionsResult,
  TClientCallback,
  TClientCustomEventListener,
  TParams,
  TResults,
} from '@/types';

// utilities
import { createChallenge, createMessageReference } from '@/utilities';

export default class AVMWebClient extends BaseController<IAVMWebClientConfig> {
  private _requests: (RequestMessageWithCredential | RequestMessageWithoutCredential)[];

  private constructor(config: IAVMWebClientConfig) {
    super(config);

    this._requests = [];
  }

  /**
   * public static methods
   */

  public static init({ debug }: IAVMWebClientInitOptions = { debug: false }): AVMWebClient {
    return new AVMWebClient({
      debug: debug || false,
    });
  }

  /**
   * private methods
   */

  private _addListener<Result = TResults>(method: ARC0027MethodEnum, callback: TClientCallback<Result>): string {
    const __function = '_addListener';
    const listener: TClientCustomEventListener = (event) => {
      let credential: VIP030026PublicKeyCredential;
      let detail: ResponseMessageWithError | ResponseMessageWithResult<Result>;
      let request: RequestMessageWithCredential | RequestMessageWithoutCredential | null;

      try {
        detail = JSON.parse(event.detail); // the event.detail should be a stringified object
      } catch (error) {
        this._logger.error(`${AVMWebClient.name}#${__function}:`, error);

        return;
      }

      request = this._requests.find(({ id }) => id === detail.requestID) || null;

      // if the request event is not known, ignore
      if (!request) {
        return;
      }

      this._logger.debug(`${AVMWebClient.name}#${__function}: received response event:`, detail);

      // if this is not a discover request, and we have a result we need to check the correct provider responded
      if ('result' in detail && request.method !== ARC0027MethodEnum.Discover) {
        try {
          credential = VIP030026PublicKeyCredential.fromBytes(decodeBase64(request.credential));
        } catch (error) {
          this._logger.error(`${AVMWebClient.name}#${__function}:`, error);

          return callback({
            error: new ARC0027UnauthorizedProviderCredentialError(),
            id: detail.id,
            requestID: request.id,
            method,
          });
        }

        // verify the challenge was successfully signed
        if (
          credential.verify({
            bytes: decodeBase64(request.challenge),
            signature: decodeBase64(detail.signature),
          })
        ) {
          this._logger.debug(
            `${AVMWebClient.name}#${__function}: provider "${credential.id()}" failed to verify with request:`,
            request
          );

          return callback({
            error: new ARC0027UnauthorizedProviderCredentialError(),
            id: detail.id,
            requestID: request.id,
            method,
          });
        }
      }

      callback({
        ...detail,
        method,
      });
    };
    const listenerID = generateUUID();
    const reference = createMessageReference(method, ARC0027MessageTypeEnum.Response);

    // start listening to response events and add the listener to the map
    window.addEventListener(reference, listener);
    this._listeners.set(listenerID, {
      listener,
      reference,
    });

    return listenerID;
  }

  private _sendRequestMessage<Params extends TParams>(options: ISendRequestMessageOptions<Params>): string {
    const __function = '_sendRequestMessage';
    const reference = createMessageReference(options.method, ARC0027MessageTypeEnum.Request);
    const id = generateUUID();
    const request =
      options.method !== ARC0027MethodEnum.Discover
        ? new RequestMessageWithCredential<Params>({
            challenge: options.challenge ?? createChallenge(),
            credential: options.credential,
            id,
            params: options.params,
            method: options.method,
            reference,
          })
        : new RequestMessageWithoutCredential<Params>({
            id,
            method: options.method,
            params: options.params,
            reference,
          });

    try {
      // dispatch the request message
      window.dispatchEvent(
        new CustomEvent<RequestMessageWithCredential<Params> | RequestMessageWithoutCredential<Params>>(reference, {
          detail: request,
        })
      );

      // add a timeout to remove the request and stop handling response messages
      window.setTimeout(() => {
        this._requests = this._requests.filter((value) => value.id !== request.id);
      }, options.timeout ?? DEFAULT_REQUEST_TIMEOUT);

      this._logger.debug(
        `${AVMWebClient.name}#${__function}: dispatched request message "${reference}" with id "${request.id}"`
      );

      // add the request to the internal state
      this._requests.push(request);

      return request.id;
    } catch (error) {
      this._logger.error(error);

      throw new ARC0027UnknownError(error.message);
    }
  }

  /**
   * public methods
   */

  /**
   * Sends a request to authenticate the client with providers.
   * @param {IRequestOptions<IAuthenticateParams>} options - The request params, the provider credential and an
   * optional challenge.
   * @returns {string} the ID of the request message.
   */
  public authenticate(options: IRequestOptions<IAuthenticateParams>): string {
    return this._sendRequestMessage<IAuthenticateParams>({
      ...options,
      method: ARC0027MethodEnum.Authenticate,
    });
  }

  /**
   * Sends a request to remove the client from providers.
   * @param {IRequestOptions<IDisableParams | undefined>} options - The request params, the provider credential and an
   * optional challenge.
   * @returns {string} the ID of the request message.
   * @public
   */
  public disable(options: IRequestOptions<IDisableParams | undefined>): string {
    return this._sendRequestMessage<IDisableParams | undefined>({
      ...options,
      method: ARC0027MethodEnum.Disable,
    });
  }

  /**
   * Sends a request to get the available providers. This should be called before interacting with
   * any providers to ensure networks & methods are supported.
   * @returns {string} the ID of the request message.
   * @public
   */
  public discover(): string {
    return this._sendRequestMessage<undefined>({
      method: ARC0027MethodEnum.Discover,
      params: undefined,
    });
  }

  /**
   * Enables to a client with providers. If the ID of the provider and/or network is specified, that provider/network is
   * used, otherwise the all providers available providers are used.
   * @param {IRequestOptions<IEnableParams | undefined>} options - The request params, the provider credential and an
   * optional challenge.
   * @returns {string} the ID of the request message.
   * @public
   */
  public enable(options: IRequestOptions<IEnableParams | undefined>): string {
    return this._sendRequestMessage<IEnableParams | undefined>({
      ...options,
      method: ARC0027MethodEnum.Enable,
    });
  }

  /**
   * Listens to `authenticate` messages sent from providers.
   * @param {TClientCallback<IAuthenticateResult>} callback - callback that is called when a response message
   * is received.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onAuthenticate(callback: TClientCallback<IAuthenticateResult>): string {
    return this._addListener<IAuthenticateResult>(ARC0027MethodEnum.Authenticate, callback);
  }

  /**
   * Listens to `disable` messages sent from providers.
   * @param {TClientCallback<IDisableResult>} callback - callback that is called when a response message
   * is received.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onDisable(callback: TClientCallback<IDisableResult>): string {
    return this._addListener<IDisableResult>(ARC0027MethodEnum.Disable, callback);
  }

  /**
   * Listens to `discover` messages sent from providers.
   * @param {TClientCallback<IDiscoverResult>} callback - callback that is called when a response message
   * is received.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onDiscover(callback: TClientCallback<IDiscoverResult>): string {
    return this._addListener<IDiscoverResult>(ARC0027MethodEnum.Discover, callback);
  }

  /**
   * Listens to `enable` messages sent from providers.
   * @param {TClientCallback<IEnableResult>} callback - callback that is called when a response message
   * is received.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onEnable(callback: TClientCallback<IEnableResult>): string {
    return this._addListener<IEnableResult>(ARC0027MethodEnum.Enable, callback);
  }

  /**
   * Listens to `post_transactions` messages sent from providers.
   * @param {TClientCallback<IPostTransactionsResult>} callback - callback that is called when a response
   * message is received.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onPostTransactions(callback: TClientCallback<IPostTransactionsResult>): string {
    return this._addListener<IPostTransactionsResult>(ARC0027MethodEnum.PostTransactions, callback);
  }

  /**
   * Listens to `sign_and_post_transactions` messages sent from providers.
   * @param {TClientCallback<IPostTransactionsResult>} callback - callback that is called when a response
   * message is received.
   * @public
   */
  public onSignAndPostTransactions(callback: TClientCallback<IPostTransactionsResult>): string {
    return this._addListener<IPostTransactionsResult>(ARC0027MethodEnum.SignAndPostTransactions, callback);
  }

  /**
   * Listens to `sign_message` messages sent from providers.
   * @param {TClientCallback<ISignTransactionsResult> | null} callback - callback that is called when a response
   * message is received.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onSignMessage(callback: TClientCallback<ISignMessageResult>): string {
    return this._addListener<ISignMessageResult>(ARC0027MethodEnum.SignMessage, callback);
  }

  /**
   * Listens to `sign_transactions` messages sent from providers.
   * @param {TClientCallback<ISignTransactionsResult> | null} callback - callback that is called when a response
   * message is received.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onSignTransactions(callback: TClientCallback<ISignTransactionsResult>): string {
    return this._addListener<ISignTransactionsResult>(ARC0027MethodEnum.SignTransactions, callback);
  }

  /**
   * Request providers to post a list of signed transactions to the network.
   * @param {IRequestOptions<IPostTransactionsParams>} options - The request params, the provider credential and an
   * optional challenge.
   * @returns {string} the ID of the request message.
   * @public
   */
  public postTransactions(options: IRequestOptions<IPostTransactionsParams>): string {
    return this._sendRequestMessage<IPostTransactionsParams>({
      ...options,
      method: ARC0027MethodEnum.PostTransactions,
    });
  }

  /**
   * Sends a list of unsigned transactions to be signed and posted to the network by the provider.
   * @param {IRequestOptions<ISignTransactionsParams>} options - The request params, the provider credential and an
   * optional challenge.
   * @returns {string} the ID of the request message.
   * @public
   */
  public signAndPostTransactions(options: IRequestOptions<ISignTransactionsParams>): string {
    return this._sendRequestMessage<ISignTransactionsParams>({
      ...options,
      method: ARC0027MethodEnum.SignAndPostTransactions,
    });
  }

  /**
   * Sends a UTF-8 encoded message to be signed by the provider.
   * @param {IRequestOptions<ISignMessageParams>} options - The request params, the provider credential and an
   * optional challenge.
   * @returns {string} the ID of the request message.
   * @public
   */
  public signMessage(options: IRequestOptions<ISignMessageParams>): string {
    return this._sendRequestMessage<ISignMessageParams>({
      ...options,
      method: ARC0027MethodEnum.SignMessage,
    });
  }

  /**
   * Sends a list of unsigned transactions to be signed by the provider.
   * @param {IRequestOptions<ISignTransactionsParams>} options - The request params, the provider credential and an
   * optional challenge.
   * @returns {string} the ID of the request message.
   * @public
   */
  public signTransactions(options: IRequestOptions<ISignTransactionsParams>): string {
    return this._sendRequestMessage<ISignTransactionsParams>({
      ...options,
      method: ARC0027MethodEnum.SignTransactions,
    });
  }
}
