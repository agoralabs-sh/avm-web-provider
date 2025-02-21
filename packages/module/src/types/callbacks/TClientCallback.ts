// types
import type { TClientCallbackOptions, TResults } from '@/types';

type TClientCallback<Result = TResults> = (options: TClientCallbackOptions<Result>) => void | Promise<void>;

export default TClientCallback;
