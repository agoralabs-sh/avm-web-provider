import { decode as decodeBase64 } from '@stablelib/base64';
import { describe, expect, test } from 'vitest';

// types
import type { IECDSAAlgorithm } from '@/types';

// utils
import createCredential from './createCredential';

describe('createCredential', () => {
  test('should default to the ed25519 algorithm if no algorithm is specified', () => {
    const credential = createCredential();

    expect(credential.algorithm.name).toBe('Ed25519');
    expect(decodeBase64(credential.publicKey).byteLength).toBe(32);
    expect(decodeBase64(credential.privateKey).byteLength).toBe(32);
  });

  describe('when creating credentials using the ecdsa algorithm', () => {
    test('it should create the default ecdsa algorithm', () => {
      const credential = createCredential({
        algorithm: 'ECDSA',
      });

      expect(credential.algorithm.name).toBe('ECDSA');
      expect((credential.algorithm as IECDSAAlgorithm).curve).toBe('secp256k1');
      expect((credential.algorithm as IECDSAAlgorithm).hash).toBe('sha256');
      expect(decodeBase64(credential.publicKey).byteLength).toBe(33);
      expect(decodeBase64(credential.privateKey).byteLength).toBe(32);
    });

    test('it should create the ecdsa algorithm with specified curves and hashes', () => {
      const credential = createCredential({
        algorithm: 'ECDSA',
        curve: 'p256',
        hash: 'sha512',
      });

      expect(credential.algorithm.name).toBe('ECDSA');
      expect((credential.algorithm as IECDSAAlgorithm).curve).toBe('p256');
      expect((credential.algorithm as IECDSAAlgorithm).hash).toBe('sha512');
      expect(decodeBase64(credential.publicKey).byteLength).toBe(33);
      expect(decodeBase64(credential.privateKey).byteLength).toBe(32);
    });
  });

  describe('when creating credentials using the ed25519 algorithm', () => {
    test('it should create a credential using ed25519 algorithm', () => {
      const credential = createCredential({
        algorithm: 'Ed25519',
      });

      expect(credential.algorithm.name).toBe('Ed25519');
      expect(decodeBase64(credential.publicKey).byteLength).toBe(32);
      expect(decodeBase64(credential.privateKey).byteLength).toBe(32);
    });
  });
});
