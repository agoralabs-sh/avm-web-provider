import { decode as decodeBase64, encode as encodeBae64 } from '@stablelib/base64';
import { randomBytes } from '@stablelib/random';
import { describe, expect, test } from 'vitest';

// utils
import createCredential from './createCredential';
import signChallenge from './signChallenge';

describe('signChallenge', () => {
  const challenge = encodeBae64(randomBytes(32));

  describe('when using a ecdsa algorithm', () => {
    test('it should verify using a ecdsa algorithm with a secp256k1 curve', () => {
      const credential = createCredential({
        algorithm: 'ECDSA',
        curve: 'secp256k1',
      });
      const signature = signChallenge({
        challenge,
        credential,
      });

      expect(decodeBase64(signature).byteLength).toBe(64);
    });

    test('it should verify using a ecdsa algorithm with a p256 curve', () => {
      const credential = createCredential({
        algorithm: 'ECDSA',
        curve: 'p256',
      });
      const signature = signChallenge({
        challenge,
        credential,
      });

      expect(decodeBase64(signature).byteLength).toBe(64);
    });

    test('it should verify using a ecdsa algorithm with a p384 curve', () => {
      const credential = createCredential({
        algorithm: 'ECDSA',
        curve: 'p384',
      });
      const signature = signChallenge({
        challenge,
        credential,
      });

      expect(decodeBase64(signature).byteLength).toBe(96);
    });

    test('it should verify using a ecdsa algorithm with a p521 curve', () => {
      const credential = createCredential({
        algorithm: 'ECDSA',
        curve: 'p521',
      });
      const signature = signChallenge({
        challenge,
        credential,
      });

      expect(decodeBase64(signature).byteLength).toBe(132);
    });
  });

  test('it should sign using a ed25519 algorithm', () => {
    const credential = createCredential({
      algorithm: 'Ed25519',
    });
    const signature = signChallenge({
      challenge,
      credential,
    });

    expect(decodeBase64(signature).byteLength).toBe(64);
  });
});
