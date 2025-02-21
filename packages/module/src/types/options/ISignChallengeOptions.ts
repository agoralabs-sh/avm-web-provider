// types
import type { IPrivateKeyCredential } from '@/types';

interface ISignChallengeOptions {
  challenge: string;
  credential: IPrivateKeyCredential;
}

export default ISignChallengeOptions;
