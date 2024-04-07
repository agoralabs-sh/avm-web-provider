// types
import type IDiscoverParams from './IDiscoverParams';
import type IEnableParams from './IEnableParams';
import type IPostTransactionsParams from './IPostTransactionsParams';

type TRequestParams = IDiscoverParams | IEnableParams | IPostTransactionsParams;

export default TRequestParams;
