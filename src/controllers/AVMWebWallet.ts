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
  IAVMWebWalletConfig,
  IAVMWebWalletInitOptions,
  ISendResponseMessageOptions,
  TAVMWebWalletListener,
  TResponseResults,
} from '@app/types';

// utils
import { createMessageReference } from '@app/utils';

export default class AVMWebWallet extends BaseController<IAVMWebWalletConfig> {
  private readonly events: Map<string, TAVMWebWalletListener>;

  private constructor(config: IAVMWebWalletConfig) {
    super(config);

    this.events = new Map<string, TAVMWebWalletListener>();

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
    let id: string;
    let reference: string;
    let result: TResponseResults;

    // if there is no channel, ignore
    if (!this.channel) {
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
    return new AVMWebWallet({
      debug: debug || false,
      providerId,
    });
  }

  /**
   * public methods
   */

  /**
   * Removes a request message listener.
   * @param {string} requestReference - the request reference. This follows the ARC-0027 request message naming
   * convention.
   */
  public off(requestReference: string): void {
    this.events.delete(requestReference);
  }

  /**
   * Sets a request message listener. This will replace any previous set listeners.
   * @param {string} requestReference - the request reference. This follows the ARC-0027 request message naming
   * convention.
   * @param {TAVMWebWalletListener} listener - the listener to call when the request message is sent.
   */
  public on(requestReference: string, listener: TAVMWebWalletListener): void {
    this.events.set(requestReference, listener);
  }
}
