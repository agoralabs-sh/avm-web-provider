import { v4 as uuid } from 'uuid';

// controllers
import BaseController from './BaseController';

// enums
import { ARC0027MessageTypeEnum, ARC0027MethodEnum } from '@app/enums';

// errors
import { ARC0027UnknownError, BaseARC0027Error } from '@app/errors';

// messages
import {
  RequestMessage,
  ResponseMessageWithError,
  ResponseMessageWithResult,
} from '@app/messages';

// types
import type {
  IAVMWebProviderConfig,
  IAVMWebProviderInitOptions,
  IDisableParams,
  IDisableResult,
  IDiscoverParams,
  IDiscoverResult,
  IEnableParams,
  IEnableResult,
  IPostTransactionsParams,
  IPostTransactionsResult,
  ISendResponseMessageOptions,
  ISignTransactionsParams,
  ISignTransactionsResult,
  TAVMWebProviderCallback,
  TProviderCustomEventListener,
  TRequestParams,
  TResponseResults,
} from '@app/types';

// utils
import { createMessageReference } from '@app/utils';

export default class AVMWebProvider extends BaseController<IAVMWebProviderConfig> {
  private readonly listeners: Map<string, TProviderCustomEventListener>;

  private constructor(config: IAVMWebProviderConfig) {
    super(config);

    this.listeners = new Map<string, TProviderCustomEventListener>();
  }

  /**
   * private methods
   */

  private addListener<Params = TRequestParams, Result = TResponseResults>(
    method: ARC0027MethodEnum,
    callback: TAVMWebProviderCallback<Params, Result>
  ): string {
    const _functionName: string = 'addListener';
    const listener: TProviderCustomEventListener = (event) => {
      this.logger.debug(
        `${AVMWebProvider.name}#${_functionName}: received request event:`,
        event.detail
      );

      return this.sendResponseMessage({
        callback,
        method,
        requestMessage: event.detail as RequestMessage<Params>,
      });
    };
    const listenerID: string = uuid();

    // start listening to response events and add listener to the map
    window.addEventListener(listenerID, listener);
    this.listeners.set(listenerID, listener);

    return listenerID;
  }

  private async sendResponseMessage<
    Params = TRequestParams,
    Result = TResponseResults,
  >({
    callback,
    method,
    requestMessage,
  }: ISendResponseMessageOptions<Params, Result>): Promise<void> {
    const _functionName: string = 'sendResponseMessage';
    const id: string = uuid();
    const reference: string = createMessageReference(
      method,
      ARC0027MessageTypeEnum.Response
    );
    let result: Result;

    try {
      result = await callback({
        id: requestMessage.id,
        method,
        params: requestMessage.params,
      });

      this.logger.debug(
        `${AVMWebProvider.name}#${_functionName}: posted response message "${reference}" with id "${id}"`
      );

      // dispatch a response event with the result message
      window.dispatchEvent(
        new CustomEvent<ResponseMessageWithResult<Result>>(reference, {
          detail: new ResponseMessageWithResult<Result>({
            id,
            reference,
            requestId: requestMessage.id,
            result,
          }),
        })
      );

      return;
    } catch (error) {
      this.logger.error(error);

      // if we have an arc-0027 error, send it in the response
      if ((error as BaseARC0027Error).code) {
        window.dispatchEvent(
          new CustomEvent<ResponseMessageWithError>(reference, {
            detail: new ResponseMessageWithError({
              error,
              id,
              reference,
              requestId: requestMessage.id,
            }),
          })
        );

        return;
      }

      // otherwise, wrap the message in an unknown error
      window.dispatchEvent(
        new CustomEvent<ResponseMessageWithError>(reference, {
          detail: new ResponseMessageWithError({
            error: new ARC0027UnknownError({
              message: error.message,
              providerId: this.config.providerId,
            }),
            id,
            reference,
            requestId: requestMessage.id,
          }),
        })
      );

      return;
    }
  }

  /**
   * public static methods
   */

  public static init(
    providerId: string,
    { debug }: IAVMWebProviderInitOptions = { debug: false }
  ): AVMWebProvider {
    return new AVMWebProvider({
      debug: debug || false,
      providerId,
    });
  }

  /**
   * public methods
   */

  /**
   * Listens to `disable` messages sent from clients.
   * @param {TAVMWebProviderCallback<IDisableParams, IDisableResult>} callback - the callback to handle requests from
   * the client.
   * @returns {string} the ID of the listener.
   */
  public onDisable(
    callback: TAVMWebProviderCallback<IDisableParams, IDisableResult>
  ): string {
    return this.addListener<IDisableParams, IDisableResult>(
      ARC0027MethodEnum.Disable,
      callback
    );
  }

  /**
   * Listens to `discover` messages sent from clients.
   * @param {TAVMWebProviderCallback<IDiscoverParams, IDiscoverResult>} callback - the callback to handle requests from
   * the client.
   * @returns {string} the ID of the listener.
   */
  public onDiscover(
    callback: TAVMWebProviderCallback<IDiscoverParams, IDiscoverResult>
  ): string {
    return this.addListener<IDiscoverParams, IDiscoverResult>(
      ARC0027MethodEnum.Discover,
      callback
    );
  }

  /**
   * Listens to `enable` messages sent from clients.
   * @param {TAVMWebProviderCallback<IEnableParams, IEnableResult>} callback - the callback to handle requests from
   * the client.
   * @returns {string} the ID of the listener.
   */
  public onEnable(
    callback: TAVMWebProviderCallback<IEnableParams, IEnableResult>
  ): string {
    return this.addListener<IEnableParams, IDisableResult>(
      ARC0027MethodEnum.Enable,
      callback
    );
  }

  /**
   * Listens to `post_transactions` messages sent from clients.
   * @param {TAVMWebProviderCallback<IPostTransactionsParams, IPostTransactionsResult>} callback - the callback to handle requests from
   * the client.
   * @returns {string} the ID of the listener.
   */
  public onPostTransactions(
    callback: TAVMWebProviderCallback<
      IPostTransactionsParams,
      IPostTransactionsResult
    >
  ): string {
    return this.addListener<IPostTransactionsParams, IPostTransactionsResult>(
      ARC0027MethodEnum.PostTransactions,
      callback
    );
  }

  /**
   * Listens to `sign_and_post_transactions` messages sent from clients.
   * @param {TAVMWebProviderCallback<ISignTransactionsParams, IPostTransactionsResult>} callback - the callback to handle requests from
   * the client.
   * @returns {string} the ID of the listener.
   */
  public onSignAndPostTransactions(
    callback: TAVMWebProviderCallback<
      ISignTransactionsParams,
      IPostTransactionsResult
    >
  ): string {
    return this.addListener<ISignTransactionsParams, IPostTransactionsResult>(
      ARC0027MethodEnum.SignAndPostTransactions,
      callback
    );
  }

  /**
   * Listens to `sign_transactions` messages sent from clients.
   * @param {TAVMWebProviderCallback<ISignTransactionsParams, ISignTransactionsResult>} callback - the callback to handle requests from
   * the client.
   * @returns {string} the ID of the listener.
   */
  public onSignTransactions(
    callback: TAVMWebProviderCallback<
      ISignTransactionsParams,
      ISignTransactionsResult
    >
  ): string {
    return this.addListener<ISignTransactionsParams, ISignTransactionsResult>(
      ARC0027MethodEnum.SignTransactions,
      callback
    );
  }

  /**
   * Removes the listener, by the ID.
   * @param {string} id - the listener ID to remove.
   */
  public removeListener(id: string): void {
    const listener: TProviderCustomEventListener | null =
      this.listeners.get(id) || null;

    if (!listener) {
      return;
    }

    // remove the listener from the DOM and the map
    window.removeEventListener(id, listener);
    this.listeners.delete(id);
  }
}
