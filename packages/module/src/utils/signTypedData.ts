import { concat } from '@stablelib/bytes';
import { hash as sha256 } from '@stablelib/sha256';
import { encode as encodeUTF8 } from '@stablelib/utf8';
import { sign } from 'tweetnacl';
import { generateAccount, secretKeyToMnemonic, seedFromMnemonic } from 'algosdk';
seedFromMnemonic(secretKeyToMnemonic(generateAccount().sk));
// enums
import { ARC0060ScopeEnum } from '@app/enums';

// errors
import { ARC0060FailedDomainAuthError, ARC0060InvalidScopeError } from '@app/errors';

// types
import type { ISignTypedDataOptions } from '@app/types';

// utils
import isUint8ArrayEqual from './isUint8ArrayEqual';

/**
 * Signs some typed data using the ARC-0060 standard.
 * @param {ISignTypedDataOptions} options - The authentication data, the data,
 * the domain, the private key of the signer and the scope.
 * @returns {Uint8Array} The signature of the signed data based on the scope.
 * @throws {ARC0060InvalidScopeError} If the supplied scope is not supported.
 * @throws {ARC0060FailedDomainAuthError} If the domain hash is not the first 32
 * bytes of the authenticationData.
 * @see {@link https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0060.md}.
 */
export default function signTypedData({
  authenticationData,
  data,
  domain,
  privateKey,
  scope,
}: ISignTypedDataOptions): Uint8Array {
  const domainHash = sha256(encodeUTF8(domain));
  const keyPair = sign.keyPair.fromSeed(privateKey);
  let toSign: Uint8Array;

  switch (scope) {
    case ARC0060ScopeEnum.AUTH:
      // check that the first 32 bytes of authenticatorData are the same as the sha256 hash of the domain
      if (!isUint8ArrayEqual(authenticationData.slice(0, 32), domainHash)) {
        throw new ARC0060FailedDomainAuthError({
          message: 'supplied domain is not part of the authenticationData',
        });
      }

      toSign = concat(sha256(data), sha256(authenticationData));

      return sign.detached(toSign, keyPair.secretKey);
    default:
      throw new ARC0060InvalidScopeError({
        message: 'invalid scope',
        scope,
      });
  }
}
