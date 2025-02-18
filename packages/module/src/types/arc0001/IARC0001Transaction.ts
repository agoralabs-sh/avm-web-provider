import type { MultisigMetadata } from 'algosdk';

/**
 * @property {string} authAddr - [optional] the auth address if the sender has rekeyed.
 * @property {MultisigMetadata} msig - [optional] extra metadata needed when sending multisig transactions See {@link https://algorand.github.io/js-algorand-sdk/interfaces/MultisigMetadata.html algosdk.MultisigMetadata}.
 * @property {string[]} signers - [optional] a list of addresses to sign with (defaults to the sender in the transaction).
 * @property {string} stxn - [optional] if this is part of a group of transactions, some of which are already signed
 * you must also provide these signed transactions and the signers array MUST be undefined or empty, as per
 * {@link https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0001.md#semantic-of-wallettransaction ARC-0001}.
 * @property {string} txn - a base64 encoded string of an unsigned transaction binary.
 */
interface IARC0001Transaction {
  authAddr?: string;
  msig?: MultisigMetadata;
  signers?: string[];
  stxn?: string;
  txn: string;
}

export default IARC0001Transaction;
