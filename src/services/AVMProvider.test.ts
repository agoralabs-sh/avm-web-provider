// services
import AVMProvider from './AVMProvider';

// types
import { IConfig } from '@app/types';

describe(AVMProvider.name, () => {
  let provider: AVMProvider;

  describe(`${AVMProvider.name}#init`, () => {
    it('should initialize the provider with default options', () => {
      // arrange
      let config: IConfig;

      // act
      provider = AVMProvider.init();

      // assert
      config = provider.getConfig();

      expect(config.debug).toBe(false);
    });

    it('should initialize the provider with the specified options', () => {
      // arrange
      const debug: boolean = true;
      let config: IConfig;

      // act
      provider = AVMProvider.init({
        debug,
      });

      // assert
      config = provider.getConfig();

      expect(config.debug).toBe(debug);
    });
  });
});
