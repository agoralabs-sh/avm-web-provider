import { VIP030026PublicKeyCredential } from '@agoralabs-sh/vip030026';

// types
import type IBaseConfig from './IBaseConfig';

/**
 * @property {VIP030026PublicKeyCredential} credential - An initialized public key credential object that conforms to
 * the VIP-03-0026 standard.
 */
interface IAVMWebProviderConfig extends IBaseConfig {
  credential: VIP030026PublicKeyCredential;
}

export default IAVMWebProviderConfig;
