"use strict";(self.webpackChunk_agoralabs_sh_avm_web_provider=self.webpackChunk_agoralabs_sh_avm_web_provider||[]).push([[2693],{8514:function(e,a,n){n.r(a),n.d(a,{assets:function(){return p},contentTitle:function(){return d},default:function(){return g},frontMatter:function(){return c},metadata:function(){return o},toc:function(){return h}});var i=n(4848),r=n(8453),t=n(1470),s=n(9365),l=n(4252);const c={},d="Getting Started",o={id:"clients/getting-started",title:"Getting Started",description:"<TOCInline",source:"@site/docs/clients/getting-started.mdx",sourceDirName:"clients",slug:"/clients/getting-started",permalink:"/clients/getting-started",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Clients",permalink:"/clients/"},next:{title:"Discover Providers",permalink:"/clients/discover-providers"}},p={},h=[{value:"Installation",id:"installation",level:2},{value:"Using a package manager",id:"using-a-package-manager",level:3},{value:"Download via a CDN",id:"download-via-a-cdn",level:3},{value:"Initialization",id:"initialization",level:2}];function v(e){const a={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.header,{children:(0,i.jsx)(a.h1,{id:"getting-started",children:"Getting Started"})}),"\n",(0,i.jsx)(l.A,{maxHeadingLevel:4,toc:h}),"\n",(0,i.jsx)(a.h2,{id:"installation",children:"Installation"}),"\n",(0,i.jsx)(a.h3,{id:"using-a-package-manager",children:"Using a package manager"}),"\n",(0,i.jsx)(a.p,{children:"Use your favourite package manager to install:"}),"\n",(0,i.jsxs)(t.A,{groupId:"npm2yarn",children:[(0,i.jsx)(s.A,{value:"npm",children:(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-bash",children:"npm install --save @agoralabs-sh/avm-web-provider\n"})})}),(0,i.jsx)(s.A,{value:"yarn",label:"Yarn",children:(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-bash",children:"yarn add @agoralabs-sh/avm-web-provider\n"})})}),(0,i.jsx)(s.A,{value:"pnpm",label:"pnpm",children:(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-bash",children:"pnpm add @agoralabs-sh/avm-web-provider\n"})})})]}),"\n",(0,i.jsx)(a.h3,{id:"download-via-a-cdn",children:"Download via a CDN"}),"\n",(0,i.jsx)(a.p,{children:"Include the minified browser bundle directly in your HTML like so:"}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-html",children:'<html>\n  ...\n  <script src="https://github.com/agoralabs-sh/avm-web-provider/releases/latest/download/avm-web-provider.min.js"><\/script>\n  ...\n</html>\n'})}),"\n",(0,i.jsx)(a.h2,{id:"initialization",children:"Initialization"}),"\n",(0,i.jsx)(a.p,{children:"Firstly, we want to initialize the AVM web client:"}),"\n",(0,i.jsxs)(t.A,{defaultValue:"javascript-via-package-manager",values:[{label:"JavaScript (via package manager)",value:"javascript-via-package-manager"},{label:"JavaScript (via CDN)",value:"javascript-via-cdn"},{label:"TypeScript",value:"typescript"}],children:[(0,i.jsx)(s.A,{value:"javascript-via-package-manager",children:(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-js",children:"const { AVMWebClient } = require('@agoralabs-sh/avm-web-provider');\n\nconst client = AVMWebClient.init();\n"})})}),(0,i.jsx)(s.A,{value:"javascript-via-cdn",children:(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-js",children:"var client = window.AVMWebProviderSDK.AVMWebClient.init();\n"})})}),(0,i.jsx)(s.A,{value:"typescript",children:(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-typescript",children:"import { AVMWebClient } from '@agoralabs-sh/avm-web-provider';\n\nconst client: AVMWebClient = AVMWebClient.init();\n"})})})]}),"\n",(0,i.jsx)(a.admonition,{type:"note",children:(0,i.jsxs)(a.p,{children:["See ",(0,i.jsx)(a.a,{href:"../../api-reference/types#iavmwebclientinitoptions",children:(0,i.jsx)(a.code,{children:"IAVMWebClientInitOptions"})})," for more information on what options are supported."]})})]})}function g(e={}){const{wrapper:a}={...(0,r.R)(),...e.components};return a?(0,i.jsx)(a,{...e,children:(0,i.jsx)(v,{...e})}):v(e)}}}]);