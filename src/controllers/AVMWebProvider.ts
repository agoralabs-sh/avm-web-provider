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
  IAVMWebProviderConfig,
  IAVMWebProviderInitOptions,
  IDiscoverParams,
  IDiscoverResult,
  ISendRequestMessageOptions,
  TAVMWebClientListener,
  TRequestParams,
} from '@app/types';

// utils
import { createMessageReference } from '@app/utils';

export default class AVMWebProvider extends BaseController<IAVMWebProviderConfig> {
  private readonly requestIds: string[];
  private readonly events: Map<string, TAVMWebClientListener>;

  private constructor(config: IAVMWebProviderConfig) {
    super(config);

    this.events = new Map<string, TAVMWebClientListener>();
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
    let id: string;

    // if there is no channel, ignore
    if (!this.channel) {
      return;
    }

    id = uuid();

    try {
      // broadcast the request message
      this.channel.postMessage(
        new RequestMessage<Params>({
          id,
          params,
          reference: createMessageReference(
            method,
            ARC0027MessageTypeEnum.Request
          ),
        })
      );

      // add the id to the internal state
      this.requestIds.push(id);
    } catch (error) {
      // TODO: log error
    }
  }

  /**
   * protected methods
   */

  protected async onMessage(
    message: MessageEvent<ResponseMessageWithError | ResponseMessageWithResult>
  ): Promise<void> {
    const listener: TAVMWebClientListener | null =
      this.events.get(message.data.reference) || null;

    // ensure we have a listener for the response and the request id is known
    if (listener && this.requestIds.includes(message.data.requestId)) {
      switch (message.data.reference) {
        case `${createMessageReference(ARC0027MethodEnum.Discover, ARC0027MessageTypeEnum.Response)}`:
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
    { debug }: IAVMWebProviderInitOptions = { debug: false }
  ): AVMWebProvider {
    return new AVMWebProvider({
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
   * Listens to discover messages sent from providers.
   * @param {TAVMWebClientListener<IDiscoverResult>} listener - callback that is called when a response message is
   * received.
   */
  onDiscover(listener: TAVMWebClientListener<IDiscoverResult>): void {
    this.events.set(
      createMessageReference(
        ARC0027MethodEnum.Discover,
        ARC0027MessageTypeEnum.Response
      ),
      listener
    );
  }
}
