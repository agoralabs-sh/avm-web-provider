// controllers
import Logger from './Logger';

// types
import { IBaseConfig } from '@app/types';

// utils
import { createChannelName } from '@app/utils';

export default abstract class BaseController<Config extends IBaseConfig> {
  protected channel: BroadcastChannel | null = null;
  protected readonly config: Config;
  protected logger: Logger;

  protected constructor(config: Config) {
    this.config = config;
    this.logger = new Logger(config.debug ? 'debug' : 'error');
  }

  /**
   * protected abstract methods
   */

  protected abstract onMessage(message: MessageEvent): Promise<void>;

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
   * Starts listening to events.
   */
  public startListening(): void {
    this.stopListening(); // close any previous channels

    // create a new channel
    this.channel = new BroadcastChannel(createChannelName());

    // start listening to events
    this.channel.onmessage = this.onMessage.bind(this);
  }

  /**
   * Stops listening to events.
   *
   * **NOTE:** this does not clear any event listeners.
   */
  public stopListening(): void {
    this.channel && this.channel.close();

    this.channel = null;
  }
}
