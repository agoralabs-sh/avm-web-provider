// controllers
import AVMWebClient from './AVMWebClient';
import AVMWebProvider from './AVMWebProvider';

// types
import { IAVMWebProviderConfig, IPostTransactionsParams } from '@app/types';

describe(AVMWebProvider.name, () => {
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
    it('should receive the client request', (done) => {
      // arrange
      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      // assert
      provider.onDisable(done);

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
      provider.onDiscover(done);

      // act
      client.discover();
    });
  });

  describe(`${AVMWebProvider.name}#onEnable`, () => {
    it('should receive the client request', (done) => {
      // arrange
      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      // assert
      provider.onEnable(done);

      // act
      client.enable();
    });
  });

  describe(`${AVMWebProvider.name}#onPostTransactions`, () => {
    it('should receive the client request', (done) => {
      // arrange
      const stxns: string[] = ['gqNzaWfEQ...'];

      provider = AVMWebProvider.init(providerId);
      client = AVMWebClient.init();

      // assert
      provider.onPostTransactions((params: IPostTransactionsParams) => {
        expect(params.providerId).toBe(providerId);
        expect(params.stxns).toEqual(stxns);

        return done();
      });

      // act
      client.postTransactions({
        providerId,
        stxns,
      });
    });
  });
});
