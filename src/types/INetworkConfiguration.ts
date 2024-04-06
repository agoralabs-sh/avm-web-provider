// enums
import { ARC0027MethodEnum } from '@app/enums';

interface INetworkConfiguration {
  genesisHash: string;
  genesisId: string;
  methods: ARC0027MethodEnum[];
}

export default INetworkConfiguration;
