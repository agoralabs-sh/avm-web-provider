// types
import type TClientCustomEventListener from './TClientCustomEventListener';
import type TProviderCustomEventListener from './TProviderCustomEventListener';

interface IListenerItem {
  listener: TClientCustomEventListener | TProviderCustomEventListener;
  reference: string;
}

export default IListenerItem;
