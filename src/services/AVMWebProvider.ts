// types
import { IAVMWebProviderConfig, IAVMWebProviderInitOptions } from '@app/types';

export default class AVMWebProvider {
  private readonly config: IAVMWebProviderConfig;

  private constructor(config: IAVMWebProviderConfig) {
    this.config = config;
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
   * Gets the configuration.
   * @returns {IAVMWebProviderConfig} the current configuration.
   */
  public getConfig(): IAVMWebProviderConfig {
    return this.config;
  }
}
