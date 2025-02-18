import { concat } from '@stablelib/bytes';
import { hash as sha256 } from '@stablelib/sha256';
import { encode as encodeUTF8 } from '@stablelib/utf8';
import { randomBytes } from 'node:crypto';
import { sign } from 'tweetnacl';
import { describe, expect, test } from 'vitest';

// enums
import { ARC0060ErrorTypeEnum, ARC0060ScopeEnum } from '@app/enums';

// errors
import { BaseARC0060Error } from '@app/errors';

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
  const keyPair = sign.keyPair();

  test('should fail if the scope is not supported', () => {
    try {
      verifyTypedData({
        authenticationData,
        data,
        publicKey: keyPair.publicKey,
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
      const _keyPair = sign.keyPair();
      const signature = signTypedData({
        authenticationData,
        data,
        domain,
        privateKey: keyPair.secretKey.slice(0, sign.seedLength),
        scope: ARC0060ScopeEnum.AUTH,
      });
      const result = verifyTypedData({
        authenticationData,
        data,
        publicKey: _keyPair.publicKey,
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
        privateKey: keyPair.secretKey.slice(0, sign.seedLength),
        scope: ARC0060ScopeEnum.AUTH,
      });
      const result = verifyTypedData({
        authenticationData,
        data: encodeUTF8(
          JSON.stringify({
            goodbye: 'humie!',
          })
        ),
        publicKey: keyPair.publicKey,
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
        privateKey: keyPair.secretKey.slice(0, sign.seedLength),
        scope: ARC0060ScopeEnum.AUTH,
      });
      const result = verifyTypedData({
        authenticationData: concat(sha256(encodeUTF8(domain)), randomBytes(12)),
        data,
        publicKey: keyPair.publicKey,
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
        privateKey: keyPair.secretKey.slice(0, sign.seedLength),
        scope: ARC0060ScopeEnum.AUTH,
      });
      const result = verifyTypedData({
        authenticationData,
        data,
        publicKey: keyPair.publicKey,
        scope: ARC0060ScopeEnum.AUTH,
        signature,
      });

      expect(result).toBe(true);
    });
  });
});
