import { ed25519 } from '@noble/curves/ed25519';
import { p256 } from '@noble/curves/p256';
import { p384 } from '@noble/curves/p384';
import { p521 } from '@noble/curves/p521';
import { secp256k1 } from '@noble/curves/secp256k1';
import { sha256, sha384, sha512 } from '@noble/hashes/sha2';
import { decode as decodeBase64, encode as encodeBase64 } from '@stablelib/base64';

// types
import type { ISignChallengeOptions } from '@/types';

/**
 * Convenience function that signs a hash of the challenge, using the provided credentials.
 * @param {ISignChallengeOptions} - The challenge to sign and the credential to dictate the signing method.
 * @returns {string} The base64 encoded signature.
 */
export default function signChallenge({ challenge, credential }: ISignChallengeOptions): string {
  const decodedChallenge = decodeBase64(challenge);
  const decodedPrivateKey = decodeBase64(credential.privateKey);
  let signature: Uint8Array | null = null;
  let challengeHash: Uint8Array | null = null;

  if (credential.algorithm.name === 'ECDSA') {
    switch (credential.algorithm.hash) {
      case 'sha256':
        challengeHash = sha256(decodedChallenge);
        break;
      case 'sha384':
        challengeHash = sha384(decodedChallenge);
        break;
      case 'sha512':
        challengeHash = sha512(decodedChallenge);
        break;
      default:
        throw new Error(`unsupported hashing function "${credential.algorithm.hash}"`);
    }

    switch (credential.algorithm.curve) {
      case 'p256':
        signature = p256.sign(challengeHash, decodedPrivateKey).toCompactRawBytes();
        break;
      case 'p384':
        signature = p384.sign(challengeHash, decodedPrivateKey).toCompactRawBytes();
        break;
      case 'p521':
        signature = p521.sign(challengeHash, decodedPrivateKey).toCompactRawBytes();
        break;
      case 'secp256k1':
        signature = secp256k1.sign(challengeHash, decodedPrivateKey).toCompactRawBytes();
        break;
      default:
        throw new Error(`unsupported ecdsa algorithm curve "${credential.algorithm.curve}"`);
    }
  }

  if (credential.algorithm.name === 'Ed25519') {
    signature = ed25519.sign(decodedChallenge, decodedPrivateKey);
  }

  if (!signature) {
    throw new Error(`unknown algorithm "${credential.algorithm.name}"`);
  }

  return encodeBase64(signature);
}
