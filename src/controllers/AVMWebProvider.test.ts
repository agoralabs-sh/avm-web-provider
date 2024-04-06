// controllers
import AVMWebProvider from './AVMWebProvider';

// types
import { IAVMWebProviderConfig } from '@app/types';

describe(AVMWebProvider.name, () => {
  const providerId: string = '02657eaf-be17-4efc-b0a4-19d654b2448e';
  let provider: AVMWebProvider;

  beforeEach(() => {
    provider = AVMWebProvider.init(providerId);
  });

  afterEach(() => {
    provider.stopListening();
  });

  describe(`${AVMWebProvider.name}#init`, () => {
    it('should initialize the wallet with default options', () => {
      // arrange
      // act
      // assert
      const config: IAVMWebProviderConfig = provider.getConfig();

      expect(config.debug).toBe(false);
    });

    it('should initialize the provider with the specified options', () => {
      // arrange
      const debug: boolean = true;
      let config: IAVMWebProviderConfig;

      // act
      provider = AVMWebProvider.init(providerId, {
        debug,
      });

      // assert
      config = provider.getConfig();

      expect(config.debug).toBe(debug);
      expect(config.providerId).toBe(providerId);
    });
  });
});
