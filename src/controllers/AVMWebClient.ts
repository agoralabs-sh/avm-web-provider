import { v4 as uuid } from 'uuid';

// controllers
import BaseController from './BaseController';

// enums
import { ARC0027MessageTypeEnum, ARC0027MethodEnum } from '@app/enums';

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
  IDiscoverParams,
  IDiscoverResult,
  ISendRequestMessageOptions,
  TAVMWebClientListener,
  TRequestParams,
} from '@app/types';

// utils
import { createMessageReference } from '@app/utils';

export default class AVMWebClient extends BaseController<IAVMWebClientConfig> {
  private readonly listeners: Map<string, TAVMWebClientListener>;
  private readonly requestIds: string[];

  private constructor(config: IAVMWebClientConfig) {
    super(config);

    this.listeners = new Map<string, TAVMWebClientListener>();
    this.requestIds = [];

    // start listening to response messages
    this.startListening();
  }

  /**
   * private methods
   */

  private sendRequestMessage<Params = TRequestParams>({
    method,
    params,
  }: ISendRequestMessageOptions<Params>): void {
    const _functionName: string = 'sendRequestMessage';
    let id: string;
    let reference: string;

    // if there is no channel, ignore
    if (!this.channel) {
      this.logger.debug(
        `${AVMWebClient.name}#${_functionName}: no broadcast channel available, ignoring`
      );

      return;
    }

    id = uuid();
    reference = createMessageReference(method, ARC0027MessageTypeEnum.Request);

    try {
      // broadcast the request message
      this.channel.postMessage(
        new RequestMessage<Params>({
          id,
          params,
          reference,
        })
      );

      this.logger.debug(
        `${AVMWebClient.name}#${_functionName}: posted message "${reference}" with id "${id}"`
      );

      // add the id to the internal state
      this.requestIds.push(id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  /**
   * protected methods
   */

  protected async onMessage(
    message: MessageEvent<ResponseMessageWithError | ResponseMessageWithResult>
  ): Promise<void> {
    const _functionName: string = 'onMessage';
    const listener: TAVMWebClientListener | null =
      this.listeners.get(message.data.reference) || null;

    // ensure we have a listener for the response and the request id is known
    if (listener && this.requestIds.includes(message.data.requestId)) {
      switch (message.data.reference) {
        case `${createMessageReference(ARC0027MethodEnum.Discover, ARC0027MessageTypeEnum.Response)}`:
          this.logger.debug(
            `${AVMWebClient.name}#${_functionName}: received response message "${JSON.stringify(message.data)}"`
          );

          return listener(
            (message.data as ResponseMessageWithResult).result || null,
            (message.data as ResponseMessageWithError).error || null
          );
        default:
          break;
      }
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
   * Sends a request to get information relating to available providers. This should be called before interacting with
   * any providers to ensure networks and methods are supported.
   * @param {IDiscoverParams} params - [optional] params that specify which provider to target.
   */
  public discover(params?: IDiscoverParams): void {
    return this.sendRequestMessage<IDiscoverParams>({
      method: ARC0027MethodEnum.Discover,
      params,
    });
  }

  /**
   * Listens to discover messages sent from providers. This will replace any previous set listeners. If null is
   * supplied, the listener will be removed.
   * @param {TAVMWebClientListener<IDiscoverResult> | null} listener - callback that is called when a response message
   * is received, or null to remove the listener.
   */
  onDiscover(listener: TAVMWebClientListener<IDiscoverResult> | null): void {
    const responseReference: string = createMessageReference(
      ARC0027MethodEnum.Discover,
      ARC0027MessageTypeEnum.Response
    );

    // if the listener is null, delete it from the map
    if (!listener) {
      this.listeners.delete(responseReference);

      return;
    }

    this.listeners.set(responseReference, listener);
  }
}
