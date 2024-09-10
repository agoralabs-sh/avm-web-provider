// controllers
import Logger from './Logger';

// types
import type { IBaseConfig, IListenerItem } from '@app/types';

export default abstract class BaseController<Config extends IBaseConfig> {
  protected readonly _config: Config;
  protected readonly _listeners: Map<string, IListenerItem>;
  protected _logger: Logger;

  protected constructor(config: Config) {
    this._config = config;
    this._listeners = new Map<string, IListenerItem>();
    this._logger = new Logger(config.debug ? 'debug' : 'error');
  }

  /**
   * public methods
   */

  /**
   * Gets the configuration.
   * @returns {Config} the current configuration.
   */
  public getConfig(): Config {
    return this._config;
  }

  /**
   * Removes all listeners.
   */
  public removeAllListeners(): void {
    // remove all the listeners
    this._listeners.forEach(({ listener, reference }) =>
      window.removeEventListener(reference, listener)
    );

    // clear the map
    this._listeners.clear();
  }

  /**
   * Removes the listener, by the ID.
   * @param {string} id - the listener ID to remove.
   */
  public removeListener(id: string): void {
    const item: IListenerItem | null = this._listeners.get(id) || null;

    if (!item) {
      return;
    }

    // remove the listener from the dom and the map
    window.removeEventListener(item.reference, item.listener);
    this._listeners.delete(id);
  }
}
