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
  TAVMWebProviderListener,
  TResponseResults,
} from '@app/types';

// utils
import { createMessageReference } from '@app/utils';

export default class AVMWebProvider extends BaseController<IAVMWebProviderConfig> {
  private readonly listeners: Map<string, TAVMWebProviderListener>;

  private constructor(config: IAVMWebProviderConfig) {
    super(config);

    this.listeners = new Map<string, TAVMWebProviderListener>();

    // start listening to request messages
    this.startListening();
  }

  /**
   * private methods
   */

  private async sendResponseMessage({
    method,
    listener,
    requestMessage,
  }: ISendResponseMessageOptions): Promise<void> {
    const _functionName: string = 'sendResponseMessage';
    let id: string;
    let reference: string;
    let result: TResponseResults;

    // if there is no channel, ignore
    if (!this.channel) {
      this.logger.debug(
        `${AVMWebProvider.name}#${_functionName}: no broadcast channel available, ignoring`
      );

      return;
    }

    id = uuid();
    reference = createMessageReference(method, ARC0027MessageTypeEnum.Response);

    try {
      result = await listener(requestMessage.params);

      // post the result message in the broadcast channel
      return this.channel.postMessage(
        new ResponseMessageWithResult({
          id,
          reference,
          requestId: requestMessage.id,
          result,
        })
      );
    } catch (error) {
      this.logger.error(error);

      // if we have an arc-0027 error, send it in the response
      if ((error as BaseARC0027Error).code) {
        return this.channel.postMessage(
          new ResponseMessageWithError({
            error,
            id,
            reference,
            requestId: requestMessage.id,
          })
        );
      }

      // otherwise, wrap the message in an unknown error
      return this.channel.postMessage(
        new ResponseMessageWithError({
          error: new ARC0027UnknownError({
            message: error.message,
            providerId: this.config.providerId,
          }),
          id,
          reference,
          requestId: requestMessage.id,
        })
      );
    }
  }

  /**
   * protected methods
   */

  protected async onMessage(
    message: MessageEvent<RequestMessage>
  ): Promise<void> {
    const listener: TAVMWebProviderListener | null =
      this.listeners.get(message.data.reference) || null;
    let method: ARC0027MethodEnum | null = null;

    if (listener) {
      switch (message.data.reference) {
        case `${createMessageReference(ARC0027MethodEnum.Disable, ARC0027MessageTypeEnum.Request)}`:
          method = ARC0027MethodEnum.Disable;
          break;
        case `${createMessageReference(ARC0027MethodEnum.Discover, ARC0027MessageTypeEnum.Request)}`:
          method = ARC0027MethodEnum.Discover;
          break;
        case `${createMessageReference(ARC0027MethodEnum.Enable, ARC0027MessageTypeEnum.Request)}`:
          method = ARC0027MethodEnum.Enable;
          break;
        case `${createMessageReference(ARC0027MethodEnum.PostTransactions, ARC0027MessageTypeEnum.Request)}`:
          method = ARC0027MethodEnum.PostTransactions;
          break;
        default:
          break;
      }

      if (method) {
        return await this.sendResponseMessage({
          method,
          listener,
          requestMessage: message.data,
        });
      }
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
   * Listens to `disable` messages sent from clients. This will replace any previous set listeners. If null is supplied,
   * the listener will be removed.
   * @param {TAVMWebProviderListener<IDisableParams, IDisableResult> | null} listener - the listener to call when the
   * request message is sent, or null to remove the listener.
   */
  onDisable(
    listener: TAVMWebProviderListener<IDisableParams, IDisableResult> | null
  ): void {
    const requestReference: string = createMessageReference(
      ARC0027MethodEnum.Disable,
      ARC0027MessageTypeEnum.Request
    );

    // if the listener is null, delete it from the map
    if (!listener) {
      this.listeners.delete(requestReference);

      return;
    }

    this.listeners.set(requestReference, listener);
  }

  /**
   * Listens to `discover` messages sent from clients. This will replace any previous set listeners. If null is
   * supplied, the listener will be removed.
   * @param {TAVMWebProviderListener<IDiscoverParams, IDiscoverResult> | null} listener - the listener to call when the
   * request message is sent, or null to remove the listener.
   */
  onDiscover(
    listener: TAVMWebProviderListener<IDiscoverParams, IDiscoverResult> | null
  ): void {
    const requestReference: string = createMessageReference(
      ARC0027MethodEnum.Discover,
      ARC0027MessageTypeEnum.Request
    );

    // if the listener is null, delete it from the map
    if (!listener) {
      this.listeners.delete(requestReference);

      return;
    }

    this.listeners.set(requestReference, listener);
  }

  /**
   * Listens to `enable` messages sent from clients. This will replace any previous set listeners. If null is supplied,
   * the listener will be removed.
   * @param {TAVMWebProviderListener<IEnableParams, IEnableResult> | null} listener - the listener to call when the
   * request message is sent, or null to remove the listener.
   */
  onEnable(
    listener: TAVMWebProviderListener<IEnableParams, IEnableResult> | null
  ): void {
    const requestReference: string = createMessageReference(
      ARC0027MethodEnum.Enable,
      ARC0027MessageTypeEnum.Request
    );

    // if the listener is null, delete it from the map
    if (!listener) {
      this.listeners.delete(requestReference);

      return;
    }

    this.listeners.set(requestReference, listener);
  }

  /**
   * Listens to `post_transactions` messages sent from clients. This will replace any previous set listeners. If null is
   * supplied, the listener will be removed.
   * @param {TAVMWebProviderListener<IPostTransactionsParams, IPostTransactionsResult> | null} listener - the listener
   * to call when the request message is sent, or null to remove the listener.
   */
  onPostTransactions(
    listener: TAVMWebProviderListener<
      IPostTransactionsParams,
      IPostTransactionsResult
    > | null
  ): void {
    const requestReference: string = createMessageReference(
      ARC0027MethodEnum.PostTransactions,
      ARC0027MessageTypeEnum.Request
    );

    // if the listener is null, delete it from the map
    if (!listener) {
      this.listeners.delete(requestReference);

      return;
    }

    this.listeners.set(requestReference, listener);
  }
}
