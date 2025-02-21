import { uuid } from '@stablelib/uuid';

// constants
import { DEFAULT_REQUEST_TIMEOUT } from '@/constants';

// controllers
import BaseController from './BaseController';

// enums
import { ARC0027MessageTypeEnum, ARC0027MethodEnum } from '@/enums';

// errors
import { ARC0027UnknownError } from '@/errors';

// messages
import { RequestMessage, ResponseMessageWithError, ResponseMessageWithResult } from '@/messages';

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
import { createChallenge, createMessageReference, verifyChallenge } from '@/utilities';

export default class AVMWebClient extends BaseController<IAVMWebClientConfig> {
  private _requests: RequestMessage<TParams>[];

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
      let detail: ResponseMessageWithError | ResponseMessageWithResult<Result>;
      let request: RequestMessage | null;

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

      // if the request signature does not match the request challenge,
      if (
        'result' in detail &&
        !verifyChallenge({
          challenge: request.challenge,
          credential: detail.credential,
          signature: detail.signature,
        })
      ) {
        this._logger.debug(
          `${AVMWebClient.name}#${__function}: provider with key "${detail.credential}" failed to to verify with request:`,
          request
        );

        return;
      }

      callback({
        ...detail,
        method,
      });
    };
    const listenerID = uuid();
    const reference = createMessageReference(method, ARC0027MessageTypeEnum.Response);

    // start listening to response events and add the listener to the map
    window.addEventListener(reference, listener);
    this._listeners.set(listenerID, {
      listener,
      reference,
    });

    return listenerID;
  }

  private _sendRequestMessage<Params extends TParams>({
    challenge,
    method,
    params,
  }: ISendRequestMessageOptions<Params>): string {
    const __function = '_sendRequestMessage';
    const reference = createMessageReference(method, ARC0027MessageTypeEnum.Request);
    const request = new RequestMessage<Params>({
      challenge: challenge ?? createChallenge(),
      id: uuid(),
      params,
      reference,
    });

    try {
      // dispatch the request message
      window.dispatchEvent(
        new CustomEvent<RequestMessage<Params>>(reference, {
          detail: request,
        })
      );

      // add a timeout to remove the request and stop handling response messages
      window.setTimeout(() => {
        this._requests = this._requests.filter((value) => value.id !== request.id);
      }, DEFAULT_REQUEST_TIMEOUT);

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
   * @param {IAuthenticateParams} params - [optional] params that specify which provider and signer to authenticate.
   * @returns {string} the ID of the request message.
   */
  public authenticate(params: IAuthenticateParams): string {
    return this._sendRequestMessage<IAuthenticateParams>({
      method: ARC0027MethodEnum.Authenticate,
      params,
    });
  }

  /**
   * Sends a request to remove the client from providers.
   * @param {IDisableParams} params - [optional] params that specify which provider, network and/or specific session IDs.
   * @param {IRequestOptions} options - [optional] Options that allow further customization of the request like
   * specifying your own challenge.
   * @returns {string} the ID of the request message.
   * @public
   */
  public disable(params?: IDisableParams, options?: IRequestOptions): string {
    return this._sendRequestMessage<IDisableParams | undefined>({
      challenge: options?.challenge,
      method: ARC0027MethodEnum.Disable,
      params,
    });
  }

  /**
   * Sends a request to get information relating to available providers. This should be called before interacting with
   * any providers to ensure networks & methods are supported.
   * @param {IRequestOptions} options - [optional] Options that allow further customization of the request like
   * specifying your own challenge.
   * @returns {string} the ID of the request message.
   * @public
   */
  public discover(options?: IRequestOptions): string {
    return this._sendRequestMessage<undefined>({
      challenge: options?.challenge,
      method: ARC0027MethodEnum.Discover,
      params: undefined,
    });
  }

  /**
   * Enables to a client with providers. If the ID of the provider and/or network is specified, that provider/network is
   * used, otherwise the all providers available providers are used.
   * @param {IEnableParams} params - [optional] params that specify the provider and/or the network.
   * @param {IRequestOptions} options - [optional] Options that allow further customization of the request like
   * specifying your own challenge.
   * @returns {string} the ID of the request message.
   * @public
   */
  public enable(params?: IEnableParams, options?: IRequestOptions): string {
    return this._sendRequestMessage<IEnableParams | undefined>({
      challenge: options?.challenge,
      method: ARC0027MethodEnum.Enable,
      params,
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
   * @param {IPostTransactionsParams} params - params that specify the provider and the signed transactions.
   * @param {IRequestOptions} options - [optional] Options that allow further customization of the request like
   * specifying your own challenge.
   * @returns {string} the ID of the request message.
   * @public
   */
  public postTransactions(params: IPostTransactionsParams, options?: IRequestOptions): string {
    return this._sendRequestMessage<IPostTransactionsParams>({
      challenge: options?.challenge,
      method: ARC0027MethodEnum.PostTransactions,
      params,
    });
  }

  /**
   * Sends a list of unsigned transactions to be signed and posted to the network by the provider.
   * @param {ISignTransactionsParams} params - params that specify the unsigned transactions and the provider.
   * @param {IRequestOptions} options - [optional] Options that allow further customization of the request like
   * specifying your own challenge.
   * @returns {string} the ID of the request message.
   * @public
   */
  public signAndPostTransactions(params: ISignTransactionsParams, options?: IRequestOptions): string {
    return this._sendRequestMessage<ISignTransactionsParams>({
      challenge: options?.challenge,
      method: ARC0027MethodEnum.SignAndPostTransactions,
      params,
    });
  }

  /**
   * Sends a UTF-8 encoded message to be signed by the provider.
   * @param {ISignMessageParams} params - params that specify the message to sign, the signer and the provider.
   * @param {IRequestOptions} options - [optional] Options that allow further customization of the request like
   * specifying your own challenge.
   * @returns {string} the ID of the request message.
   * @public
   */
  public signMessage(params: ISignMessageParams, options?: IRequestOptions): string {
    return this._sendRequestMessage<ISignMessageParams>({
      challenge: options?.challenge,
      method: ARC0027MethodEnum.SignMessage,
      params,
    });
  }

  /**
   * Sends a list of unsigned transactions to be signed by the provider.
   * @param {ISignTransactionsParams} params - params that specify the unsigned transactions and the provider.
   * @param {IRequestOptions} options - [optional] Options that allow further customization of the request like
   * specifying your own challenge.
   * @returns {string} the ID of the request message.
   * @public
   */
  public signTransactions(params: ISignTransactionsParams, options?: IRequestOptions): string {
    return this._sendRequestMessage<ISignTransactionsParams>({
      challenge: options?.challenge,
      method: ARC0027MethodEnum.SignTransactions,
      params,
    });
  }
}
