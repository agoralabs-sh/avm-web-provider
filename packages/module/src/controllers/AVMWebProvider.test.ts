// @vitest-environment jsdom
import { randomBytes } from 'crypto';
import { encode as encodeBase64 } from '@stablelib/base64';
import { encode as encodeUTF8 } from '@stablelib/utf8';
import { uuid } from '@stablelib/uuid';
import { afterEach, describe, expect, it, vi } from 'vitest';

// controllers
import AVMWebClient from './AVMWebClient';
import AVMWebProvider from './AVMWebProvider';

// enums
import { ARC0027MethodEnum } from '@app/enums';

// types
import type { IARC0001Transaction, IAuthenticateParams, IAVMWebProviderConfig, ISignMessageParams } from '@app/types';

describe(AVMWebProvider.name, () => {
  const genesisHash = encodeBase64(randomBytes(32));
  const genesisId = 'localhost-v1';
  const name = 'Awesome Wallet';
  const providerId = '02657eaf-be17-4efc-b0a4-19d654b2448e';
  const signer = 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U';
  let client: AVMWebClient;
  let provider: AVMWebProvider;

  afterEach(() => {
    provider?.removeAllListeners();
  });

  describe(`${AVMWebProvider.name}#authenticate`, () => {
    it('should not receive the client request, if a different provider id is provided', () => {
      // arrange
      const callback = vi.fn();
      const params: IAuthenticateParams = {
        authenticationData: encodeBase64(encodeUTF8('awesome-dapp.sh')),
        data: encodeBase64(encodeUTF8('authenticate message')),
        providerId: uuid(), // call random provider
        signer,
      };

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onAuthenticate(callback);

      // act
      client.authenticate(params);

      // assert
      expect(callback.mock.calls.length).toBe(0);
    });

    it('should receive the client request', () =>
      new Promise<void>((done) => {
        // arrange
        const params: IAuthenticateParams = {
          authenticationData: encodeBase64(encodeUTF8('awesome-dapp.sh')),
          data: encodeBase64(encodeUTF8('authenticate message')),
          providerId,
          signer,
        };

        provider = AVMWebProvider.init(providerId);
        client = AVMWebClient.init();

        // assert
        provider.onAuthenticate(({ method, params }) => {
          expect(method).toBe(ARC0027MethodEnum.Authenticate);
          expect(params).toBeDefined();
          expect(params).toEqual(params);

          done();

          return {
            providerId,
            signature: 'gqNzaWfEQ...',
            signer,
          };
        });

        // act
        client.authenticate(params);
      }));
  });

  describe(`${AVMWebProvider.name}#init`, () => {
    it('should initialize the wallet with default options', () => {
      // arrange
      let config: IAVMWebProviderConfig;

      // act
      provider = AVMWebProvider.init(providerId);

      // assert
      config = provider.getConfig();

      expect(config.debug).toBe(false);
    });

    it('should initialize the provider with the specified options', () => {
      // arrange
      const debug = true;
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

  describe(`${AVMWebProvider.name}#onDisable`, () => {
    it('should not receive the client request, if a different provider id is provided', () => {
      // arrange
      const callback = vi.fn();

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onDisable(callback);

      // act
      client.disable({
        providerId: uuid(), // call random provider
      });

      // assert
      expect(callback.mock.calls.length).toBe(0);
    });

    it('should receive the client request, if the matching provider id is provided', () =>
      new Promise<void>((done) => {
        // arrange
        provider = AVMWebProvider.init(providerId);
        client = AVMWebClient.init();

        // assert
        provider.onDisable(({ method }) => {
          expect(method).toBe(ARC0027MethodEnum.Disable);

          done();

          return {
            genesisHash,
            genesisId,
            providerId,
          };
        });

        // act
        client.disable({
          providerId,
        });
      }));

    it('should receive the client request, if no provider id is provided', () =>
      new Promise<void>((done) => {
        // arrange
        provider = AVMWebProvider.init(providerId);
        client = AVMWebClient.init();

        // assert
        provider.onDisable(({ method }) => {
          expect(method).toBe(ARC0027MethodEnum.Disable);

          done();

          return {
            genesisHash,
            genesisId,
            providerId,
          };
        });

        // act
        client.disable();
      }));
  });

  describe(`${AVMWebProvider.name}#onDiscover`, () => {
    it('should receive the client request', () =>
      new Promise<void>((done) => {
        // arrange
        provider = AVMWebProvider.init(providerId);
        client = AVMWebClient.init();

        // assert
        provider.onDiscover(({ method }) => {
          expect(method).toBe(ARC0027MethodEnum.Discover);

          done();

          return {
            name,
            networks: [],
            providerId,
          };
        });

        // act
        client.discover();
      }));
  });

  describe(`${AVMWebProvider.name}#onEnable`, () => {
    it('should not receive the client request, if a different provider id is provided', () => {
      // arrange
      const callback = vi.fn();

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onEnable(callback);

      // act
      client.enable({
        providerId: uuid(), // call random provider
      });

      // assert
      expect(callback.mock.calls.length).toBe(0);
    });

    it('should receive the client request, if the matching provider id is provided', () =>
      new Promise<void>((done) => {
        // arrange
        provider = AVMWebProvider.init(providerId);
        client = AVMWebClient.init();

        // assert
        provider.onEnable(({ method }) => {
          expect(method).toBe(ARC0027MethodEnum.Enable);

          done();

          return {
            accounts: [],
            genesisHash,
            genesisId,
            providerId,
          };
        });

        // act
        client.enable({
          providerId,
        });
      }));

    it('should receive the client request', () =>
      new Promise<void>((done) => {
        // arrange
        provider = AVMWebProvider.init(providerId);
        client = AVMWebClient.init();

        // assert
        provider.onEnable(({ method }) => {
          expect(method).toBe(ARC0027MethodEnum.Enable);

          done();

          return {
            accounts: [],
            genesisHash,
            genesisId,
            providerId,
          };
        });

        // act
        client.enable();
      }));
  });

  describe(`${AVMWebProvider.name}#onPostTransactions`, () => {
    it('should not receive the client request, if a different provider id is provided', () => {
      // arrange
      const callback = vi.fn();
      const stxns = ['gqNzaWfEQ...'];

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onPostTransactions(callback);

      // act
      client.postTransactions({
        providerId: uuid(), // call random provider
        stxns,
      });

      // assert
      expect(callback.mock.calls.length).toBe(0);
    });

    it('should receive the client request', () =>
      new Promise<void>((done) => {
        // arrange
        const stxns = ['gqNzaWfEQ...'];

        provider = AVMWebProvider.init(providerId);
        client = AVMWebClient.init();

        // assert
        provider.onPostTransactions(({ method, params }) => {
          expect(method).toBe(ARC0027MethodEnum.PostTransactions);
          expect(params).toBeDefined();
          expect(params?.providerId).toBe(providerId);
          expect(params?.stxns).toEqual(stxns);

          done();

          return {
            providerId,
            txnIDs: [],
          };
        });

        // act
        client.postTransactions({
          providerId,
          stxns,
        });
      }));
  });

  describe(`${AVMWebProvider.name}#onSignAndPostTransactions`, () => {
    it('should not receive the client request, if a different provider id is provided', () => {
      // arrange
      const callback = vi.fn();
      const txns: IARC0001Transaction[] = [
        {
          txn: encodeBase64(randomBytes(32)),
        },
        {
          txn: encodeBase64(randomBytes(32)),
          signers: [],
        },
      ];

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onSignAndPostTransactions(callback);

      // act
      client.signAndPostTransactions({
        providerId: uuid(), // call random provider
        txns,
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

        provider = AVMWebProvider.init(providerId);
        client = AVMWebClient.init();

        // assert
        provider.onSignAndPostTransactions(({ method, params }) => {
          expect(method).toBe(ARC0027MethodEnum.SignAndPostTransactions);
          expect(params).toBeDefined();
          expect(params?.providerId).toBe(providerId);
          expect(params?.txns).toEqual(txns);

          done();

          return {
            providerId,
            txnIDs: [],
          };
        });

        // act
        client.signAndPostTransactions({
          providerId,
          txns,
        });
      }));
  });

  describe(`${AVMWebProvider.name}#onSignMessage`, () => {
    it('should receive the client request', () => {
      // arrange
      const callback = vi.fn();
      const params: ISignMessageParams = {
        message: 'Hello humie!',
        providerId: uuid(), // call random provider
        signer,
      };

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onSignMessage(callback);

      // act
      client.signMessage(params);

      // assert
      expect(callback.mock.calls.length).toBe(0);
    });

    it('should receive the client request', () =>
      new Promise<void>((done) => {
        // arrange
        const params: ISignMessageParams = {
          message: 'Hello humie!',
          providerId,
          signer,
        };

        provider = AVMWebProvider.init(providerId);
        client = AVMWebClient.init();

        // assert
        provider.onSignMessage(({ method, params }) => {
          expect(method).toBe(ARC0027MethodEnum.SignMessage);
          expect(params).toBeDefined();
          expect(params).toEqual(params);

          done();

          return {
            providerId,
            signature: 'gqNzaWfEQ...',
            signer,
          };
        });

        // act
        client.signMessage(params);
      }));
  });

  describe(`${AVMWebProvider.name}#onSignTransactions`, () => {
    it('should not receive the client request, if a different provider id is provided', () => {
      // arrange
      const callback = vi.fn();
      const txns: IARC0001Transaction[] = [
        {
          txn: encodeBase64(randomBytes(32)),
        },
        {
          txn: encodeBase64(randomBytes(32)),
          signers: [],
        },
      ];

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onSignTransactions(callback);

      // act
      client.signTransactions({
        providerId: uuid(), // call random provider
        txns,
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

        provider = AVMWebProvider.init(providerId);
        client = AVMWebClient.init();

        // assert
        provider.onSignTransactions(({ method, params }) => {
          expect(method).toBe(ARC0027MethodEnum.SignTransactions);
          expect(params).toBeDefined();
          expect(params?.providerId).toBe(providerId);
          expect(params?.txns).toEqual(txns);

          done();

          return {
            providerId,
            stxns: ['gqNzaWfEQ...', null],
          };
        });

        // act
        client.signTransactions({
          providerId,
          txns,
        });
      }));
  });
});
