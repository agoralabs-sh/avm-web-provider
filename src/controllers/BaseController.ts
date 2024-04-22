// controllers
import Logger from './Logger';

// types
import { IBaseConfig } from '@app/types';

export default abstract class BaseController<Config extends IBaseConfig> {
  protected readonly config: Config;
  protected logger: Logger;

  protected constructor(config: Config) {
    this.config = config;
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
}
