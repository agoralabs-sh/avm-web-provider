import { v4 as uuid } from 'uuid';

// constants
import { DEFAULT_REQUEST_TIMEOUT, LOWER_REQUEST_TIMEOUT } from '@app/constants';

// enums
import { ARC0027MessageTypeEnum, ARC0027MethodEnum } from '@app/enums';

// messages
import {
  RequestMessage,
  ResponseMessageWithResult,
  ResponseMessageWithError,
} from '@app/messages';

// types
import type {
  IAVMWebProviderConfig,
  IAVMWebProviderInitOptions,
  IDiscoverParams,
  IDiscoverResult,
  ISendRequestWithTimeoutOptions,
  TRequestParams,
  TResponseResults,
} from '@app/types';

// utils
import { createChannelName, createMessageReference } from '@app/utils';

export default class AVMWebProvider {
  private readonly config: IAVMWebProviderConfig;

  private constructor(config: IAVMWebProviderConfig) {
    this.config = config;
  }

  /**
   * private methods
   */

  private async sendRequestWithTimeout<
    Params = TRequestParams,
    Result = TResponseResults,
  >({
    method,
    params,
    timeout,
  }: ISendRequestWithTimeoutOptions<Params>): Promise<Result[]> {
    return new Promise<Result[]>((resolve, reject) => {
      const channel: BroadcastChannel = new BroadcastChannel(
        createChannelName()
      );
      const requestId: string = uuid();
      const requestReference: string = createMessageReference(
        method,
        ARC0027MessageTypeEnum.Request
      );
      const results: Result[] = [];

      // listen to responses
      channel.onmessage = (
        message: MessageEvent<
          ResponseMessageWithError | ResponseMessageWithResult<Result>
        >
      ) => {
        // if the response's request id does not match the intended request, just ignore
        if (!message.data || message.data.requestId !== requestId) {
          return;
        }

        // if there is an error, reject
        if ((message.data as ResponseMessageWithError).error) {
          return reject((message.data as ResponseMessageWithError).error);
        }

        // add the result
        (message.data as ResponseMessageWithResult<Result>).result &&
          results.push(
            (message.data as ResponseMessageWithResult<Result>).result
          );
      };

      // create a timeout that returns the collected results
      window.setTimeout(() => {
        resolve(results);

        // close the channel, we are done here
        channel.close();
      }, timeout || DEFAULT_REQUEST_TIMEOUT);

      // broadcast the request message
      channel.postMessage(
        new RequestMessage<Params>({
          id: requestId,
          params,
          reference: requestReference,
        })
      );
    });
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
   * Gets information relating to available providers. This should be called before interacting with any providers to
   * ensure networks and methods are supported.
   * **NOTE:** this request will timeout after 0.75 seconds, at which time all results should have returned.
   * @param {IDiscoverParams} params - [optional] params that specify which provider to target.
   * @returns {Promise<IDiscoverResult[]>} information about the available providers.
   */
  public async discover(params?: IDiscoverParams): Promise<IDiscoverResult[]> {
    return await this.sendRequestWithTimeout<IDiscoverParams, IDiscoverResult>({
      method: ARC0027MethodEnum.Discover,
      params,
      timeout: LOWER_REQUEST_TIMEOUT,
    });
  }

  /**
   * Gets the configuration.
   * @returns {IAVMWebProviderConfig} the current configuration.
   */
  public getConfig(): IAVMWebProviderConfig {
    return this.config;
  }

  onDiscover(): void {}
}
