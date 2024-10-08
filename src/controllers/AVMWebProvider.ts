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
  ISignMessageParams,
  ISignMessageResult,
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
  private constructor(config: IAVMWebProviderConfig) {
    super(config);
  }

  /**
   * private methods
   */

  private _addListener<
    Params extends TRequestParams,
    Result extends TResponseResults,
  >(
    method: ARC0027MethodEnum,
    callback: TAVMWebProviderCallback<Params, Result>
  ): string {
    const _functionName = '_addListener';
    const listener: TProviderCustomEventListener<Params> = (event) => {
      this._logger.debug(
        `[${this._config.providerId}]${AVMWebProvider.name}#${_functionName}: received request event:`,
        event.detail
      );

      return this._sendResponseMessage({
        callback,
        method,
        requestMessage: event.detail as RequestMessage<Params>,
      });
    };
    const listenerID = uuid();
    const reference = createMessageReference(
      method,
      ARC0027MessageTypeEnum.Request
    );

    // start listening to request events and add the listener to the map
    window.addEventListener(reference, listener);
    this._listeners.set(listenerID, {
      listener,
      reference,
    });

    return listenerID;
  }

  /**
   * Dispatches an event to the web page with the result/error from the `options.callback` function.
   * NOTE: the event uses the detail property of the `CustomEvent` but due to Firefox's limitation of only allowing
   * non-string properties, the response message MUST be a serializable object as it will be stringified to allow
   * transport.
   * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Sharing_objects_with_page_scripts}
   * @private
   */
  private async _sendResponseMessage<
    Params extends TRequestParams,
    Result extends TResponseResults,
  >({
    callback,
    method,
    requestMessage,
  }: ISendResponseMessageOptions<Params, Result>): Promise<void> {
    const _functionName = '_sendResponseMessage';
    let id: string;
    let reference: string;
    let result: Result;

    // if the provider id is supplied in the request, and it does not match the registered provider id, ignore
    if (
      requestMessage.params?.providerId &&
      requestMessage.params.providerId !== this._config.providerId
    ) {
      this._logger.debug(
        `[${this._config.providerId}]${AVMWebProvider.name}#${_functionName}: message "${requestMessage.reference}" is for provider "${requestMessage.params.providerId}", skipping`
      );

      return;
    }

    id = uuid();
    reference = createMessageReference(method, ARC0027MessageTypeEnum.Response);

    try {
      result = await callback({
        id: requestMessage.id,
        method,
        params: requestMessage.params,
      });

      // dispatch a response event with the result
      window.dispatchEvent(
        new CustomEvent(reference, {
          detail: JSON.stringify(
            new ResponseMessageWithResult<Result>({
              id,
              reference,
              requestId: requestMessage.id,
              result,
            })
          ),
        })
      );

      this._logger.debug(
        `[${this._config.providerId}]${AVMWebProvider.name}#${_functionName}: posted response message "${reference}" with id "${id}"`
      );

      return;
    } catch (error) {
      this._logger.error(error);

      // if we have an arc-0027 error, send it in the response
      if ((error as BaseARC0027Error).code) {
        window.dispatchEvent(
          new CustomEvent(reference, {
            detail: JSON.stringify(
              new ResponseMessageWithError({
                error,
                id,
                reference,
                requestId: requestMessage.id,
              })
            ),
          })
        );

        return;
      }

      // otherwise, wrap the message in an unknown error
      window.dispatchEvent(
        new CustomEvent(reference, {
          detail: JSON.stringify(
            new ResponseMessageWithError({
              error: new ARC0027UnknownError({
                message: error.message,
                providerId: this._config.providerId,
              }),
              id,
              reference,
              requestId: requestMessage.id,
            })
          ),
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
    return this._addListener<IDisableParams, IDisableResult>(
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
    return this._addListener<IDiscoverParams, IDiscoverResult>(
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
    return this._addListener<IEnableParams, IDisableResult>(
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
    return this._addListener<IPostTransactionsParams, IPostTransactionsResult>(
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
    return this._addListener<ISignTransactionsParams, IPostTransactionsResult>(
      ARC0027MethodEnum.SignAndPostTransactions,
      callback
    );
  }

  /**
   * Listens to `sign_message` messages sent from clients.
   * @param {TAVMWebProviderCallback<ISignMessageParams, ISignMessageResult>} callback - the callback to handle requests from
   * the client.
   * @returns {string} the ID of the listener.
   */
  public onSignMessage(
    callback: TAVMWebProviderCallback<ISignMessageParams, ISignMessageResult>
  ): string {
    return this._addListener<ISignMessageParams, ISignMessageResult>(
      ARC0027MethodEnum.SignMessage,
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
    return this._addListener<ISignTransactionsParams, ISignTransactionsResult>(
      ARC0027MethodEnum.SignTransactions,
      callback
    );
  }
}
