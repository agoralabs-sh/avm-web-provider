// messages
import {
  ResponseMessageWithError,
  ResponseMessageWithResult,
} from '@app/messages';

// types
import type TResponseResults from './TResponseResults';

type TClientCustomEventListener<Result = TResponseResults> = (
  event: CustomEvent<
    ResponseMessageWithError | ResponseMessageWithResult<Result>
  >
) => Promise<void> | void;

export default TClientCustomEventListener;
