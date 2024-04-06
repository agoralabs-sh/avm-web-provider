# Errors

## Summary

| Code | Name                                                                      | Summary                                                                                   |
|------|---------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| 4000 | [`UnknownError`](#unknownerror)                                           | The default error response, usually indicates something is not quite right.               |
| 4001 | [`MethodCanceledError`](#operationcancelederror)                          | When a user has rejected the method.                                                      |
| 4003 | [`MethodNotSupportedError`](#methodnotsupportederror)                     | The specified provider does not exist.                                                    |
| 4004 | [`NetworkNotSupportedError`](#networknotsupportederror)                   | Networks not supported.                                                                   |
| 4100 | [`UnauthorizedSignerError`](#unauthorizedsignererror)                     | The provider has not given permission to use a specified signer.                          |
| 4200 | [`InvalidInputError`](#invalidinputerror)                                 | The input for signing transactions is malformed.                                          |
| 4201 | [`InvalidGroupIdError`](#invalidgroupiderror)                             | The computed group ID of the atomic transactions is different from the assigned group ID. |
| 4300 | [`FailedToPostSomeTransactionsError`](#failedtopostsometransactionserror) | When some transactions were not sent properly.                                            |

## `UnknownError`

This error is the default error and serves as the "catch all" error. This usually occurs when something has happened that is outside the bounds of graceful handling. You can check the `UnknownError.message` string for more information.

#### Properties

| Name    | Type     | Value | Description                      |
|---------|----------|-------|----------------------------------|
| code    | `number` | 4000  | A canonical code for this error. |
| message | `string` | -     | A human readable message.        |

## `MethodCanceledError`

This error is thrown when a user has rejected or canceled the requested action on the wallet. For example, the user decides to cancel the signing of a transaction.

#### Properties

| Name    | Type     | Value | Description                                   |
|---------|----------|-------|-----------------------------------------------|
| code    | `number` | 4001  | A canonical code for this error.              |
| message | `string` | -     | A human readable message.                     |
| method  | `string` | -     | The name of the method that is not supported. |

## `MethodNotSupportedError`

This can be thrown by most [`AVMWebClient`](avm-web-client.mdx#methods) methods and indicates that the provider does not support the requested method.

#### Properties

| Name    | Type     | Value | Description                                   |
|---------|----------|-------|-----------------------------------------------|
| code    | `number` | 4003  | A canonical code for this error.              |
| id      | `string` | -     | The ID of the provider.                       |
| message | `string` | -     | A human readable message.                     |
| method  | `string` | -     | The name of the method that is not supported. |

## `NetworkNotSupportedError`

This error is thrown when a provided genesis hash is not supported by the wallet.

#### Properties

| Name          | Type       | Value | Description                                                |
|---------------|------------|-------|------------------------------------------------------------|
| code          | `number`   | 4004  | A canonical code for this error.                           |
| genesisHashes | `string[]` | -     | The genesis hashes of the networks that are not supported. |
| message       | `string`   | -     | A human readable message.                                  |

## `UnauthorizedSignerError`

This error is thrown when a provided account has been specified, but the provider has not given permission to use that account as a signer.

#### Properties

| Name    | Type     | Value | Description                                                    |
|---------|----------|-------|----------------------------------------------------------------|
| code    | `number` | 4100  | A canonical code for this error.                               |
| message | `string` | -     | A human readable message.                                      |
| signer  | `string` | -     | The address (public key) of the signer that is not authorized. |

## `InvalidInputError`

This error is thrown when the provider attempts to sign transaction(s) but the input is malformed.

#### Properties

| Name            | Type     | Value | Description                                          |
|-----------------|----------|-------|------------------------------------------------------|
| code            | `number` | 4200  | A canonical code for this error.                     |
| message         | `string` | -     | A human readable message.                            |

## `InvalidGroupIdError`

This error is thrown when the wallet attempts to sign atomic transactions in which the computed group ID is different from the assigned group ID.

#### Properties

| Name            | Type     | Value | Description                                          |
|-----------------|----------|-------|------------------------------------------------------|
| code            | `number` | 4201  | A canonical code for this error.                     |
| computedGroupId | `string` | -     | The computed ID of the supplied atomic transactions. |
| message         | `string` | -     | A human readable message.                            |

## `FailedToPostSomeTransactionsError`

This error is thrown when some transactions failed to be posted to the network.

#### Properties

| Name          | Type                                 | Value | Description                                                                                                                                                                           |
|---------------|--------------------------------------|-------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| code          | `number`                             | 4300  | A canonical code for this error.                                                                                                                                                      |
| message       | `string`                             | -     | A human readable message.                                                                                                                                                             |
| successTxnIDs | <code>(string  &#124; null)[]</code> | -     | This will correspond to the `stxns` list sent in `postTxns` and will contain the ID of those transactions that were successfully committed to the blockchain, or null if they failed. |
