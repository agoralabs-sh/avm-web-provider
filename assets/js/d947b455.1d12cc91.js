"use strict";(self.webpackChunk_agoralabs_sh_avm_web_provider=self.webpackChunk_agoralabs_sh_avm_web_provider||[]).push([[2565],{266:function(e,n,s){s.r(n),s.d(n,{assets:function(){return p},contentTitle:function(){return c},default:function(){return h},frontMatter:function(){return d},metadata:function(){return l},toc:function(){return v}});var t=s(4848),r=s(8453),i=s(1470),o=s(9365),a=s(4252);const d={},c="Responding To Discover Requests",l={id:"providers/responding-to-discover-requests",title:"Responding To Discover Requests",description:"<TOCInline",source:"@site/docs/providers/responding-to-discover-requests.mdx",sourceDirName:"providers",slug:"/providers/responding-to-discover-requests",permalink:"/providers/responding-to-discover-requests",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Getting Started",permalink:"/providers/getting-started"},next:{title:"Responding To Enable Requests",permalink:"/providers/responding-to-enable-requests"}},p={},v=[{value:"Overview",id:"overview",level:2},{value:"Responding to a discover request",id:"responding-to-a-discover-request",level:2}];function u(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"responding-to-discover-requests",children:"Responding To Discover Requests"})}),"\n",(0,t.jsx)(a.A,{maxHeadingLevel:4,toc:v}),"\n",(0,t.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,t.jsx)(n.p,{children:"It is likely that clients will want to find out the capabilities of your provider before they start interacting with it. Therefore, it is good practice to handle discover request from clients, responding with your provider's supported networks & methods."}),"\n",(0,t.jsx)(n.h2,{id:"responding-to-a-discover-request",children:"Responding to a discover request"}),"\n",(0,t.jsx)(n.p,{children:"Once our provider object has been initialized, we can simply listen to events and respond:"}),"\n",(0,t.jsxs)(i.A,{defaultValue:"javascript",values:[{label:"Javascript",value:"javascript"},{label:"TypeScript",value:"typescript"}],children:[(0,t.jsx)(o.A,{value:"javascript",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"// initialized provider\nprovider.onDiscover(({ params }) => {\n  return {\n    host: 'https://awesome-wallet.com',\n    name: 'Awesome Wallet',\n    networks: [\n      {\n        genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',\n        genesisId: 'testnet-v1.0',\n        methods: [\n          'disable',\n          'enable',\n          'post_transactions',\n          'sign_and_post_transactions',\n          'sign_transactions',\n        ],\n      },\n      {\n        genesisHash: 'IXnoWtviVVJW5LGivNFc0Dq14V3kqaXuK2u5OQrdVZo=',\n        genesisId: 'voitest-v1',\n        methods: [\n          'disable',\n          'enable',\n          'post_transactions',\n          'sign_and_post_transactions',\n          'sign_transactions',\n        ],\n      },\n    ],\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  };\n});\n"})})}),(0,t.jsx)(o.A,{value:"typescript",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"import type { IAVMWebProviderCallbackOptions } from '@agoralabs-sh/avm-web-provider';\n\n// initialized provider\nprovider.onDiscover(({ params }: IAVMWebProviderCallbackOptions) => {\n  return {\n    host: 'https://awesome-wallet.com',\n    name: 'Awesome Wallet',\n    networks: [\n      {\n        genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',\n        genesisId: 'testnet-v1.0',\n        methods: [\n          'disable',\n          'enable',\n          'post_transactions',\n          'sign_and_post_transactions',\n          'sign_transactions',\n        ],\n      },\n      {\n        genesisHash: 'IXnoWtviVVJW5LGivNFc0Dq14V3kqaXuK2u5OQrdVZo=',\n        genesisId: 'voitest-v1',\n        methods: [\n          'disable',\n          'enable',\n          'post_transactions',\n          'sign_and_post_transactions',\n          'sign_transactions',\n        ],\n      },\n    ],\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  };\n});\n"})})})]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}}}]);