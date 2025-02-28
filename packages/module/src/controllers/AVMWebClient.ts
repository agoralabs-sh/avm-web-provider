import { decode as decodeBase64 } from '@stablelib/base64';
import { generate as generateUUID } from '@agoralabs-sh/uuid';
import { VIP030026PublicKeyCredential } from '@agoralabs-sh/vip030026';

// constants
import { DEFAULT_REQUEST_TIMEOUT, LOWER_REQUEST_TIMEOUT } from '@/constants';

// controllers
import BaseController from './BaseController';

// enums
import { VIP030027MessageTypeEnum, VIP030027MethodEnum } from '@/enums';

// errors
import { VIP030027UnknownError } from '@/errors';

// messages
import {
  DiscoverRequestMessage,
  RequestMessageWithCredential,
  ResponseMessageWithError,
  ResponseMessageWithResult,
  ResponseMessageWithResultAndSignature,
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
  IRequestOptionsWithParams,
  ISendRequestMessageOptions,
  ISignMessageParams,
  ISignMessageResult,
  ISignTransactionsParams,
  ISignTransactionsResult,
  TClientCallbackOptions,
  TClientDiscoverCallbackOptions,
  TClientCustomEventListener,
  TParams,
  TResults,
} from '@/types';

// utilities
import { createChallenge, createMessageReference } from '@/utilities';

export default class AVMWebClient extends BaseController<IAVMWebClientConfig> {
  private _requests: (DiscoverRequestMessage | RequestMessageWithCredential<TParams | undefined>)[];

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

  private _addListener<Result = TResults>(
    method: VIP030027MethodEnum,
    callback: (options: TClientCallbackOptions<Result>) => void | Promise<void>
  ): string {
    const __function = '_addListener';
    const listener: TClientCustomEventListener = (event) => {
      let response: ResponseMessageWithError | ResponseMessageWithResultAndSignature<Result>;
      let request: DiscoverRequestMessage | RequestMessageWithCredential<TParams | undefined> | null;
      let defaultCallbackOptions: Omit<TClientCallbackOptions, 'error' | 'result' | 'signature'>;
      let vcic: VIP030026PublicKeyCredential;

      try {
        response = JSON.parse(event.detail); // the event.detail should be a stringified object
      } catch (error) {
        this._logger.error(`${AVMWebClient.name}#${__function}:`, error);

        return;
      }

      request = this._requests.find(({ id }) => id === response.requestID) || null;

      // if the request event is not known or is a discover request, ignore
      if (!request || request.method === VIP030027MethodEnum.Discover) {
        return;
      }

      this._logger.debug(`${AVMWebClient.name}#${__function}: received response:`, response);

      defaultCallbackOptions = {
        challenge: request.challenge,
        vcic: request.vcic,
        id: response.id,
        method,
        requestID: request.id,
      };

      // if we have a result we need to check the correct provider responded
      if ('result' in response) {
        try {
          vcic = VIP030026PublicKeyCredential.fromBytes(decodeBase64(request.vcic));

          // verify the challenge was successfully signed by the credential in the request
          if (
            !vcic.verify({
              bytes: decodeBase64(request.challenge),
              signature: decodeBase64(response.signature),
            })
          ) {
            this._logger.debug(
              `${AVMWebClient.name}#${__function}: provider "${vcic.id()}" failed to verify with request:`,
              request
            );

            return;
          }
        } catch (error) {
          this._logger.error(`${AVMWebClient.name}#${__function}:`, error);

          return callback({
            ...defaultCallbackOptions,
            error: new VIP030027UnknownError({
              message: error.message,
            }),
            result: null,
            signature: null,
          });
        }

        return callback({
          ...defaultCallbackOptions,
          error: null,
          result: response.result,
          signature: response.signature,
        });
      }

      // for errors
      callback({
        ...defaultCallbackOptions,
        error: response.error,
        result: null,
        signature: null,
      });
    };
    const listenerID = generateUUID();
    const reference = createMessageReference(method, VIP030027MessageTypeEnum.Response);

    // start listening to response events and add the listener to the map
    window.addEventListener(reference, listener);
    this._listeners.set(listenerID, {
      listener,
      reference,
    });

    return listenerID;
  }

  private _sendRequestMessage<Params extends TParams | undefined>(options: ISendRequestMessageOptions<Params>): string {
    const __function = '_sendRequestMessage';
    const reference = createMessageReference(options.method, VIP030027MessageTypeEnum.Request);
    const id = generateUUID();
    const request = new RequestMessageWithCredential<Params>({
      challenge: options.challenge ?? createChallenge(),
      vcic: options.vcic,
      id,
      params: options.params,
      method: options.method,
      reference,
    });

    try {
      // dispatch the request message
      window.dispatchEvent(
        new CustomEvent<RequestMessageWithCredential<Params>>(reference, {
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

      throw new VIP030027UnknownError(error.message);
    }
  }

  /**
   * public methods
   */

  /**
   * Sends a request to authenticate the client with providers.
   * @param {IRequestOptionsWithParams<IAuthenticateParams>} options - The request params, the provider credential and an
   * optional challenge.
   * @returns {string} the ID of the request message.
   */
  public authenticate(options: IRequestOptionsWithParams<IAuthenticateParams>): string {
    return this._sendRequestMessage({
      ...options,
      method: VIP030027MethodEnum.Authenticate,
    });
  }

  /**
   * Sends a request to remove the client from providers.
   * @param {IRequestOptions | IRequestOptionsWithParams<IDisableParams>} options - The request params, the provider
   * credential and an optional challenge.
   * @returns {string} the ID of the request message.
   * @public
   */
  public disable(options: IRequestOptions | IRequestOptionsWithParams<IDisableParams>): string {
    return this._sendRequestMessage<IDisableParams | undefined>({
      ...options,
      method: VIP030027MethodEnum.Disable,
      params: (options as IRequestOptionsWithParams<IDisableParams>).params,
    });
  }

  /**
   * Sends a request to get the available providers. This should be called before interacting with
   * any providers to ensure networks & methods are supported.
   * @returns {string} the ID of the request message.
   * @public
   */
  public discover(): string {
    const __function = 'discover';
    const id = generateUUID();
    const method = VIP030027MethodEnum.Discover;
    const reference = createMessageReference(method, VIP030027MessageTypeEnum.Request);
    const request = new DiscoverRequestMessage({
      id,
      method,
      params: undefined,
      reference,
    });

    try {
      // dispatch the request message
      window.dispatchEvent(
        new CustomEvent<DiscoverRequestMessage>(reference, {
          detail: request,
        })
      );

      // add a timeout to remove the request and stop handling response messages
      window.setTimeout(() => {
        this._requests = this._requests.filter((value) => value.id !== request.id);
      }, LOWER_REQUEST_TIMEOUT);

      this._logger.debug(
        `${AVMWebClient.name}#${__function}: dispatched request message "${reference}" with id "${request.id}"`
      );

      // add the request to the internal state
      this._requests.push(request);

      return request.id;
    } catch (error) {
      this._logger.error(error);

      throw new VIP030027UnknownError(error.message);
    }
  }

  /**
   * Enables to a client with providers. If the ID of the provider and/or network is specified, that provider/network is
   * used, otherwise the all providers available providers are used.
   * @param {IRequestOptions | IRequestOptionsWithParams<IEnableParams>} options - The request params, the provider credential and an
   * optional challenge.
   * @returns {string} the ID of the request message.
   * @public
   */
  public enable(options: IRequestOptions | IRequestOptionsWithParams<IEnableParams>): string {
    return this._sendRequestMessage<IEnableParams | undefined>({
      ...options,
      method: VIP030027MethodEnum.Enable,
      params: (options as IRequestOptionsWithParams<IDisableParams>).params,
    });
  }

  /**
   * Listens to `authenticate` messages sent from providers.
   * @param {(options: TClientCallbackOptions<IAuthenticateResult>) => void | Promise<void>} callback - callback that is called when a response message
   * is received.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onAuthenticate(
    callback: (options: TClientCallbackOptions<IAuthenticateResult>) => void | Promise<void>
  ): string {
    return this._addListener<IAuthenticateResult>(VIP030027MethodEnum.Authenticate, callback);
  }

  /**
   * Listens to `disable` messages sent from providers.
   * @param {(options: TClientCallbackOptions<IDisableResult>) => void | Promise<void>} callback - callback that is called when a response message
   * is received.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onDisable(callback: (options: TClientCallbackOptions<IDisableResult>) => void | Promise<void>): string {
    return this._addListener<IDisableResult>(VIP030027MethodEnum.Disable, callback);
  }

  /**
   * Listens to `discover` messages sent from providers.
   * @param {(options: TClientDiscoverCallbackOptions) => void | Promise<void>} callback - callback that is called when
   * a response message is received.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onDiscover(callback: (options: TClientDiscoverCallbackOptions) => void | Promise<void>): string {
    const __function = 'onDiscover';
    const method = VIP030027MethodEnum.Discover;
    const listener: TClientCustomEventListener = (event) => {
      let response: ResponseMessageWithError | ResponseMessageWithResult<IDiscoverResult>;
      let request: DiscoverRequestMessage | RequestMessageWithCredential<TParams | undefined> | null;

      try {
        response = JSON.parse(event.detail); // the event.detail should be a stringified object
      } catch (error) {
        this._logger.error(`${AVMWebClient.name}#${__function}:`, error);

        return;
      }

      request = this._requests.find(({ id }) => id === response.requestID) || null;

      // if the request event is not known, or it is not a discover request, ignore
      if (!request || request.method !== VIP030027MethodEnum.Discover) {
        return;
      }

      this._logger.debug(`${AVMWebClient.name}#${__function}: received response:`, response);

      callback({
        id: response.id,
        method,
        requestID: request.id,
        ...('result' in response
          ? {
              error: null,
              result: response.result,
            }
          : {
              error: response.error,
              result: null,
            }),
      });
    };
    const listenerID = generateUUID();
    const reference = createMessageReference(method, VIP030027MessageTypeEnum.Response);

    // start listening to response events and add the listener to the map
    window.addEventListener(reference, listener);
    this._listeners.set(listenerID, {
      listener,
      reference,
    });

    return listenerID;
  }

  /**
   * Listens to `enable` messages sent from providers.
   * @param {(options: TClientCallbackOptions<IEnableResult>) => void | Promise<void>} callback - callback that is called when a response message
   * is received.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onEnable(callback: (options: TClientCallbackOptions<IEnableResult>) => void | Promise<void>): string {
    return this._addListener<IEnableResult>(VIP030027MethodEnum.Enable, callback);
  }

  /**
   * Listens to `post_transactions` messages sent from providers.
   * @param {(options: TClientCallbackOptions<IPostTransactionsResult>) => void | Promise<void>} callback - callback that is called when a response
   * message is received.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onPostTransactions(
    callback: (options: TClientCallbackOptions<IPostTransactionsResult>) => void | Promise<void>
  ): string {
    return this._addListener<IPostTransactionsResult>(VIP030027MethodEnum.PostTransactions, callback);
  }

  /**
   * Listens to `sign_and_post_transactions` messages sent from providers.
   * @param {(options: TClientCallbackOptions<IPostTransactionsResult>) => void | Promise<void>} callback - callback that is called when a response
   * message is received.
   * @public
   */
  public onSignAndPostTransactions(
    callback: (options: TClientCallbackOptions<IPostTransactionsResult>) => void | Promise<void>
  ): string {
    return this._addListener<IPostTransactionsResult>(VIP030027MethodEnum.SignAndPostTransactions, callback);
  }

  /**
   * Listens to `sign_message` messages sent from providers.
   * @param {(options: TClientCallbackOptions<ISignMessageResult>) => void | Promise<void>} callback - callback that is called when a response
   * message is received.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onSignMessage(
    callback: (options: TClientCallbackOptions<ISignMessageResult>) => void | Promise<void>
  ): string {
    return this._addListener<ISignMessageResult>(VIP030027MethodEnum.SignMessage, callback);
  }

  /**
   * Listens to `sign_transactions` messages sent from providers.
   * @param {(options: TClientCallbackOptions<ISignTransactionsResult>) => void | Promise<void>} callback - callback
   * that is called when a response message is received.
   * @returns {string} the ID of the listener.
   * @public
   */
  public onSignTransactions(
    callback: (options: TClientCallbackOptions<ISignTransactionsResult>) => void | Promise<void>
  ): string {
    return this._addListener<ISignTransactionsResult>(VIP030027MethodEnum.SignTransactions, callback);
  }

  /**
   * Request providers to post a list of signed transactions to the network.
   * @param {IRequestOptionsWithParams<IPostTransactionsParams>} options - The request params, the provider credential and an
   * optional challenge.
   * @returns {string} the ID of the request message.
   * @public
   */
  public postTransactions(options: IRequestOptionsWithParams<IPostTransactionsParams>): string {
    return this._sendRequestMessage({
      ...options,
      method: VIP030027MethodEnum.PostTransactions,
    });
  }

  /**
   * Sends a list of unsigned transactions to be signed and posted to the network by the provider.
   * @param {IRequestOptionsWithParams<ISignTransactionsParams>} options - The request params, the provider credential and an
   * optional challenge.
   * @returns {string} the ID of the request message.
   * @public
   */
  public signAndPostTransactions(options: IRequestOptionsWithParams<ISignTransactionsParams>): string {
    return this._sendRequestMessage({
      ...options,
      method: VIP030027MethodEnum.SignAndPostTransactions,
    });
  }

  /**
   * Sends a UTF-8 encoded message to be signed by the provider.
   * @param {IRequestOptionsWithParams<ISignMessageParams>} options - The request params, the provider credential and an
   * optional challenge.
   * @returns {string} the ID of the request message.
   * @public
   */
  public signMessage(options: IRequestOptionsWithParams<ISignMessageParams>): string {
    return this._sendRequestMessage({
      ...options,
      method: VIP030027MethodEnum.SignMessage,
    });
  }

  /**
   * Sends a list of unsigned transactions to be signed by the provider.
   * @param {IRequestOptionsWithParams<ISignTransactionsParams>} options - The request params, the provider credential and an
   * optional challenge.
   * @returns {string} the ID of the request message.
   * @public
   */
  public signTransactions(options: IRequestOptionsWithParams<ISignTransactionsParams>): string {
    return this._sendRequestMessage({
      ...options,
      method: VIP030027MethodEnum.SignTransactions,
    });
  }
}
