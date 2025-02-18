import { concat } from '@stablelib/bytes';
import { hash as sha256 } from '@stablelib/sha256';
import { sign } from 'tweetnacl';

// enums
import { ARC0060ScopeEnum } from '@app/enums';

// errors
import { ARC0060InvalidScopeError } from '@app/errors';

// types
import type { IVerifyTypedDataOptions } from '@app/types';

/**
 * Verifies some signed typed data.
 * @param {IVerifyTypedDataOptions} options - The authentication data, the data,
 * the public key of the signer and the scope.
 * @returns {boolean} True if the signature is signed by the supplied public
 * key, false otherwise.
 * @throws {ARC0060InvalidScopeError} If the supplied scope is not supported.
 * @see {@link https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0060.md}.
 */
export default function verifyTypedData({
  authenticationData,
  data,
  publicKey,
  scope,
  signature,
}: IVerifyTypedDataOptions): boolean {
  let signed: Uint8Array;

  switch (scope) {
    case ARC0060ScopeEnum.AUTH:
      signed = concat(sha256(data), sha256(authenticationData));

      return sign.detached.verify(signed, signature, publicKey);
    default:
      throw new ARC0060InvalidScopeError({
        message: 'invalid scope',
        scope,
      });
  }
}
