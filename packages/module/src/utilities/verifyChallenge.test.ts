import { encode as encodeBae64 } from '@stablelib/base64';
import { randomBytes } from '@stablelib/random';
import { describe, expect, test } from 'vitest';

// types
import { IPrivateKeyCredential } from '@/types';

// utils
import createCredential from './createCredential';
import signChallenge from './signChallenge';
import verifyChallenge from './verifyChallenge';

interface ITestParams {
  credential: IPrivateKeyCredential;
  description: string;
}

describe('verifyChallenge', () => {
  const challenge = encodeBae64(randomBytes(32));

  test.each<ITestParams>([
    {
      credential: createCredential({
        algorithm: 'ECDSA',
        curve: 'secp256k1',
      }),
      description: 'ecdsa algorithm with a secp256k1 curve',
    },
    {
      credential: createCredential({
        algorithm: 'ECDSA',
        curve: 'p256',
      }),
      description: 'ecdsa algorithm with a p256 curve',
    },
    {
      credential: createCredential({
        algorithm: 'ECDSA',
        curve: 'p384',
      }),
      description: 'ecdsa algorithm with a p384 curve',
    },
    {
      credential: createCredential({
        algorithm: 'ECDSA',
        curve: 'p521',
      }),
      description: 'ecdsa algorithm with a p521 curve',
    },
    {
      credential: createCredential({
        algorithm: 'Ed25519',
      }),
      description: 'ed25519 algorithm',
    },
  ])('should fail to verify a $description if the challenge is different', ({ credential }) => {
    const { privateKey, ...publicKeyCredential } = credential;
    const signature = signChallenge({
      challenge,
      credential: {
        ...publicKeyCredential,
        privateKey,
      },
    });
    const result = verifyChallenge({
      challenge: encodeBae64(randomBytes(32)), // different challenge
      credential: publicKeyCredential,
      signature,
    });

    expect(result).toBe(false);
  });

  test.each<ITestParams>([
    {
      credential: createCredential({
        algorithm: 'ECDSA',
        curve: 'secp256k1',
      }),
      description: 'ecdsa algorithm with a secp256k1 curve',
    },
    {
      credential: createCredential({
        algorithm: 'ECDSA',
        curve: 'p256',
      }),
      description: 'ecdsa algorithm with a p256 curve',
    },
    {
      credential: createCredential({
        algorithm: 'ECDSA',
        curve: 'p384',
      }),
      description: 'ecdsa algorithm with a p384 curve',
    },
    {
      credential: createCredential({
        algorithm: 'ECDSA',
        curve: 'p521',
      }),
      description: 'ecdsa algorithm with a p521 curve',
    },
    {
      credential: createCredential({
        algorithm: 'Ed25519',
      }),
      description: 'ed25519 algorithm',
    },
  ])('should fail to verify a $description if the credentials are different', ({ credential }) => {
    const _credential = createCredential();
    const signature = signChallenge({
      challenge,
      credential: _credential,
    });
    const result = verifyChallenge({
      challenge,
      credential: {
        algorithm: credential.algorithm,
        name: credential.name,
        publicKey: credential.publicKey,
      },
      signature,
    });

    expect(result).toBe(false);
  });

  test.each<ITestParams>([
    {
      credential: createCredential({
        algorithm: 'ECDSA',
        curve: 'secp256k1',
      }),
      description: 'ecdsa algorithm with a secp256k1 curve',
    },
    {
      credential: createCredential({
        algorithm: 'ECDSA',
        curve: 'p256',
      }),
      description: 'ecdsa algorithm with a p256 curve',
    },
    {
      credential: createCredential({
        algorithm: 'ECDSA',
        curve: 'p384',
      }),
      description: 'ecdsa algorithm with a p384 curve',
    },
    {
      credential: createCredential({
        algorithm: 'ECDSA',
        curve: 'p521',
      }),
      description: 'ecdsa algorithm with a p521 curve',
    },
    {
      credential: createCredential({
        algorithm: 'Ed25519',
      }),
      description: 'ed25519 algorithm',
    },
  ])('should successfully verify a $description', ({ credential }) => {
    const { privateKey, ...publicKeyCredential } = credential;
    const signature = signChallenge({
      challenge,
      credential: {
        ...publicKeyCredential,
        privateKey,
      },
    });
    const result = verifyChallenge({
      challenge,
      credential: publicKeyCredential,
      signature,
    });

    expect(result).toBe(true);
  });
});
