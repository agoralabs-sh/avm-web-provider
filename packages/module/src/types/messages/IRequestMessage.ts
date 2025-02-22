// types
import type { TParams } from '@/types';

/**
 * @property {string} id - A UUID v4 unique identifier for the request.
 * @property {TParams} params - The params for the request.
 * @property {string} reference - The ARC-0027 request reference.
 */
interface IRequestMessage<Params = TParams> {
  id: string;
  params: Params;
  reference: string;
}

export default IRequestMessage;
