"use strict";(self.webpackChunk_agoralabs_sh_avm_web_provider=self.webpackChunk_agoralabs_sh_avm_web_provider||[]).push([[6452],{4064:function(e,n,r){r.r(n),r.d(n,{assets:function(){return p},contentTitle:function(){return o},default:function(){return b},frontMatter:function(){return c},metadata:function(){return d},toc:function(){return h}});var i=r(4848),a=r(8453),t=r(1470),s=r(9365),l=r(4252);const c={},o="Enabling A Client",d={id:"clients/enabling-a-client",title:"Enabling A Client",description:"<TOCInline",source:"@site/docs/clients/enabling-a-client.mdx",sourceDirName:"clients",slug:"/clients/enabling-a-client",permalink:"/clients/enabling-a-client",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Discover Providers",permalink:"/clients/discover-providers"},next:{title:"Disabling A Client",permalink:"/clients/disabling-a-client"}},p={},h=[{value:"Overview",id:"overview",level:2},{value:"Enabling the client with all providers",id:"enabling-the-client-with-all-providers",level:2},{value:"Enabling the client with a specific provider",id:"enabling-the-client-with-a-specific-provider",level:2},{value:"Enabling a client on a specific network",id:"enabling-a-client-on-a-specific-network",level:2}];function u(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"enabling-a-client",children:"Enabling A Client"})}),"\n",(0,i.jsx)(l.A,{maxHeadingLevel:4,toc:h}),"\n",(0,i.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,i.jsx)(n.p,{children:"Before we can start interacting with a provider, we need ask the provider to enable the client. This will achieve two things:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"if necessary, it will authorize your client with the provider; and"}),"\n",(0,i.jsx)(n.li,{children:"it will get a list of the authorized accounts available to your client."}),"\n"]}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:["It should be safe to call ",(0,i.jsx)(n.a,{href:"../../api-reference/avm-web-client#enableparams",children:(0,i.jsx)(n.code,{children:"enable()"})}),". as many times as your client needs; the provider should assume this."]})}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsxs)(n.p,{children:['The definition of "enabling" for a provider can mean different things to different providers, but it is highly recommended that you first run ',(0,i.jsx)(n.a,{href:"../../api-reference/avm-web-client#enable",children:(0,i.jsx)(n.code,{children:"enable()"})})," before attempting any signing/post methods."]})}),"\n",(0,i.jsx)(n.h2,{id:"enabling-the-client-with-all-providers",children:"Enabling the client with all providers"}),"\n",(0,i.jsxs)(n.p,{children:["After ",(0,i.jsx)(n.a,{href:"getting-started",children:"initialization"}),", you can simply call:"]}),"\n",(0,i.jsxs)(t.A,{defaultValue:"javascript",values:[{label:"Javascript",value:"javascript"},{label:"TypeScript",value:"typescript"}],children:[(0,i.jsx)(s.A,{value:"javascript",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"// initialized client\nclient.onEnable(({ error, result }) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    accounts: [\n      {\n        address: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n        name: 'Wallet-1',\n      },\n      {\n        address: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n        name: 'Wallet-2',\n      },\n    ],\n    genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',\n    genesisId: 'testnet-v1.0',\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    sessionId: 'ab192498-0c63-4028-80fd-f148710611d8',\n  }\n  */\n});\n\n// send a enable request\nclient.enable();\n"})})}),(0,i.jsx)(s.A,{value:"typescript",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"import { IAVMWebClientCallbackOptions } from '@agoralabs-sh/avm-web-provider';\n\n// initialized client\nclient.onEnable(({ error, result }: IAVMWebClientCallbackOptions) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    accounts: [\n      {\n        address: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n        name: 'Wallet-1',\n      },\n      {\n        address: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n        name: 'Wallet-2',\n      },\n    ],\n    genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',\n    genesisId: 'testnet-v1.0',\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    sessionId: 'ab192498-0c63-4028-80fd-f148710611d8',\n  }\n  */\n});\n\n// send a enable request\nclient.enable();\n"})})})]}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsxs)(n.p,{children:["If any providers do not support the ",(0,i.jsx)(n.code,{children:"enable"}),"  method, then a ",(0,i.jsx)(n.a,{href:"../../api-reference/errors#methodnotsupportederror",children:(0,i.jsx)(n.code,{children:"MethodNotSupportedError"})})," will be returned."]})}),"\n",(0,i.jsx)(n.h2,{id:"enabling-the-client-with-a-specific-provider",children:"Enabling the client with a specific provider"}),"\n",(0,i.jsx)(n.p,{children:"If you want to target a specific provider, you can simply pass the ID of the provider in the params:"}),"\n",(0,i.jsxs)(t.A,{defaultValue:"javascript",values:[{label:"Javascript",value:"javascript"},{label:"TypeScript",value:"typescript"}],children:[(0,i.jsx)(s.A,{value:"javascript",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"const providerId = '02657eaf-be17-4efc-b0a4-19d654b2448e';\n\n// initialized client\nclient.onEnable(({ error, result }) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    accounts: [\n      {\n        address: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n        name: 'Wallet-1',\n      },\n      {\n        address: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n        name: 'Wallet-2',\n      },\n    ],\n    genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',\n    genesisId: 'testnet-v1.0',\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    sessionId: 'ab192498-0c63-4028-80fd-f148710611d8',\n  }\n  */\n});\n\n// send a enable request\nclient.enable({ providerId });\n"})})}),(0,i.jsx)(s.A,{value:"typescript",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"import { IAVMWebClientCallbackOptions } from '@agoralabs-sh/avm-web-provider';\n\n const providerId: string = '02657eaf-be17-4efc-b0a4-19d654b2448e';\n\n// initialized client\nclient.onEnable(({ error, result }: IAVMWebClientCallbackOptions) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    accounts: [\n      {\n        address: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n        name: 'Wallet-1',\n      },\n      {\n        address: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n        name: 'Wallet-2',\n      },\n    ],\n    genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',\n    genesisId: 'testnet-v1.0',\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    sessionId: 'ab192498-0c63-4028-80fd-f148710611d8',\n  }\n  */\n});\n\n// send a enable request\nclient.enable({ providerId });\n"})})})]}),"\n",(0,i.jsx)(n.h2,{id:"enabling-a-client-on-a-specific-network",children:"Enabling a client on a specific network"}),"\n",(0,i.jsx)(n.p,{children:"If you want to target a specific network, and any providers support it, you can simply pass the genesis hash of the network in the params:"}),"\n",(0,i.jsxs)(t.A,{defaultValue:"javascript",values:[{label:"Javascript",value:"javascript"},{label:"TypeScript",value:"typescript"}],children:[(0,i.jsx)(s.A,{value:"javascript",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"const genesisHash = 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=';\n\n// initialized client\nclient.onEnable(({ error, result }) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    accounts: [\n      {\n        address: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n        name: 'Wallet-1',\n      },\n      {\n        address: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n        name: 'Wallet-2',\n      },\n    ],\n    genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',\n    genesisId: 'testnet-v1.0',\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    sessionId: 'ab192498-0c63-4028-80fd-f148710611d8',\n  }\n  */\n});\n\n// send a enable request\nclient.enable({ genesisHash });\n"})})}),(0,i.jsx)(s.A,{value:"typescript",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"import { IAVMWebClientCallbackOptions } from '@agoralabs-sh/avm-web-provider';\n\nconst genesisHash: string = 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=';\n\n// initialized client\nclient.onEnable(({ error, result }: IAVMWebClientCallbackOptions) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    accounts: [\n      {\n        address: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n        name: 'Wallet-1',\n      },\n      {\n        address: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n        name: 'Wallet-2',\n      },\n    ],\n    genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',\n    genesisId: 'testnet-v1.0',\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    sessionId: 'ab192498-0c63-4028-80fd-f148710611d8',\n  }\n  */\n});\n\n// send a enable request\nclient.enable({ genesisHash });\n"})})})]}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsxs)(n.p,{children:["If the network and the provider ID is specified, and the provider does not support the network, then a ",(0,i.jsx)(n.a,{href:"../../api-reference/errors#networknotsupportederror",children:(0,i.jsx)(n.code,{children:"NetworkNotSupportedError"})})," should be thrown."]})})]})}function b(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}}}]);