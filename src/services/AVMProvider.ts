// types
import { IConfig, IInitOptions } from '@app/types';

export default class AVMProvider {
  private readonly config: IConfig;

  private constructor(config: IConfig) {
    this.config = config;
  }

  /**
   * public static methods
   */

  public static init({ debug }: IInitOptions = { debug: false }): AVMProvider {
    return new AVMProvider({
      debug: debug || false,
    });
  }

  /**
   * public methods
   */

  public getConfig(): IConfig {
    return this.config;
  }
}
