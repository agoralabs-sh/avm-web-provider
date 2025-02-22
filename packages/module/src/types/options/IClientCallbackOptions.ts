// enums
import { ARC0027MethodEnum } from '@/enums';

interface IClientCallbackOptions {
  id: string;
  method: ARC0027MethodEnum;
  requestID: string;
}

export default IClientCallbackOptions;
