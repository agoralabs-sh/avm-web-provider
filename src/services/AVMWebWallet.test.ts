// services
import AVMWebWallet from './AVMWebWallet';

// types
import { IAVMWebWalletConfig } from '@app/types';

describe(AVMWebWallet.name, () => {
  const providerId: string = '02657eaf-be17-4efc-b0a4-19d654b2448e';
  let wallet: AVMWebWallet;

  describe(`${AVMWebWallet.name}#init`, () => {
    it('should initialize the wallet with default options', () => {
      // arrange
      let config: IAVMWebWalletConfig;

      // act
      wallet = AVMWebWallet.init(providerId);

      // assert
      config = wallet.getConfig();

      expect(config.debug).toBe(false);
    });

    it('should initialize the provider with the specified options', () => {
      // arrange
      const debug: boolean = true;
      let config: IAVMWebWalletConfig;

      // act
      wallet = AVMWebWallet.init(providerId, {
        debug,
      });

      // assert
      config = wallet.getConfig();

      expect(config.debug).toBe(debug);
      expect(config.providerId).toBe(providerId);
    });
  });
});
