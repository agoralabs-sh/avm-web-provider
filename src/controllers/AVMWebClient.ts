import { v4 as uuid } from 'uuid';

// constants
import { DEFAULT_REQUEST_TIMEOUT } from '@app/constants';

// controllers
import BaseController from './BaseController';

// enums
import { ARC0027MessageTypeEnum, ARC0027MethodEnum } from '@app/enums';

// errors
import { ARC0027UnknownError } from '@app/errors';

// messages
import {
  RequestMessage,
  ResponseMessageWithError,
  ResponseMessageWithResult,
} from '@app/messages';

// types
import type {
  IAVMWebClientConfig,
  IAVMWebClientInitOptions,
  IDisableParams,
  IDisableResult,
  IDiscoverParams,
  IDiscoverResult,
  IEnableParams,
  IEnableResult,
  IPostTransactionsParams,
  IPostTransactionsResult,
  ISendRequestMessageOptions,
  ISignMessageParams,
  ISignMessageResult,
  ISignTransactionsParams,
  ISignTransactionsResult,
  TAVMWebClientCallback,
  TClientCustomEventListener,
  TRequestParams,
  TResponseResults,
} from '@app/types';

// utils
import { createMessageReference } from '@app/utils';

export default class AVMWebClient extends BaseController<IAVMWebClientConfig> {
  private requestIds: string[];

  private constructor(config: IAVMWebClientConfig) {
    super(config);

    this.requestIds = [];
  }

  /**
   * private methods
   */

  private addListener<Result = TResponseResults>(
    method: ARC0027MethodEnum,
    callback: TAVMWebClientCallback<Result>
  ): string {
    const _functionName: string = 'addListener';
    const listener: TClientCustomEventListener = (event) => {
      let detail: ResponseMessageWithError | ResponseMessageWithResult<Result>;

      try {
        detail = JSON.parse(event.detail); // the event.detail should be a stringified object
      } catch (error) {
        console.error(`${AVMWebClient.name}#${_functionName}:`, error);

        return;
      }

      // if the request event is not known, ignore
      if (!this.requestIds.includes(detail.requestId)) {
        return;
      }

      this.logger.debug(
        `${AVMWebClient.name}#${_functionName}: received response event:`,
        detail
      );

      callback({
        ...detail,
        error: (detail as ResponseMessageWithError).error || null,
        method,
        result: (detail as ResponseMessageWithResult<Result>).result || null,
      });
    };
    const listenerID: string = uuid();
    const reference: string = createMessageReference(
      method,
      ARC0027MessageTypeEnum.Response
    );

    // start listening to response events and add the listener to the map
    window.addEventListener(reference, listener);
    this.listeners.set(listenerID, {
      listener,
      reference,
    });

    return listenerID;
  }

  private sendRequestMessage<Params = TRequestParams>({
    method,
    params,
  }: ISendRequestMessageOptions<Params>): string {
    const _functionName: string = 'sendRequestMessage';
    const id: string = uuid();
    const reference: string = createMessageReference(
      method,
      ARC0027MessageTypeEnum.Request
    );

    try {
      // dispatch the request message
      window.dispatchEvent(
        new CustomEvent<RequestMessage<Params>>(reference, {
          detail: new RequestMessage<Params>({
            id,
            params,
            reference,
          }),
        })
      );

      // add a timeout to remove the request id and stop handling response messages
      window.setTimeout(() => {
        this.requestIds = this.requestIds.filter((value) => value !== id);
      }, DEFAULT_REQUEST_TIMEOUT);

      this.logger.debug(
        `${AVMWebClient.name}#${_functionName}: posted request message "${reference}" with id "${id}"`
      );

      // add the id to the internal state
      this.requestIds.push(id);

      return id;
    } catch (error) {
      this.logger.error(error);

      throw new ARC0027UnknownError(error.message);
    }
  }

  /**
   * public static methods
   */

  public static init(
    { debug }: IAVMWebClientInitOptions = { debug: false }
  ): AVMWebClient {
    return new AVMWebClient({
      debug: debug || false,
    });
  }

  /**
   * public methods
   */

  /**
   * Sends a request to remove the client from providers.
   * @param {IDisableParams} params - [optional] params that specify which provider, network and/or specific session IDs.
   * @returns {string} the ID of the request message.
   */
  public disable(params?: IDisableParams): string {
    return this.sendRequestMessage<IDisableParams>({
      method: ARC0027MethodEnum.Disable,
      params,
    });
  }

  /**
   * Sends a request to get information relating to available providers. This should be called before interacting with
   * any providers to ensure networks and methods are supported.
   * @param {IDiscoverParams} params - [optional] params that specify which provider to target.
   * @returns {string} the ID of the request message.
   */
  public discover(params?: IDiscoverParams): string {
    return this.sendRequestMessage<IDiscoverParams>({
      method: ARC0027MethodEnum.Discover,
      params,
    });
  }

  /**
   * Enables to a client with providers. If the ID of the provider and/or network is specified, that provider/network is
   * used, otherwise the all providers available providers are used.
   * @param {IEnableParams} params - [optional] params that specify the provider and/or the network.
   * @returns {string} the ID of the request message.
   */
  public enable(params?: IEnableParams): string {
    return this.sendRequestMessage<IEnableParams>({
      method: ARC0027MethodEnum.Enable,
      params,
    });
  }

  /**
   * Listens to `disable` messages sent from providers.
   * @param {TAVMWebClientCallback<IDisableResult>} callback - callback that is called when a response message
   * is received.
   * @returns {string} the ID of the listener.
   */
  public onDisable(callback: TAVMWebClientCallback<IDisableResult>): string {
    return this.addListener<IDisableResult>(
      ARC0027MethodEnum.Disable,
      callback
    );
  }

  /**
   * Listens to `discover` messages sent from providers.
   * @param {TAVMWebClientCallback<IDiscoverResult>} callback - callback that is called when a response message
   * is received.
   * @returns {string} the ID of the listener.
   */
  public onDiscover(callback: TAVMWebClientCallback<IDiscoverResult>): string {
    return this.addListener<IDiscoverResult>(
      ARC0027MethodEnum.Discover,
      callback
    );
  }

  /**
   * Listens to `enable` messages sent from providers.
   * @param {TAVMWebClientCallback<IEnableResult>} callback - callback that is called when a response message
   * is received.
   * @returns {string} the ID of the listener.
   */
  public onEnable(callback: TAVMWebClientCallback<IEnableResult>): string {
    return this.addListener<IEnableResult>(ARC0027MethodEnum.Enable, callback);
  }

  /**
   * Listens to `post_transactions` messages sent from providers.
   * @param {TAVMWebClientCallback<IPostTransactionsResult>} callback - callback that is called when a response
   * message is received.
   * @returns {string} the ID of the listener.
   */
  public onPostTransactions(
    callback: TAVMWebClientCallback<IPostTransactionsResult>
  ): string {
    return this.addListener<IPostTransactionsResult>(
      ARC0027MethodEnum.PostTransactions,
      callback
    );
  }

  /**
   * Listens to `sign_and_post_transactions` messages sent from providers.
   * @param {TAVMWebClientCallback<IPostTransactionsResult>} callback - callback that is called when a response
   * message is received.
   */
  public onSignAndPostTransactions(
    callback: TAVMWebClientCallback<IPostTransactionsResult>
  ): string {
    return this.addListener<IPostTransactionsResult>(
      ARC0027MethodEnum.SignAndPostTransactions,
      callback
    );
  }

  /**
   * Listens to `sign_message` messages sent from providers.
   * @param {TAVMWebClientCallback<ISignTransactionsResult> | null} callback - callback that is called when a response
   * message is received.
   * @returns {string} the ID of the listener.
   */
  public onSignMessage(
    callback: TAVMWebClientCallback<ISignMessageResult>
  ): string {
    return this.addListener<ISignMessageResult>(
      ARC0027MethodEnum.SignMessage,
      callback
    );
  }

  /**
   * Listens to `sign_transactions` messages sent from providers.
   * @param {TAVMWebClientCallback<ISignTransactionsResult> | null} callback - callback that is called when a response
   * message is received.
   * @returns {string} the ID of the listener.
   */
  public onSignTransactions(
    callback: TAVMWebClientCallback<ISignTransactionsResult>
  ): string {
    return this.addListener<ISignTransactionsResult>(
      ARC0027MethodEnum.SignTransactions,
      callback
    );
  }

  /**
   * Request providers to post a list of signed transactions to the network.
   * @param {IPostTransactionsParams} params - params that specify the provider and the signed transactions.
   * @returns {string} the ID of the request message
   */
  public postTransactions(params: IPostTransactionsParams): string {
    return this.sendRequestMessage<IPostTransactionsParams>({
      method: ARC0027MethodEnum.PostTransactions,
      params,
    });
  }

  /**
   * Sends a list of unsigned transactions to be signed and posted to the network by the provider.
   * @param {ISignTransactionsParams} params - params that specify the unsigned transactions and the provider.
   * @returns {string} the ID of the request message
   */
  public signAndPostTransactions(params: ISignTransactionsParams): string {
    return this.sendRequestMessage<ISignTransactionsParams>({
      method: ARC0027MethodEnum.SignAndPostTransactions,
      params,
    });
  }

  /**
   * Sends a UTF-8 encoded message to be signed by the provider.
   * @param {ISignMessageParams} params - params that specify the message to sign, the signer and the provider.
   * @returns {string} the ID of the request message
   */
  public signMessage(params: ISignMessageParams): string {
    return this.sendRequestMessage<ISignMessageParams>({
      method: ARC0027MethodEnum.SignMessage,
      params,
    });
  }

  /**
   * Sends a list of unsigned transactions to be signed by the provider.
   * @param {ISignTransactionsParams} params - params that specify the unsigned transactions and the provider.
   * @returns {string} the ID of the request message
   */
  public signTransactions(params: ISignTransactionsParams): string {
    return this.sendRequestMessage<ISignTransactionsParams>({
      method: ARC0027MethodEnum.SignTransactions,
      params,
    });
  }
}
