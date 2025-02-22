// enums
import { ARC0027MethodEnum } from '@/enums';

type TMethodsWithCredentialRequired =
  | ARC0027MethodEnum.Authenticate
  | ARC0027MethodEnum.Enable
  | ARC0027MethodEnum.Disable
  | ARC0027MethodEnum.PostTransactions
  | ARC0027MethodEnum.SignAndPostTransactions
  | ARC0027MethodEnum.SignMessage
  | ARC0027MethodEnum.SignTransactions;

export default TMethodsWithCredentialRequired;
