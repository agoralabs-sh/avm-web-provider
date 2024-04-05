// constants
import { ARC0027_PREFIX } from '@app/constants';

// enums
import { ARC0027MessageTypeEnum, ARC0027MethodEnum } from '@app/enums';

/**
 * Convenience function that constructs a message reference as outlined in
 * ARC-0027.
 * @param {ARC0027MethodEnum} method - the method of the message.
 * @param {ARC0027MessageTypeEnum} type - the type of message; `request` or
 * `response`.
 * @returns {string} the message reference as defined in the ARC-0027 spec.
 */
export default function createMessageReference(
  method: ARC0027MethodEnum,
  type: ARC0027MessageTypeEnum
): string {
  return `${ARC0027_PREFIX}:${method}:${type}`;
}
