import { randomBytes } from 'crypto';

// controllers
import AVMWebClient from './AVMWebClient';
import AVMWebProvider from './AVMWebProvider';

// enums
import { ARC0027MessageTypeEnum, ARC0027MethodEnum } from '@app/enums';

// types
import type { IAVMWebClientConfig, IDiscoverResult } from '@app/types';

// utils
import { createMessageReference } from '@app/utils';

describe(AVMWebClient.name, () => {
  const providerId: string = '02657eaf-be17-4efc-b0a4-19d654b2448e';
  let client: AVMWebClient;
  let provider: AVMWebProvider;

  beforeEach(() => {
    client = AVMWebClient.init();
    provider = AVMWebProvider.init(providerId);
  });

  afterEach(() => {
    client.stopListening();
    provider.stopListening();
  });

  describe(`${AVMWebClient.name}#init`, () => {
    it('should initialize the provider with default options', () => {
      // arrange
      let config: IAVMWebClientConfig;

      // act
      // assert
      config = client.getConfig();

      expect(config.debug).toBe(false);
    });

    it('should initialize the provider with the specified options', () => {
      // arrange
      const debug: boolean = true;
      let config: IAVMWebClientConfig;

      // act
      client = AVMWebClient.init({
        debug,
      });

      // assert
      config = client.getConfig();

      expect(config.debug).toBe(debug);
    });
  });

  describe(`${AVMWebClient.name}#discover`, () => {
    it('should return a provider', (done) => {
      // arrange
      const expectedResult: IDiscoverResult = {
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

      provider.on(
        createMessageReference(
          ARC0027MethodEnum.Discover,
          ARC0027MessageTypeEnum.Request
        ),
        () => expectedResult
      );
      client.onDiscover((result, error) => {
        // assert
        expect(error).toBeNull();
        expect(result).toBeDefined();
        expect(result).toEqual(expectedResult);

        done();
      });

      // act
      client.discover();
    });
  });
});
