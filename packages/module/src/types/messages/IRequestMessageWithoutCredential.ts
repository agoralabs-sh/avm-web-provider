// types
import type { TMethodsWithoutCredentialRequired, TParams } from '@/types';
import type IRequestMessage from './IRequestMessage';

/**
 * @property {ARC0027MethodEnum.Discover} method -The ARC-0027 discover methods do not need a challenge and a
 * credential.
 */
interface IRequestMessageWithoutCredential<Params = TParams> extends IRequestMessage<Params> {
  method: TMethodsWithoutCredentialRequired;
}

export default IRequestMessageWithoutCredential;
