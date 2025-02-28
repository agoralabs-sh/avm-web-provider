// enums
import { VIP030027MethodEnum } from '@/enums';

// types
import type IRequestMessage from './IRequestMessage';

/**
 * @property {VIP030027MethodEnum.Discover} method - The VIP-03-0027 discover methods do not need a challenge and a
 * credential.
 */
interface IDiscoverRequestMessage extends IRequestMessage<undefined> {
  method: VIP030027MethodEnum.Discover;
}

export default IDiscoverRequestMessage;
