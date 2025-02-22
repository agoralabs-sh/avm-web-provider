// types
import type TClientCustomEventListener from './TClientCustomEventListener';
import type TProviderCustomEventListener from './TProviderCustomEventListener';

// messages
import { DiscoverRequestMessage } from '@/messages';

interface IListenerItem {
  listener:
    | TClientCustomEventListener
    | TProviderCustomEventListener
    | ((event: CustomEvent<DiscoverRequestMessage>) => Promise<void> | void);
  reference: string;
}

export default IListenerItem;
