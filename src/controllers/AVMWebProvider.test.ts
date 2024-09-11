import { randomBytes } from 'crypto';
import { v4 as uuid } from 'uuid';

// controllers
import AVMWebClient from './AVMWebClient';
import AVMWebProvider from './AVMWebProvider';

// enums
import { ARC0027MethodEnum } from '@app/enums';

// types
import type {
  IARC0001Transaction,
  IAVMWebProviderConfig,
  ISignMessageParams,
} from '@app/types';

describe(AVMWebProvider.name, () => {
  const providerId = '02657eaf-be17-4efc-b0a4-19d654b2448e';
  let client: AVMWebClient;
  let provider: AVMWebProvider;

  afterEach(() => {
    provider?.removeAllListeners();
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

  describe(`${AVMWebProvider.name}#onDisable`, () => {
    it('should not receive the client request, if a different provider id is provided', () => {
      // arrange
      const callback = jest.fn();

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

    it('should receive the client request, if the matching provider id is provided', (done) => {
      // arrange
      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      // assert
      provider.onDisable(({ method }) => {
        expect(method).toBe(ARC0027MethodEnum.Disable);

        return done();
      });

      // act
      client.disable({
        providerId,
      });
    });

    it('should receive the client request, if no provider id is provided', (done) => {
      // arrange
      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      // assert
      provider.onDisable(({ method }) => {
        expect(method).toBe(ARC0027MethodEnum.Disable);

        return done();
      });

      // act
      client.disable();
    });
  });

  describe(`${AVMWebProvider.name}#onDiscover`, () => {
    it('should receive the client request', (done) => {
      // arrange
      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      // assert
      provider.onDiscover(({ method }) => {
        expect(method).toBe(ARC0027MethodEnum.Discover);

        return done();
      });

      // act
      client.discover();
    });
  });

  describe(`${AVMWebProvider.name}#onEnable`, () => {
    it('should not receive the client request, if a different provider id is provided', () => {
      // arrange
      const callback = jest.fn();

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

    it('should receive the client request, if the matching provider id is provided', (done) => {
      // arrange
      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      // assert
      provider.onEnable(({ method }) => {
        expect(method).toBe(ARC0027MethodEnum.Enable);

        return done();
      });

      // act
      client.enable({
        providerId,
      });
    });

    it('should receive the client request', (done) => {
      // arrange
      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      // assert
      provider.onEnable(({ method }) => {
        expect(method).toBe(ARC0027MethodEnum.Enable);

        return done();
      });

      // act
      client.enable();
    });
  });

  describe(`${AVMWebProvider.name}#onPostTransactions`, () => {
    it('should not receive the client request, if a different provider id is provided', () => {
      // arrange
      const callback = jest.fn();
      const stxns: string[] = ['gqNzaWfEQ...'];

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

    it('should receive the client request', (done) => {
      // arrange
      const stxns: string[] = ['gqNzaWfEQ...'];

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      // assert
      provider.onPostTransactions(({ method, params }) => {
        expect(method).toBe(ARC0027MethodEnum.PostTransactions);
        expect(params).toBeDefined();
        expect(params?.providerId).toBe(providerId);
        expect(params?.stxns).toEqual(stxns);

        return done();
      });

      // act
      client.postTransactions({
        providerId,
        stxns,
      });
    });
  });

  describe(`${AVMWebProvider.name}#onSignAndPostTransactions`, () => {
    it('should not receive the client request, if a different provider id is provided', () => {
      // arrange
      const callback = jest.fn();
      const txns: IARC0001Transaction[] = [
        {
          txn: randomBytes(32).toString('base64'),
        },
        {
          txn: randomBytes(32).toString('base64'),
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

    it('should receive the client request', (done) => {
      // arrange
      const txns: IARC0001Transaction[] = [
        {
          txn: randomBytes(32).toString('base64'),
        },
        {
          txn: randomBytes(32).toString('base64'),
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

        return done();
      });

      // act
      client.signAndPostTransactions({
        providerId,
        txns,
      });
    });
  });

  describe(`${AVMWebProvider.name}#onSignMessage`, () => {
    it('should receive the client request', () => {
      // arrange
      const callback = jest.fn();
      const params: ISignMessageParams = {
        message: 'Hello humie!',
        providerId: uuid(), // call random provider
        signer: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',
      };

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      provider.onSignMessage(callback);

      // act
      client.signMessage(params);

      // assert
      expect(callback.mock.calls.length).toBe(0);
    });

    it('should receive the client request', (done) => {
      // arrange
      const params: ISignMessageParams = {
        message: 'Hello humie!',
        providerId,
        signer: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',
      };

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      // assert
      provider.onSignMessage(({ method, params }) => {
        expect(method).toBe(ARC0027MethodEnum.SignMessage);
        expect(params).toBeDefined();
        expect(params).toEqual(params);

        return done();
      });

      // act
      client.signMessage(params);
    });
  });

  describe(`${AVMWebProvider.name}#onSignTransactions`, () => {
    it('should not receive the client request, if a different provider id is provided', () => {
      // arrange
      const callback = jest.fn();
      const txns: IARC0001Transaction[] = [
        {
          txn: randomBytes(32).toString('base64'),
        },
        {
          txn: randomBytes(32).toString('base64'),
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

    it('should receive the client request', (done) => {
      // arrange
      const txns: IARC0001Transaction[] = [
        {
          txn: randomBytes(32).toString('base64'),
        },
        {
          txn: randomBytes(32).toString('base64'),
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

        return done();
      });

      // act
      client.signTransactions({
        providerId,
        txns,
      });
    });
  });
});
