// types
import type { TSupportedECDSACurves, TSupportedHashes } from '@/types';

type TCreateCredentialOptions =
  | {
      algorithm: 'ECDSA';
      curve?: TSupportedECDSACurves;
      hash?: TSupportedHashes;
    }
  | {
      algorithm: 'Ed25519';
    };

export default TCreateCredentialOptions;
