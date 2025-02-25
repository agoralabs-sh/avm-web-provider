import { concat } from '@agoralabs-sh/bytes';
import { ed25519 } from '@noble/curves/ed25519';
import { sha256 } from '@noble/hashes/sha2';
import { encode as encodeUTF8 } from '@stablelib/utf8';
import { randomBytes } from 'node:crypto';
import { describe, expect, test } from 'vitest';

// enums
import { ARC0060ErrorTypeEnum, ARC0060ScopeEnum } from '@/enums';

// errors
import { BaseARC0060Error } from '@/errors';

// utils
import signTypedData from './signTypedData';
import verifyTypedData from './verifyTypedData';

describe('verifyTypedData', () => {
  const domain = 'avm-web-provider.agoralabs.sh';
  const authenticationData = sha256(encodeUTF8(domain));
  const data = encodeUTF8(
    JSON.stringify({
      hello: 'humie!',
    })
  );
  const privateKey = ed25519.utils.randomPrivateKey();

  test('should fail if the scope is not supported', () => {
    try {
      verifyTypedData({
        authenticationData,
        data,
        publicKey: ed25519.getPublicKey(privateKey),
        scope: ARC0060ScopeEnum.UNKNOWN,
        signature: randomBytes(64),
      });
    } catch (error) {
      expect((error as BaseARC0060Error).type).toBe(ARC0060ErrorTypeEnum.InvalidScopeError);

      return;
    }

    throw new Error('expected failed domain auth error to be thrown');
  });

  describe('AUTH scope', () => {
    test('should return false if the public key is not the correct signer', () => {
      const _privateKey = ed25519.utils.randomPrivateKey();
      const signature = signTypedData({
        authenticationData,
        data,
        domain,
        privateKey,
        scope: ARC0060ScopeEnum.AUTH,
      });
      const result = verifyTypedData({
        authenticationData,
        data,
        publicKey: ed25519.getPublicKey(_privateKey), // get he public key of a different key pair
        scope: ARC0060ScopeEnum.AUTH,
        signature,
      });

      expect(result).toBe(false);
    });

    test('should return false if the data is not the correct data used in the signing', () => {
      const signature = signTypedData({
        authenticationData,
        data,
        domain,
        privateKey,
        scope: ARC0060ScopeEnum.AUTH,
      });
      const result = verifyTypedData({
        authenticationData,
        data: encodeUTF8(
          JSON.stringify({
            goodbye: 'humie!',
          })
        ),
        publicKey: ed25519.getPublicKey(privateKey),
        scope: ARC0060ScopeEnum.AUTH,
        signature,
      });

      expect(result).toBe(false);
    });

    test('should return false if the authentication data is not the correct data used in the signing', () => {
      const signature = signTypedData({
        authenticationData,
        data,
        domain,
        privateKey,
        scope: ARC0060ScopeEnum.AUTH,
      });
      const result = verifyTypedData({
        authenticationData: concat(sha256(encodeUTF8(domain)), randomBytes(12)),
        data,
        publicKey: ed25519.getPublicKey(privateKey),
        scope: ARC0060ScopeEnum.AUTH,
        signature,
      });

      expect(result).toBe(false);
    });

    test('should return true if the signature is correct', () => {
      const signature = signTypedData({
        authenticationData,
        data,
        domain,
        privateKey,
        scope: ARC0060ScopeEnum.AUTH,
      });
      const result = verifyTypedData({
        authenticationData,
        data,
        publicKey: ed25519.getPublicKey(privateKey),
        scope: ARC0060ScopeEnum.AUTH,
        signature,
      });

      expect(result).toBe(true);
    });
  });
});
