// types
import type { TParams } from '@/types';
import type IProviderCallbackOptions from './IProviderCallbackOptions';

interface IProviderCallbackWithCredentialOptions<Params = TParams> extends IProviderCallbackOptions<Params> {
  challenge: string;
  credential: string;
}

export default IProviderCallbackWithCredentialOptions;
