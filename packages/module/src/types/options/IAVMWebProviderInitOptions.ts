// types
import type IBaseInitOptions from './IBaseInitOptions';

/**
 * @property {string} vcic - A base 64 encoded public key credential that conforms to the VIP-03-0026 standard.
 */
interface IAVMWebProviderInitOptions extends IBaseInitOptions {
  vcic: string;
}

export default IAVMWebProviderInitOptions;
