// messages
import { RequestMessageWithCredential } from '@/messages';

// types
import type { TParams } from '@/types';

type TProviderCustomEventListener<Params = TParams> = (
  event: CustomEvent<RequestMessageWithCredential<Params>>
) => Promise<void> | void;

export default TProviderCustomEventListener;
