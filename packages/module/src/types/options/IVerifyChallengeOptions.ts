// types
import type { ICredential } from '@/types';

interface IVerifyChallengeOptions {
  challenge: string;
  credential: ICredential;
  signature: string;
}

export default IVerifyChallengeOptions;
