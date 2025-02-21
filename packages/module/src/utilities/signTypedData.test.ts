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

describe('signTypedData', () => {
  const domain = 'avm-web-provider.agoralabs.sh';
  const authenticationData = sha256(encodeUTF8(domain));
  const data = encodeUTF8(
    JSON.stringify({
      hello: 'humie!',
    })
  );
  const privateKey = sign.keyPair().secretKey.slice(0, sign.seedLength);

  test('should fail if the scope is not supported', () => {
    try {
      signTypedData({
        authenticationData,
        data,
        domain,
        privateKey,
        scope: ARC0060ScopeEnum.UNKNOWN,
      });
    } catch (error) {
      expect((error as BaseARC0060Error).type).toBe(ARC0060ErrorTypeEnum.InvalidScopeError);

      return;
    }

    throw new Error('expected failed domain auth error to be thrown');
  });

  describe('AUTH scope', () => {
    test('should fail if the authentication data does not contain the domain hash', () => {
      try {
        signTypedData({
          authenticationData: randomBytes(32),
          data,
          domain,
          privateKey,
          scope: ARC0060ScopeEnum.AUTH,
        });
      } catch (error) {
        expect((error as BaseARC0060Error).type).toBe(ARC0060ErrorTypeEnum.FailedDomainAuthError);

        return;
      }

      throw new Error('expected failed domain auth error to be thrown');
    });
  });
});
