// enums
import { ARC0027MethodEnum } from '@app/enums';

// types
import type TRequestParams from './TRequestParams';

interface SendRequestMessageOptions<Params = TRequestParams> {
  method: ARC0027MethodEnum;
  params?: Params;
}

export default SendRequestMessageOptions;
