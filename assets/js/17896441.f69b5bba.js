(self.webpackChunk_agoralabs_sh_avm_web_provider=self.webpackChunk_agoralabs_sh_avm_web_provider||[]).push([[752],{7536:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return $t}});var a=n(1504),s=n(1264),i=n(4320),r=n(7624),c=a.createContext(null);function o(e){var t=e.children,n=function(e){return(0,a.useMemo)((function(){return{metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc}}),[e])}(e.content);return(0,r.jsx)(c.Provider,{value:n,children:t})}function l(){var e=(0,a.useContext)(c);if(null===e)throw new i.AH("DocProvider");return e}function d(){var e,t=l(),n=t.metadata,a=t.frontMatter,i=t.assets;return(0,r.jsx)(s.U7,{title:n.title,description:n.description,keywords:a.keywords,image:null!=(e=i.image)?e:a.image})}var u=n(5456),m=n(4203),h=n(8856),b=n(2480);function v(e){var t=e.permalink,n=e.title,a=e.subLabel,s=e.isNext;return(0,r.jsxs)(b.c,{className:(0,u.c)("pagination-nav__link",s?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[a&&(0,r.jsx)("div",{className:"pagination-nav__sublabel",children:a}),(0,r.jsx)("div",{className:"pagination-nav__label",children:n})]})}function p(e){var t=e.previous,n=e.next;return(0,r.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,h.G)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"}),children:[t&&(0,r.jsx)(v,Object.assign({},t,{subLabel:(0,r.jsx)(h.c,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc",children:"Previous"})})),n&&(0,r.jsx)(v,Object.assign({},n,{subLabel:(0,r.jsx)(h.c,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc",children:"Next"}),isNext:!0}))]})}function f(){var e=l().metadata;return(0,r.jsx)(p,{previous:e.previous,next:e.next})}var g=n(2504),j=n(3012),x=n(4424),N=n(9024),C=n(5312);var y={unreleased:function(e){var t=e.siteTitle,n=e.versionMetadata;return(0,r.jsx)(h.c,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:(0,r.jsx)("b",{children:n.label})},children:"This is unreleased documentation for {siteTitle} {versionLabel} version."})},unmaintained:function(e){var t=e.siteTitle,n=e.versionMetadata;return(0,r.jsx)(h.c,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:(0,r.jsx)("b",{children:n.label})},children:"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained."})}};function k(e){var t=y[e.versionMetadata.banner];return(0,r.jsx)(t,Object.assign({},e))}function _(e){var t=e.versionLabel,n=e.to,a=e.onClick;return(0,r.jsx)(h.c,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:(0,r.jsx)("b",{children:(0,r.jsx)(b.c,{to:n,onClick:a,children:(0,r.jsx)(h.c,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label",children:"latest version"})})})},children:"For up-to-date documentation, see the {latestVersionLink} ({versionLabel})."})}function w(e){var t,n=e.className,a=e.versionMetadata,s=(0,g.c)().siteConfig.title,i=(0,j.UF)({failfast:!0}).pluginId,c=(0,N.iy)(i).savePreferredVersionName,o=(0,j.i8)(i),l=o.latestDocSuggestion,d=o.latestVersionSuggestion,m=null!=l?l:(t=d).docs.find((function(e){return e.id===t.mainDocId}));return(0,r.jsxs)("div",{className:(0,u.c)(n,x.W.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert",children:[(0,r.jsx)("div",{children:(0,r.jsx)(k,{siteTitle:s,versionMetadata:a})}),(0,r.jsx)("div",{className:"margin-top--md",children:(0,r.jsx)(_,{versionLabel:d.label,to:m.path,onClick:function(){return c(d.name)}})})]})}function B(e){var t=e.className,n=(0,C.E)();return n.banner?(0,r.jsx)(w,{className:t,versionMetadata:n}):null}function L(e){var t=e.className,n=(0,C.E)();return n.badge?(0,r.jsx)("span",{className:(0,u.c)(t,x.W.docs.docVersionBadge,"badge badge--secondary"),children:(0,r.jsx)(h.c,{id:"theme.docs.versionBadge.label",values:{versionLabel:n.label},children:"Version: {versionLabel}"})}):null}function T(e){var t=e.lastUpdatedAt,n=e.formattedLastUpdatedAt;return(0,r.jsx)(h.c,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:(0,r.jsx)("b",{children:(0,r.jsx)("time",{dateTime:new Date(1e3*t).toISOString(),children:n})})},children:" on {date}"})}function O(e){var t=e.lastUpdatedBy;return(0,r.jsx)(h.c,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:(0,r.jsx)("b",{children:t})},children:" by {user}"})}function E(e){var t=e.lastUpdatedAt,n=e.formattedLastUpdatedAt,a=e.lastUpdatedBy;return(0,r.jsxs)("span",{className:x.W.common.lastUpdated,children:[(0,r.jsx)(h.c,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t&&n?(0,r.jsx)(T,{lastUpdatedAt:t,formattedLastUpdatedAt:n}):"",byUser:a?(0,r.jsx)(O,{lastUpdatedBy:a}):""},children:"Last updated{atDate}{byUser}"}),!1]})}var A=n(5656),M={iconEdit:"iconEdit_Z9Sw"},U=["className"];function I(e){var t=e.className,n=(0,A.c)(e,U);return(0,r.jsx)("svg",Object.assign({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,u.c)(M.iconEdit,t),"aria-hidden":"true"},n,{children:(0,r.jsx)("g",{children:(0,r.jsx)("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})})}))}function S(e){var t=e.editUrl;return(0,r.jsxs)(b.c,{to:t,className:x.W.common.editThisPage,children:[(0,r.jsx)(I,{}),(0,r.jsx)(h.c,{id:"theme.common.editThisPage",description:"The link label to edit the current page",children:"Edit this page"})]})}var H={tag:"tag_zVej",tagRegular:"tagRegular_sFm0",tagWithCount:"tagWithCount_h2kH"};function W(e){var t=e.permalink,n=e.label,a=e.count;return(0,r.jsxs)(b.c,{href:t,className:(0,u.c)(H.tag,a?H.tagWithCount:H.tagRegular),children:[n,a&&(0,r.jsx)("span",{children:a})]})}var V={tags:"tags_jXut",tag:"tag_QGVx"};function z(e){var t=e.tags;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("b",{children:(0,r.jsx)(h.c,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list",children:"Tags:"})}),(0,r.jsx)("ul",{className:(0,u.c)(V.tags,"padding--none","margin-left--sm"),children:t.map((function(e){var t=e.label,n=e.permalink;return(0,r.jsx)("li",{className:V.tag,children:(0,r.jsx)(W,{label:t,permalink:n})},n)}))})]})}var R={lastUpdated:"lastUpdated_vwxv"};function P(e){return(0,r.jsx)("div",{className:(0,u.c)(x.W.docs.docFooterTagsRow,"row margin-bottom--sm"),children:(0,r.jsx)("div",{className:"col",children:(0,r.jsx)(z,Object.assign({},e))})})}function D(e){var t=e.editUrl,n=e.lastUpdatedAt,a=e.lastUpdatedBy,s=e.formattedLastUpdatedAt;return(0,r.jsxs)("div",{className:(0,u.c)(x.W.docs.docFooterEditMetaRow,"row"),children:[(0,r.jsx)("div",{className:"col",children:t&&(0,r.jsx)(S,{editUrl:t})}),(0,r.jsx)("div",{className:(0,u.c)("col",R.lastUpdated),children:(n||a)&&(0,r.jsx)(E,{lastUpdatedAt:n,formattedLastUpdatedAt:s,lastUpdatedBy:a})})]})}function F(){var e=l().metadata,t=e.editUrl,n=e.lastUpdatedAt,a=e.formattedLastUpdatedAt,s=e.lastUpdatedBy,i=e.tags,c=i.length>0,o=!!(t||n||s);return c||o?(0,r.jsxs)("footer",{className:(0,u.c)(x.W.docs.docFooter,"docusaurus-mt-lg"),children:[c&&(0,r.jsx)(P,{tags:i}),o&&(0,r.jsx)(D,{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:s,formattedLastUpdatedAt:a})]}):null}var G=n(3420),q=n(4386),Y={tocCollapsibleButton:"tocCollapsibleButton_TO0P",tocCollapsibleButtonExpanded:"tocCollapsibleButtonExpanded_MG3E"},Z=["collapsed"];function $(e){var t=e.collapsed,n=(0,A.c)(e,Z);return(0,r.jsx)("button",Object.assign({type:"button"},n,{className:(0,u.c)("clean-btn",Y.tocCollapsibleButton,!t&&Y.tocCollapsibleButtonExpanded,n.className),children:(0,r.jsx)(h.c,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component",children:"On this page"})}))}var J={tocCollapsible:"tocCollapsible_ETCw",tocCollapsibleContent:"tocCollapsibleContent_vkbj",tocCollapsibleExpanded:"tocCollapsibleExpanded_sAul"};function K(e){var t=e.toc,n=e.className,a=e.minHeadingLevel,s=e.maxHeadingLevel,i=(0,G.a)({initialState:!0}),c=i.collapsed,o=i.toggleCollapsed;return(0,r.jsxs)("div",{className:(0,u.c)(J.tocCollapsible,!c&&J.tocCollapsibleExpanded,n),children:[(0,r.jsx)($,{collapsed:c,onClick:o}),(0,r.jsx)(G.U,{lazy:!0,className:J.tocCollapsibleContent,collapsed:c,children:(0,r.jsx)(q.c,{toc:t,minHeadingLevel:a,maxHeadingLevel:s})})]})}var Q={tocMobile:"tocMobile_ITEo"};function X(){var e=l(),t=e.toc,n=e.frontMatter;return(0,r.jsx)(K,{toc:t,minHeadingLevel:n.toc_min_heading_level,maxHeadingLevel:n.toc_max_heading_level,className:(0,u.c)(x.W.docs.docTocMobile,Q.tocMobile)})}var ee={tableOfContents:"tableOfContents_bqdL",docItemContainer:"docItemContainer_F8PC"},te=["className"],ne="table-of-contents__link toc-highlight",ae="table-of-contents__link--active";function se(e){var t=e.className,n=(0,A.c)(e,te);return(0,r.jsx)("div",{className:(0,u.c)(ee.tableOfContents,"thin-scrollbar",t),children:(0,r.jsx)(q.c,Object.assign({},n,{linkClassName:ne,linkActiveClassName:ae}))})}function ie(){var e=l(),t=e.toc,n=e.frontMatter;return(0,r.jsx)(se,{toc:t,minHeadingLevel:n.toc_min_heading_level,maxHeadingLevel:n.toc_max_heading_level,className:x.W.docs.docTocDesktop})}var re=n(2623),ce=n(4552),oe=n(6780),le=n(4912),de=n(8312),ue=n(9120);function me(){var e=(0,ue.y)().prism,t=(0,de.U)().colorMode,n=e.theme,a=e.darkTheme||n;return"dark"===t?a:n}var he=n(3464),be=n(4124),ve=n.n(be),pe=(0,he.c)(/title=(["'])(.*?)\1/,{quote:1,title:2}),fe=(0,he.c)(/\{([\d,-]+)\}/,{range:1}),ge={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},bash:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},je=Object.assign({},ge,{lua:{start:"--",end:""},wasm:{start:"\\;\\;",end:""},tex:{start:"%",end:""},vb:{start:"['\u2018\u2019]",end:""},vbnet:{start:"(?:_\\s*)?['\u2018\u2019]",end:""},rem:{start:"[Rr][Ee][Mm]\\b",end:""},f90:{start:"!",end:""},ml:{start:"\\(\\*",end:"\\*\\)"},cobol:{start:"\\*>",end:""}}),xe=Object.keys(ge);function Ne(e,t){var n=e.map((function(e){var n=je[e],a=n.start,s=n.end;return"(?:"+a+"\\s*("+t.flatMap((function(e){var t,n;return[e.line,null==(t=e.block)?void 0:t.start,null==(n=e.block)?void 0:n.end].filter(Boolean)})).join("|")+")\\s*"+s+")"})).join("|");return new RegExp("^\\s*(?:"+n+")\\s*$")}function Ce(e,t){var n=e.replace(/\n$/,""),a=t.language,s=t.magicComments,i=t.metastring;if(i&&fe.test(i)){var r=i.match(fe).groups.range;if(0===s.length)throw new Error("A highlight range has been given in code block's metastring (``` "+i+"), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges.");var c=s[0].className,o=ve()(r).filter((function(e){return e>0})).map((function(e){return[e-1,[c]]}));return{lineClassNames:Object.fromEntries(o),code:n}}if(void 0===a)return{lineClassNames:{},code:n};for(var l=function(e,t){switch(e){case"js":case"javascript":case"ts":case"typescript":return Ne(["js","jsBlock"],t);case"jsx":case"tsx":return Ne(["js","jsBlock","jsx"],t);case"html":return Ne(["js","jsBlock","html"],t);case"python":case"py":case"bash":return Ne(["bash"],t);case"markdown":case"md":return Ne(["html","jsx","bash"],t);case"tex":case"latex":case"matlab":return Ne(["tex"],t);case"lua":case"haskell":case"sql":return Ne(["lua"],t);case"wasm":return Ne(["wasm"],t);case"vb":case"vba":case"visual-basic":return Ne(["vb","rem"],t);case"vbnet":return Ne(["vbnet","rem"],t);case"batch":return Ne(["rem"],t);case"basic":return Ne(["rem","f90"],t);case"fsharp":return Ne(["js","ml"],t);case"ocaml":case"sml":return Ne(["ml"],t);case"fortran":return Ne(["f90"],t);case"cobol":return Ne(["cobol"],t);default:return Ne(xe,t)}}(a,s),d=n.split("\n"),u=Object.fromEntries(s.map((function(e){return[e.className,{start:0,range:""}]}))),m=Object.fromEntries(s.filter((function(e){return e.line})).map((function(e){var t=e.className;return[e.line,t]}))),h=Object.fromEntries(s.filter((function(e){return e.block})).map((function(e){var t=e.className;return[e.block.start,t]}))),b=Object.fromEntries(s.filter((function(e){return e.block})).map((function(e){var t=e.className;return[e.block.end,t]}))),v=0;v<d.length;){var p=d[v].match(l);if(p){var f=p.slice(1).find((function(e){return void 0!==e}));m[f]?u[m[f]].range+=v+",":h[f]?u[h[f]].start=v:b[f]&&(u[b[f]].range+=u[b[f]].start+"-"+(v-1)+","),d.splice(v,1)}else v+=1}n=d.join("\n");var g={};return Object.entries(u).forEach((function(e){var t=e[0],n=e[1].range;ve()(n).forEach((function(e){null!=g[e]||(g[e]=[]),g[e].push(t)}))})),{lineClassNames:g,code:n}}var ye={codeBlockContainer:"codeBlockContainer_Ckt0"},ke=["as"];function _e(e){var t=e.as,n=(0,A.c)(e,ke),a=function(e){var t={color:"--prism-color",backgroundColor:"--prism-background-color"},n={};return Object.entries(e.plain).forEach((function(e){var a=e[0],s=e[1],i=t[a];i&&"string"==typeof s&&(n[i]=s)})),n}(me());return(0,r.jsx)(t,Object.assign({},n,{style:a,className:(0,u.c)(n.className,ye.codeBlockContainer,x.W.common.codeBlock)}))}var we={codeBlockContent:"codeBlockContent_biex",codeBlockTitle:"codeBlockTitle_Ktv7",codeBlock:"codeBlock_bY9V",codeBlockStandalone:"codeBlockStandalone_MEMb",codeBlockLines:"codeBlockLines_e6Vv",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_o6Pm",buttonGroup:"buttonGroup__atx"};function Be(e){var t=e.children,n=e.className;return(0,r.jsx)(_e,{as:"pre",tabIndex:0,className:(0,u.c)(we.codeBlockStandalone,"thin-scrollbar",n),children:(0,r.jsx)("code",{className:we.codeBlockLines,children:t})})}var Le={attributes:!0,characterData:!0,childList:!0,subtree:!0};function Te(e,t){var n=(0,a.useState)(),s=n[0],r=n[1],c=(0,a.useCallback)((function(){var t;r(null==(t=e.current)?void 0:t.closest("[role=tabpanel][hidden]"))}),[e,r]);(0,a.useEffect)((function(){c()}),[c]),function(e,t,n){void 0===n&&(n=Le);var s=(0,i.yA)(t),r=(0,i.Mh)(n);(0,a.useEffect)((function(){var t=new MutationObserver(s);return e&&t.observe(e,r),function(){return t.disconnect()}}),[e,s,r])}(s,(function(e){e.forEach((function(e){"attributes"===e.type&&"hidden"===e.attributeName&&(t(),c())}))}),{attributes:!0,characterData:!1,childList:!1,subtree:!1})}var Oe=n(5720),Ee={codeLine:"codeLine_lJS_",codeLineNumber:"codeLineNumber_Tfdd",codeLineContent:"codeLineContent_feaV"};function Ae(e){var t=e.line,n=e.classNames,a=e.showLineNumbers,s=e.getLineProps,i=e.getTokenProps;1===t.length&&"\n"===t[0].content&&(t[0].content="");var c=s({line:t,className:(0,u.c)(n,a&&Ee.codeLine)}),o=t.map((function(e,t){return(0,r.jsx)("span",Object.assign({},i({token:e,key:t})),t)}));return(0,r.jsxs)("span",Object.assign({},c,{children:[a?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("span",{className:Ee.codeLineNumber}),(0,r.jsx)("span",{className:Ee.codeLineContent,children:o})]}):o,(0,r.jsx)("br",{})]}))}function Me(e){return(0,r.jsx)("svg",Object.assign({viewBox:"0 0 24 24"},e,{children:(0,r.jsx)("path",{fill:"currentColor",d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})}))}function Ue(e){return(0,r.jsx)("svg",Object.assign({viewBox:"0 0 24 24"},e,{children:(0,r.jsx)("path",{fill:"currentColor",d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"})}))}var Ie={copyButtonCopied:"copyButtonCopied_obH4",copyButtonIcons:"copyButtonIcons_eSgA",copyButtonIcon:"copyButtonIcon_y97N",copyButtonSuccessIcon:"copyButtonSuccessIcon_LjdS"};function Se(e){var t=e.code,n=e.className,s=(0,a.useState)(!1),i=s[0],c=s[1],o=(0,a.useRef)(void 0),l=(0,a.useCallback)((function(){!function(e,t){var n=(void 0===t?{}:t).target,a=void 0===n?document.body:n;if("string"!=typeof e)throw new TypeError("Expected parameter `text` to be a `string`, got `"+typeof e+"`.");var s=document.createElement("textarea"),i=document.activeElement;s.value=e,s.setAttribute("readonly",""),s.style.contain="strict",s.style.position="absolute",s.style.left="-9999px",s.style.fontSize="12pt";var r=document.getSelection(),c=r.rangeCount>0&&r.getRangeAt(0);a.append(s),s.select(),s.selectionStart=0,s.selectionEnd=e.length;var o=!1;try{o=document.execCommand("copy")}catch(l){}s.remove(),c&&(r.removeAllRanges(),r.addRange(c)),i&&i.focus()}(t),c(!0),o.current=window.setTimeout((function(){c(!1)}),1e3)}),[t]);return(0,a.useEffect)((function(){return function(){return window.clearTimeout(o.current)}}),[]),(0,r.jsx)("button",{type:"button","aria-label":i?(0,h.G)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,h.G)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,h.G)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,u.c)("clean-btn",n,Ie.copyButton,i&&Ie.copyButtonCopied),onClick:l,children:(0,r.jsxs)("span",{className:Ie.copyButtonIcons,"aria-hidden":"true",children:[(0,r.jsx)(Me,{className:Ie.copyButtonIcon}),(0,r.jsx)(Ue,{className:Ie.copyButtonSuccessIcon})]})})}function He(e){return(0,r.jsx)("svg",Object.assign({viewBox:"0 0 24 24"},e,{children:(0,r.jsx)("path",{fill:"currentColor",d:"M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"})}))}var We={wordWrapButtonIcon:"wordWrapButtonIcon_Bwma",wordWrapButtonEnabled:"wordWrapButtonEnabled_EoeP"};function Ve(e){var t=e.className,n=e.onClick,a=e.isEnabled,s=(0,h.G)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return(0,r.jsx)("button",{type:"button",onClick:n,className:(0,u.c)("clean-btn",t,a&&We.wordWrapButtonEnabled),"aria-label":s,title:s,children:(0,r.jsx)(He,{className:We.wordWrapButtonIcon,"aria-hidden":"true"})})}function ze(e){var t,n,s,i,c,o,l,d,m,h,b,v=e.children,p=e.className,f=void 0===p?"":p,g=e.metastring,j=e.title,x=e.showLineNumbers,N=e.language,C=(0,ue.y)().prism,y=C.defaultLanguage,k=C.magicComments,_=function(e){return null==e?void 0:e.toLowerCase()}(null!=(t=null!=N?N:null==(n=f.split(" ").find((function(e){return e.startsWith("language-")})))?void 0:n.replace(/language-/,""))?t:y),w=me(),B=(s=(0,a.useState)(!1),i=s[0],c=s[1],o=(0,a.useState)(!1),l=o[0],d=o[1],m=(0,a.useRef)(null),h=(0,a.useCallback)((function(){var e=m.current.querySelector("code");i?e.removeAttribute("style"):(e.style.whiteSpace="pre-wrap",e.style.overflowWrap="anywhere"),c((function(e){return!e}))}),[m,i]),b=(0,a.useCallback)((function(){var e=m.current,t=e.scrollWidth>e.clientWidth||m.current.querySelector("code").hasAttribute("style");d(t)}),[m]),Te(m,b),(0,a.useEffect)((function(){b()}),[i,b]),(0,a.useEffect)((function(){return window.addEventListener("resize",b,{passive:!0}),function(){window.removeEventListener("resize",b)}}),[b]),{codeBlockRef:m,isEnabled:i,isCodeScrollable:l,toggle:h}),L=function(e){var t,n;return null!=(t=null==e||null==(n=e.match(pe))?void 0:n.groups.title)?t:""}(g)||j,T=Ce(v,{metastring:g,language:_,magicComments:k}),O=T.lineClassNames,E=T.code,A=null!=x?x:function(e){return Boolean(null==e?void 0:e.includes("showLineNumbers"))}(g);return(0,r.jsxs)(_e,{as:"div",className:(0,u.c)(f,_&&!f.includes("language-"+_)&&"language-"+_),children:[L&&(0,r.jsx)("div",{className:we.codeBlockTitle,children:L}),(0,r.jsxs)("div",{className:we.codeBlockContent,children:[(0,r.jsx)(Oe.gl,{theme:w,code:E,language:null!=_?_:"text",children:function(e){var t=e.className,n=e.style,a=e.tokens,s=e.getLineProps,i=e.getTokenProps;return(0,r.jsx)("pre",{tabIndex:0,ref:B.codeBlockRef,className:(0,u.c)(t,we.codeBlock,"thin-scrollbar"),style:n,children:(0,r.jsx)("code",{className:(0,u.c)(we.codeBlockLines,A&&we.codeBlockLinesWithNumbering),children:a.map((function(e,t){return(0,r.jsx)(Ae,{line:e,getLineProps:s,getTokenProps:i,classNames:O[t],showLineNumbers:A},t)}))})})}}),(0,r.jsxs)("div",{className:we.buttonGroup,children:[(B.isEnabled||B.isCodeScrollable)&&(0,r.jsx)(Ve,{className:we.codeButton,onClick:function(){return B.toggle()},isEnabled:B.isEnabled}),(0,r.jsx)(Se,{className:we.codeButton,code:E})]})]})]})}var Re=["children"];function Pe(e){var t=e.children,n=(0,A.c)(e,Re),s=(0,le.c)(),i=function(e){return a.Children.toArray(e).some((function(e){return(0,a.isValidElement)(e)}))?e:Array.isArray(e)?e.join(""):e}(t),c="string"==typeof i?ze:Be;return(0,r.jsx)(c,Object.assign({},n,{children:i}),String(s))}function De(e){return(0,r.jsx)("code",Object.assign({},e))}var Fe=n(856),Ge={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"},qe=["summary","children"];function Ye(e){return!!e&&("SUMMARY"===e.tagName||Ye(e.parentElement))}function Ze(e,t){return!!e&&(e===t||Ze(e.parentElement,t))}function $e(e){var t=e.summary,n=e.children,s=(0,A.c)(e,qe);(0,Fe.c)().collectAnchor(s.id);var i=(0,le.c)(),c=(0,a.useRef)(null),o=(0,G.a)({initialState:!s.open}),l=o.collapsed,d=o.setCollapsed,m=(0,a.useState)(s.open),h=m[0],b=m[1],v=a.isValidElement(t)?t:(0,r.jsx)("summary",{children:null!=t?t:"Details"});return(0,r.jsxs)("details",Object.assign({},s,{ref:c,open:h,"data-collapsed":l,className:(0,u.c)(Ge.details,i&&Ge.isBrowser,s.className),onMouseDown:function(e){Ye(e.target)&&e.detail>1&&e.preventDefault()},onClick:function(e){e.stopPropagation();var t=e.target;Ye(t)&&Ze(t,c.current)&&(e.preventDefault(),l?(d(!1),b(!0)):d(!0))},children:[v,(0,r.jsx)(G.U,{lazy:!1,collapsed:l,disableSSRStyle:!0,onCollapseTransitionEnd:function(e){d(e),b(!e)},children:(0,r.jsx)("div",{className:Ge.collapsibleContent,children:n})})]}))}var Je={details:"details_b_Ee"},Ke="alert alert--info";function Qe(e){var t=Object.assign({},(function(e){if(null==e)throw new TypeError("Cannot destructure "+e)}(e),e));return(0,r.jsx)($e,Object.assign({},t,{className:(0,u.c)(Ke,Je.details,t.className)}))}function Xe(e){var t=a.Children.toArray(e.children),n=t.find((function(e){return a.isValidElement(e)&&"summary"===e.type})),s=(0,r.jsx)(r.Fragment,{children:t.filter((function(e){return e!==n}))});return(0,r.jsx)(Qe,Object.assign({},e,{summary:n,children:s}))}function et(e){return(0,r.jsx)(re.c,Object.assign({},e))}var tt={containsTaskList:"containsTaskList_mC6p"};function nt(e){if(void 0!==e)return(0,u.c)(e,(null==e?void 0:e.includes("contains-task-list"))&&tt.containsTaskList)}var at={img:"img_ev3q"};function st(e){var t,n=function(e){var t=a.Children.toArray(e),n=t.find((function(e){return a.isValidElement(e)&&"mdxAdmonitionTitle"===e.type})),s=t.filter((function(e){return e!==n}));return{mdxAdmonitionTitle:null==n?void 0:n.props.children,rest:s.length>0?(0,r.jsx)(r.Fragment,{children:s}):null}}(e.children),s=n.mdxAdmonitionTitle,i=n.rest,c=null!=(t=e.title)?t:s;return Object.assign({},e,c&&{title:c},{children:i})}var it={admonition:"admonition_xJq3",admonitionHeading:"admonitionHeading_Gvgb",admonitionIcon:"admonitionIcon_Rf37",admonitionContent:"admonitionContent_BuS1"};function rt(e){var t=e.type,n=e.className,a=e.children;return(0,r.jsx)("div",{className:(0,u.c)(x.W.common.admonition,x.W.common.admonitionType(t),it.admonition,n),children:a})}function ct(e){var t=e.icon,n=e.title;return(0,r.jsxs)("div",{className:it.admonitionHeading,children:[(0,r.jsx)("span",{className:it.admonitionIcon,children:t}),n]})}function ot(e){var t=e.children;return t?(0,r.jsx)("div",{className:it.admonitionContent,children:t}):null}function lt(e){var t=e.type,n=e.icon,a=e.title,s=e.children,i=e.className;return(0,r.jsxs)(rt,{type:t,className:i,children:[(0,r.jsx)(ct,{title:a,icon:n}),(0,r.jsx)(ot,{children:s})]})}function dt(e){return(0,r.jsx)("svg",Object.assign({viewBox:"0 0 14 16"},e,{children:(0,r.jsx)("path",{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})}))}var ut={icon:(0,r.jsx)(dt,{}),title:(0,r.jsx)(h.c,{id:"theme.admonition.note",description:"The default label used for the Note admonition (:::note)",children:"note"})};function mt(e){return(0,r.jsx)(lt,Object.assign({},ut,e,{className:(0,u.c)("alert alert--secondary",e.className),children:e.children}))}function ht(e){return(0,r.jsx)("svg",Object.assign({viewBox:"0 0 12 16"},e,{children:(0,r.jsx)("path",{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})}))}var bt={icon:(0,r.jsx)(ht,{}),title:(0,r.jsx)(h.c,{id:"theme.admonition.tip",description:"The default label used for the Tip admonition (:::tip)",children:"tip"})};function vt(e){return(0,r.jsx)(lt,Object.assign({},bt,e,{className:(0,u.c)("alert alert--success",e.className),children:e.children}))}function pt(e){return(0,r.jsx)("svg",Object.assign({viewBox:"0 0 14 16"},e,{children:(0,r.jsx)("path",{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})}))}var ft={icon:(0,r.jsx)(pt,{}),title:(0,r.jsx)(h.c,{id:"theme.admonition.info",description:"The default label used for the Info admonition (:::info)",children:"info"})};function gt(e){return(0,r.jsx)(lt,Object.assign({},ft,e,{className:(0,u.c)("alert alert--info",e.className),children:e.children}))}function jt(e){return(0,r.jsx)("svg",Object.assign({viewBox:"0 0 16 16"},e,{children:(0,r.jsx)("path",{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})}))}var xt={icon:(0,r.jsx)(jt,{}),title:(0,r.jsx)(h.c,{id:"theme.admonition.warning",description:"The default label used for the Warning admonition (:::warning)",children:"warning"})};function Nt(e){return(0,r.jsx)("svg",Object.assign({viewBox:"0 0 12 16"},e,{children:(0,r.jsx)("path",{fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"})}))}var Ct={icon:(0,r.jsx)(Nt,{}),title:(0,r.jsx)(h.c,{id:"theme.admonition.danger",description:"The default label used for the Danger admonition (:::danger)",children:"danger"})};var yt={icon:(0,r.jsx)(jt,{}),title:(0,r.jsx)(h.c,{id:"theme.admonition.caution",description:"The default label used for the Caution admonition (:::caution)",children:"caution"})};var kt={note:mt,tip:vt,info:gt,warning:function(e){return(0,r.jsx)(lt,Object.assign({},xt,e,{className:(0,u.c)("alert alert--warning",e.className),children:e.children}))},danger:function(e){return(0,r.jsx)(lt,Object.assign({},Ct,e,{className:(0,u.c)("alert alert--danger",e.className),children:e.children}))}},_t={secondary:function(e){return(0,r.jsx)(mt,Object.assign({title:"secondary"},e))},important:function(e){return(0,r.jsx)(gt,Object.assign({title:"important"},e))},success:function(e){return(0,r.jsx)(vt,Object.assign({title:"success"},e))},caution:function(e){return(0,r.jsx)(lt,Object.assign({},yt,e,{className:(0,u.c)("alert alert--warning",e.className),children:e.children}))}},wt=Object.assign({},kt,_t);function Bt(e){var t,n=st(e),a=(t=n.type,wt[t]||(console.warn('No admonition component found for admonition type "'+t+'". Using Info as fallback.'),wt.info));return(0,r.jsx)(a,Object.assign({},n))}var Lt=n(1496),Tt={Head:oe.c,details:Xe,Details:Xe,code:function(e){return function(e){return void 0!==e.children&&a.Children.toArray(e.children).every((function(e){return"string"==typeof e&&!e.includes("\n")}))}(e)?(0,r.jsx)(De,Object.assign({},e)):(0,r.jsx)(Pe,Object.assign({},e))},a:function(e){return(0,r.jsx)(b.c,Object.assign({},e))},pre:function(e){return(0,r.jsx)(r.Fragment,{children:e.children})},ul:function(e){return(0,r.jsx)("ul",Object.assign({},e,{className:nt(e.className)}))},li:function(e){return(0,Fe.c)().collectAnchor(e.id),(0,r.jsx)("li",Object.assign({},e))},img:function(e){return(0,r.jsx)("img",Object.assign({decoding:"async",loading:"lazy"},e,{className:(t=e.className,(0,u.c)(t,at.img))}));var t},h1:function(e){return(0,r.jsx)(et,Object.assign({as:"h1"},e))},h2:function(e){return(0,r.jsx)(et,Object.assign({as:"h2"},e))},h3:function(e){return(0,r.jsx)(et,Object.assign({as:"h3"},e))},h4:function(e){return(0,r.jsx)(et,Object.assign({as:"h4"},e))},h5:function(e){return(0,r.jsx)(et,Object.assign({as:"h5"},e))},h6:function(e){return(0,r.jsx)(et,Object.assign({as:"h6"},e))},admonition:Bt,mermaid:Lt.c};function Ot(e){var t=e.children;return(0,r.jsx)(ce.I,{components:Tt,children:t})}function Et(e){var t,n,a,s,i=e.children,c=(t=l(),n=t.metadata,a=t.frontMatter,s=t.contentTitle,a.hide_title||void 0!==s?null:n.title);return(0,r.jsxs)("div",{className:(0,u.c)(x.W.docs.docMarkdown,"markdown"),children:[c&&(0,r.jsx)("header",{children:(0,r.jsx)(re.c,{as:"h1",children:c})}),(0,r.jsx)(Ot,{children:i})]})}var At=n(7702),Mt=n(4664),Ut=n(2448);function It(e){return(0,r.jsx)("svg",Object.assign({viewBox:"0 0 24 24"},e,{children:(0,r.jsx)("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"})}))}var St={breadcrumbHomeIcon:"breadcrumbHomeIcon_YNFT"};function Ht(){var e=(0,Ut.c)("/");return(0,r.jsx)("li",{className:"breadcrumbs__item",children:(0,r.jsx)(b.c,{"aria-label":(0,h.G)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e,children:(0,r.jsx)(It,{className:St.breadcrumbHomeIcon})})})}var Wt={breadcrumbsContainer:"breadcrumbsContainer_Z_bl"};function Vt(e){var t=e.children,n=e.href,a="breadcrumbs__link";return e.isLast?(0,r.jsx)("span",{className:a,itemProp:"name",children:t}):n?(0,r.jsx)(b.c,{className:a,href:n,itemProp:"item",children:(0,r.jsx)("span",{itemProp:"name",children:t})}):(0,r.jsx)("span",{className:a,children:t})}function zt(e){var t=e.children,n=e.active,a=e.index,s=e.addMicrodata;return(0,r.jsxs)("li",Object.assign({},s&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},{className:(0,u.c)("breadcrumbs__item",{"breadcrumbs__item--active":n}),children:[t,(0,r.jsx)("meta",{itemProp:"position",content:String(a+1)})]}))}function Rt(){var e=(0,At.js)(),t=(0,Mt.Y5)();return e?(0,r.jsx)("nav",{className:(0,u.c)(x.W.docs.docBreadcrumbs,Wt.breadcrumbsContainer),"aria-label":(0,h.G)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"}),children:(0,r.jsxs)("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList",children:[t&&(0,r.jsx)(Ht,{}),e.map((function(t,n){var a=n===e.length-1,s="category"===t.type&&t.linkUnlisted?void 0:t.href;return(0,r.jsx)(zt,{active:a,index:n,addMicrodata:!!s,children:(0,r.jsx)(Vt,{href:s,isLast:a,children:t.label})},n)}))]})}):null}function Pt(){return(0,r.jsx)(h.c,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function Dt(){return(0,r.jsx)(h.c,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function Ft(){return(0,r.jsx)(oe.c,{children:(0,r.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}function Gt(e){var t=e.className;return(0,r.jsx)(Bt,{type:"caution",title:(0,r.jsx)(Pt,{}),className:(0,u.c)(t,x.W.common.unlistedBanner),children:(0,r.jsx)(Dt,{})})}function qt(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(Ft,{}),(0,r.jsx)(Gt,Object.assign({},e))]})}var Yt={docItemContainer:"docItemContainer_Djhp",docItemCol:"docItemCol_VOVn"};function Zt(e){var t,n,a,s,i,c,o=e.children,d=(t=l(),n=t.frontMatter,a=t.toc,s=(0,m.U)(),i=n.hide_table_of_contents,c=!i&&a.length>0,{hidden:i,mobile:c?(0,r.jsx)(X,{}):void 0,desktop:!c||"desktop"!==s&&"ssr"!==s?void 0:(0,r.jsx)(ie,{})}),h=l().metadata.unlisted;return(0,r.jsxs)("div",{className:"row",children:[(0,r.jsxs)("div",{className:(0,u.c)("col",!d.hidden&&Yt.docItemCol),children:[h&&(0,r.jsx)(qt,{}),(0,r.jsx)(B,{}),(0,r.jsxs)("div",{className:Yt.docItemContainer,children:[(0,r.jsxs)("article",{children:[(0,r.jsx)(Rt,{}),(0,r.jsx)(L,{}),d.mobile,(0,r.jsx)(Et,{children:o}),(0,r.jsx)(F,{})]}),(0,r.jsx)(f,{})]})]}),d.desktop&&(0,r.jsx)("div",{className:"col col--3",children:d.desktop})]})}function $t(e){var t="docs-doc-id-"+e.content.metadata.id,n=e.content;return(0,r.jsx)(o,{content:e.content,children:(0,r.jsxs)(s.cr,{className:t,children:[(0,r.jsx)(d,{}),(0,r.jsx)(Zt,{children:(0,r.jsx)(n,{})})]})})}},4124:function(e,t){function n(e){let t,n=[];for(let a of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(a))n.push(parseInt(a,10));else if(t=a.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,a,s,i]=t;if(a&&i){a=parseInt(a),i=parseInt(i);const e=a<i?1:-1;"-"!==s&&".."!==s&&"\u2025"!==s||(i+=e);for(let t=a;t!==i;t+=e)n.push(t)}}return n}t.default=n,e.exports=n}}]);