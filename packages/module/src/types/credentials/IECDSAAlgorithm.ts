interface IECDSAAlgorithm {
  name: 'ecdsa';
  digest: 'sha256' | 'sha384' | 'sha512';
}

export default IECDSAAlgorithm;
