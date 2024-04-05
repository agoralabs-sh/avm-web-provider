// types
import { IAVMWebWalletConfig, IAVMWebWalletInitOptions } from '@app/types';

export default class AVMWebWallet {
  private readonly config: IAVMWebWalletConfig;

  private constructor(config: IAVMWebWalletConfig) {
    this.config = config;
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
   * Gets the configuration.
   * @returns {IAVMWebWalletConfig} the current configuration.
   */
  public getConfig(): IAVMWebWalletConfig {
    return this.config;
  }
}
