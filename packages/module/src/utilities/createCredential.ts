import { ed25519 } from '@noble/curves/ed25519';
import { p256 } from '@noble/curves/p256';
import { p384 } from '@noble/curves/p384';
import { p521 } from '@noble/curves/p521';
import { secp256k1 } from '@noble/curves/secp256k1';
import { encode as encodeBase64 } from '@stablelib/base64';

// types
import type { ICreateCredentialOptions, IPrivateKeyCredential } from '@/types';

/**
 * Creates a private key credential. This can be used by providers as a convenient way to create credentials.
 * **NOTE:** If no options are specified, the algorithm defaults to the Ed25519.
 * @param {ICreateCredentialOptions} options - [optional] The algorithm and/or curves and hash to be used.
 * @returns {IPrivateKeyCredential} The credential.
 */
export default function createCredential(options?: ICreateCredentialOptions): IPrivateKeyCredential {
  let privateKey: Uint8Array;
  let publicKey: Uint8Array;

  switch (options?.algorithm) {
    case 'ECDSA':
      switch (options.curve) {
        case 'p256':
          privateKey = p256.utils.randomPrivateKey();
          publicKey = p256.getPublicKey(privateKey);
          break;
        case 'p384':
          privateKey = p384.utils.randomPrivateKey();
          publicKey = p384.getPublicKey(privateKey);
          break;
        case 'p521':
          privateKey = p521.utils.randomPrivateKey();
          publicKey = p521.getPublicKey(privateKey);
          break;
        case 'secp256k1':
        default:
          privateKey = secp256k1.utils.randomPrivateKey();
          publicKey = secp256k1.getPublicKey(privateKey);
          break;
      }

      return {
        algorithm: {
          curve: options.curve || 'secp256k1',
          hash: options.hash || 'sha256',
          name: 'ECDSA',
        },
        privateKey: encodeBase64(privateKey),
        publicKey: encodeBase64(publicKey),
      };
    case 'Ed25519':
    default:
      privateKey = ed25519.utils.randomPrivateKey();

      return {
        algorithm: {
          name: 'Ed25519',
        },
        privateKey: encodeBase64(privateKey),
        publicKey: encodeBase64(ed25519.getPublicKey(privateKey)),
      };
  }
}
