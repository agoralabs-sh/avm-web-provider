"use strict";(self.webpackChunk_agoralabs_sh_avm_web_provider=self.webpackChunk_agoralabs_sh_avm_web_provider||[]).push([[6117],{7929:function(e,r,n){n.r(r),n.d(r,{assets:function(){return p},contentTitle:function(){return l},default:function(){return v},frontMatter:function(){return d},metadata:function(){return c},toc:function(){return h}});var o=n(4848),a=n(8453),i=n(1470),t=n(9365),s=n(4252);const d={},l="Throwing An Error",c={id:"providers/throwing-an-error",title:"Throwing An Error",description:"<TOCInline",source:"@site/docs/providers/throwing-an-error.mdx",sourceDirName:"providers",slug:"/providers/throwing-an-error",permalink:"/providers/throwing-an-error",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Responding To Sign Message Requests",permalink:"/providers/responding-to-sign-message-requests"},next:{title:"API Reference",permalink:"/api-reference/"}},p={},h=[{value:"Overview",id:"overview",level:2},{value:"Throwing an error",id:"throwing-an-error-1",level:2}];function u(e){const r={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.header,{children:(0,o.jsx)(r.h1,{id:"throwing-an-error",children:"Throwing An Error"})}),"\n",(0,o.jsx)(s.A,{maxHeadingLevel:4,toc:h}),"\n",(0,o.jsx)(r.h2,{id:"overview",children:"Overview"}),"\n",(0,o.jsx)(r.p,{children:"When receiving a request from the client, you can throw errors within the listener function and these errors will propagate back to the client's listener arguments."}),"\n",(0,o.jsx)(r.h2,{id:"throwing-an-error-1",children:"Throwing an error"}),"\n",(0,o.jsxs)(i.A,{defaultValue:"javascript-via-package-manager",values:[{label:"JavaScript (via package manager)",value:"javascript-via-package-manager"},{label:"Javascript (via CDN)",value:"javascript-via-cdn"},{label:"TypeScript",value:"typescript"}],children:[(0,o.jsx)(t.A,{value:"javascript-via-package-manager",children:(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-js",children:"// AVMWebClient\nclient.onDisable(({ error, result }) => {\n  if (error) {\n    console.error(error);\n    /*\n    {\n      code: 4003,\n      data: {\n        method: 'disable',\n      },\n      message: 'disable method is not supported',\n      name: 'MethodNotSupportedError',\n      providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    }\n    */\n\n    return;\n  }\n});\n\n// send a client request\nclient.disable();\n\n// AVMWebProvider\nconst { ARC0027MethodSupportedError } = require('@agoralabs-sh/avm-web-provider');\n\nprovider.onDisable(({ params }) => {\n  throw new ARC0027MethodSupportedError({\n    method: 'disable',\n    message: 'disable method is not supported',\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  });\n});\n"})})}),(0,o.jsx)(t.A,{value:"javascript-via-cdn",children:(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-js",children:"// AVMWebClient\nclient.onDisable(({ error, result }) => {\n  if (error) {\n  console.error(error);\n  /*\n  {\n    code: 4003,\n    data: {\n      method: 'disable',\n    },\n    message: 'disable method is not supported',\n    name: 'MethodNotSupportedError',\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  }\n  */\n\n  return;\n}\n});\n\n// send a client request\nclient.disable();\n\n// AVMWebProvider\nprovider.onDisable(({ params }) => {\n  throw new window.AVMWebProviderSDK.ARC0027MethodSupportedError({\n    method: 'disable',\n    message: 'disable method is not supported',\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  });\n});\n"})})}),(0,o.jsx)(t.A,{value:"typescript",children:(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-typescript",children:"// AVMWebClient\nclient.onDisable(({ error, result }) => {\n  if (error) {\n    console.error(error);\n    /*\n    {\n      code: 4003,\n      data: {\n        method: 'disable',\n      },\n      message: 'disable method is not supported',\n      name: 'MethodNotSupportedError',\n      providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n    }\n    */\n\n    return;\n  }\n});\n\n// send a client request\nclient.disable();\n\n// AVMWebProvider\nimport { ARC0027MethodEnum, ARC0027MethodSupportedError } from '@agoralabs-sh/avm-web-provider';\n\nprovider.onDisable(({ params }) => {\n  throw new ARC0027MethodSupportedError({\n    method: ARC0027MethodEnum.Disable,\n    message: `${ARC0027MethodEnum.Disable} method is not supported`,\n    providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',\n  });\n});\n"})})})]}),"\n",(0,o.jsx)(r.admonition,{type:"note",children:(0,o.jsxs)(r.p,{children:["The SDK provides several common errors, see ",(0,o.jsx)(r.a,{href:"../api-reference/errors",children:"errors"}),"."]})})]})}function v(e={}){const{wrapper:r}={...(0,a.R)(),...e.components};return r?(0,o.jsx)(r,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}}}]);