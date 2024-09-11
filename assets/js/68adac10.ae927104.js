"use strict";(self.webpackChunk_agoralabs_sh_avm_web_provider=self.webpackChunk_agoralabs_sh_avm_web_provider||[]).push([[7329],{3566:function(e,n,r){r.r(n),r.d(n,{assets:function(){return u},contentTitle:function(){return c},default:function(){return g},frontMatter:function(){return d},metadata:function(){return p},toc:function(){return l}});var s=r(4848),t=r(8453),i=r(1470),a=r(9365),o=r(4252);const d={},c="Responding To Sign Transactions Requests",p={id:"usage/providers/responding-to-sign-transactions-requests",title:"Responding To Sign Transactions Requests",description:"<TOCInline",source:"@site/docs/usage/providers/responding-to-sign-transactions-requests.mdx",sourceDirName:"usage/providers",slug:"/usage/providers/responding-to-sign-transactions-requests",permalink:"/usage/providers/responding-to-sign-transactions-requests",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{}},u={},l=[{value:"Responding to a sign transactions request",id:"responding-to-a-sign-transactions-request",level:2}];function h(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"responding-to-sign-transactions-requests",children:"Responding To Sign Transactions Requests"})}),"\n",(0,s.jsx)(o.A,{maxHeadingLevel:4,toc:l}),"\n",(0,s.jsx)(n.h2,{id:"responding-to-a-sign-transactions-request",children:"Responding to a sign transactions request"}),"\n",(0,s.jsx)(n.p,{children:"Once our provider object has been initialized, we can simply listen to events and respond:"}),"\n",(0,s.jsxs)(i.A,{defaultValue:"javascript",values:[{label:"Javascript",value:"javascript"},{label:"TypeScript",value:"typescript"}],children:[(0,s.jsx)(a.A,{value:"javascript",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"const providerId = '02657eaf-be17-4efc-b0a4-19d654b2448e';\n\n// initialized provider\nprovider.onSignTransactions(({ params }) => {\n  // ... using the `params.txns` parameter, the provider signs the transactions and returns the base64 encoded signed transactions\n\n  return {\n    providerId,\n    stxns: [\n      'gqNzaWfEQ...',\n    ],\n  };\n});\n"})})}),(0,s.jsx)(a.A,{value:"typescript",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"import type { IAVMWebProviderCallbackOptions } from '@agoralabs-sh/avm-web-provider';\n\nconst providerId = '02657eaf-be17-4efc-b0a4-19d654b2448e';\n\n// initialized provider\nprovider.onSignTransactions(({ params }: IAVMWebProviderCallbackOptions) => {\n  // ... using the `params.txns` parameter, the provider signs the transactions and returns the base64 encoded signed transactions\n\n  return {\n    providerId,\n    stxns: [\n      'gqNzaWfEQ...',\n    ],\n  };\n});\n"})})})]}),"\n",(0,s.jsx)(n.admonition,{type:"caution",children:(0,s.jsxs)(n.p,{children:["If this method is not supported, then a ",(0,s.jsx)(n.a,{href:"../../api-reference/errors#methodnotsupportederror",children:(0,s.jsx)(n.code,{children:"MethodNotSupportedError"})})," should be thrown."]})}),"\n",(0,s.jsx)(n.admonition,{type:"caution",children:(0,s.jsxs)(n.p,{children:["If there is a group of atomic transactions, but the computed group ID doesn't match the assigned ID, then a ",(0,s.jsx)(n.a,{href:"../../api-reference/errors#invalidgroupiderror",children:(0,s.jsx)(n.code,{children:"InvalidGroupIdError"})})," should be thrown."]})}),"\n",(0,s.jsx)(n.admonition,{type:"caution",children:(0,s.jsxs)(n.p,{children:["If any of the transactions are malformed, then a ",(0,s.jsx)(n.a,{href:"../../api-reference/errors#invalidinputerror",children:(0,s.jsx)(n.code,{children:"InvalidInputError"})})," should be thrown."]})})]})}function g(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}}}]);