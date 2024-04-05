// services
import AVMWebProvider from './AVMWebProvider';

// types
import { IAVMWebProviderConfig } from '@app/types';

describe(AVMWebProvider.name, () => {
  let provider: AVMWebProvider;

  describe(`${AVMWebProvider.name}#init`, () => {
    it('should initialize the provider with default options', () => {
      // arrange
      let config: IAVMWebProviderConfig;

      // act
      provider = AVMWebProvider.init();

      // assert
      config = provider.getConfig();

      expect(config.debug).toBe(false);
    });

    it('should initialize the provider with the specified options', () => {
      // arrange
      const debug: boolean = true;
      let config: IAVMWebProviderConfig;

      // act
      provider = AVMWebProvider.init({
        debug,
      });

      // assert
      config = provider.getConfig();

      expect(config.debug).toBe(debug);
    });
  });
});
