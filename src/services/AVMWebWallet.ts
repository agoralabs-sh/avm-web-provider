import { v4 as uuid } from 'uuid';

// enums
import { ARC0027MessageTypeEnum, ARC0027MethodEnum } from '@app/enums';

// messages
import {
  RequestMessage,
  ResponseMessageWithError,
  ResponseMessageWithResult,
} from '@app/messages';

// types
import {
  IAVMWebWalletConfig,
  IAVMWebWalletInitOptions,
  ISendResponseMessageOptions,
  TAVMWebWalletListener,
  TResponseResults,
} from '@app/types';

// utils
import { createChannelName, createMessageReference } from '@app/utils';

export default class AVMWebWallet {
  private readonly channel: BroadcastChannel;
  private readonly config: IAVMWebWalletConfig;
  private readonly events: Map<string, TAVMWebWalletListener>;

  private constructor(channel: BroadcastChannel, config: IAVMWebWalletConfig) {
    this.channel = channel;
    this.config = config;
    this.events = new Map<string, TAVMWebWalletListener>();

    // start listening to request messages
    this.channel.onmessage = this.onRequestMessage.bind(this);
  }

  /**
   * private methods
   */

  private async sendResponseMessage({
    method,
    listener,
    requestMessage,
  }: ISendResponseMessageOptions): Promise<void> {
    const id: string = uuid();
    const reference: string = createMessageReference(
      method,
      ARC0027MessageTypeEnum.Response
    );
    let responseMessage: ResponseMessageWithError | ResponseMessageWithResult;
    let result: TResponseResults;

    try {
      result = await listener(requestMessage.params);
      responseMessage = new ResponseMessageWithResult({
        id,
        reference,
        requestId: requestMessage.id,
        result,
      });
    } catch (error) {
      responseMessage = new ResponseMessageWithError({
        error,
        id,
        reference,
        requestId: requestMessage.id,
      });
    }

    // post the response message in the broadcast channel
    this.channel.postMessage(responseMessage);
  }

  private async onRequestMessage(
    message: MessageEvent<RequestMessage>
  ): Promise<void> {
    const listener: TAVMWebWalletListener | null =
      this.events.get(message.data.reference) || null;

    if (listener) {
      switch (message.data.reference) {
        case `${createMessageReference(ARC0027MethodEnum.Discover, ARC0027MessageTypeEnum.Request)}`:
          return await this.sendResponseMessage({
            method: ARC0027MethodEnum.Discover,
            listener,
            requestMessage: message.data,
          });
        default:
          break;
      }
    }
  }

  /**
   * public static methods
   */

  public static init(
    providerId: string,
    { debug }: IAVMWebWalletInitOptions = { debug: false }
  ): AVMWebWallet {
    return new AVMWebWallet(new BroadcastChannel(createChannelName()), {
      debug: debug || false,
      providerId,
    });
  }

  /**
   * public methods
   */

  public off(requestReference: string): void {
    this.events.delete(requestReference);
  }

  public on(requestReference: string, listener: TAVMWebWalletListener): void {
    this.events.set(requestReference, listener);
  }

  /**
   * Gets the configuration.
   * @returns {IAVMWebWalletConfig} the current configuration.
   */
  public getConfig(): IAVMWebWalletConfig {
    return this.config;
  }
}
