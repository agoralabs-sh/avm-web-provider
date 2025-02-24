// @vitest-environment jsdom
import { VIP030026PrivateKeyCredential, VIP030026PublicKeyCredential } from '@agoralabs-sh/vip030026';
import { encode as encodeBase64 } from '@stablelib/base64';
import { encode as encodeUTF8 } from '@stablelib/utf8';
import { randomBytes } from '@stablelib/random';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

// controllers
import AVMWebClient from './AVMWebClient';
import AVMWebProvider from './AVMWebProvider';

// enums
import { VIP030027MethodEnum } from '@/enums';

// types
import type { IARC0001Transaction, IAuthenticateParams, IAVMWebProviderConfig, ISignMessageParams } from '@/types';

describe(AVMWebProvider.name, () => {
  const genesisHash = encodeBase64(randomBytes(32));
  const genesisId = 'localhost-v1';
  const name = 'Awesome Wallet';
  const signature = 'gqNzaWfEQ...';
  const signer = 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U';
  let client: AVMWebClient;
  let credential: VIP030026PublicKeyCredential;
  let provider: AVMWebProvider;

  beforeAll(() => {
    const privateKeyCredential = VIP030026PrivateKeyCredential.generate();

    client = AVMWebClient.init();
    credential = VIP030026PublicKeyCredential.fromJSON({
      algorithm: privateKeyCredential.algorithm(),
      id: privateKeyCredential.id(),
      publicKey: privateKeyCredential.publicKey(),
    });
    provider = AVMWebProvider.init({
      credential: credential.toString(),
    });
  });

  afterEach(() => {
    provider?.removeAllListeners();
  });

  describe(`${AVMWebProvider.name}#authenticate`, () => {
    it('should not receive the client request, if a different provider is provided', () => {
      // arrange
      const callback = vi.fn();
      const params: IAuthenticateParams = {
        authenticationData: encodeBase64(encodeUTF8('awesome-dapp.sh')),
        data: encodeBase64(encodeUTF8('authenticate message')),
        signer,
      };
      const privateKeyCredential = VIP030026PrivateKeyCredential.generate();
      const _credential = VIP030026PublicKeyCredential.fromJSON({
        algorithm: privateKeyCredential.algorithm(),
        id: privateKeyCredential.id(),
        publicKey: privateKeyCredential.publicKey(),
      });

      provider.onAuthenticate(callback);

      // act
      client.authenticate({
        credential: _credential.toString(),
        params,
      });

      // assert
      expect(callback.mock.calls.length).toBe(0);
    });

    it('should receive the client request', () =>
      new Promise<void>((done) => {
        // arrange
        const params: IAuthenticateParams = {
          authenticationData: encodeBase64(encodeUTF8('awesome-dapp.sh')),
          data: encodeBase64(encodeUTF8('authenticate message')),
          signer,
        };

        // assert
        provider.onAuthenticate(({ method, params }) => {
          expect(method).toBe(VIP030027MethodEnum.Authenticate);
          expect(params).toBeDefined();
          expect(params).toEqual(params);

          done();

          return {
            credential: credential.toString(),
            result: {
              signature: 'gqNzaWfEQ...',
              signer,
            },
            signature: 'gqNzaWfEQ...',
          };
        });

        // act
        client.authenticate({
          credential: credential.toString(),
          params,
        });
      }));
  });

  describe(`${AVMWebProvider.name}#init`, () => {
    it('should initialize the wallet with default options', () => {
      // arrange
      let config: IAVMWebProviderConfig;

      // act
      provider = AVMWebProvider.init({
        credential: credential.toString(),
      });

      // assert
      config = provider.getConfig();

      expect(config.debug).toBe(false);
    });

    it('should initialize the provider with the specified options', () => {
      // arrange
      const debug = true;
      const _provider = AVMWebProvider.init({
        credential: credential.toString(),
        debug,
      });
      let config: IAVMWebProviderConfig;

      // act
      // assert
      config = _provider.getConfig();

      expect(config.debug).toBe(debug);
      expect(config.credential.toString()).toBe(credential.toString());
    });
  });

  describe(`${AVMWebProvider.name}#onDisable`, () => {
    it('should not receive the client request, if a different provider is provided', () => {
      // arrange
      const callback = vi.fn();
      const privateKeyCredential = VIP030026PrivateKeyCredential.generate();
      const _credential = VIP030026PublicKeyCredential.fromJSON({
        algorithm: privateKeyCredential.algorithm(),
        id: privateKeyCredential.id(),
        publicKey: privateKeyCredential.publicKey(),
      });

      provider.onDisable(callback);

      // act
      client.disable({
        credential: _credential.toString(),
      });

      // assert
      expect(callback.mock.calls.length).toBe(0);
    });

    it('should receive the client request, if the matching provider id is provided', () =>
      new Promise<void>((done) => {
        provider.onDisable(({ method }) => {
          expect(method).toBe(VIP030027MethodEnum.Disable);

          done();

          return {
            credential: credential.toString(),
            result: {
              genesisHash,
              genesisId,
            },
            signature,
          };
        });

        // act
        client.disable({
          credential: credential.toString(),
        });
      }));
  });

  describe(`${AVMWebProvider.name}#onDiscover`, () => {
    it('should receive the client request', () =>
      new Promise<void>((done) => {
        provider.onDiscover(({ method }) => {
          expect(method).toBe(VIP030027MethodEnum.Discover);

          done();

          return {
            result: {
              credential: credential.toString(),
              name,
              networks: [],
            },
          };
        });

        // act
        client.discover();
      }));
  });

  describe(`${AVMWebProvider.name}#onEnable`, () => {
    it('should not receive the client request, if a different provider is provided', () => {
      // arrange
      const callback = vi.fn();
      const privateKeyCredential = VIP030026PrivateKeyCredential.generate();
      const _credential = VIP030026PublicKeyCredential.fromJSON({
        algorithm: privateKeyCredential.algorithm(),
        id: privateKeyCredential.id(),
        publicKey: privateKeyCredential.publicKey(),
      });

      provider.onEnable(callback);

      // act
      client.enable({
        credential: _credential.toString(),
      });

      // assert
      expect(callback.mock.calls.length).toBe(0);
    });

    it('should receive the client request', () =>
      new Promise<void>((done) => {
        provider.onEnable(({ method }) => {
          expect(method).toBe(VIP030027MethodEnum.Enable);

          done();

          return {
            credential: credential.toString(),
            result: {
              accounts: [],
              genesisHash,
              genesisId,
            },
            signature,
          };
        });

        client.enable({
          credential: credential.toString(),
        });
      }));
  });

  describe(`${AVMWebProvider.name}#onPostTransactions`, () => {
    it('should not receive the client request, if a different provider is provided', () => {
      // arrange
      const callback = vi.fn();
      const privateKeyCredential = VIP030026PrivateKeyCredential.generate();
      const _credential = VIP030026PublicKeyCredential.fromJSON({
        algorithm: privateKeyCredential.algorithm(),
        id: privateKeyCredential.id(),
        publicKey: privateKeyCredential.publicKey(),
      });
      const stxns = ['gqNzaWfEQ...'];

      provider.onPostTransactions(callback);

      // act
      client.postTransactions({
        credential: _credential.toString(),
        params: {
          stxns,
        },
      });

      // assert
      expect(callback.mock.calls.length).toBe(0);
    });

    it('should receive the client request', () =>
      new Promise<void>((done) => {
        // arrange
        const stxns = ['gqNzaWfEQ...'];

        // assert
        provider.onPostTransactions(({ method, params }) => {
          expect(method).toBe(VIP030027MethodEnum.PostTransactions);
          expect(params).toBeDefined();
          expect(params?.stxns).toEqual(stxns);

          done();

          return {
            credential: credential.toString(),
            result: {
              txnIDs: [],
            },
            signature,
          };
        });

        // act
        client.postTransactions({
          credential: credential.toString(),
          params: {
            stxns,
          },
        });
      }));
  });

  describe(`${AVMWebProvider.name}#onSignAndPostTransactions`, () => {
    it('should not receive the client request, if a different provider id is provided', () => {
      // arrange
      const callback = vi.fn();
      const privateKeyCredential = VIP030026PrivateKeyCredential.generate();
      const _credential = VIP030026PublicKeyCredential.fromJSON({
        algorithm: privateKeyCredential.algorithm(),
        id: privateKeyCredential.id(),
        publicKey: privateKeyCredential.publicKey(),
      });
      const txns: IARC0001Transaction[] = [
        {
          txn: encodeBase64(randomBytes(32)),
        },
        {
          txn: encodeBase64(randomBytes(32)),
          signers: [],
        },
      ];

      provider.onSignAndPostTransactions(callback);

      // act
      client.signAndPostTransactions({
        credential: _credential.toString(),
        params: {
          txns,
        },
      });

      // assert
      expect(callback.mock.calls.length).toBe(0);
    });

    it('should receive the client request', () =>
      new Promise<void>((done) => {
        // arrange
        const txns: IARC0001Transaction[] = [
          {
            txn: encodeBase64(randomBytes(32)),
          },
          {
            txn: encodeBase64(randomBytes(32)),
            signers: [],
          },
        ];

        // assert
        provider.onSignAndPostTransactions(({ method, params }) => {
          expect(method).toBe(VIP030027MethodEnum.SignAndPostTransactions);
          expect(params).toBeDefined();
          expect(params?.txns).toEqual(txns);

          done();

          return {
            credential: credential.toString(),
            result: {
              txnIDs: [],
            },
            signature,
          };
        });

        // act
        client.signAndPostTransactions({
          credential: credential.toString(),
          params: {
            txns,
          },
        });
      }));
  });

  describe(`${AVMWebProvider.name}#onSignMessage`, () => {
    it('should receive the client request', () => {
      // arrange
      const callback = vi.fn();
      const privateKeyCredential = VIP030026PrivateKeyCredential.generate();
      const _credential = VIP030026PublicKeyCredential.fromJSON({
        algorithm: privateKeyCredential.algorithm(),
        id: privateKeyCredential.id(),
        publicKey: privateKeyCredential.publicKey(),
      });

      provider.onSignMessage(callback);

      // act
      client.signMessage({
        credential: _credential.toString(),
        params: {
          message: 'Hello humie!',
          signer,
        },
      });

      // assert
      expect(callback.mock.calls.length).toBe(0);
    });

    it('should receive the client request', () =>
      new Promise<void>((done) => {
        // arrange
        const params: ISignMessageParams = {
          message: 'Hello humie!',
          signer,
        };

        // assert
        provider.onSignMessage(({ method, params }) => {
          expect(method).toBe(VIP030027MethodEnum.SignMessage);
          expect(params).toBeDefined();
          expect(params).toEqual(params);

          done();

          return {
            credential: credential.toString(),
            result: {
              signature: 'gqNzaWfEQ...',
              signer,
            },
            signature,
          };
        });

        // act
        client.signMessage({
          credential: credential.toString(),
          params,
        });
      }));
  });

  describe(`${AVMWebProvider.name}#onSignTransactions`, () => {
    it('should not receive the client request, if a different provider is provided', () => {
      // arrange
      const callback = vi.fn();
      const privateKeyCredential = VIP030026PrivateKeyCredential.generate();
      const _credential = VIP030026PublicKeyCredential.fromJSON({
        algorithm: privateKeyCredential.algorithm(),
        id: privateKeyCredential.id(),
        publicKey: privateKeyCredential.publicKey(),
      });
      const txns: IARC0001Transaction[] = [
        {
          txn: encodeBase64(randomBytes(32)),
        },
        {
          txn: encodeBase64(randomBytes(32)),
          signers: [],
        },
      ];

      provider.onSignTransactions(callback);

      // act
      client.signTransactions({
        credential: _credential.toString(),
        params: {
          txns,
        },
      });

      // assert
      expect(callback.mock.calls.length).toBe(0);
    });

    it('should receive the client request', () =>
      new Promise<void>((done) => {
        // arrange
        const txns: IARC0001Transaction[] = [
          {
            txn: encodeBase64(randomBytes(32)),
          },
          {
            txn: encodeBase64(randomBytes(32)),
            signers: [],
          },
        ];

        // assert
        provider.onSignTransactions(({ method, params }) => {
          expect(method).toBe(VIP030027MethodEnum.SignTransactions);
          expect(params).toBeDefined();
          expect(params?.txns).toEqual(txns);

          done();

          return {
            credential: credential.toString(),
            result: {
              stxns: ['gqNzaWfEQ...', null],
            },
            signature,
          };
        });

        // act
        client.signTransactions({
          credential: credential.toString(),
          params: {
            txns,
          },
        });
      }));
  });
});
