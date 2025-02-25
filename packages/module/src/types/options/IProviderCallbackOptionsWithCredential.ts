// types
import type { TParams } from '@/types';
import type IProviderCallbackOptions from './IProviderCallbackOptions';

interface IProviderCallbackOptionsWithCredential<Params = TParams> extends IProviderCallbackOptions<Params> {
  challenge: string;
  vcic: string;
}

export default IProviderCallbackOptionsWithCredential;
