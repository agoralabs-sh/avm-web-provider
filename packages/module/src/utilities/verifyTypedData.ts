import { concat } from '@agoralabs-sh/bytes';
import { ed25519 } from '@noble/curves/ed25519';
import { sha256 } from '@noble/hashes/sha2';

// enums
import { ARC0060ScopeEnum } from '@/enums';

// errors
import { ARC0060InvalidScopeError } from '@/errors';

// types
import type { IVerifyTypedDataOptions } from '@/types';

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

      return ed25519.verify(signature, signed, publicKey);
    default:
      throw new ARC0060InvalidScopeError({
        message: 'invalid scope',
        scope,
      });
  }
}
