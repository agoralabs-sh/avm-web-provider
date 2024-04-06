import { randomBytes } from 'crypto';

// controllers
import AVMWebProvider from './AVMWebProvider';
import AVMWebWallet from './AVMWebWallet';

// enums
import { ARC0027MessageTypeEnum, ARC0027MethodEnum } from '@app/enums';

// types
import type { IAVMWebProviderConfig, IDiscoverResult } from '@app/types';

// utils
import { createMessageReference } from '@app/utils';

describe(AVMWebProvider.name, () => {
  const providerId: string = '02657eaf-be17-4efc-b0a4-19d654b2448e';
  let provider: AVMWebProvider;
  let wallet: AVMWebWallet;

  beforeEach(() => {
    provider = AVMWebProvider.init();
    wallet = AVMWebWallet.init(providerId);
  });

  afterEach(() => {
    wallet.stopListening();
  });

  describe(`${AVMWebProvider.name}#init`, () => {
    it('should initialize the provider with default options', () => {
      // arrange
      let config: IAVMWebProviderConfig;

      // act
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

  describe(`${AVMWebProvider.name}#discover`, () => {
    it('should return empty results if no providers are initialized', async () => {
      // arrange
      // act
      const results: IDiscoverResult[] = await provider.discover();

      // assert
      expect(results).toHaveLength(0);
    });

    it('should return a provider', async () => {
      // arrange
      const result: IDiscoverResult = {
        host: 'https://awesome-wallet.com',
        name: 'Awesome Wallet',
        networks: [
          {
            genesisHash: randomBytes(32).toString('base64'),
            genesisId: 'jest-test-v1.0',
            methods: [
              ARC0027MethodEnum.Disable,
              ARC0027MethodEnum.Enable,
              ARC0027MethodEnum.PostTransactions,
              ARC0027MethodEnum.SignAndPostTransactions,
              ARC0027MethodEnum.PostTransactions,
            ],
          },
        ],
        providerId,
      };
      let results: IDiscoverResult[];

      wallet.on(
        createMessageReference(
          ARC0027MethodEnum.Discover,
          ARC0027MessageTypeEnum.Request
        ),
        () => result
      );

      // act
      results = await provider.discover();

      // assert
      expect(results).toHaveLength(1);
      expect(results[0]).toEqual(result);
    });
  });
});
