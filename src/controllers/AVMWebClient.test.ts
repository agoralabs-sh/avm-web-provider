import { randomBytes } from 'crypto';

// controllers
import AVMWebClient from './AVMWebClient';
import AVMWebProvider from './AVMWebProvider';

// enums
import { ARC0027MethodEnum } from '@app/enums';

// errors
import { ARC0027MethodNotSupportedError } from '@app/errors';

// types
import {
  IAVMWebClientConfig,
  IDisableResult,
  IDiscoverResult,
  IEnableResult,
  IPostTransactionsResult,
  ISignMessageResult,
  ISignTransactionsResult,
} from '@app/types';

describe(AVMWebClient.name, () => {
  const providerId: string = '02657eaf-be17-4efc-b0a4-19d654b2448e';
  let client: AVMWebClient;
  let provider: AVMWebProvider;

  afterEach(() => {
    provider?.removeAllListeners();
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

  describe(`${AVMWebClient.name}#disable`, () => {
    it('should return an error', (done) => {
      // arrange
      const expectedError: ARC0027MethodNotSupportedError =
        new ARC0027MethodNotSupportedError({
          method: ARC0027MethodEnum.Disable,
          providerId,
        });

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onDisable(async () => await Promise.reject(expectedError));
      client.onDisable(({ error, method, result }) => {
        // assert
        expect(method).toEqual(ARC0027MethodEnum.Disable);
        expect(error).toEqual(expectedError);
        expect(result).toBeNull();

        done();
      });

      // act
      client.disable();
    });

    it('should return the removed sessions', (done) => {
      // arrange
      const genesisHash: string = randomBytes(32).toString('base64');
      const sessionIds: string[] = [
        '25a90d91-8a96-4828-8bd5-da40b5ad33ed',
        '6d12962e-2d8d-450c-b32e-dd6f7dd11230',
        'c12424a1-789c-49c1-b6a4-226c3d575060',
      ];
      const expectedResult: IDisableResult = {
        genesisHash,
        genesisId: 'jest-test-v1.0',
        providerId,
        sessionIds,
      };
      let actualRequestId: string;

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onDisable(({ id }) => {
        actualRequestId = id;

        return expectedResult;
      });
      client.onDisable(({ error, method, result, requestId }) => {
        // assert
        expect(method).toEqual(ARC0027MethodEnum.Disable);
        expect(error).toBeNull();
        expect(requestId).toBe(actualRequestId);
        expect(result).toBeDefined();
        expect(result).toEqual(expectedResult);

        done();
      });

      // act
      client.disable({
        genesisHash,
        providerId,
        sessionIds,
      });
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
      let actualRequestId: string;

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onDiscover(({ id }) => {
        actualRequestId = id;

        return expectedResult;
      });
      client.onDiscover(({ error, method, result, requestId }) => {
        // assert
        expect(method).toEqual(ARC0027MethodEnum.Discover);
        expect(error).toBeNull();
        expect(requestId).toBe(actualRequestId);
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
      client.onEnable(({ error, method, result }) => {
        // assert
        expect(method).toEqual(ARC0027MethodEnum.Enable);
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
      let actualRequestId: string;

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onEnable(({ id }) => {
        actualRequestId = id;

        return expectedResult;
      });
      client.onEnable(({ error, method, result, requestId }) => {
        // assert
        expect(method).toEqual(ARC0027MethodEnum.Enable);
        expect(error).toBeNull();
        expect(requestId).toBe(actualRequestId);
        expect(result).toBeDefined();
        expect(result).toEqual(expectedResult);

        done();
      });

      // act
      client.enable();
    });
  });

  describe(`${AVMWebClient.name}#postTransactions`, () => {
    it('should return an error', (done) => {
      // arrange
      const expectedError: ARC0027MethodNotSupportedError =
        new ARC0027MethodNotSupportedError({
          method: ARC0027MethodEnum.PostTransactions,
          providerId,
        });

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onPostTransactions(
        async () => await Promise.reject(expectedError)
      );
      client.onPostTransactions(({ error, method, result }) => {
        // assert
        expect(method).toEqual(ARC0027MethodEnum.PostTransactions);
        expect(result).toBeNull();
        expect(error).toEqual(expectedError);

        done();
      });

      // act
      client.postTransactions({
        providerId,
        stxns: ['gqNzaWfEQ...'],
      });
    });

    it('should return the transactions IDs', (done) => {
      // arrange
      const expectedResult: IPostTransactionsResult = {
        providerId,
        txnIDs: ['OKU6A2Q...'],
      };
      let actualRequestId: string;

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onPostTransactions(({ id }) => {
        actualRequestId = id;

        return expectedResult;
      });
      client.onPostTransactions(({ error, method, result, requestId }) => {
        // assert
        expect(method).toEqual(ARC0027MethodEnum.PostTransactions);
        expect(error).toBeNull();
        expect(requestId).toBe(actualRequestId);
        expect(result).toBeDefined();
        expect(result).toEqual(expectedResult);

        done();
      });

      // act
      client.postTransactions({
        providerId,
        stxns: ['gqNzaWfEQ...'],
      });
    });
  });

  describe(`${AVMWebClient.name}#signAndPostTransactions`, () => {
    it('should return an error', (done) => {
      // arrange
      const expectedError: ARC0027MethodNotSupportedError =
        new ARC0027MethodNotSupportedError({
          method: ARC0027MethodEnum.SignAndPostTransactions,
          providerId,
        });

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onSignAndPostTransactions(
        async () => await Promise.reject(expectedError)
      );
      client.onSignAndPostTransactions(({ error, method, result }) => {
        // assert
        expect(method).toEqual(ARC0027MethodEnum.SignAndPostTransactions);
        expect(result).toBeNull();
        expect(error).toEqual(expectedError);

        done();
      });

      // act
      client.signAndPostTransactions({
        providerId,
        txns: [
          {
            txn: randomBytes(32).toString('base64'),
          },
          {
            txn: randomBytes(32).toString('base64'),
            signers: [],
          },
        ],
      });
    });

    it('should return the transactions IDs', (done) => {
      // arrange
      const expectedResult: IPostTransactionsResult = {
        providerId,
        txnIDs: ['OKU6A2Q...'],
      };
      let actualRequestId: string;

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onSignAndPostTransactions(({ id }) => {
        actualRequestId = id;

        return expectedResult;
      });
      client.onSignAndPostTransactions(
        ({ error, method, result, requestId }) => {
          // assert
          expect(method).toEqual(ARC0027MethodEnum.SignAndPostTransactions);
          expect(error).toBeNull();
          expect(requestId).toBe(actualRequestId);
          expect(result).toBeDefined();
          expect(result).toEqual(expectedResult);

          done();
        }
      );

      // act
      client.signAndPostTransactions({
        providerId,
        txns: [
          {
            txn: randomBytes(32).toString('base64'),
          },
          {
            txn: randomBytes(32).toString('base64'),
            signers: [],
          },
        ],
      });
    });
  });

  describe(`${AVMWebClient.name}#signMessage`, () => {
    it('should return an error', (done) => {
      // arrange
      const expectedError: ARC0027MethodNotSupportedError =
        new ARC0027MethodNotSupportedError({
          method: ARC0027MethodEnum.SignMessage,
          providerId,
        });

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onSignMessage(async () => await Promise.reject(expectedError));
      client.onSignMessage(({ error, method, result }) => {
        // assert
        expect(method).toEqual(ARC0027MethodEnum.SignMessage);
        expect(result).toBeNull();
        expect(error).toEqual(expectedError);

        done();
      });

      // act
      client.signMessage({
        message: 'Hello humie!',
        providerId,
        signer: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',
      });
    });

    it('should return the signature of the signed message', (done) => {
      // arrange
      const signer: string =
        'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U';
      const expectedResult: ISignMessageResult = {
        providerId,
        signature: 'gqNzaWfEQ...',
        signer,
      };
      let actualRequestId: string;

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onSignMessage(({ id }) => {
        actualRequestId = id;

        return expectedResult;
      });
      client.onSignMessage(({ error, method, result, requestId }) => {
        // assert
        expect(method).toEqual(ARC0027MethodEnum.SignMessage);
        expect(error).toBeNull();
        expect(requestId).toBe(actualRequestId);
        expect(result).toBeDefined();
        expect(result).toEqual(expectedResult);

        done();
      });

      // act
      client.signMessage({
        message: 'Hello humie!',
        providerId,
        signer,
      });
    });
  });

  describe(`${AVMWebClient.name}#signTransactions`, () => {
    it('should return an error', (done) => {
      // arrange
      const expectedError: ARC0027MethodNotSupportedError =
        new ARC0027MethodNotSupportedError({
          method: ARC0027MethodEnum.SignTransactions,
          providerId,
        });

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onSignTransactions(
        async () => await Promise.reject(expectedError)
      );
      client.onSignTransactions(({ error, method, result }) => {
        // assert
        expect(method).toEqual(ARC0027MethodEnum.SignTransactions);
        expect(result).toBeNull();
        expect(error).toEqual(expectedError);

        done();
      });

      // act
      client.signTransactions({
        providerId,
        txns: [
          {
            txn: randomBytes(32).toString('base64'),
          },
          {
            txn: randomBytes(32).toString('base64'),
            signers: [],
          },
        ],
      });
    });

    it('should return the signed transactions', (done) => {
      // arrange
      const expectedResult: ISignTransactionsResult = {
        providerId,
        stxns: ['gqNzaWfEQ...', null],
      };
      let actualRequestId: string;

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onSignTransactions(({ id }) => {
        actualRequestId = id;

        return expectedResult;
      });
      client.onSignTransactions(({ error, method, result, requestId }) => {
        // assert
        expect(method).toEqual(ARC0027MethodEnum.SignTransactions);
        expect(error).toBeNull();
        expect(requestId).toBe(actualRequestId);
        expect(result).toBeDefined();
        expect(result).toEqual(expectedResult);

        done();
      });

      // act
      client.signTransactions({
        providerId,
        txns: [
          {
            txn: randomBytes(32).toString('base64'),
          },
          {
            txn: randomBytes(32).toString('base64'),
            signers: [],
          },
        ],
      });
    });
  });
});
