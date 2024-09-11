"use strict";(self.webpackChunk_agoralabs_sh_avm_web_provider=self.webpackChunk_agoralabs_sh_avm_web_provider||[]).push([[7432],{5066:function(e,n,r){r.r(n),r.d(n,{assets:function(){return c},contentTitle:function(){return l},default:function(){return v},frontMatter:function(){return d},metadata:function(){return p},toc:function(){return h}});var s=r(4848),i=r(8453),a=r(1470),t=r(9365),o=r(4252);const d={},l="Responding To Enable Requests",p={id:"providers/responding-to-enable-requests",title:"Responding To Enable Requests",description:"<TOCInline",source:"@site/docs/providers/responding-to-enable-requests.mdx",sourceDirName:"providers",slug:"/providers/responding-to-enable-requests",permalink:"/providers/responding-to-enable-requests",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Responding To Discover Requests",permalink:"/providers/responding-to-discover-requests"},next:{title:"Responding To Disable Requests",permalink:"/providers/responding-to-disable-requests"}},c={},h=[{value:"Overview",id:"overview",level:2},{value:"Responding to an enable request",id:"responding-to-an-enable-request",level:2},{value:"Responding to an enable request with a specific network",id:"responding-to-an-enable-request-with-a-specific-network",level:2}];function u(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"responding-to-enable-requests",children:"Responding To Enable Requests"})}),"\n",(0,s.jsx)(o.A,{maxHeadingLevel:4,toc:h}),"\n",(0,s.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,s.jsx)(n.p,{children:"The main purpose of an enable request to is for clients to get a list of authorized accounts. However, it can be used to handle sessioning. While it is not enforced through this SDK, it is heavily recommended."}),"\n",(0,s.jsx)(n.h2,{id:"responding-to-an-enable-request",children:"Responding to an enable request"}),"\n",(0,s.jsx)(n.p,{children:"Once our provider object has been initialized, we can simply listen to events and respond:"}),"\n",(0,s.jsxs)(a.A,{defaultValue:"javascript",values:[{label:"Javascript",value:"javascript"},{label:"TypeScript",value:"typescript"}],children:[(0,s.jsx)(t.A,{value:"javascript",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"// initialized provider\nprovider.onEnable(({ params }) => {\n  return {\n    accounts: [\n      {\n        address: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n        name: 'Wallet-1',\n      },\n      {\n        address: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n        name: 'Wallet-2',\n      },\n    ],\n    genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',\n    genesisId: 'testnet-v1.0',\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  };\n});\n"})})}),(0,s.jsx)(t.A,{value:"typescript",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"import type { IAVMWebProviderCallbackOptions } from '@agoralabs-sh/avm-web-provider';\n\n// initialized provider\nprovider.onEnable(({ params }: IAVMWebProviderCallbackOptions) => {\n  return {\n    accounts: [\n      {\n        address: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n        name: 'Wallet-1',\n      },\n      {\n        address: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n        name: 'Wallet-2',\n      },\n    ],\n    genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',\n    genesisId: 'testnet-v1.0',\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  };\n});\n"})})})]}),"\n",(0,s.jsx)(n.admonition,{type:"caution",children:(0,s.jsxs)(n.p,{children:["If this method is not supported, then a ",(0,s.jsx)(n.a,{href:"../../api-reference/errors#methodnotsupportederror",children:(0,s.jsx)(n.code,{children:"MethodNotSupportedError"})})," should be thrown."]})}),"\n",(0,s.jsx)(n.h2,{id:"responding-to-an-enable-request-with-a-specific-network",children:"Responding to an enable request with a specific network"}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"enable"})," request allows the client to specify the network. This is denoted in the supplied ",(0,s.jsx)(n.code,{children:"params.genesisHash"})," parameter."]}),"\n",(0,s.jsxs)(a.A,{defaultValue:"javascript",values:[{label:"Javascript",value:"javascript"},{label:"TypeScript",value:"typescript"}],children:[(0,s.jsx)(t.A,{value:"javascript",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"const { ARC0027NetworkNotSupportedError } = require('@agoralabs-sh/avm-web-provider');\n\nconst genesisHash = 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=';\nconst providerId = '02657eaf-be17-4efc-b0a4-19d654b2448e';\n\n// initialized provider\nprovider.onEnable(({ params }) => {\n  // if the genesis hash has been defined, it is recommended that you throw and error\n  if (param.genesisHash && param.genesisHash !== genesisHash) {\n    throw new ARC0027NetworkNotSupportedError({\n      genesisHashes: [param.genesisHash],\n      providerId,\n    });\n  }\n\n  return {\n    accounts: [\n      {\n        address: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n        name: 'Wallet-1',\n      },\n      {\n        address: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n        name: 'Wallet-2',\n      },\n    ],\n    genesisHash,\n    genesisId: 'testnet-v1.0',\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  };\n});\n"})})}),(0,s.jsx)(t.A,{value:"typescript",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"import type { ARC0027NetworkNotSupportedError, IAVMWebProviderCallbackOptions } from '@agoralabs-sh/avm-web-provider';\n\nconst genesisHash = 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=';\nconst providerId = '02657eaf-be17-4efc-b0a4-19d654b2448e';\n\n// initialized provider\nprovider.onEnable(({ params }: IAVMWebProviderCallbackOptions) => {\n  // if the genesis hash has been defined, it is recommended that you throw and error\n  if (param.genesisHash && param.genesisHash !== genesisHash) {\n    throw new ARC0027NetworkNotSupportedError({\n      genesisHashes: [param.genesisHash],\n      providerId,\n    });\n  }\n\n  return {\n    accounts: [\n      {\n        address: 'P3AIQVDJ2CTH54KSJE63YWB7IZGS4W4JGC53I6GK72BGZ5BXO2B2PS4M4U',\n        name: 'Wallet-1',\n      },\n      {\n        address: '6GT6EXFDAHZDZYUOPT725ZRWYBZDCEGYT7SYYXGJKRFUAG5B7JMI7DQRNQ',\n        name: 'Wallet-2',\n      },\n    ],\n    genesisHash,\n    genesisId: 'testnet-v1.0',\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  };\n});\n"})})})]}),"\n",(0,s.jsx)(n.admonition,{type:"caution",children:(0,s.jsxs)(n.p,{children:["If the network is specified, and the provider does not support the network, then a ",(0,s.jsx)(n.a,{href:"../../api-reference/errors#networknotsupportederror",children:(0,s.jsx)(n.code,{children:"NetworkNotSupportedError"})})," should be thrown."]})})]})}function v(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}}}]);