// types
import type TSupportedECDSACurves from './TSupportedECDSACurves';
import type TSupportedHashes from './TSupportedHashes';

interface IECDSAAlgorithm {
  curve: TSupportedECDSACurves;
  hash: TSupportedHashes;
  name: 'ECDSA';
}

export default IECDSAAlgorithm;
