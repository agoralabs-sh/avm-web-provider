"use strict";(self.webpackChunk_agoralabs_sh_avm_web_provider=self.webpackChunk_agoralabs_sh_avm_web_provider||[]).push([[56],{5304:function(n,a,e){e.r(a),e.d(a,{assets:function(){return g},contentTitle:function(){return d},default:function(){return h},frontMatter:function(){return c},metadata:function(){return l},toc:function(){return u}});var t=e(7624),s=e(4552),r=e(3500),o=e(6568),i=e(6200);const c={},d="Signing Transactions",l={id:"clients/signing-transactions",title:"Signing Transactions",description:"<TOCInline",source:"@site/docs/clients/signing-transactions.mdx",sourceDirName:"clients",slug:"/clients/signing-transactions",permalink:"/clients/signing-transactions",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Disabling A Client",permalink:"/clients/disabling-a-client"},next:{title:"Posting Transactions",permalink:"/clients/posting-transactions"}},g={},u=[{value:"Overview",id:"overview",level:2},{value:"Signing a single transaction",id:"signing-a-single-transaction",level:2},{value:"Signing atomic transactions",id:"signing-atomic-transactions",level:2},{value:"Non-provider signed transactions",id:"non-provider-signed-transactions",level:2},{value:"Signing transactions with multisig accounts",id:"signing-transactions-with-multisig-accounts",level:2},{value:"Signing transactions with re-keyed accounts",id:"signing-transactions-with-re-keyed-accounts",level:2}];function m(n){const a={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,s.M)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.h1,{id:"signing-transactions",children:"Signing Transactions"}),"\n",(0,t.jsx)(i.c,{maxHeadingLevel:4,toc:u}),"\n",(0,t.jsx)(a.h2,{id:"overview",children:"Overview"}),"\n",(0,t.jsx)(a.p,{children:"Providers, if supported, can sign single, atomic or multiple transactions. If the provider also supports it, the provider can also sign transactions using multisigs and re-keyed accounts."}),"\n",(0,t.jsx)(a.h2,{id:"signing-a-single-transaction",children:"Signing a single transaction"}),"\n",(0,t.jsx)(a.p,{children:"Regardless of whether you are sending multiple transactions or a single transaction, an array of base64 encoded transactions will need to be sent."}),"\n",(0,t.jsxs)(r.c,{defaultValue:"javascript",values:[{label:"Javascript",value:"javascript"},{label:"TypeScript",value:"typescript"}],children:[(0,t.jsx)(o.c,{value:"javascript",children:(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-js",children:"const algosdk = require('algosdk');\n\ntry {\n  const client = new algosdk.Algodv2(\n    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',\n    'http://localhost',\n    '4001',\n  );\n  const encoder = new TextEncoder();\n  const suggestedParams = await client.getTransactionParams().do();\n  const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({\n    amount: algosdk.algosToMicroalgos(1),\n    from: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n    note: encoder.encode('Hello Human!'),\n    suggestedParams,\n    to: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n  });\n  const transactionBytes = transaction.toByte();\n} catch (error) {\n  // handle error\n}\n\n// initialized client\nclient.onSignTransactions(({ error, result }) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    stxns: [\n      'gqNzaWfEQ...',\n    ],\n  }\n  */\n});\n\n// send a sign transactions request\nclient.signTransactions({\n  providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  txns: [\n    {\n      txn: btoa(String.fromCodePoint(...transactionBytes)), // convert to base64 string\n    },\n  ],\n});\n"})})}),(0,t.jsx)(o.c,{value:"typescript",children:(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-typescript",children:"import {\n  Algodv2,\n  algosToMicroalgos,\n  makePaymentTxnWithSuggestedParamsFromObject,\n  SuggestedParams,\n  Transaction,\n} from 'algosdk';\nimport { IAVMWebClientListenerOptions } from '@agoralabs-sh/avm-web-provider';\n\n// create a transaction\ntry {\n  const client: Algodv2 = new Algodv2(\n    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',\n    'http://localhost',\n    '4001',\n  );\n  const encoder: TextEncoder = new TextEncoder();\n  const suggestedParams: SuggestedParams = await client.getTransactionParams().do();\n  const transaction: Transaction = makePaymentTxnWithSuggestedParamsFromObject({\n    amount: algosToMicroalgos(1),\n    from: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n    note: encoder.encode('Hello Human!'),\n    suggestedParams,\n    to: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n  });\n  const transactionBytes: Uint8Array = transaction.toByte();\n} catch (error) {\n  // handle error\n}\n\n// initialized client\nclient.onSignTransactions(({ error, result }: IAVMWebClientListenerOptions) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    stxns: [\n      'gqNzaWfEQ...',\n    ],\n  }\n  */\n});\n\n// send a sign transactions request\nclient.signTransactions({\n  providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  txns: [\n    {\n      txn: btoa(String.fromCodePoint(...transactionBytes)), // convert to base64 string\n    },\n  ],\n});\n"})})})]}),"\n",(0,t.jsx)(a.admonition,{type:"caution",children:(0,t.jsxs)(a.p,{children:["If this method is not supported, then a ",(0,t.jsx)(a.a,{href:"../../api-reference/errors#methodnotsupportederror",children:(0,t.jsx)(a.code,{children:"MethodNotSupportedError"})})," should be thrown."]})}),"\n",(0,t.jsx)(a.h2,{id:"signing-atomic-transactions",children:"Signing atomic transactions"}),"\n",(0,t.jsx)(a.p,{children:"When sending atomic transactions, all transactions, regardless of whether the wallet is signing only some of the transactions, must be sent with a matching group ID."}),"\n",(0,t.jsxs)(r.c,{defaultValue:"javascript",values:[{label:"Javascript",value:"javascript"},{label:"TypeScript",value:"typescript"}],children:[(0,t.jsx)(o.c,{value:"javascript",children:(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-js",children:"const algosdk = require('algosdk');\n\ntry {\n  const client = new algosdk.Algodv2(\n  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',\n  'http://localhost',\n  '4001',\n  );\n  const encoder = new TextEncoder();\n  const suggestedParams = await client.getTransactionParams().do();\n  const firstTransaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({\n    amount: algosdk.algosToMicroalgos(1),\n    from: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n    note: encoder.encode('I am the first transaction, human!'),\n    suggestedParams,\n    to: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n  });\n  const secondTransaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({\n    amount: algosdk.algosToMicroalgos(2),\n    from: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n    note: encoder.encode('I am the second transaction, human!'),\n    suggestedParams,\n    to: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n  });\n  let firstTransactionBytes;\n  let secondTransactionBytes;\n\n  // assign a group id\n  algosdk.assignGroupID([firstTransaction, secondTransaction]);\n\n  firstTransactionBytes = firstTransaction.toByte();\n  secondTransactionBytes = secondTransaction.toByte();\n} catch (error) {\n  // handle error\n}\n\n// initialized client\nclient.onSignTransactions(({ error, result }) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    stxns: [\n      'gqNzaWfEQ...',\n      'gqNzaWfEQ...',\n    ],\n  }\n  */\n});\n\n// send a sign transactions request\nclient.signTransactions({\n  providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  txns: [\n    {\n      txn: btoa(String.fromCodePoint(...firstTransactionBytes)), // convert to base64 string\n    },\n    {\n      txn: btoa(String.fromCodePoint(...secondTransactionBytes)),\n    },\n  ],\n});\n"})})}),(0,t.jsx)(o.c,{value:"typescript",children:(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-typescript",children:"import {\n  Algodv2,\n  algosToMicroalgos,\n  assignGroupID,\n  makePaymentTxnWithSuggestedParamsFromObject,\n  SuggestedParams,\n  Transaction,\n} from 'algosdk';\nimport { IAVMWebClientListenerOptions } from '@agoralabs-sh/avm-web-provider';\n\n// create a transaction\ntry {\n  const client: Algodv2 = new Algodv2(\n  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',\n  'http://localhost',\n  '4001',\n  );\n  const encoder: TextEncoder = new TextEncoder();\n  const suggestedParams: SuggestedParams = await client.getTransactionParams().do();\n  const firstTransaction: Transaction = makePaymentTxnWithSuggestedParamsFromObject({\n    amount: algosToMicroalgos(1),\n    from: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n    note: encoder.encode('I am the first transaction, human!'),\n    suggestedParams,\n    to: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n  });\n  const secondTransaction: Transaction = makePaymentTxnWithSuggestedParamsFromObject({\n    amount: algosToMicroalgos(2),\n    from: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n    note: encoder.encode('I am the second transaction, human!'),\n    suggestedParams,\n    to: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n  });\n  let firstTransactionBytes: Uint8Array;\n  let secondTransactionBytes: Uint8Array;\n\n  // assign a group id\n  assignGroupID([firstTransaction, secondTransaction]);\n\n  firstTransactionBytes = firstTransaction.toByte();\n  secondTransactionBytes = secondTransaction.toByte();\n} catch (error) {\n  // handle error\n}\n\n// initialized client\nclient.onSignTransactions(({ error, result }: IAVMWebClientListenerOptions) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    stxns: [\n      'gqNzaWfEQ...',\n      'gqNzaWfEQ...',\n    ],\n  }\n  */\n});\n\n// send a sign transactions request\nclient.signTransactions({\n  providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  txns: [\n    {\n      txn: btoa(String.fromCodePoint(...firstTransactionBytes)), // convert to base64 string\n    },\n    {\n      txn: btoa(String.fromCodePoint(...secondTransactionBytes)),\n    },\n  ],\n});\n"})})})]}),"\n",(0,t.jsx)(a.admonition,{type:"caution",children:(0,t.jsxs)(a.p,{children:["The provider may attempt to compute ID of these atomic transactions and if it doesn't match the assigned ID, then a ",(0,t.jsx)(a.a,{href:"../../api-reference/errors#invalidgroupiderror",children:(0,t.jsx)(a.code,{children:"InvalidGroupIdError"})})," may be thrown."]})}),"\n",(0,t.jsx)(a.h2,{id:"non-provider-signed-transactions",children:"Non-provider signed transactions"}),"\n",(0,t.jsxs)(a.p,{children:["In the case of a provider being sent multiple transactions, but only needing to sign a subset of the transactions, an empty ",(0,t.jsx)(a.code,{children:"signers"})," array must be used. This instructs the provider to skip the transaction even if it can sign it."]}),"\n",(0,t.jsx)(a.p,{children:"For example:"}),"\n",(0,t.jsxs)(r.c,{defaultValue:"javascript",values:[{label:"Javascript",value:"javascript"},{label:"TypeScript",value:"typescript"}],children:[(0,t.jsx)(o.c,{value:"javascript",children:(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-js",children:"const algosdk = require('algosdk');\n\ntry {\n  const client = new algosdk.Algodv2(\n    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',\n    'http://localhost',\n    '4001',\n  );\n  const encoder = new TextEncoder();\n  const suggestedParams = await client.getTransactionParams().do();\n  const firstTransaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({\n    amount: algosdk.algosToMicroalgos(1),\n    from: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n    note: encoder.encode('I am the first transaction, human!'),\n    suggestedParams,\n    to: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n  });\n  const secondTransaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({\n    amount: algosdk.algosToMicroalgos(2),\n    from: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n    note: encoder.encode('I am the second transaction, human!'),\n    suggestedParams,\n    to: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n  });\n  const firstTransactionBytes = firstTransaction.toByte();\n  const secondTransactionBytes = secondTransaction.toByte();\n} catch (error) {\n  // handle error\n}\n\n// initialized client\nclient.onSignTransactions(({ error, result }) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    stxns: [\n      'gqNzaWfEQ...',\n      null,\n    ],\n  }\n  */\n});\n\n// send a sign transactions request\nclient.signTransactions({\n  providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  txns: [\n    {\n      txn: btoa(String.fromCodePoint(...firstTransactionBytes)), // convert to base64 string\n    },\n    {\n      txn: btoa(String.fromCodePoint(...secondTransactionBytes)),\n      signers: [], // use an empty signers array to skip this transaction\n    },\n  ],\n});\n"})})}),(0,t.jsx)(o.c,{value:"typescript",children:(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-typescript",children:"import {\n  Algodv2,\n  algosToMicroalgos,\n  makePaymentTxnWithSuggestedParamsFromObject,\n  SuggestedParams,\n  Transaction,\n} from 'algosdk';\nimport { IAVMWebClientListenerOptions } from '@agoralabs-sh/avm-web-provider';\n\n// create a transaction\ntry {\n  const client: Algodv2 = new Algodv2(\n    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',\n    'http://localhost',\n    '4001',\n  );\n  const encoder: TextEncoder = new TextEncoder();\n  const suggestedParams: SuggestedParams = await client.getTransactionParams().do();\n  const firstTransaction: Transaction = makePaymentTxnWithSuggestedParamsFromObject({\n    amount: algosToMicroalgos(1),\n    from: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n    note: encoder.encode('I am the first transaction, human!'),\n    suggestedParams,\n    to: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n  });\n  const secondTransaction: Transaction = makePaymentTxnWithSuggestedParamsFromObject({\n    amount: algosToMicroalgos(2),\n    from: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n    note: encoder.encode('I am the second transaction, human!'),\n    suggestedParams,\n    to: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n  });\n  const firstTransactionBytes: Uint8Array = firstTransaction.toByte();\n  const secondTransactionBytes: Uint8Array = secondTransaction.toByte();\n} catch (error) {\n  // handle error\n}\n\n// initialized client\nclient.onSignTransactions(({ error, result }: IAVMWebClientListenerOptions) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    stxns: [\n      'gqNzaWfEQ...',\n      null,\n    ],\n  }\n  */\n});\n\n// send a sign transactions request\nclient.signTransactions({\n  providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  txns: [\n    {\n      txn: btoa(String.fromCodePoint(...firstTransactionBytes)), // convert to base64 string\n    },\n    {\n      txn: btoa(String.fromCodePoint(...secondTransactionBytes)),\n      signers: [], // use an empty signers array to skip this transaction\n    },\n  ],\n});\n"})})})]}),"\n",(0,t.jsxs)(a.p,{children:["As you can see from the above example, when the provider skips signing the transaction, the resulting signed transaction list contains a ",(0,t.jsx)(a.code,{children:"null"})," value at the same index, indicating the transaction was not signed. If you do not want to handle null values, you can supply the signed transaction (",(0,t.jsx)(a.code,{children:"stxn"}),") to the params when signing the transactions:"]}),"\n",(0,t.jsxs)(r.c,{defaultValue:"javascript",values:[{label:"Javascript",value:"javascript"},{label:"TypeScript",value:"typescript"}],children:[(0,t.jsx)(o.c,{value:"javascript",children:(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-js",children:"const algosdk = require('algosdk');\n\ntry {\n  const client = new algosdk.Algodv2(\n    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',\n    'http://localhost',\n    '4001',\n  );\n  const encoder = new TextEncoder();\n  const suggestedParams = await client.getTransactionParams().do();\n  const firstTransaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({\n    amount: algosdk.algosToMicroalgos(1),\n    from: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n    note: encoder.encode('I am the first transaction, human!'),\n    suggestedParams,\n    to: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n  });\n  const secondTransaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({\n    amount: algosdk.algosToMicroalgos(2),\n    from: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n    note: encoder.encode('I am the second transaction, human!'),\n    suggestedParams,\n    to: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n  });\n  const firstTransactionBytes = firstTransaction.toByte();\n  const secondTransactionBytes = secondTransaction.toByte();\n} catch (error) {\n  // handle error\n}\n\n// initialized client\nclient.onSignTransactions(({ error, result }) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    stxns: [\n      'gqNzaWfEQ...',\n      'gqNzaWfEQ...'\n    ],\n  }\n  */\n});\n\n// send a sign transactions request\nclient.signTransactions({\n  providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  txns: [\n    {\n      txn: btoa(String.fromCodePoint(...firstTransactionBytes)), // convert to base64 string\n    },\n    {\n      txn: btoa(String.fromCodePoint(...secondTransactionBytes)),\n      signers: [], // an empty array instructs the wallet to skip signing this transaction\n      stxn: 'gqNzaWfEQ...', // providing the signed transaction will pass it to the result\n    },\n  ],\n});\n"})})}),(0,t.jsx)(o.c,{value:"typescript",children:(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-typescript",children:"import {\n  Algodv2,\n  algosToMicroalgos,\n  makePaymentTxnWithSuggestedParamsFromObject,\n  SuggestedParams,\n  Transaction,\n} from 'algosdk';\nimport { IAVMWebClientListenerOptions } from '@agoralabs-sh/avm-web-provider';\n\n// create a transaction\ntry {\n  const client: Algodv2 = new Algodv2(\n    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',\n    'http://localhost',\n    '4001',\n  );\n  const encoder: TextEncoder = new TextEncoder();\n  const suggestedParams: SuggestedParams = await client.getTransactionParams().do();\n  const firstTransaction: Transaction = makePaymentTxnWithSuggestedParamsFromObject({\n    amount: algosToMicroalgos(1),\n    from: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n    note: encoder.encode('I am the first transaction, human!'),\n    suggestedParams,\n    to: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n  });\n  const secondTransaction: Transaction = makePaymentTxnWithSuggestedParamsFromObject({\n    amount: algosToMicroalgos(2),\n    from: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n    note: encoder.encode('I am the second transaction, human!'),\n    suggestedParams,\n    to: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n  });\n  const firstTransactionBytes: Uint8Array = firstTransaction.toByte();\n  const secondTransactionBytes: Uint8Array = secondTransaction.toByte();\n} catch (error) {\n  // handle error\n}\n\n// initialized client\nclient.onSignTransactions(({ error, result }: IAVMWebClientListenerOptions) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    stxns: [\n      'gqNzaWfEQ...',\n      'gqNzaWfEQ...'\n    ],\n  }\n  */\n});\n\n// send a sign transactions request\nclient.signTransactions({\n  providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  txns: [\n    {\n      txn: btoa(String.fromCodePoint(...firstTransactionBytes)), // convert to base64 string\n    },\n    {\n      txn: btoa(String.fromCodePoint(...secondTransactionBytes)),\n      signers: [], // an empty array instructs the wallet to skip signing this transaction\n      stxn: 'gqNzaWfEQ...', // providing the signed transaction will pass it to the result\n    },\n  ],\n});\n"})})})]}),"\n",(0,t.jsx)(a.h2,{id:"signing-transactions-with-multisig-accounts",children:"Signing transactions with multisig accounts"}),"\n",(0,t.jsx)(a.p,{children:"When using multisig accounts to sign transactions, a few extra options must be provided to the params object."}),"\n",(0,t.jsxs)(a.p,{children:["The transaction must now include the ",(0,t.jsx)(a.code,{children:"msig"})," object that conforms to ",(0,t.jsx)(a.a,{href:"https://algorand.github.io/js-algorand-sdk/interfaces/MultisigMetadata.html",children:(0,t.jsx)(a.code,{children:"algosdk.MultisigMetadata"})}),"."]}),"\n",(0,t.jsx)(a.admonition,{type:"caution",children:(0,t.jsxs)(a.p,{children:["The provider may not support multisig accounts, in which case a ",(0,t.jsx)(a.a,{href:"../../api-reference/errors#methodnotsupportederror",children:(0,t.jsx)(a.code,{children:"MethodNotSupportedError"})})," should be thrown."]})}),"\n",(0,t.jsxs)(r.c,{defaultValue:"javascript",values:[{label:"Javascript",value:"javascript"},{label:"TypeScript",value:"typescript"}],children:[(0,t.jsx)(o.c,{value:"javascript",children:(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-js",children:"const algosdk = require('algosdk');\n\ntry {\n  const client = new algosdk.Algodv2(\n    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',\n    'http://localhost',\n    '4001',\n  );\n  const encoder = new TextEncoder();\n  const multisigParams = {\n    addrs: [\n      'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U', // authorized in provider and will be used to sign\n      '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ', // authorized in provider and will be used to sign\n      'TKDBCV4SCSVR2GECXL7NJ5U34PDNLEIMFBTOYVURAPG53OXJLF4LEDSNGE', // not in provider\n    ],\n    threshold: 1,\n    version: 1,\n  };\n  const multisigAddress = algosdk.multisigAddress(multisigParams);\n  const suggestedParams = await client.getTransactionParams().do();\n  const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({\n    amount: algosdk.algosToMicroalgos(1),\n    from: multisigAddress,\n    note: encoder.encode('Hello Human!'),\n    suggestedParams,\n    to: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n  });\n  const transactionBytes = transaction.toByte();\n} catch (error) {\n  // handle error\n}\n\n// initialized client\nclient.onSignTransactions(({ error, result }) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    stxns: [\n      'gqNzaWfEQ...',\n    ],\n  }\n  */\n});\n\n// send a sign transactions request\nclient.signTransactions({\n  providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  txns: [\n    {\n      msig: multisigParams,\n      txn: btoa(String.fromCodePoint(...transactionBytes)), // convert to base64 string\n    },\n  ],\n});\n"})})}),(0,t.jsx)(o.c,{value:"typescript",children:(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-typescript",children:"import {\n  Algodv2,\n  algosToMicroalgos,\n  makePaymentTxnWithSuggestedParamsFromObject,\n  MultisigMetadata,\n  multisigAddress,\n  SuggestedParams,\n  Transaction,\n} from 'algosdk';\nimport { IAVMWebClientListenerOptions } from '@agoralabs-sh/avm-web-provider';\n\n// create a transaction\ntry {\n  const client: Algodv2 = new Algodv2(\n    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',\n    'http://localhost',\n    '4001',\n  );\n  const encoder: TextEncoder = new TextEncoder();\n  const multisigParams: MultisigMetadata = {\n    addrs: [\n      'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U', // authorized in provider and will be used to sign\n      '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ', // authorized in provider and will be used to sign\n      'TKDBCV4SCSVR2GECXL7NJ5U34PDNLEIMFBTOYVURAPG53OXJLF4LEDSNGE', // not in provider\n    ],\n    threshold: 1,\n    version: 1,\n  };\n  const multisigAddress: string = multisigAddress(multisigParams);\n  const suggestedParams: SuggestedParams = await client.getTransactionParams().do();\n  const transaction: Transaction = makePaymentTxnWithSuggestedParamsFromObject({\n    amount: algosToMicroalgos(1),\n    from: multisigAddress,\n    note: encoder.encode('Hello Human!'),\n    suggestedParams,\n    to: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n  });\n  const transactionBytes: Uint8Array = transaction.toByte();\n} catch (error) {\n  // handle error\n}\n\n// initialized client\nclient.onSignTransactions(({ error, result }: IAVMWebClientListenerOptions) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    stxns: [\n      'gqNzaWfEQ...',\n    ],\n  }\n  */\n});\n\n// send a sign transactions request\nclient.signTransactions({\n  providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  txns: [\n    {\n      msig: multisigParams,\n      txn: btoa(String.fromCodePoint(...transactionBytes)), // convert to base64 string\n    },\n  ],\n});\n"})})})]}),"\n",(0,t.jsx)(a.p,{children:"In the above example, even though the threshold is 1, because two of the signers are present and authorized in the provider, both accounts were used to sign the transaction. This still makes the transaction valid."}),"\n",(0,t.jsxs)(a.p,{children:["If you want to only use one address, you can use the ",(0,t.jsx)(a.code,{children:"signers"})," list to instruct the provider to only use certain addresses to sign the transaction."]}),"\n",(0,t.jsxs)(r.c,{defaultValue:"javascript",values:[{label:"Javascript",value:"javascript"},{label:"TypeScript",value:"typescript"}],children:[(0,t.jsx)(o.c,{value:"javascript",children:(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-js",children:"const algosdk = require('algosdk');\n\ntry {\n  const client = new algosdk.Algodv2(\n    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',\n    'http://localhost',\n    '4001',\n  );\n  const encoder = new TextEncoder();\n  const multisigParams = {\n    addrs: [\n      'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U', // authorized in provider and will be used to sign\n      '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ', // authorized in provider and will be used to sign\n      'TKDBCV4SCSVR2GECXL7NJ5U34PDNLEIMFBTOYVURAPG53OXJLF4LEDSNGE', // not in provider\n    ],\n    threshold: 1,\n    version: 1,\n  };\n  const multisigAddress = algosdk.multisigAddress(multisigParams);\n  const suggestedParams = await client.getTransactionParams().do();\n  const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({\n    amount: algosdk.algosToMicroalgos(1),\n    from: multisigAddress,\n    note: encoder.encode('Hello Human!'),\n    suggestedParams,\n    to: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n  });\n  const transactionBytes = transaction.toByte();\n} catch (error) {\n  // handle error\n}\n\n// initialized client\nclient.onSignTransactions(({ error, result }) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    stxns: [\n      'gqNzaWfEQ...',\n    ],\n  }\n  */\n});\n\n// send a sign transactions request\nclient.signTransactions({\n  providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  txns: [\n    {\n      msig: multisigParams,\n      txn: btoa(String.fromCodePoint(...transactionBytes)), // convert to base64 string\n      signers: [\n      '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ'\n      ], // specifying a signer instructs the wallet to only use this address to sign\n    },\n  ],\n});\n"})})}),(0,t.jsx)(o.c,{value:"typescript",children:(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-typescript",children:"import {\n  Algodv2,\n  algosToMicroalgos,\n  makePaymentTxnWithSuggestedParamsFromObject,\n  MultisigMetadata,\n  multisigAddress,\n  SuggestedParams,\n  Transaction,\n} from 'algosdk';\nimport { IAVMWebClientListenerOptions } from '@agoralabs-sh/avm-web-provider';\n\n// create a transaction\ntry {\n  const client: Algodv2 = new Algodv2(\n    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',\n    'http://localhost',\n    '4001',\n  );\n  const encoder: TextEncoder = new TextEncoder();\n  const multisigParams: MultisigMetadata = {\n    addrs: [\n      'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U', // authorized in provider and will be used to sign\n      '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ', // authorized in provider and will be used to sign\n      'TKDBCV4SCSVR2GECXL7NJ5U34PDNLEIMFBTOYVURAPG53OXJLF4LEDSNGE', // not in provider\n    ],\n    threshold: 1,\n    version: 1,\n  };\n  const multisigAddress: string = multisigAddress(multisigParams);\n  const suggestedParams: SuggestedParams = await client.getTransactionParams().do();\n  const transaction: Transaction = makePaymentTxnWithSuggestedParamsFromObject({\n    amount: algosToMicroalgos(1),\n    from: multisigAddress,\n    note: encoder.encode('Hello Human!'),\n    suggestedParams,\n    to: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n  });\n  const transactionBytes: Uint8Array = transaction.toByte();\n} catch (error) {\n  // handle error\n}\n\n// initialized client\nclient.onSignTransactions(({ error, result }: IAVMWebClientListenerOptions) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    stxns: [\n      'gqNzaWfEQ...',\n    ],\n  }\n  */\n});\n\n// send a sign transactions request\nclient.signTransactions({\n  providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  txns: [\n    {\n      msig: multisigParams,\n      txn: btoa(String.fromCodePoint(...transactionBytes)), // convert to base64 string\n      signers: [\n      '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ'\n      ], // specifying a signer instructs the wallet to only use this address to sign\n    },\n  ],\n});\n"})})})]}),"\n",(0,t.jsx)(a.admonition,{type:"caution",children:(0,t.jsxs)(a.p,{children:["If any of the accounts supplied in the ",(0,t.jsx)(a.code,{children:"signers"})," list are not an authorized signer, then a ",(0,t.jsx)(a.a,{href:"../../api-reference/errors#unauthorizedsignererror",children:(0,t.jsx)(a.code,{children:"UnauthorizedSignerError"})})," should be thrown."]})}),"\n",(0,t.jsxs)(a.p,{children:["In the above example, only the address ",(0,t.jsx)(a.code,{children:"6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ"})," is used to sign the transaction and as the threshold is only 1, the transaction is valid."]}),"\n",(0,t.jsx)(a.h2,{id:"signing-transactions-with-re-keyed-accounts",children:"Signing transactions with re-keyed accounts"}),"\n",(0,t.jsxs)(a.p,{children:["When attempting to sign a transaction using a re-keyed account, the ",(0,t.jsx)(a.code,{children:"authAddr"})," field may be used to instruct the provider to use this address as the signer of the transaction. Supplying the ",(0,t.jsx)(a.code,{children:"authAddr"})," will override the sender address in the transaction field."]}),"\n",(0,t.jsx)(a.admonition,{type:"caution",children:(0,t.jsxs)(a.p,{children:["The provider may not support re-keyed accounts, in which case a ",(0,t.jsx)(a.a,{href:"../../api-reference/errors#methodnotsupportederror",children:(0,t.jsx)(a.code,{children:"MethodNotSupportedError"})})," will be thrown."]})}),"\n",(0,t.jsxs)(r.c,{defaultValue:"javascript",values:[{label:"Javascript",value:"javascript"},{label:"TypeScript",value:"typescript"}],children:[(0,t.jsx)(o.c,{value:"javascript",children:(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-js",children:"const algosdk = require('algosdk');\n\ntry {\n  const client = new algosdk.Algodv2(\n    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',\n    'http://localhost',\n    '4001',\n  );\n  const encoder = new TextEncoder();\n  const suggestedParams = await client.getTransactionParams().do();\n  const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({\n    amount: algosdk.algosToMicroalgos(1),\n    from: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n    note: encoder.encode('Hello Human!'),\n    suggestedParams,\n    to: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n  });\n  const transactionBytes = transaction.toByte();\n} catch (error) {\n  // handle error\n}\n\n// initialized client\nclient.onSignTransactions(({ error, result }) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    stxns: [\n      'gqNzaWfEQ...',\n    ],\n  }\n  */\n});\n\n// send a sign transactions request\nclient.signTransactions({\n  providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  txns: [\n    {\n      authAddr: 'S6V2ITXD3Q4MYATTN5IH75E3KS3WEMB36SVG2LXCQ3XESSH2DYOC3DAXYU', // 'auth-addr' of the re-keyed from account\n      txn: btoa(String.fromCodePoint(...transactionBytes)), // convert to base64 string\n    },\n  ],\n});\n"})})}),(0,t.jsx)(o.c,{value:"typescript",children:(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-typescript",children:"import {\n  Algodv2,\n  algosToMicroalgos,\n  makePaymentTxnWithSuggestedParamsFromObject,\n  SuggestedParams,\n  Transaction,\n} from 'algosdk';\nimport { IAVMWebClientListenerOptions } from '@agoralabs-sh/avm-web-provider';\n\n// create a transaction\ntry {\n  const client: Algodv2 = new Algodv2(\n    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',\n    'http://localhost',\n    '4001',\n  );\n  const encoder: TextEncoder = new TextEncoder();\n  const suggestedParams: SuggestedParams = await client.getTransactionParams().do();\n  const transaction: Transaction = makePaymentTxnWithSuggestedParamsFromObject({\n    amount: algosToMicroalgos(1),\n    from: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n    note: encoder.encode('Hello Human!'),\n    suggestedParams,\n    to: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n  });\n  const transactionBytes: Uint8Array = transaction.toByte();\n} catch (error) {\n  // handle error\n}\n\n// initialized client\nclient.onSignTransactions(({ error, result }: IAVMWebClientListenerOptions) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    stxns: [\n      'gqNzaWfEQ...',\n    ],\n  }\n  */\n});\n\n// send a sign transactions request\nclient.signTransactions({\n  providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  txns: [\n    {\n      authAddr: 'S6V2ITXD3Q4MYATTN5IH75E3KS3WEMB36SVG2LXCQ3XESSH2DYOC3DAXYU', // 'auth-addr' of the re-keyed from account\n      txn: btoa(String.fromCodePoint(...transactionBytes)), // convert to base64 string\n    },\n  ],\n});\n"})})})]}),"\n",(0,t.jsx)(a.admonition,{type:"caution",children:(0,t.jsxs)(a.p,{children:["If the supplied ",(0,t.jsx)(a.code,{children:"authAddr"})," is not an authorized signer, then a ",(0,t.jsx)(a.a,{href:"../../api-reference/errors#unauthorizedsignererror",children:(0,t.jsx)(a.code,{children:"UnauthorizedSignerError"})})," will be thrown."]})})]})}function h(n={}){const{wrapper:a}={...(0,s.M)(),...n.components};return a?(0,t.jsx)(a,{...n,children:(0,t.jsx)(m,{...n})}):m(n)}}}]);