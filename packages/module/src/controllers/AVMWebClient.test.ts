// @vitest-environment jsdom
import { VIP030026PrivateKeyCredential, VIP030026PublicKeyCredential } from '@agoralabs-sh/vip030026';
import { decode as decodeBase64, encode as encodeBase64 } from '@stablelib/base64';
import { encode as encodeUTF8 } from '@stablelib/utf8';
import { randomBytes } from 'crypto';
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

// controllers
import AVMWebClient from './AVMWebClient';
import AVMWebProvider from './AVMWebProvider';

// enums
import { VIP030027MethodEnum } from '@/enums';

// errors
import { VIP030027MethodNotSupportedError } from '@/errors';

// types
import type {
  IAuthenticateResult,
  IAVMWebClientConfig,
  IDisableResult,
  IDiscoverResult,
  IEnableResult,
  IPostTransactionsResult,
  ISignMessageResult,
  ISignTransactionsResult,
} from '@/types';

describe(AVMWebClient.name, () => {
  const genesisHash = encodeBase64(randomBytes(32));
  const genesisID = 'localhost-v1';
  const name = 'Awesome Wallet';
  const signer = 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U';
  let client: AVMWebClient;
  let privateKeyCredential: VIP030026PrivateKeyCredential;
  let provider: AVMWebProvider;
  let vcic: VIP030026PublicKeyCredential;

  beforeAll(() => {
    privateKeyCredential = VIP030026PrivateKeyCredential.generate();
    vcic = VIP030026PublicKeyCredential.fromJSON({
      algorithm: privateKeyCredential.algorithm(),
      id: privateKeyCredential.id(),
      publicKey: privateKeyCredential.publicKey(),
    });
  });

  beforeEach(() => {
    client = AVMWebClient.init();
    provider = AVMWebProvider.init({
      vcic: vcic.toString(),
    });
  });

  afterEach(() => {
    provider?.removeAllListeners();
  });

  describe(`${AVMWebClient.name}#authenticate`, () => {
    it('should return an error', () =>
      new Promise<void>((done) => {
        // arrange
        const expectedError = new VIP030027MethodNotSupportedError({
          method: VIP030027MethodEnum.Authenticate,
          vcic: vcic.toString(),
        });

        provider.onAuthenticate(async () => await Promise.reject(expectedError));
        client.onAuthenticate(({ error, method, result }) => {
          // assert
          expect(method).toEqual(VIP030027MethodEnum.Authenticate);
          expect(error).toEqual(expectedError);
          expect(result).toBeNull();

          done();
        });

        // act
        client.authenticate({
          params: {
            authenticationData: encodeBase64(encodeUTF8('awesome-dapp.sh')),
            data: encodeBase64(encodeUTF8('authenticate message')),
          },
          vcic: vcic.toString(),
        });
      }));

    it('should return the signed auth data', () =>
      new Promise<void>((done) => {
        // arrange
        const expectedResult: IAuthenticateResult = {
          signature: 'gqNzaWfEQ...',
          signer,
        };
        let actualRequestId: string;

        provider.onAuthenticate(({ challenge, id }) => {
          actualRequestId = id;

          return {
            result: expectedResult,
            signature: encodeBase64(privateKeyCredential.sign(decodeBase64(challenge))),
            vcic: vcic.toString(),
          };
        });
        client.onAuthenticate(({ error, method, result, requestID }) => {
          // assert
          expect(method).toEqual(VIP030027MethodEnum.Authenticate);
          expect(error).toBeNull();
          expect(requestID).toBe(actualRequestId);
          expect(result).toBeDefined();
          expect(result).toEqual(expectedResult);

          done();
        });

        // act
        client.authenticate({
          params: {
            authenticationData: encodeBase64(encodeUTF8('awesome-dapp.sh')),
            data: encodeBase64(encodeUTF8('authenticate message')),
          },
          vcic: vcic.toString(),
        });
      }));
  });

  describe(`${AVMWebClient.name}#disable`, () => {
    it('should return an error', () =>
      new Promise<void>((done) => {
        // arrange
        const expectedError: VIP030027MethodNotSupportedError = new VIP030027MethodNotSupportedError({
          method: VIP030027MethodEnum.Disable,
          vcic: vcic.toString(),
        });

        provider.onDisable(async () => await Promise.reject(expectedError));
        client.onDisable(({ error, method, result }) => {
          // assert
          expect(method).toEqual(VIP030027MethodEnum.Disable);
          expect(error).toEqual(expectedError);
          expect(result).toBeNull();

          done();
        });

        // act
        client.disable({
          vcic: vcic.toString(),
        });
      }));

    it('should return the removed sessions', () =>
      new Promise<void>((done) => {
        // arrange
        const sessionIds: string[] = [
          '25a90d91-8a96-4828-8bd5-da40b5ad33ed',
          '6d12962e-2d8d-450c-b32e-dd6f7dd11230',
          'c12424a1-789c-49c1-b6a4-226c3d575060',
        ];
        const expectedResult: IDisableResult = {
          genesisHash,
          genesisID,
          sessionIDs: sessionIds,
        };
        let actualRequestId: string;

        provider.onDisable(({ challenge, id }) => {
          actualRequestId = id;

          return {
            result: expectedResult,
            signature: encodeBase64(privateKeyCredential.sign(decodeBase64(challenge))),
            vcic: vcic.toString(),
          };
        });
        client.onDisable(({ error, method, result, requestID }) => {
          // assert
          expect(method).toEqual(VIP030027MethodEnum.Disable);
          expect(error).toBeNull();
          expect(requestID).toBe(actualRequestId);
          expect(result).toBeDefined();
          expect(result).toEqual(expectedResult);

          done();
        });

        // act
        client.disable({
          params: {
            genesisHash,
            sessionIDs: sessionIds,
          },
          vcic: vcic.toString(),
        });
      }));
  });

  describe(`${AVMWebClient.name}#discover`, () => {
    it('should return the provider information', () =>
      new Promise<void>((done) => {
        // arrange
        const expectedResult: IDiscoverResult = {
          host: 'https://awesome-wallet.com',
          name,
          networks: [
            {
              genesisHash,
              genesisID,
              methods: [
                VIP030027MethodEnum.Authenticate,
                VIP030027MethodEnum.Disable,
                VIP030027MethodEnum.Enable,
                VIP030027MethodEnum.PostTransactions,
                VIP030027MethodEnum.SignAndPostTransactions,
                VIP030027MethodEnum.PostTransactions,
              ],
            },
          ],
          vcic: vcic.toString(),
        };
        let actualRequestId: string;

        provider.onDiscover(({ id }) => {
          actualRequestId = id;

          return {
            result: expectedResult,
          };
        });
        client.onDiscover(({ error, method, result, requestID }) => {
          // assert
          expect(method).toEqual(VIP030027MethodEnum.Discover);
          expect(error).toBeNull();
          expect(requestID).toBe(actualRequestId);
          expect(result).toBeDefined();
          expect(result).toEqual(expectedResult);

          done();
        });

        // act
        client.discover();
      }));
  });

  describe(`${AVMWebClient.name}#enable`, () => {
    it('should return an error', () =>
      new Promise<void>((done) => {
        // arrange
        const expectedError: VIP030027MethodNotSupportedError = new VIP030027MethodNotSupportedError({
          method: VIP030027MethodEnum.Enable,
          vcic: vcic.toString(),
        });

        provider.onEnable(async () => await Promise.reject(expectedError));
        client.onEnable(({ error, method, result }) => {
          // assert
          expect(method).toEqual(VIP030027MethodEnum.Enable);
          expect(result).toBeNull();
          expect(error).toEqual(expectedError);

          done();
        });

        // act
        client.enable({
          vcic: vcic.toString(),
        });
      }));

    it('should return the account information', () =>
      new Promise<void>((done) => {
        // arrange
        const expectedResult: IEnableResult = {
          accounts: [
            {
              address: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',
              name: 'Wallet-1',
            },
            {
              address: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',
              name: 'Wallet-2',
            },
          ],
          genesisHash: encodeBase64(randomBytes(32)),
          genesisID,
        };
        let actualRequestId: string;

        provider.onEnable(({ challenge, id }) => {
          actualRequestId = id;

          return {
            result: expectedResult,
            signature: encodeBase64(privateKeyCredential.sign(decodeBase64(challenge))),
            vcic: vcic.toString(),
          };
        });
        client.onEnable(({ error, method, result, requestID }) => {
          // assert
          expect(method).toEqual(VIP030027MethodEnum.Enable);
          expect(error).toBeNull();
          expect(requestID).toBe(actualRequestId);
          expect(result).toBeDefined();
          expect(result).toEqual(expectedResult);

          done();
        });

        // act
        client.enable({
          vcic: vcic.toString(),
        });
      }));
  });

  describe(`${AVMWebClient.name}#init`, () => {
    it('should initialize the provider with default options', () => {
      // arrange
      let config: IAVMWebClientConfig;

      client = AVMWebClient.init();

      // assert
      config = client.getConfig();

      expect(config.debug).toBe(false);
    });

    it('should initialize the provider with the specified options', () => {
      // arrange
      const debug = true;
      let config: IAVMWebClientConfig;

      client = AVMWebClient.init({
        debug,
      });

      // assert
      config = client.getConfig();

      expect(config.debug).toBe(debug);
    });
  });

  describe(`${AVMWebClient.name}#postTransactions`, () => {
    it('should return an error', () =>
      new Promise<void>((done) => {
        // arrange
        const expectedError: VIP030027MethodNotSupportedError = new VIP030027MethodNotSupportedError({
          method: VIP030027MethodEnum.PostTransactions,
          vcic: vcic.toString(),
        });

        provider.onPostTransactions(async () => await Promise.reject(expectedError));
        client.onPostTransactions(({ error, method, result }) => {
          // assert
          expect(method).toEqual(VIP030027MethodEnum.PostTransactions);
          expect(result).toBeNull();
          expect(error).toEqual(expectedError);

          done();
        });

        // act
        client.postTransactions({
          params: {
            stxns: ['gqNzaWfEQ...'],
          },
          vcic: vcic.toString(),
        });
      }));

    it('should return the transactions IDs', () =>
      new Promise<void>((done) => {
        // arrange
        const expectedResult: IPostTransactionsResult = {
          txnIDs: ['OKU6A2Q...'],
        };
        let actualRequestId: string;

        provider.onPostTransactions(({ challenge, id }) => {
          actualRequestId = id;

          return {
            vcic: vcic.toString(),
            result: expectedResult,
            signature: encodeBase64(privateKeyCredential.sign(decodeBase64(challenge))),
          };
        });
        client.onPostTransactions(({ error, method, result, requestID }) => {
          // assert
          expect(method).toEqual(VIP030027MethodEnum.PostTransactions);
          expect(error).toBeNull();
          expect(requestID).toBe(actualRequestId);
          expect(result).toBeDefined();
          expect(result).toEqual(expectedResult);

          done();
        });

        // act
        client.postTransactions({
          params: {
            stxns: ['gqNzaWfEQ...'],
          },
          vcic: vcic.toString(),
        });
      }));
  });

  describe(`${AVMWebClient.name}#signAndPostTransactions`, () => {
    it('should return an error', () =>
      new Promise<void>((done) => {
        // arrange
        const expectedError: VIP030027MethodNotSupportedError = new VIP030027MethodNotSupportedError({
          method: VIP030027MethodEnum.SignAndPostTransactions,
          vcic: vcic.toString(),
        });

        provider.onSignAndPostTransactions(async () => await Promise.reject(expectedError));
        client.onSignAndPostTransactions(({ error, method, result }) => {
          // assert
          expect(method).toEqual(VIP030027MethodEnum.SignAndPostTransactions);
          expect(result).toBeNull();
          expect(error).toEqual(expectedError);

          done();
        });

        // act
        client.signAndPostTransactions({
          params: {
            txns: [
              {
                txn: encodeBase64(randomBytes(32)),
              },
              {
                txn: encodeBase64(randomBytes(32)),
                signers: [],
              },
            ],
          },
          vcic: vcic.toString(),
        });
      }));

    it('should return the transactions ids', () =>
      new Promise<void>((done) => {
        // arrange
        const expectedResult: IPostTransactionsResult = {
          txnIDs: ['OKU6A2Q...'],
        };
        let actualRequestId: string;

        provider.onSignAndPostTransactions(({ challenge, id }) => {
          actualRequestId = id;

          return {
            result: expectedResult,
            signature: encodeBase64(privateKeyCredential.sign(decodeBase64(challenge))),
            vcic: vcic.toString(),
          };
        });
        client.onSignAndPostTransactions(({ error, method, result, requestID }) => {
          // assert
          expect(method).toEqual(VIP030027MethodEnum.SignAndPostTransactions);
          expect(error).toBeNull();
          expect(requestID).toBe(actualRequestId);
          expect(result).toBeDefined();
          expect(result).toEqual(expectedResult);

          done();
        });

        // act
        client.signAndPostTransactions({
          params: {
            txns: [
              {
                txn: encodeBase64(randomBytes(32)),
              },
              {
                txn: encodeBase64(randomBytes(32)),
                signers: [],
              },
            ],
          },
          vcic: vcic.toString(),
        });
      }));
  });

  describe(`${AVMWebClient.name}#signMessage`, () => {
    it('should return an error', () =>
      new Promise<void>((done) => {
        // arrange
        const expectedError: VIP030027MethodNotSupportedError = new VIP030027MethodNotSupportedError({
          method: VIP030027MethodEnum.SignMessage,
          vcic: vcic.toString(),
        });

        provider.onSignMessage(async () => await Promise.reject(expectedError));
        client.onSignMessage(({ error, method, result }) => {
          // assert
          expect(method).toEqual(VIP030027MethodEnum.SignMessage);
          expect(result).toBeNull();
          expect(error).toEqual(expectedError);

          done();
        });

        // act
        client.signMessage({
          params: {
            message: 'Hello humie!',
            signer,
          },
          vcic: vcic.toString(),
        });
      }));

    it('should return the signature of the signed message', () =>
      new Promise<void>((done) => {
        // arrange
        const expectedResult: ISignMessageResult = {
          signature: 'gqNzaWfEQ...',
          signer,
        };
        let actualRequestId: string;

        provider.onSignMessage(({ challenge, id }) => {
          actualRequestId = id;

          return {
            result: expectedResult,
            signature: encodeBase64(privateKeyCredential.sign(decodeBase64(challenge))),
            vcic: vcic.toString(),
          };
        });
        client.onSignMessage(({ error, method, result, requestID }) => {
          // assert
          expect(method).toEqual(VIP030027MethodEnum.SignMessage);
          expect(error).toBeNull();
          expect(requestID).toBe(actualRequestId);
          expect(result).toBeDefined();
          expect(result).toEqual(expectedResult);

          done();
        });

        // act
        client.signMessage({
          params: {
            message: 'Hello humie!',
            signer,
          },
          vcic: vcic.toString(),
        });
      }));
  });

  describe(`${AVMWebClient.name}#signTransactions`, () => {
    it('should return an error', () =>
      new Promise<void>((done) => {
        // arrange
        const expectedError: VIP030027MethodNotSupportedError = new VIP030027MethodNotSupportedError({
          method: VIP030027MethodEnum.SignTransactions,
          vcic: vcic.toString(),
        });

        provider.onSignTransactions(async () => await Promise.reject(expectedError));
        client.onSignTransactions(({ error, method, result }) => {
          // assert
          expect(method).toEqual(VIP030027MethodEnum.SignTransactions);
          expect(result).toBeNull();
          expect(error).toEqual(expectedError);

          done();
        });

        // act
        client.signTransactions({
          params: {
            txns: [
              {
                txn: encodeBase64(randomBytes(32)),
              },
              {
                txn: encodeBase64(randomBytes(32)),
                signers: [],
              },
            ],
          },
          vcic: vcic.toString(),
        });
      }));

    it('should return the signed transactions', () =>
      new Promise<void>((done) => {
        // arrange
        const expectedResult: ISignTransactionsResult = {
          stxns: ['gqNzaWfEQ...', null],
        };
        let actualRequestId: string;

        provider.onSignTransactions(({ challenge, id }) => {
          actualRequestId = id;

          return {
            result: expectedResult,
            signature: encodeBase64(privateKeyCredential.sign(decodeBase64(challenge))),
            vcic: vcic.toString(),
          };
        });
        client.onSignTransactions(({ error, method, result, requestID }) => {
          // assert
          expect(method).toEqual(VIP030027MethodEnum.SignTransactions);
          expect(error).toBeNull();
          expect(requestID).toBe(actualRequestId);
          expect(result).toBeDefined();
          expect(result).toEqual(expectedResult);

          done();
        });

        // act
        client.signTransactions({
          params: {
            txns: [
              {
                txn: encodeBase64(randomBytes(32)),
              },
              {
                txn: encodeBase64(randomBytes(32)),
                signers: [],
              },
            ],
          },
          vcic: vcic.toString(),
        });
      }));
  });
});
