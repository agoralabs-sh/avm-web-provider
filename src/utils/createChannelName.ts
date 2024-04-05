// constants
import { ARC0027_PREFIX, CHANNEL_NAME_SUFFIX } from '@app/constants';

/**
 * Convenience function that simply constructs the name of the channel:
 * `arc0027:channel`
 * @returns {string} the channel name used by the BroadcastChannel API.
 */
export default function createChannelName(): string {
  return `${ARC0027_PREFIX}:${CHANNEL_NAME_SUFFIX}`;
}
