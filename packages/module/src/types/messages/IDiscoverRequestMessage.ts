// enums
import { ARC0027MethodEnum } from '@/enums';

// types
import type IRequestMessage from './IRequestMessage';

/**
 * @property {ARC0027MethodEnum.Discover} method - The ARC-0027 discover methods do not need a challenge and a
 * credential.
 */
interface IDiscoverRequestMessage extends IRequestMessage<undefined> {
  method: ARC0027MethodEnum.Discover;
}

export default IDiscoverRequestMessage;
