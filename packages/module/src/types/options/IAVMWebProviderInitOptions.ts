// types
import type IBaseInitOptions from './IBaseInitOptions';

/**
 * @property {string} credential - A base 64 encoded public key credential that conforms to the VIP-03-0026 standard.
 */
interface IAVMWebProviderInitOptions extends IBaseInitOptions {
  credential: string;
}

export default IAVMWebProviderInitOptions;
