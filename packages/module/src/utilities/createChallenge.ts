import { encode as encodeBase64 } from '@stablelib/base64';
import { randomBytes } from '@stablelib/random';

/**
 * Creates a base64 encoded 32-byte challenge.
 * @returns {string} A base 64 encoded 32-byte challenge.
 */
export default function createChallenge(): string {
  return encodeBase64(randomBytes(32));
}
