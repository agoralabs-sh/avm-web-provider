import { randomBytes } from 'crypto';

// controllers
import AVMWebClient from './AVMWebClient';
import AVMWebProvider from './AVMWebProvider';

// enums
import { ARC0027MethodEnum } from '@app/enums';

// types
import {
  IAVMWebClientConfig,
  IDiscoverResult,
  IEnableResult,
} from '@app/types';
import { ARC0027MethodNotSupportedError } from '@app/errors';

describe(AVMWebClient.name, () => {
  const providerId: string = '02657eaf-be17-4efc-b0a4-19d654b2448e';
  let client: AVMWebClient;
  let provider: AVMWebProvider;

  afterEach(() => {
    if (client) {
      client.stopListening();
    }

    if (provider) {
      provider.stopListening();
    }
  });

  describe(`${AVMWebClient.name}#init`, () => {
    it('should initialize the provider with default options', () => {
      // arrange
      let config: IAVMWebClientConfig;

      // act
      client = AVMWebClient.init();

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
    it('should return the provider information', (done) => {
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

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onDiscover(() => expectedResult);
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

  describe(`${AVMWebClient.name}#enable`, () => {
    it('should return an error', (done) => {
      // arrange
      const expectedError: ARC0027MethodNotSupportedError =
        new ARC0027MethodNotSupportedError({
          method: ARC0027MethodEnum.Enable,
          providerId,
        });

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onEnable(async () => await Promise.reject(expectedError));
      client.onEnable((result, error) => {
        // assert
        expect(result).toBeNull();
        expect(error).toEqual(expectedError);

        done();
      });

      // act
      client.enable();
    });

    it('should return the account information', (done) => {
      // arrange
      const expectedResult: IEnableResult = {
        accounts: [
          {
            address:
              'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',
            name: 'Wallet-1',
          },
          {
            address:
              '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',
            name: 'Wallet-2',
          },
        ],
        genesisHash: randomBytes(32).toString('base64'),
        genesisId: 'jest-test-v1.0',
        providerId,
      };

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onEnable(() => expectedResult);
      client.onEnable((result, error) => {
        // assert
        expect(error).toBeNull();
        expect(result).toBeDefined();
        expect(result).toEqual(expectedResult);

        done();
      });

      // act
      client.enable();
    });
  });
});
