"use strict";(self.webpackChunk_agoralabs_sh_avm_web_provider=self.webpackChunk_agoralabs_sh_avm_web_provider||[]).push([[5023],{1024:function(n,e,r){r.r(e),r.d(e,{assets:function(){return p},contentTitle:function(){return d},default:function(){return v},frontMatter:function(){return c},metadata:function(){return l},toc:function(){return h}});var t=r(4848),s=r(8453),i=r(1470),o=r(9365),a=r(4252);const c={},d="Posting Transactions",l={id:"clients/posting-transactions",title:"Posting Transactions",description:"<TOCInline",source:"@site/docs/clients/posting-transactions.mdx",sourceDirName:"clients",slug:"/clients/posting-transactions",permalink:"/clients/posting-transactions",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Signing Transactions",permalink:"/clients/signing-transactions"},next:{title:"Signing And Posting Transactions",permalink:"/clients/signing-and-posting-transactions"}},p={},h=[{value:"Overview",id:"overview",level:2},{value:"Sending transactions to the provider",id:"sending-transactions-to-the-provider",level:2}];function u(n){const e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,s.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.header,{children:(0,t.jsx)(e.h1,{id:"posting-transactions",children:"Posting Transactions"})}),"\n",(0,t.jsx)(a.A,{maxHeadingLevel:4,toc:h}),"\n",(0,t.jsx)(e.h2,{id:"overview",children:"Overview"}),"\n",(0,t.jsx)(e.p,{children:"Providers, if supported, can commit transactions to the network using their connection to a node."}),"\n",(0,t.jsx)(e.h2,{id:"sending-transactions-to-the-provider",children:"Sending transactions to the provider"}),"\n",(0,t.jsx)(e.admonition,{type:"note",children:(0,t.jsx)(e.p,{children:"Posting transactions requires the ID of the provider."})}),"\n",(0,t.jsxs)(i.A,{defaultValue:"javascript",values:[{label:"Javascript",value:"javascript"},{label:"TypeScript",value:"typescript"}],children:[(0,t.jsx)(o.A,{value:"javascript",children:(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-js",children:"// initialized client\nclient.onPostTransactions(({ error, result }) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    txnIDs: [\n      'OKU6A2Q...',\n    ],\n  }\n  */\n});\n\n// send a post transactions request\nclient.postTransactions({\n  providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  stxns: [\n    'gqNzaWfEQ...',\n  ],\n});\n"})})}),(0,t.jsx)(o.A,{value:"typescript",children:(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-typescript",children:"import { IAVMWebClientCallbackOptions } from '@agoralabs-sh/avm-web-provider';\n\n// initialized client\nclient.onPostTransactions(({ error, result }: IAVMWebClientCallbackOptions) => {\n  if (error) {\n    console.error('error:', error);\n\n    return;\n  }\n\n  console.log(result);\n  /*\n  {\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    txnIDs: [\n      'OKU6A2Q...',\n    ],\n  }\n  */\n});\n\n// send a post transactions request\nclient.postTransactions({\n  providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  stxns: [\n    'gqNzaWfEQ...',\n  ],\n});\n"})})})]}),"\n",(0,t.jsx)(e.admonition,{type:"caution",children:(0,t.jsxs)(e.p,{children:["If this method is not supported, then a ",(0,t.jsx)(e.a,{href:"../../api-reference/errors#methodnotsupportederror",children:(0,t.jsx)(e.code,{children:"MethodNotSupportedError"})})," should be thrown."]})}),"\n",(0,t.jsx)(e.admonition,{type:"caution",children:(0,t.jsxs)(e.p,{children:["If the transactions fail to be accepted by the network, then a ",(0,t.jsx)(e.a,{href:"../../api-reference/errors#failedtopostsometransactionserror",children:(0,t.jsx)(e.code,{children:"FailedToPostSomeTransactionsError"})})," should be thrown."]})})]})}function v(n={}){const{wrapper:e}={...(0,s.R)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(u,{...n})}):u(n)}}}]);