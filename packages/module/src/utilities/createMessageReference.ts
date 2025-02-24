// constants
import { ARC0027_PREFIX } from '@/constants';

// enums
import { VIP030027MessageTypeEnum, VIP030027MethodEnum } from '@/enums';

/**
 * Convenience function that constructs a message reference as outlined in
 * ARC-0027.
 * @param {VIP030027MethodEnum} method - the method of the message.
 * @param {VIP030027MessageTypeEnum} type - the type of message; `request` or
 * `response`.
 * @returns {string} the message reference as defined in the ARC-0027 spec.
 */
export default function createMessageReference(method: VIP030027MethodEnum, type: VIP030027MessageTypeEnum): string {
  return `${ARC0027_PREFIX}:${method}:${type}`;
}
