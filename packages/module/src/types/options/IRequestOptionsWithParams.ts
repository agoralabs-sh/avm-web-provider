// types
import type { TParams } from '@/types';
import type IRequestOptions from './IRequestOptions';

interface IRequestOptionsWithParams<Params = TParams> extends IRequestOptions {
  params: Params;
}

export default IRequestOptionsWithParams;
