// controllers
import Logger from './Logger';

// types
import type { IBaseConfig, IListenerItem } from '@app/types';

export default abstract class BaseController<Config extends IBaseConfig> {
  protected readonly config: Config;
  protected readonly listeners: Map<string, IListenerItem>;
  protected logger: Logger;

  protected constructor(config: Config) {
    this.config = config;
    this.listeners = new Map<string, IListenerItem>();
    this.logger = new Logger(config.debug ? 'debug' : 'error');
  }

  /**
   * public methods
   */

  /**
   * Gets the configuration.
   * @returns {Config} the current configuration.
   */
  public getConfig(): Config {
    return this.config;
  }

  /**
   * Removes all listeners.
   */
  public removeAllListeners(): void {
    // remove all the listeners
    this.listeners.forEach(({ listener, reference }) =>
      window.removeEventListener(reference, listener)
    );

    // clear the map
    this.listeners.clear();
  }

  /**
   * Removes the listener, by the ID.
   * @param {string} id - the listener ID to remove.
   */
  public removeListener(id: string): void {
    const item: IListenerItem | null = this.listeners.get(id) || null;

    if (!item) {
      return;
    }

    // remove the listener from the dom and the map
    window.removeEventListener(item.reference, item.listener);
    this.listeners.delete(id);
  }
}
