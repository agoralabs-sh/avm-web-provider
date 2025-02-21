import { ed25519 } from '@noble/curves/ed25519';
import { p256 } from '@noble/curves/p256';
import { p384 } from '@noble/curves/p384';
import { p521 } from '@noble/curves/p521';
import { secp256k1 } from '@noble/curves/secp256k1';
import { sha256, sha384, sha512 } from '@noble/hashes/sha2';
import { decode as decodeBase64 } from '@stablelib/base64';

// types
import type { IVerifyChallengeOptions } from '@/types';

/**
 * Convenience function that verifies the provided challenge against the public key and the signature.
 * @param {IVerifyChallengeOptions} options - The challenge, the credentials and the signature.
 * @returns {boolean} True if the signature can be verified, false otherwise.
 */
export default function verifyChallenge({ challenge, credential, signature }: IVerifyChallengeOptions): boolean {
  const decodedChallenge = decodeBase64(challenge);
  const decodedPublicKey = decodeBase64(credential.publicKey);
  const decodedSignature = decodeBase64(signature);
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
        return p256.verify(decodedSignature, challengeHash, decodedPublicKey);
      case 'p384':
        return p384.verify(decodedSignature, challengeHash, decodedPublicKey);
      case 'p521':
        return p521.verify(decodedSignature, challengeHash, decodedPublicKey);
      case 'secp256k1':
        return secp256k1.verify(decodedSignature, challengeHash, decodedPublicKey);
      default:
        throw new Error(`unknown ecdsa algorithm curve "${credential.algorithm.curve}"`);
    }
  }

  if (credential.algorithm.name === 'Ed25519') {
    return ed25519.verify(decodedSignature, decodedChallenge, decodedPublicKey);
  }

  throw new Error('unknown algorithm:', credential.algorithm);
}
