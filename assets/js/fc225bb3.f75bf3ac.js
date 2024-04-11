"use strict";(self.webpackChunk_agoralabs_sh_avm_web_provider=self.webpackChunk_agoralabs_sh_avm_web_provider||[]).push([[24],{8148:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>p,default:()=>g,frontMatter:()=>d,metadata:()=>c,toc:()=>h});var s=r(7624),i=r(2172),t=r(1268),o=r(5388),a=r(1552);const d={},p="Responding To Sign Transactions Requests",c={id:"providers/responding-to-sign-transactions-requests",title:"Responding To Sign Transactions Requests",description:"<TOCInline",source:"@site/docs/providers/responding-to-sign-transactions-requests.mdx",sourceDirName:"providers",slug:"/providers/responding-to-sign-transactions-requests",permalink:"/providers/responding-to-sign-transactions-requests",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Responding To Disable Requests",permalink:"/providers/responding-to-disable-requests"},next:{title:"Responding To Post Transactions Requests",permalink:"/providers/responding-to-post-transactions-requests"}},l={},h=[{value:"Responding to a sign transactions request",id:"responding-to-a-sign-transactions-request",level:2}];function u(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,i.M)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"responding-to-sign-transactions-requests",children:"Responding To Sign Transactions Requests"}),"\n",(0,s.jsx)(a.c,{maxHeadingLevel:4,toc:h}),"\n",(0,s.jsx)(n.h2,{id:"responding-to-a-sign-transactions-request",children:"Responding to a sign transactions request"}),"\n",(0,s.jsx)(n.p,{children:"Once our provider object has been initialized, we can simply listen to events and respond:"}),"\n",(0,s.jsxs)(t.c,{defaultValue:"javascript",values:[{label:"Javascript",value:"javascript"},{label:"TypeScript",value:"typescript"}],children:[(0,s.jsx)(o.c,{value:"javascript",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"const providerId = '02657eaf-be17-4efc-b0a4-19d654b2448e';\n\n// initialized provider\nprovider.onSignTransactions(({ params }) => {\n  if (params.providerId === providerId) {\n    // ... using the `params.txns` parameter, the provider signs the transactions and returns the base64 encoded signed transactions\n\n    return {\n      providerId,\n      stxns: [\n        'gqNzaWfEQ...',\n      ],\n    };\n  }\n});\n"})})}),(0,s.jsx)(o.c,{value:"typescript",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"import type { IAVMWebProviderListenerOptions } from '@agoralabs-sh/avm-web-provider';\n\nconst providerId: string = '02657eaf-be17-4efc-b0a4-19d654b2448e';\n\n// initialized provider\nprovider.onSignTransactions(({ params }: IAVMWebProviderListenerOptions) => {\n  if (params.providerId === providerId) {\n    // ... using the `params.txns` parameter, the provider signs the transactions and returns the base64 encoded signed transactions\n\n    return {\n      providerId,\n      stxns: [\n        'gqNzaWfEQ...',\n      ],\n    };\n  }\n});\n"})})})]}),"\n",(0,s.jsx)(n.admonition,{type:"caution",children:(0,s.jsxs)(n.p,{children:["If this method is not supported, then a ",(0,s.jsx)(n.a,{href:"../../api-reference/errors#methodnotsupportederror",children:(0,s.jsx)(n.code,{children:"MethodNotSupportedError"})})," should be thrown."]})}),"\n",(0,s.jsx)(n.admonition,{type:"caution",children:(0,s.jsxs)(n.p,{children:["If there is a group of atomic transactions, but the computed group ID doesn't match the assigned ID, then a ",(0,s.jsx)(n.a,{href:"../../api-reference/errors#invalidgroupiderror",children:(0,s.jsx)(n.code,{children:"InvalidGroupIdError"})})," should be thrown."]})}),"\n",(0,s.jsx)(n.admonition,{type:"caution",children:(0,s.jsxs)(n.p,{children:["If any of the transactions are malformed, then a ",(0,s.jsx)(n.a,{href:"../../api-reference/errors#invalidinputerror",children:(0,s.jsx)(n.code,{children:"InvalidInputError"})})," should be thrown."]})})]})}function g(e={}){const{wrapper:n}={...(0,i.M)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}}}]);