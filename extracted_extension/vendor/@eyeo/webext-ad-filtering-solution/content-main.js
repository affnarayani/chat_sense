/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ../../node_modules/uuid/dist/esm-browser/native.js
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const esm_browser_native = ({
  randomUUID
});
;// ../../node_modules/uuid/dist/esm-browser/rng.js
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}
;// ../../node_modules/uuid/dist/esm-browser/stringify.js

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const esm_browser_stringify = ((/* unused pure expression or super */ null && (stringify)));
;// ../../node_modules/uuid/dist/esm-browser/v4.js




function v4(options, buf, offset) {
  if (esm_browser_native.randomUUID && !buf && !options) {
    return esm_browser_native.randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return unsafeStringify(rnds);
}

/* harmony default export */ const esm_browser_v4 = (v4);
;// ../../node_modules/@eyeo/snippets/webext/main.mjs
/*!
 * This file is part of eyeo's Anti-Circumvention Snippets module (@eyeo/snippets),
 * Copyright (C) 2006-present eyeo GmbH
 * 
 * @eyeo/snippets is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 * 
 * @eyeo/snippets is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with @eyeo/snippets.  If not, see <http://www.gnu.org/licenses/>.
 */
let currentEnvironment = {initial: true};
const callback = (environment, ...filters) => {
const e=Proxy,{apply:t,bind:n,call:r}=Function,o=r.bind(t),s=r.bind(n),i=r.bind(r),a={get:(e,t)=>s(r,e[t])},c=t=>new e(t,a),l=(t,n)=>new e(t,{apply:(e,t,r)=>o(n,t,r)}),u={get:(e,t)=>s(e[t],e)},f=t=>new e(t,u),{assign:p,defineProperties:d,freeze:h,getOwnPropertyDescriptor:y,getOwnPropertyDescriptors:g,getPrototypeOf:w}=f(Object),{hasOwnProperty:m}=c({}),{species:v}=Symbol,b={get(e,t){const n=e[t];class r extends n{}const o=g(n.prototype);delete o.constructor,h(d(r.prototype,o));const s=g(n);return delete s.length,delete s.prototype,s[v]={value:r},h(d(r,s))}},E=t=>new e(t,b);"undefined"!=typeof currentEnvironment&&currentEnvironment.initial&&"undefined"!=typeof environment&&(currentEnvironment=environment);const S=()=>"undefined"!=typeof currentEnvironment?currentEnvironment:"undefined"!=typeof environment?environment:{};"undefined"==typeof globalThis&&(window.globalThis=window);const{apply:x,ownKeys:$}=f(Reflect),R=S(),O="world"in R,k=O&&"ISOLATED"===R.world,P=O&&"MAIN"===R.world,T="object"==typeof chrome&&!!chrome.runtime,j="object"==typeof browser&&!!browser.runtime,A=!P&&(k||T||j),L=e=>A?e:C(e,W(e)),{create:C,defineProperties:M,defineProperty:N,freeze:I,getOwnPropertyDescriptor:D,getOwnPropertyDescriptors:W}=f(Object),F=f(globalThis),q=A?globalThis:E(globalThis),{Map:H,RegExp:B,Set:J,WeakMap:_,WeakSet:V}=q,z=(e,t,n=null)=>{const r=$(t);for(const o of $(e)){if(r.includes(o))continue;const s=D(e,o);if(n&&"value"in s){const{value:e}=s;"function"==typeof e&&(s.value=n(e))}N(t,o,s)}},U=e=>{const t=q[e];class n extends t{}const{toString:r,valueOf:o}=t.prototype;M(n.prototype,{toString:{value:r},valueOf:{value:o}});const s=e.toLowerCase(),i=e=>function(){const t=x(e,this,arguments);return typeof t===s?new n(t):t};return z(t,n,i),z(t.prototype,n.prototype,i),n},X=I({frozen:new _,hidden:new V,iframePropertiesToAbort:{read:new J,write:new J},abortedIframes:new _}),G=new B("^[A-Z]"),K=A&&(T&&chrome||j&&browser)||void 0;var Q=new Proxy(new H([["chrome",K],["browser",K],["isExtensionContext",A],["variables",X],["console",L(console)],["document",globalThis.document],["JSON",L(JSON)],["Map",H],["Math",L(Math)],["Number",A?Number:U("Number")],["RegExp",B],["Set",J],["String",A?String:U("String")],["WeakMap",_],["WeakSet",V],["MouseEvent",MouseEvent]]),{get(e,t){if(e.has(t))return e.get(t);let n=globalThis[t];return"function"==typeof n&&(n=(G.test(t)?q:F)[t]),e.set(t,n),n},has:(e,t)=>e.has(t)});const Y={WeakSet:WeakSet,WeakMap:WeakMap,WeakValue:class{has(){return!1}set(){}}},{apply:Z}=Reflect;const{Map:ee,WeakMap:te,WeakSet:ne,setTimeout:re}=Q;let oe=!0,se=e=>{e.clear(),oe=!oe};var ie=function(e){const{WeakSet:t,WeakMap:n,WeakValue:r}=this||Y,o=new t,s=new n,i=new r;return function(t){if(o.has(t))return t;if(s.has(t))return s.get(t);if(i.has(t))return i.get(t);const n=Z(e,this,arguments);return o.add(n),n!==t&&("object"==typeof t&&t?s:i).set(t,n),n}}.bind({WeakMap:te,WeakSet:ne,WeakValue:class extends ee{set(e,t){return oe&&(oe=!oe,re(se,0,this)),super.set(e,t)}}});const{concat:ae,includes:ce,join:le,reduce:ue,unshift:fe}=c([]),{Map:pe,WeakMap:de}=E(globalThis),he=new pe,ye=e=>{const t=(e=>{const t=[];let n=e;for(;n;){if(he.has(n))fe(t,he.get(n));else{const e=g(n);he.set(n,e),fe(t,e)}n=w(n)}return fe(t,{}),o(p,null,t)})("function"==typeof e?e.prototype:e),n={get(e,n){if(n in t){const{value:r,get:o}=t[n];if(o)return i(o,e);if("function"==typeof r)return s(r,e)}return e[n]},set(e,n,r){if(n in t){const{set:o}=t[n];if(o)return i(o,e,r),!0}return e[n]=r,!0}};return e=>new Proxy(e,n)},{isExtensionContext:ge,Array:we,Number:me,String:ve,Object:be}=Q,{isArray:Ee}=we,{getOwnPropertyDescriptor:Se,setPrototypeOf:xe}=be,{toString:$e}=be.prototype,{slice:Re}=ve.prototype,{get:Oe}=Se(Node.prototype,"nodeType"),ke=ge?{}:{Attr:ye(Attr),CanvasRenderingContext2D:ye(CanvasRenderingContext2D),CSSStyleDeclaration:ye(CSSStyleDeclaration),Document:ye(Document),Element:ye(Element),HTMLCanvasElement:ye(HTMLCanvasElement),HTMLElement:ye(HTMLElement),HTMLImageElement:ye(HTMLImageElement),HTMLScriptElement:ye(HTMLScriptElement),MutationRecord:ye(MutationRecord),Node:ye(Node),ShadowRoot:ye(ShadowRoot),get CSS2Properties(){return ke.CSSStyleDeclaration}},Pe=(e,t)=>{if("Element"!==t&&t in ke)return ke[t](e);if(Ee(e))return xe(e,we.prototype);const n=(e=>i(Re,i($e,e),8,-1))(e);if(n in ke)return ke[n](e);if(n in Q)return xe(e,Q[n].prototype);if("nodeType"in e)switch(i(Oe,e)){case 1:if(!(t in ke))throw new Error("unknown hint "+t);return ke[t](e);case 2:return ke.Attr(e);case 3:return ke.Node(e);case 9:return ke.Document(e)}throw new Error("unknown brand "+n)};var Te=ge?e=>e===window||e===globalThis?Q:e:ie(((e,t="Element")=>{if(e===window||e===globalThis)return Q;switch(typeof e){case"object":return e&&Pe(e,t);case"string":return new ve(e);case"number":return new me(e);default:throw new Error("unsupported value")}}));const je={get(e,t){const n=e;for(;!m(e,t);)e=w(e);const{get:r,set:s}=y(e,t);return function(){return arguments.length?o(s,n,arguments):i(r,n)}}},Ae=t=>new e(t,je);let{Math:Le,setInterval:Ce,performance:Me}=Te(window);const Ne={mark(){},end(){},toString:()=>"{mark(){},end(){}}"};let Ie=!0;function De(e,t=10){if(Ie)return Ne;function n(){let e=Te([]);for(let{name:t,duration:n}of Me.getEntriesByType("measure"))e.push({name:t,duration:n});e.length&&Me.clearMeasures()}return De[e]||(De[e]=Ce(n,Le.round(6e4/Le.min(60,t)))),{mark(){Me.mark(e)},end(t=!1){Me.measure(e,e);const r=Me.getEntriesByName(e,"measure"),o=r.length>0?r[r.length-1]:null;console.log("PROFILER:",o),Me.clearMarks(e),t&&(clearInterval(De[e]),delete De[e],n())}}}let{Array:We,document:Fe,Math:qe,RegExp:He}=Te(window);function Be(e){let{length:t}=e;if(t>1&&"/"===e[0]){let n="/"===e[t-1];if(n||t>2&&Te(e).endsWith("/i")){let t=[Te(e).slice(1,n?-1:-2)];return n||t.push("i"),new He(...t)}}return new He(Te(e).replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&"))}function Je(e){const t=S();if("function"==typeof t.sendSnippetHitEvent)try{t.sendSnippetHitEvent(e,Fe.location.hostname)}catch(e){}}function _e(){return Te(qe.floor(2116316160*qe.random()+60466176)).toString(36)}function Ve(e){return Te(We.from(e)).map((e=>`'${e}'`)).join(" ")}let ze=!1,Ue=null;function Xe(){return ze}const{console:Ge}=Te(window),Ke=()=>{};function Qe(...e){let{mark:t,end:n}=De("log");if(Xe()){const t=["%c DEBUG","font-weight: bold;"],n=e.indexOf("error"),r=e.indexOf("warn"),o=e.indexOf("success"),s=e.indexOf("info");-1!==n?(t[0]+=" - ERROR",t[1]+="color: red; border:2px solid red",Te(e).splice(n,1)):-1!==r?(t[0]+=" - WARNING",t[1]+="color: orange; border:2px solid orange ",Te(e).splice(r,1)):-1!==o?(t[0]+=" - SUCCESS",t[1]+="color: green; border:2px solid green",Te(e).splice(o,1)):-1!==s&&(t[1]+="color: black;",Te(e).splice(s,1)),Te(e).unshift(...t);const i=Ue;if(i){if(!Te(e).some((e=>Te(i).test(e))))return}}t(),Ge.log(...e),n()}function Ye(e){return s(Xe()?Qe:Ke,null,e)}const{Function:Ze,Object:et,WeakMap:tt}=Te(window);let nt=!1;const rt=new tt;function ot(e,t){nt||function(){const{toString:e}=Ze.prototype,t=l(e,(function(){const t=rt.get(this);return o(e,void 0!==t?t:this,arguments)}));et.defineProperty(window.Function.prototype,"toString",{value:t}),rt.set(t,e),nt=!0}(),rt.set(e,t)}let{parseFloat:st,variables:it,clearTimeout:at,fetch:ct,setTimeout:lt,Array:ut,Error:ft,Map:pt,Object:dt,ReferenceError:ht,Set:yt,WeakMap:gt}=Te(window),{onerror:wt}=Ae(window),mt=Node.prototype,vt=Element.prototype,bt=null;function Et(e,t,n,r=!0){let o=Te(t),s=o.indexOf(".");if(-1==s){let o=dt.getOwnPropertyDescriptor(e,t);if(o&&!o.configurable)return;let s=dt.assign({},n,{configurable:r});if(!o&&!s.get&&s.set){let n=e[t];s.get=()=>n}return void dt.defineProperty(e,t,s)}let i=o.slice(0,s).toString();t=o.slice(s+1).toString();let a=e[i];!a||"object"!=typeof a&&"function"!=typeof a||Et(a,t,n);let c=dt.getOwnPropertyDescriptor(e,i);if(c&&!c.configurable)return;bt||(bt=new gt),bt.has(e)||bt.set(e,new pt);let l=bt.get(e);if(l.has(i))return void l.get(i).set(t,n);let u=new pt([[t,n]]);l.set(i,u),dt.defineProperty(e,i,{get:()=>a,set(e){if(a=e,a&&("object"==typeof a||"function"==typeof a))for(let[e,t]of u)Et(a,e,t)},configurable:r})}function St(e){let t=wt();wt(((...n)=>{let r=n.length&&n[0];return!("string"!=typeof r||!Te(r).includes(e))||("function"==typeof t?o(t,this,n):void 0)}))}function xt(e,t,n,r="",o=!0){let s=Ye(e);if(!n)return void s("error","no property to abort on read");let i=_e(),a=!1;s("info",`aborting on ${n} access`),Et(t,n,{get:function(){throw s("success",`${n} access aborted`,`\nFILTER: ${e} ${r}`),a||(a=!0,Je(`${e} ${r}`)),new ht(i)},set(){}},o),St(i)}function $t(e,t,n,r="",o=!0){let s=Ye(e);if(!n)return void s("error","no property to abort on write");let i=_e(),a=!1;s("info",`aborting when setting ${n}`),Et(t,n,{set:function(){throw s("success",`setting ${n} aborted`,`\nFILTER: ${e} ${r}`),a||(a=!0,Je(`${e} ${r}`)),new ht(i)}},o),St(i)}function Rt(e,t=!1,n=!1){let r=it.abortedIframes,s=it.iframePropertiesToAbort;const a=Ve(e);for(let o of ut.from(window.frames))if(r.has(o))for(let s of e)t&&r.get(o).read.add({property:s,formattedProperties:a}),n&&r.get(o).write.add({property:s,formattedProperties:a});for(let r of e)t&&s.read.add({property:r,formattedProperties:a}),n&&s.write.add({property:r,formattedProperties:a});function c(){for(let e of ut.from(window.frames)){r.has(e)||r.set(e,{read:new yt(s.read),write:new yt(s.write)});let t=r.get(e).read;if(t.size>0){let n=ut.from(t);t.clear();for(let{property:t,formattedProperties:r}of n)xt("abort-on-iframe-property-read",e,t,r)}let n=r.get(e).write;if(n.size>0){let t=ut.from(n);n.clear();for(let{property:n,formattedProperties:r}of t)$t("abort-on-iframe-property-write",e,n,r)}}}c(),r.has(document)||(r.set(document,!0),function(e){let t;function n(e,t){for(let n of t){Et(e,n,r(e,n))}}function r(t,n){let r=t[n],s=function(...t){let n;return n=o(r,this,t),e&&e(),n};return ot(s,r),{get:()=>s}}function s(t,n){let r=dt.getOwnPropertyDescriptor(t,n),{set:o}=r||{};return{set(t){let n;return n=i(o,this,t),e&&e(),n}}}n(mt,["appendChild","insertBefore","replaceChild"]),n(vt,["append","prepend","replaceWith","after","before","insertAdjacentElement","insertAdjacentHTML"]),t=s(vt,"innerHTML"),Et(vt,"innerHTML",t),t=s(vt,"outerHTML"),Et(vt,"outerHTML",t)}(c))}let{Object:Ot}=window;function kt(e,t){if(!(e instanceof Ot))return;let n=e,r=Te(t).split(".");if(0===r.length)return;for(let e=0;e<r.length-1;e++){let t=r[e];if(!m(n,t))return;if(n=n[t],!(n instanceof Ot))return}let o=r[r.length-1];return m(n,o)?[n,o]:void 0}const Pt=Te(/^\d+$/);function Tt(e){switch(e){case"false":return!1;case"true":return!0;case"falseStr":return"false";case"trueStr":return"true";case"null":return null;case"noopFunc":return()=>{};case"trueFunc":return()=>!0;case"falseFunc":return()=>!1;case"emptyArray":return[];case"emptyObj":return{};case"undefined":return;case"":return e;default:return Pt.test(e)?st(e):e}}function jt(e,t){if(!e||!e.length)return!0;const n=_e(),r=new ft(n),o=new URL(self.location.href);o.hash="";const s=/(.*?@)?(\S+)(:\d+):\d+\)?$/,i=[];for(let e of r.stack.split(/[\n\r]+/)){if(Te(e).includes(n))continue;e=Te(e).trim();const t=Te(s).exec(e);if(null===t)continue;let r=t[2];Te(r).startsWith("(")&&(r=Te(r).slice(1)),r===o.href?r="inlineScript":Te(r).startsWith("<anonymous>")&&(r="injectedScript");let a=t[1]?Te(t[1]).slice(0,-1):Te(e).slice(0,Te(t).index).trim();Te(a).startsWith("at")&&(a=Te(a).slice(2).trim());let c=t[3];Te(i).push(" "+`${a} ${r}${c}:1`.trim())}i[0]="stackDepth:"+(i.length-1);const a=Te(i).join("\n");for(let n of e){if(Be(n).test(a))return t("info",`Found needle in stack trace: ${n}`),!0}return t("info",`Stack trace does not match any needle. Stack trace: ${a}`),!1}new pt;let{HTMLScriptElement:At,Object:Lt,ReferenceError:Ct}=Te(window),Mt=Lt.getPrototypeOf(At);const{Error:Nt,Object:It,Array:Dt,Map:Wt}=Te(window);let Ft=null;const qt=new Set;function Ht(e){qt.has(e)||(qt.add(e),Je(e))}function Bt(e,t,n){let r=e;for(const e of n){if(!r||!m(r,e))return!1;r=r[e]}if("string"==typeof r||"number"==typeof r){const e=r.toString();return t.test(e)}return!1}const{Array:Jt,Blob:_t,Error:Vt,Object:zt,Reflect:Ut}=Te(window),Xt=[],Gt=new Set;let{Error:Kt,URL:Qt}=Te(window),{cookie:Yt}=Ae(document);const{Map:Zt,Object:en,Reflect:tn,WeakMap:nn}=Te(window),rn=window.EventTarget.prototype.addEventListener,on=window.EventTarget.prototype.removeEventListener,sn=new nn;let an=[];const cn=new Set;function ln(e){cn.has(e)||(cn.add(e),Je(e))}let{console:un,document:fn,getComputedStyle:pn,isExtensionContext:dn,variables:hn,Array:yn,MutationObserver:gn,Object:wn,DOMMatrix:mn,XPathEvaluator:vn,XPathExpression:bn,XPathResult:En}=Te(window);const{querySelectorAll:Sn}=fn,xn=Sn&&s(Sn,fn);function $n(e,t=!1){return kn(e,xn.bind(fn),fn,t)}function Rn(e,t,n,r){const o=t.getAttribute("xlink:href")||t.getAttribute("href");if(o){const i=xn(o)[0];if(!i&&Xe())return un.log("No elements found matching",o),!1;if(!(s=e)||0===s.length||s.every((e=>""===e.trim()))){const e=r.length>0?r:[];return n.push({element:i,rootParents:[...e,t]}),!1}const a=i.querySelectorAll.bind(i);return{nextBoundElement:i,nestedSelectorsString:e.join("^^"),next$$:a}}var s}function On(e,t){const n=function(e,t=!1){try{const n=navigator.userAgent.includes("Firefox")?e.openOrClosedShadowRoot:browser.dom.openOrClosedShadowRoot(e);return null===n&&Xe()&&!t&&un.log("Shadow root not found or not added in element yet",e),n}catch(n){return Xe()&&!t&&un.log("Error while accessing shadow root",e,n),null}}(t);if(n){const{querySelectorAll:r}=n,o=r&&s(r,n).bind(n);return{nextBoundElement:t,nestedSelectorsString:":host "+e.join("^^"),next$$:o}}return!1}function kn(e,t,n,r,o=[]){if(e.includes("^^")){const[s,i,...a]=e.split("^^");let c,l;switch(i){case"svg":l=Rn;break;case"sh":l=On;break;default:return Xe()&&un.log(i," is not supported. Supported commands are: \n^^sh^^\n^^svg^^"),[]}c=""===s.trim()?[n]:t(s);const u=[];for(const e of c){const t=l(a,e,u,o);if(!t)continue;const{next$$:n,nestedSelectorsString:s,nextBoundElement:i}=t,c=kn(s,n,i,r,[...o,e]);c&&u.push(...c)}return u}const s=t(e);return r?[...s].map((e=>({element:e,rootParents:o.length>0?o:[]}))):s}const{assign:Pn,setPrototypeOf:Tn}=wn;class jn extends bn{evaluate(...e){return Tn(o(super.evaluate,this,e),En.prototype)}}class An extends vn{createExpression(...e){return Tn(o(super.createExpression,this,e),jn.prototype)}}function Ln(e){if(hn.hidden.has(e))return!1;!function(e){dn&&"function"==typeof checkElement&&checkElement(e)}(e),hn.hidden.add(e);let{style:t}=Te(e),n=Te(t,"CSSStyleDeclaration"),r=Te([]);const o=S();let{debugCSSProperties:s}=o;for(let[e,t]of s||[["display","none"]])n.setProperty(e,t,"important"),r.push([e,n.getPropertyValue(e)]);return new gn((()=>{for(let[e,t]of r){let r=n.getPropertyValue(e),o=n.getPropertyPriority(e);r==t&&"important"==o||n.setProperty(e,t,"important")}})).observe(e,{attributes:!0,attributeFilter:["style"]}),!0}function Cn(e){let t=e;if(t.startsWith("xpath(")&&t.endsWith(")")){let t=function(e){let t=e;if(t.startsWith("xpath(")&&t.endsWith(")")){let e=t.slice(6,-1),n=(new An).createExpression(e,null),r=En.ORDERED_NODE_SNAPSHOT_TYPE;return e=>{if(!e)return;let t=n.evaluate(fn,r,null),{snapshotLength:o}=t;for(let n=0;n<o;n++)e(t.snapshotItem(n))}}return t=>$n(e).forEach(t)}(e);return()=>{let e=Te([]);return t((t=>e.push(t))),e}}return()=>yn.from($n(e))}let{ELEMENT_NODE:Mn,TEXT_NODE:Nn,prototype:In}=Node,{prototype:Dn}=Element,{prototype:Wn}=HTMLElement,{console:Fn,variables:qn,DOMParser:Hn,Error:Bn,MutationObserver:Jn,Object:_n,ReferenceError:Vn}=Te(window),{getOwnPropertyDescriptor:zn}=_n;const{CanvasRenderingContext2D:Un,document:Xn,Map:Gn,MutationObserver:Kn,Object:Qn,Set:Yn,WeakMap:Zn,WeakSet:er}=Te(window);let tr,nr=new Zn,rr=new er,or=new Yn,sr=new er;const ir=new Yn;function ar(e,t,n,r){rr.add(e),nr.delete(e);const o=Te(e).closest(t.selector);if(o&&!sr.has(o)){Ln(o),sr.add(o),Ye("hide-if-canvas-contains")("success","Matched: ",o,`\nFILTER: hide-if-canvas-contains ${t.formattedArguments}`);const e="hide-if-canvas-contains "+t.formattedArguments;ir.has(e)||(ir.add(e),Je(e))}else!function(e,t,n,r){or.add({canvasElement:e,rule:t,functionName:n,text:r})}(e,t,n,r)}Te(window);const{Map:cr,MutationObserver:lr,Object:ur,Set:fr,WeakSet:pr}=Te(window);let dr=Element.prototype,{attachShadow:hr}=dr,yr=new pr,gr=new cr;const wr=new fr;let mr=null;const{Error:vr,Object:br,Array:Er,parseFloat:Sr,isNaN:xr}=Te(window);class $r{constructor(e){if("string"!=typeof e)throw new vr("JSONPath: query must be a string");if(!e.length)throw new vr("JSONPath: query must be a non-empty string");this._steps=this._tokenize(e)}_tokenize(e){e=Te(e);const t=new Er;let n=0;for("$"===e[0].toString()&&(n=1);n<e.length;){let r=!1;if(e.startsWith("..",n)?(r=!0,n+=2):"."===e[n].toString()&&n++,"["===e[n].toString()){const o=e.indexOf("]",n);if(-1===o)throw new vr(`JSONPath: unclosed bracket in query "${e}"`);const s=e.slice(n+1,o);if(!s.length)throw new vr(`JSONPath: empty bracket notation in query "${e}"`);s.startsWith("?(")?t.push({type:"filter",key:"?",filter:this._parseFilter(s),recursive:r}):t.push({type:"direct",key:s.replace(/['"]/g,"").toString(),recursive:r}),n=o+1}else{const o=e.slice(n).search(/[.[]/),s=-1===o?e.slice(n).toString():e.slice(n,n+o).toString();if(!s&&!r)throw new vr(`JSONPath: trailing dot with no property name in query "${e}"`);(s||r)&&t.push({type:"direct",key:s||"*",recursive:r}),n+=s.length}}return t}_parseFilter(e){const t=(e=Te(e)).match(/(?:[@.]?)([\w]+(?:\.[\w]+)*)\s*([!=^$*]=|[<>]=?)\s*(?:['"](.+?)['"]|([\w.+-]+))\)/);if(!t)throw new vr(`JSONPath: invalid filter expression "${e}"`);return{property:t[1],operator:t[2],target:null!=t[3]?t[3]:t[4]}}evaluate(e){if(!e||"object"!=typeof e)throw new vr("JSONPath: evaluate() requires an object or array");let t=Te([{parent:{root:e},key:"root"}]);for(const e of this._steps){const n=[];for(const{parent:r,key:o}of t){const t=r[o];t&&"object"==typeof t&&(e.recursive?this._deepSearch(t,e,n):this._match(t,e,n))}t=n}return t}_match(e,t,n){const r="*"===t.key||"?"===t.key?br.keys(e):[t.key];for(const o of r)if(m(e,o)){if("?"===t.key&&!this._test(e[o],t.filter))continue;n.push({parent:e,key:o})}}_deepSearch(e,t,n,r=1e4){if(this._match(e,t,n),!(r<=0))for(const o of br.keys(e))e[o]&&"object"==typeof e[o]&&this._deepSearch(e[o],t,n,r-1)}_test(e,t){if(!t||!e)return!1;let n=e;for(const e of Te(t.property).split(".")){if(null==n||"object"!=typeof n)return!1;n=n[e]}const r=Te(n),o=Te(t.target),s=r.toString(),i=o.toString(),a=Sr(r),c=Sr(o),l=!xr(a)&&!xr(c);switch(t.operator){case"==":return l?a===c:s===i;case"!=":return l?a!==c:s!==i;case"<":return l?a<c:s<i;case"<=":return l?a<=c:s<=i;case">":return l?a>c:s>i;case">=":return l?a>=c:s>=i;case"^=":return r.startsWith(o);case"$=":return r.endsWith(o);case"*=":return r.includes(o);default:return!1}}}const{Array:Rr,Error:Or,JSON:kr,Map:Pr,Object:Tr,Response:jr}=Te(window);let Ar=null;const Lr=new Set;function Cr(e){Lr.has(e)||(Lr.add(e),Je(e))}let{Array:Mr,Error:Nr,JSON:Ir,Map:Dr,Object:Wr,Response:Fr}=Te(window),qr=null;const Hr=new Set;function Br(e){Hr.has(e)||(Hr.add(e),Je(e))}const{Error:Jr,Object:_r,Map:Vr}=Te(window);let zr=null;const Ur=new Set;function Xr(e){Ur.has(e)||(Ur.add(e),Je(e))}function Gr(e,t,n){if(!n.length){if("string"==typeof e||"number"==typeof e){const n=e.toString();return t.test(n)}return!1}let r=e;for(const e of n){if(!r||!m(r,e))return!1;r=r[e]}if("string"==typeof r||"number"==typeof r){const e=r.toString();return t.test(e)}return!1}let{Error:Kr}=Te(window);const{Array:Qr,addEventListener:Yr,Error:Zr,Object:eo,Reflect:to,Set:no,WeakSet:ro}=Te(window),oo=new ro,so=new Qr,io=new no,ao=new no;let{Error:co,Map:lo,Object:uo,console:fo}=Te(window),{toString:po}=Function.prototype,ho=EventTarget.prototype,{addEventListener:yo}=ho,go=null;const wo=new Set;let{fetch:mo}=Te(window),vo=!1;const bo=[],Eo=[],So=()=>{if(!vo){let e=l(mo,((...e)=>{let[t]=e,n="string"==typeof t?t:t&&"string"==typeof t.url?t.url:"";if(bo.length>0&&"string"==typeof t){let r;try{r=new URL(t)}catch(e){if(!(e instanceof TypeError))throw e;r=new URL(t,Te(document).location)}bo.forEach((e=>e(r))),e[0]=r.href,n=r.href}return o(mo,self,e).then((e=>{let t=e;return Eo.forEach((e=>{t=e(t,{url:n})})),t}))}));ot(e,window.fetch),window.fetch=e,vo=!0}},xo=e=>{Eo.push(e),So()};let $o,{Map:Ro,Object:Oo,RegExp:ko,Response:Po}=Te(window);const To=new Set;const{Error:jo,Object:Ao,atob:Lo,btoa:Co,RegExp:Mo}=Te(window);let{XMLHttpRequest:No,WeakMap:Io,Object:Do}=Te(window),Wo=!1;const Fo=[],qo=[],Ho=new Io,Bo=()=>{if(Wo)return;const e=class extends No{open(e,t,...n){return Ho.set(this,{method:e,url:t}),super.open(e,t,...n)}send(e){let t=e;if("string"==typeof e&&Fo.length>0)for(const e of Fo)t=e(t);return super.send(t)}get response(){const e=super.response;if(0===qo.length)return e;const t=Ho.get(this);if(void 0===t)return e;const n="string"==typeof e?e.length:void 0;if(t.lastResponseLength!==n&&(t.cachedResponse=void 0,t.lastResponseLength=n),void 0!==t.cachedResponse)return t.cachedResponse;if("string"!=typeof e)return t.cachedResponse=e;let r=e;for(const e of qo)r=e(r,{url:t.url});return t.cachedResponse=r}get responseText(){const e=this.response;return"string"!=typeof e?super.responseText:e}};ot(e,window.XMLHttpRequest),ot(e.prototype.open,window.XMLHttpRequest.prototype.open),ot(e.prototype.send,window.XMLHttpRequest.prototype.send),ot(Do.getOwnPropertyDescriptor(e.prototype,"response").get,Do.getOwnPropertyDescriptor(window.XMLHttpRequest.prototype,"response").get),ot(Do.getOwnPropertyDescriptor(e.prototype,"responseText").get,Do.getOwnPropertyDescriptor(window.XMLHttpRequest.prototype,"responseText").get),window.XMLHttpRequest=e,Wo=!0},Jo=e=>{qo.push(e),Bo()};let _o,{Array:Vo,Error:zo,JSON:Uo,Object:Xo,RegExp:Go}=Te(window);const Ko=new Set;let Qo,{JSON:Yo,RegExp:Zo}=Te(window);const es=new Set;let ts,{delete:ns,has:rs}=c(URLSearchParams.prototype);const os=new Set;const{Error:ss,Object:is,parseInt:as,isNaN:cs}=Te(window),{toString:ls}=Function.prototype,us=window.setTimeout,fs=window.setInterval,ps={TIMEOUT:"timeout",INTERVAL:"interval",BOTH:"both"};let ds=null;const hs=new Set;const{Array:ys,Date:gs,Object:ws,Set:ms,WeakSet:vs,document:bs,parseInt:Es,window:Ss}=Te(window);let xs=!1;const $s="param_first",Rs="param_second",Os="pyv",ks="client_screen",Ps="ad_type",Ts="none",js="eAFgAQ",As="8AUB",Ls="CHANNEL",Cs=["playerErrorMessageRenderer","UNPLAYABLE"];function Ms(e){if(!e||"object"!=typeof e)return!1;let t=!1;e.adSlots&&(delete e.adSlots,t=!0),e.playerAds&&(delete e.playerAds,t=!0);const n=e.playerConfig&&e.playerConfig.audioConfig;n&&n.muteOnStart&&(delete n.muteOnStart,t=!0);const r=e.messages;return r&&r[0]&&r[0].youThereRenderer&&(delete r[0].youThereRenderer,t=!0),t}function Ns(e,t){if(!e||"object"!=typeof e)return!1;if(null===t||!(t>0))return!1;e.playerConfig||(e.playerConfig={}),e.playerConfig.playbackStartConfig||(e.playerConfig.playbackStartConfig={});const n=e.playerConfig.playbackStartConfig;return n.startSeconds!==t&&(n.startSeconds=t,!0)}function Is(e){if("string"!=typeof e||0===e.length)return null;const t=/[?&]t=([^&#]+)/.exec(e);if(!t)return null;let n=t[1];try{n=decodeURIComponent(n)}catch(e){}if(/^\d+$/.test(n))return Es(n,10);const r=/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i.exec(n);if(!r||!r[1]&&!r[2]&&!r[3])return null;return 3600*Es(r[1]||"0",10)+60*Es(r[2]||"0",10)+Es(r[3]||"0",10)}const{Date:Ds,MutationObserver:Ws,Set:Fs,document:qs,parseInt:Hs,setTimeout:Bs,window:Js}=Te(window);let _s=!1;function Vs(e,t){if(null==e)return;const n=e[t];if("function"==typeof n)try{return n.call(e)}catch(e){return}}function zs(e,t){const n=function(e){if("string"!=typeof e||0===e.length)return"";let t=e;const n=t.indexOf("?");-1!==n&&(t=t.slice(0,n));const r=t.indexOf("#");-1!==r&&(t=t.slice(0,r));const o=t.indexOf("://");-1!==o&&(t=t.slice(o+3));const s=t.indexOf("/");if(-1===s)return"";const i=t.slice(s),a=/^\/([^/]+)/.exec(i);return a?a[1].toLowerCase():""}(e);for(let e=0;e<t.deny.length;e++)if(t.deny[e]===n)return!1;if(0===t.allow.length)return!0;for(let e=0;e<t.allow.length;e++)if(t.allow[e]===n)return!0;return!1}const Us={"abort-current-inline-script":function(e,t=null){const n=Ve(arguments),r=Ye("abort-current-inline-script"),{mark:o,end:s}=De("abort-current-inline-script"),a=t?Be(t):null,c=_e(),l=Te(document).currentScript;let u=!1,f=window;const p=Te(e).split("."),d=Te(p).pop();for(let e of Te(p))if(f=f[e],!f||"object"!=typeof f&&"function"!=typeof f)return void r("warn",p," is not found");const{get:h,set:y}=Lt.getOwnPropertyDescriptor(f,d)||{};let g=f[d];void 0===g&&r("warn","The property",d,"doesn't exist yet. Check typos.");const w=()=>{const e=Te(document).currentScript;if(e instanceof Mt&&""==Te(e,"HTMLScriptElement").src&&e!=l&&(!a||a.test(Te(e).textContent)))throw r("success",p," is aborted \n",e,"\nFILTER: abort-current-inline-script",n),u||(u=!0,Je("abort-current-inline-script "+n)),new Ct(c)},m={get(){return w(),h?i(h,this):g},set(e){w(),y?i(y,this,e):g=e}};o(),Et(f,d,m),s(),St(c)},"abort-on-iframe-property-read":function(...e){const{mark:t,end:n}=De("abort-on-iframe-property-read");t(),Rt(e,!0,!1),n()},"abort-on-iframe-property-write":function(...e){const{mark:t,end:n}=De("abort-on-iframe-property-write");t(),Rt(e,!1,!0),n()},"abort-on-property-read":function(e,t){const n=!("false"===t),r=Ve(arguments),{mark:o,end:s}=De("abort-on-property-read");o(),xt("abort-on-property-read",window,e,r,n),s()},"abort-on-property-write":function(e,t){const n=Ve(arguments),{mark:r,end:o}=De("abort-on-property-write"),s=!("false"===t);r(),$t("abort-on-property-write",window,e,n,s),o()},"array-override":function(e,t,n="false",r,s){if(!e)throw new Nt("[array-override snippet]: Missing method to override.");if(!t)throw new Nt("[array-override snippet]: Missing needle.");Ft||(Ft=new Wt);let i=Ye("array-override");const{mark:a,end:c}=De("array-override"),u=Ve(arguments);if("push"!==e||Ft.has("push"))if("includes"!==e||Ft.has("includes")){if("forEach"===e&&!Ft.has("forEach")){a();const{forEach:e}=Dt.prototype;Ft.set("forEach",Te([]));let t=l(e,(function(t,n){const r=Ft.get("forEach");return o(e,this,[function(e,s,a){for(const{needleRegex:t,pathSegments:n,stackNeedles:o,formattedArgs:s}of r)if(n.length||"string"!=typeof e&&"number"!=typeof e){if(n.length&&"object"==typeof e&&null!==e&&Bt(e,t,n)&&jt(o,i))return i("success",`Array.forEach skipped callback for object containing needle: ${t}\nFILTER: array-override ${s}`),void Ht("array-override "+s)}else{const n=e.toString();if(n.match&&n.match(t)&&jt(o,i))return i("success",`Array.forEach skipped callback for item matching needle: ${t}\nFILTER: array-override ${s}`),void Ht("array-override "+s)}return o(t,n||this,[e,s,a])},n])}));ot(t,e),It.defineProperty(window.Array.prototype,"forEach",{value:t}),i("info","Wrapped Array.prototype.forEach"),c()}}else{a();const{includes:e}=Dt.prototype;Ft.set("includes",Te([]));let t=l(e,(function(t){const n=Ft.get("includes");for(const{needleRegex:e,retVal:r,pathSegments:o,stackNeedles:s,formattedArgs:a}of n)if(o.length||"string"!=typeof t&&"number"!=typeof t){if(o.length&&"object"==typeof t&&null!==t&&Bt(t,e,o)&&jt(s,i))return i("success",`Array.includes returned ${r} for object containing ${e}\nFILTER: array-override ${a}`),Ht("array-override "+a),r}else if(t.toString().match&&t.toString().match(e)&&jt(s,i))return i("success",`Array.includes returned ${r} for ${e}\nFILTER: array-override ${a}`),Ht("array-override "+a),r;return o(e,this,arguments)}));ot(t,e),It.defineProperty(window.Array.prototype,"includes",{value:t}),i("info","Wrapped Array.prototype.includes"),c()}else{a();const{push:e}=Dt.prototype;Ft.set("push",Te([]));let t=l(e,(function(t){const n=Ft.get("push");for(const{needleRegex:e,pathSegments:r,stackNeedles:o,formattedArgs:s}of n)if(r.length||"string"!=typeof t&&"number"!=typeof t){if(r.length&&"object"==typeof t&&null!==t&&Bt(t,e,r)&&jt(o,i))return i("success",`Array.push is ignored for object containing needle: ${e}\nFILTER: array-override ${s}`),void Ht("array-override "+s)}else{const n=t.toString();if(n.match&&n.match(e)&&jt(o,i))return i("success",`Array.push is ignored for needle: ${e}\nFILTER: array-override ${s}`),void Ht("array-override "+s)}return o(e,this,arguments)}));ot(t,e),It.defineProperty(window.Array.prototype,"push",{value:t}),i("info","Wrapped Array.prototype.push"),c()}const f=Be(t);let p=[];r&&(p=r.split("."));let d=[];s&&(d=s.split(",").map((e=>e.trim())));const h=Ft.get(e),y="true"===n;h.push({needleRegex:f,retVal:y,pathSegments:p,stackNeedles:d,formattedArgs:u}),Ft.set(e,h)},"blob-override":function(e,t="",n=null){if(!e)throw new Vt("[blob-override snippet]: Missing parameter search.");const r=Ye("blob-override"),o=Ve(arguments),{mark:s,end:i}=De("blob-override");if(s(),Xt.push({match:Be(e),replaceWith:t,needle:n?Be(n):null,formattedArgs:o}),Xt.length>1)return;const a=_t;function c(e,t={}){if(Jt.isArray(e)){let t=Te(e).join("");for(const e of Te(Xt))if((!e.needle||e.needle.test(t))&&e.match.test(t)){t=t.replace(e.match,e.replaceWith),r("success",`Replaced: ${e.match} → ${e.replaceWith},\nFILTER: blob-override ${e.formattedArgs}`);const n="blob-override "+e.formattedArgs;Gt.has(n)||(Gt.add(n),Je(n))}e=[t]}const n=Ut.construct(a,[e,t]);return zt.setPrototypeOf(n,c.prototype),n}c.prototype=a.prototype,zt.setPrototypeOf(c,a),ot(c,window.Blob),window.Blob=c,r("info","Wrapped Blob constructor in context "),i()},"cookie-remover":function(e,t=!1){if(!e)throw new Kt("[cookie-remover snippet]: No cookie to remove.");const n=Ve(arguments);let r=Ye("cookie-remover");const{mark:o,end:s}=De("cookie-remover");let i=Be(e),a=!1;if(!Te(/^http|^about/).test(location.protocol))return void r("warn","Snippet only works for http or https and about.");function c(){return Te(Yt()).split(";").filter((e=>i.test(Te(e).split("=")[0])))}const l=()=>{r("info","Parsing cookies for matches"),o();for(const e of Te(c())){let t=Te(location.hostname);!t&&Te(location.ancestorOrigins)&&Te(location.ancestorOrigins[0])&&(t=new Qt(Te(location.ancestorOrigins[0])).hostname);const o=Te(e).split("=")[0],s="expires=Thu, 01 Jan 1970 00:00:00 GMT",i="path=/",c=t.split(".");for(let e=c.length;e>0;e--){const t=c.slice(c.length-e).join(".");Yt(`${Te(o).trim()}=;${s};${i};domain=${t}`),Yt(`${Te(o).trim()}=;${s};${i};domain=.${t}`),r("success",`Set expiration date on ${o}`,"\nFILTER: cookie-remover",n),a||(a=!0,Je("cookie-remover "+n))}}s()};if(l(),t){let e=c();setInterval((()=>{let t=c();if(t!==e)try{l()}finally{e=t}}),1e3)}},debug:function(e){ze=!0,e&&(Ue=Be(e))},"event-override":function(e,t,n=null){const r=Ve(arguments),s={eventType:e,mode:t,needle:n?Be(n):null,formattedArgs:r};if(an.includes(s)||an.push(s),an.length>1)return;let a=Ye("[event-override]");const{mark:c,end:u}=De("event-override"),f=en.getOwnPropertyDescriptor(window.EventTarget.prototype,"addEventListener");if(f.configurable){let e=l(rn,(function(e,t,n){c();const r=an.filter((t=>t.eventType===e));if(!r.length||e!==r[0].eventType)return u(),o(rn,this,arguments);const s=r.find((e=>"disable"===e.mode&&(!e.needle||e.needle.test(t.toString()))));if(s)return a("success",`Disabling ${s.eventType} event, \nFILTER: event-override ${s.formattedArgs}`),ln("event-override "+s.formattedArgs),void u();const l=r.filter((e=>"trusted"===e.mode&&(!e.needle||e.needle.test(t.toString()))));if("function"!=typeof t&&(!t||"function"!=typeof t.handleEvent)||!l.length||e!==l[0].eventType)return u(),o(rn,this,arguments);const f=function(e){const n=new Proxy(e,{get(t,n){if("isTrusted"===n)return a("success",`Providing trusted value for ${e.type} event`),ln("event-override "+l[0].formattedArgs),!0;const r=tn.get(t,n);return"function"==typeof r?function(...e){return o(r,t,e)}:r}});return"function"==typeof t?i(t,this,n):i(t.handleEvent,t,n)};return f.originalListener=t,sn.has(t)||sn.set(t,new Zt),sn.get(t).set(e,f),a("info",`\nWrapping event listener for ${e}`),u(),o(rn,this,[e,f,n])}));ot(e,rn),en.defineProperty(window.EventTarget.prototype,"addEventListener",{...f,value:e})}const p=en.getOwnPropertyDescriptor(window.EventTarget.prototype,"removeEventListener");if(p.configurable){let e=l(on,(function(e,t,n){if(t&&sn.has(t)&&sn.get(t).has(e)){const r=sn.get(t).get(e);return sn.get(t).delete(e),o(on,this,[e,r,n])}return o(on,this,arguments)}));ot(e,on),en.defineProperty(window.EventTarget.prototype,"removeEventListener",{...p,value:e})}a("info","Initialized event-override snippet")},"freeze-element":function(e,t="",...n){const r=Ve(arguments);let s,a,c=!1,l=!1,u=Te(n).filter((e=>!y(e))),f=Te(n).filter((e=>y(e))).map(Be),p=_e(),d=Cn(e);!function(){let n=Te(t).split("+");1===n.length&&""===n[0]&&(n=[]);for(let t of n)switch(t){case"subtree":c=!0;break;case"abort":l=!0;break;default:throw new Bn("[freeze] Unknown option passed to the snippet. [selector]: "+e+" [option]: "+t)}}();let h={selector:e,shouldAbort:l,rid:p,exceptionSelectors:u,regexExceptions:f,changeId:0};function y(e){return e.length>=2&&"/"==e[0]&&"/"==e[e.length-1]}function g(){a=d(),w(a,!1)}function w(e,t=!0){for(let n of e)qn.frozen.has(n)||(qn.frozen.set(n,h),!t&&c&&new Jn((e=>{for(let t of Te(e))w(Te(t,"MutationRecord").addedNodes)})).observe(n,{childList:!0,subtree:!0}),c&&Te(n).nodeType===Mn&&w(Te(n).childNodes))}function m(e,...t){Qe(`[freeze][${e}] `,...t)}function v(e,t,n,r){let o=r.selector,s=r.changeId,i="string"==typeof e,a=r.shouldAbort?"aborting":"watching";switch(Fn.groupCollapsed(`[freeze][${s}] ${a}: ${o}`),n){case"appendChild":case"append":case"prepend":case"insertBefore":case"replaceChild":case"insertAdjacentElement":case"insertAdjacentHTML":case"insertAdjacentText":case"innerHTML":case"outerHTML":m(s,i?"text: ":"node: ",e),m(s,"added to node: ",t);break;case"replaceWith":case"after":case"before":m(s,i?"text: ":"node: ",e),m(s,"added to node: ",Te(t).parentNode);break;case"textContent":case"innerText":case"nodeValue":m(s,"content of node: ",t),m(s,"changed to: ",e)}m(s,`using the function "${n}"`),Fn.groupEnd(),r.changeId++}function b(e,t){if(t)for(let n of t)if(n.test(e))return!0;return!1}qn.frozen.has(document)||(qn.frozen.set(document,!0),function(){let e;function t(e){return e&&qn.frozen.has(e)}function n(e){try{return e&&(qn.frozen.has(e)||qn.frozen.has(Te(e).parentNode))}catch(e){return!1}}function r(e,t){try{return e&&(qn.frozen.has(e)&&t||qn.frozen.has(Te(e).parentNode)&&!t)}catch(e){return!1}}function o(e){return qn.frozen.get(e)}function s(e){try{if(qn.frozen.has(e))return qn.frozen.get(e);let t=Te(e).parentNode;return qn.frozen.get(t)}catch(e){}}function i(e,t){try{if(qn.frozen.has(e)&&t)return qn.frozen.get(e);let n=Te(e).parentNode;return qn.frozen.get(n)}catch(e){}}e=O(In,"appendChild",t,o),Et(In,"appendChild",e),e=O(In,"insertBefore",t,o),Et(In,"insertBefore",e),e=O(In,"replaceChild",t,o),Et(In,"replaceChild",e),e=k(Dn,"append",t,o),Et(Dn,"append",e),e=k(Dn,"prepend",t,o),Et(Dn,"prepend",e),e=k(Dn,"replaceWith",n,s),Et(Dn,"replaceWith",e),e=k(Dn,"after",n,s),Et(Dn,"after",e),e=k(Dn,"before",n,s),Et(Dn,"before",e),e=P(Dn,"insertAdjacentElement",r,i),Et(Dn,"insertAdjacentElement",e),e=P(Dn,"insertAdjacentHTML",r,i),Et(Dn,"insertAdjacentHTML",e),e=P(Dn,"insertAdjacentText",r,i),Et(Dn,"insertAdjacentText",e),e=T(Dn,"innerHTML",t,o),Et(Dn,"innerHTML",e),e=T(Dn,"outerHTML",n,s),Et(Dn,"outerHTML",e),e=j(In,"textContent",t,o),Et(In,"textContent",e),e=j(Wn,"innerText",t,o),Et(Wn,"innerText",e),e=j(In,"nodeValue",t,o),Et(In,"nodeValue",e)}()),s=new Jn(g),s.observe(document,{childList:!0,subtree:!0}),g();let E=!1;function S(e){throw E||(E=!0,Je("freeze-element "+r)),new Vn(e)}function x(e,t,n,r){let o=new Hn,{body:s}=Te(o.parseFromString(e,"text/html")),i=$(Te(s).childNodes,t,n,r);return Te(i).map((e=>{switch(Te(e).nodeType){case Mn:return Te(e).outerHTML;case Nn:return Te(e).textContent;default:return""}})).join("")}function $(e,t,n,r){let o=Te([]);for(let s of e)R(s,t,n,r)&&o.push(s);return o}function R(e,t,n,r){let o=r.shouldAbort,s=r.regexExceptions,i=r.exceptionSelectors,a=r.rid;if("string"==typeof e){let i=e;return!!b(i,s)||(Xe()&&v(i,t,n,r),o&&S(a),Xe())}let c=e;switch(Te(c).nodeType){case Mn:return!!function(e,t){if(t){let n=Te(e);for(let e of t)if(n.matches(e))return!0}return!1}(c,i)||(o&&(Xe()&&v(c,t,n,r),S(a)),!!Xe()&&(Ln(c),v(c,t,n,r),!0));case Nn:return!!b(Te(c).textContent,s)||(Xe()&&v(c,t,n,r),o&&S(a),!1);default:return!0}}function O(e,t,n,r){let s=zn(e,t)||{},a=s.get&&i(s.get,e)||s.value;if(a)return{get:()=>function(...e){if(n(this)){let n=r(this);if(n){let r=e[0];if(!R(r,this,t,n))return r}}return o(a,this,e)}}}function k(e,t,n,r){let s=zn(e,t)||{},a=s.get&&i(s.get,e)||s.value;if(a)return{get:()=>function(...e){if(!n(this))return o(a,this,e);let s=r(this);if(!s)return o(a,this,e);let i=$(e,this,t,s);return i.length>0?o(a,this,i):void 0}}}function P(e,t,n,r){let s=zn(e,t)||{},a=s.get&&i(s.get,e)||s.value;if(a)return{get:()=>function(...e){let[s,c]=e,l="afterbegin"===s||"beforeend"===s;if(n(this,l)){let e=r(this,l);if(e){let n,r=l?this:Te(this).parentNode;switch(t){case"insertAdjacentElement":if(!R(c,r,t,e))return c;break;case"insertAdjacentHTML":return n=x(c,r,t,e),n?i(a,this,s,n):void 0;case"insertAdjacentText":if(!R(c,r,t,e))return}}}return o(a,this,e)}}}function T(e,t,n,r){let o=zn(e,t)||{},{set:s}=o;if(s)return{set(e){if(!n(this))return i(s,this,e);let o=r(this);if(!o)return i(s,this,e);let a=x(e,this,t,o);return a?i(s,this,a):void 0}}}function j(e,t,n,r){let o=zn(e,t)||{},{set:s}=o;if(s)return{set(e){if(!n(this))return i(s,this,e);let o=r(this);return o?R(e,this,t,o)?i(s,this,e):void 0:i(s,this,e)}}}},"hide-if-canvas-contains":function(e,t="canvas",n=""){const r=Ye("hide-if-canvas-contains"),s=Ve(arguments),{mark:i,end:a}=De("hide-if-canvas-contains");if(!e)return void r("error","The parameter 'search' is required");if(!tr){i();const u=Un.prototype;function f(e){const t=u[e];let n=l(t,(function(n,...r){const s=this.canvas;if(rr.has(s))return o(t,this,[n,...r]);const i=((nr.get(s)||"")+n).slice(-1e4);nr.set(s,i);for(const[t,n]of tr)t.test(i)&&ar(s,n,e,i);return o(t,this,[n,...r])}));ot(n,t),Qn.defineProperty(window.CanvasRenderingContext2D.prototype,e,{value:n})}function p(){const e=u.clearRect;let t=l(e,(function(...t){let n=!1,r=!0;for(const{clearRectBehavior:e}of tr.values())"always"===e&&(n=!0),"never"!==e&&(r=!1);if(!r){const[e,r,o,s]=t,i=e<=0&&r<=0&&o>=this.canvas.width&&s>=this.canvas.height;(n||i)&&nr.delete(this.canvas)}return o(e,this,t)}));ot(t,e),Qn.defineProperty(window.CanvasRenderingContext2D.prototype,"clearRect",{value:t})}function d(){const e=u.drawImage;let t=l(e,(function(t,...n){if(r("info","drawImage called with arguments:",t,...n),t&&"string"==typeof t.src&&t.src)for(const[e,n]of tr)e.test(t.src)&&ar(this.canvas,n,"drawImage",t.src);return o(e,this,[t,...n])}));ot(t,e),Qn.defineProperty(window.CanvasRenderingContext2D.prototype,"drawImage",{value:t})}r("info","CanvasRenderingContext2D proxied"),f("fillText"),f("strokeText"),p(),d(),tr=new Gn;new Kn((e=>{for(let t of Te(e))"childList"===t.type&&or.forEach((e=>{const t=Te(e.canvasElement).closest(e.rule.selector);if(t&&!sr.has(t)){Ln(t),sr.add(t),or.delete(e),Ye("hide-if-canvas-contains")("success","Matched: ",t,`\nFILTER: hide-if-canvas-contains ${e.rule.formattedArguments}`);const n="hide-if-canvas-contains "+e.rule.formattedArguments;ir.has(n)||(ir.add(n),Je(n))}}))})).observe(Xn,{childList:!0,subtree:!0}),a()}const c=Be(e);tr.set(c,{selector:t,formattedArguments:s,clearRectBehavior:n})},"hide-if-shadow-contains":function(e,t="*"){const n=Ve(arguments);let r=`${e}\\${t}`;gr.has(r)||gr.set(r,[Be(e),t,Ke,n]);const s=Ye("hide-if-shadow-contains"),{mark:i,end:a}=De("hide-if-shadow-contains");if(!mr){mr=new lr((e=>{i();let t=new fr;for(let{target:n}of Te(e)){let e=Te(n).parentNode;for(;e;)[n,e]=[e,Te(n).parentNode];if(!yr.has(n)&&!t.has(n)){t.add(n);for(let[e,t,r,o]of gr.values())if(e.test(Te(n).textContent)){let e=Te(n.host).closest(t);if(e){r(),Te(n).appendChild(document.createElement("style")).textContent=":host {display: none !important}",Ln(e),yr.add(n),s("success","Hiding: ",e,`\nFILTER: hide-if-shadow-contains ${o}`);const t="hide-if-shadow-contains "+o;wr.has(t)||(wr.add(t),Je(t))}a()}}}}));let e=l(hr,(function(){let e=o(hr,this,arguments);return s("info","attachShadow is called for: ",e),mr.observe(e,{childList:!0,characterData:!0,subtree:!0}),e}));ot(e,hr),ur.defineProperty(dr,"attachShadow",{value:e})}},"json-override":function(e,t,n="",r=""){if(!e)throw new Or("[json-override snippet]: Missing paths to override.");if(void 0===t)throw new Or("[json-override snippet]: No value to override with.");let s=Ye("json-override");const{mark:i,end:a}=De("json-override");if(!Ar){function p(e,t){for(let{formattedArgs:n,prune:r,jsonPathObjects:o,needle:i,filter:a,value:c}of Ar.values())if(!a||a.test(t)){if(Te(i).some((t=>!kt(e,t))))return e;for(let t of r)if(t.startsWith("jsonpath("))try{const r=o.get(t);r.evaluate(e).forEach((({parent:e,key:t})=>{s("success",`JSONPath match found at [${t}], replaced with ${c}`,`\nFILTER: json-override ${n}`),Cr("json-override "+n),e[t]=Tt(c)}))}catch(e){s("error",`JSONPath evaluation failed for: ${t}. Error: ${e.message}`)}else t.includes("{}")||t.includes("[]")?d(e,t,c,n):h(e,t,c,n)}return e}function d(e,t,n,r){let o=Te(t).split("."),i=e;for(let e=0;e<o.length;e++){let a=o[e];if("[]"===a)return void(Rr.isArray(i)&&(s("info",`Iterating over array at: ${a}`),Te(i).forEach((t=>{null!=t&&d(t,o.slice(e+1).join("."),n,r)}))));if("{}"===a)return void(i&&"object"==typeof i&&(s("info",`Iterating over object at: ${a}`),Tr.keys(i).forEach((t=>{let s=i[t];null!=s&&d(s,o.slice(e+1).join("."),n,r)}))));if(!i||"object"!=typeof i||!m(i,a))return;e===o.length-1?(s("success",`Found ${t}, replaced it with ${n}`,`\nFILTER: json-override ${r}`),Cr("json-override "+r),i[a]=Tt(n)):i=i[a]}}function h(e,t,n,r){let o=kt(e,t);void 0!==o&&(s("success",`Found ${t}, replaced it with ${n}`,`\nFILTER: json-override ${r}`),Cr("json-override "+r),o[0][o[1]]=Tt(n))}i();let{parse:y}=kr;Ar=new Pr;let g=l(y,(function(e){return p(o(y,this,arguments),e)}));ot(g,y),Tr.defineProperty(window.JSON,"parse",{value:g}),s("info","Wrapped JSON.parse for override");let{json:w}=jr.prototype;Tr.defineProperty(window.Response.prototype,"json",{value:l(w,(function(e){return o(w,this,arguments).then((t=>p(t,e)))}))}),s("info","Wrapped Response.json for override"),a()}const c=Ve(arguments),u=Te(e).split(/ +/),f=new Pr;for(const v of u)if(v.startsWith("jsonpath("))try{f.set(v,new $r(v.slice(9,-1)))}catch(b){s("error",`Invalid JSONPath query: ${v}. Error: ${b.message}`)}Ar.set(e,{formattedArgs:c,prune:u,jsonPathObjects:f,needle:n.length?Te(n).split(/ +/):[],filter:r?Be(r):null,value:t})},"json-prune":function(e,t="",n=""){if(!e)throw new Nr("Missing paths to prune");let r=Ye("json-prune");const{mark:s,end:i}=De("json-prune");if(!qr){function f(e){for(let{prune:t,needle:n,jsonPathObjects:o,stackNeedle:s,formattedArgs:i}of qr.values()){if(Te(n).length>0&&Te(n).some((t=>!kt(e,t))))return e;if(Te(s)&&Te(s).length>0&&!jt(s,r))return e;for(let n of t)if(n.startsWith("jsonpath("))try{const t=o.get(n);t.evaluate(e).forEach((({parent:e,key:t})=>{r("success",`JSONPath match found and deleted at [${t}]`,`\nFILTER: json-prune ${i}`),Br("json-prune "+i),delete e[t]}))}catch(e){r("error",`JSONPath evaluation failed for: ${n}. Error: ${e.message}`)}else n.includes("{}")||n.includes("[]")||n.includes("{-}")||n.includes("[-]")?p(e,n,i):h(e,n,i)}return e}function p(e,t,n){let o=Te(t).split("."),s=e;for(let e=0;e<o.length;e++){let i=o[e];if("[]"===i)return void(Mr.isArray(s)&&(r("info",`Iterating over array at: ${i}`),Te(s).forEach((t=>p(t,o.slice(e+1).join("."),n)))));if("[-]"===i){if(Mr.isArray(s)){r("info",`Iterating over array with element removal at: ${i}`);let t=o.slice(e+1).join("."),a=[];Te(s).forEach(((e,n)=>{d(e,t)&&a.push(n)}));for(let e=a.length-1;e>=0;e--)r("success",`Found element at index ${a[e]} matching ${t} and removed entire element, \nFILTER: json-prune ${n}`),Br("json-prune "+n),s.splice(a[e],1)}return}if("{}"===i)return void("object"==typeof s&&null!==s&&(r("info",`Iterating over object at: ${i}`),Wr.keys(s).forEach((t=>p(s[t],o.slice(e+1).join("."),n)))));if("{-}"===i){if("object"==typeof s&&null!==s){r("info",`Iterating over object with element removal at: ${i}`);let t=o.slice(e+1).join("."),a=[];Wr.keys(s).forEach((e=>{d(s[e],t)&&a.push(e)})),a.forEach((e=>{r("success",`Found object key ${e} matching ${t} and removed entire element, \nFILTER: json-prune ${n}`),Br("json-prune "+n),delete s[e]}))}return}if(!s||"object"!=typeof s||!m(s,i))return;e===o.length-1?(r("success",`Found ${t} and deleted, \nFILTER: json-prune ${n}`),Br("json-prune "+n),delete s[i]):s=s[i]}}function d(e,t){if(!t||""===t)return!0;let n=Te(t).split("."),r=e;for(let e=0;e<n.length;e++){let t=n[e];if("[]"===t)return!!Mr.isArray(r)&&Te(r).some((t=>d(t,n.slice(e+1).join("."))));if("{}"===t)return"object"==typeof r&&null!==r&&Wr.keys(r).some((t=>d(r[t],n.slice(e+1).join("."))));if(!r||"object"!=typeof r||!m(r,t))return!1;if(e===n.length-1)return!0;r=r[t]}return!1}function h(e,t,n){let o=kt(e,t);void 0!==o&&(r("success",`Found ${t} and deleted`,`\nFILTER: json-prune ${n}`),Br("json-prune "+n),delete o[0][o[1]])}s();let{parse:y}=Ir;qr=new Dr;let g=l(y,(function(){return f(o(y,this,arguments))}));ot(g,y),Wr.defineProperty(window.JSON,"parse",{value:g}),r("info","Wrapped JSON.parse for prune");let{json:w}=Fr.prototype,v=l(w,(function(){return o(w,this,arguments).then((e=>f(e)))}));ot(v,w),Wr.defineProperty(window.Response.prototype,"json",{value:v}),r("info","Wrapped Response.json for prune"),i()}const a=Ve(arguments),c=Te(e).split(/ +/),u=new Dr;for(const b of c)if(b.startsWith("jsonpath("))try{u.set(b,new $r(b.slice(9,-1)))}catch(E){r("error",`Invalid JSONPath query: ${b}. Error: ${E.message}`)}qr.set(e,{formattedArgs:a,prune:c,jsonPathObjects:u,needle:t.length?Te(t).split(/ +/):[],stackNeedle:n.length?Te(n).split(/ +/):[]})},"map-override":function(e,t,n="",r,s){if(!e)throw new Jr("[map-override snippet]: Missing method to override.");if(!t)throw new Jr("[map-override snippet]: Missing needle.");zr||(zr=new Vr);let a=Ye("map-override");const{mark:c,end:u}=De("map-override"),{set:f,get:p,has:d}=Vr.prototype,h=Ve(arguments);if("set"!==e||zr.has("set"))if("get"!==e||zr.has("get")){if("has"===e&&!zr.has("has")){c(),i(f,zr,"has",Te([]));let e=l(d,(function(e){const t=i(p,zr,"has");for(const{needleRegex:n,retVal:r,stackNeedles:o}of t)if("string"==typeof e||"number"==typeof e){const t=e.toString();if(n.test(t)&&jt(o,a))return a("success",`Map.has returned ${r} for key: ${t}\nFILTER: map-override ${h}`),Xr("map-override "+h),r}return o(d,this,arguments)}));ot(e,d),_r.defineProperty(window.Map.prototype,"has",{value:e}),a("info","Wrapped Map.prototype.has"),u()}}else{c(),i(f,zr,"get",Te([]));let e=l(p,(function(e){const t=i(p,zr,"get");for(const{needleRegex:n,retVal:r,stackNeedles:o}of t)if("string"==typeof e||"number"==typeof e){const t=e.toString();if(n.test(t)&&jt(o,a))return a("success",`Map.get returned ${r} for key: ${t}\nFILTER: map-override ${h}`),Xr("map-override "+h),r}return o(p,this,arguments)}));ot(e,p),_r.defineProperty(window.Map.prototype,"get",{value:e}),a("info","Wrapped Map.prototype.get"),u()}else{c(),i(f,zr,"set",Te([]));let e=l(f,(function(e,t){const n=i(p,zr,"set");for(const{needleRegex:e,pathSegments:r,stackNeedles:o}of n)if(Gr(t,e,r)&&jt(o,a))return a("success",`Map.set is ignored for value matching needle: ${e}\nFILTER: map-override ${h}`),Xr("map-override "+h),this;return o(f,this,arguments)}));ot(e,f),_r.defineProperty(window.Map.prototype,"set",{value:e}),a("info","Wrapped Map.prototype.set"),u()}const y=Be(t);let g=[];r&&(g=r.split("."));let w=[];s&&(w=s.split(",").map((e=>e.trim())));const m=i(p,zr,e);let v;"get"===e?v=""===n?void 0:n:"has"===e&&(v="true"===n),m.push({needleRegex:y,retVal:v,pathSegments:g,stackNeedles:w}),i(f,zr,e,m)},"override-property-read":function(e,t,n){if(!e)throw new Kr("[override-property-read snippet]: No property to override.");if(void 0===t)throw new Kr("[override-property-read snippet]: No value to override with.");const r=Ve(arguments);let o=Ye("override-property-read");const{mark:s,end:i}=De("override-property-read");let a=Tt(t),c=!1;o("info",`Overriding ${e}.`);const l=!("false"===n);s(),Et(window,e,{get:()=>(o("success",`${e} override done.`,"\nFILTER: override-property-read",r),c||(c=!0,Je("override-property-read "+r)),a),set(){}},l),i()},"prevent-element-src-loading":function(e,t){if(!e||"string"!=typeof e)throw new Zr("[prevent-element-src-loading snippet]: tagName param must be a string.");if(!t)throw new Zr("[prevent-element-src-loading snippet]: Missing search parameter.");if(e=Te(e).toString().toLowerCase(),!Te(["script","img","iframe","link"]).includes(e))throw new Zr("[prevent-element-src-loading snippet]: tagName parameter is incorrect.");const n={script:"data:text/javascript;base64,KCk9Pnt9",img:"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",iframe:"data:text/html;base64,PGRpdj48L2Rpdj4=",link:"data:text/plain;base64,"},r={script:window.HTMLScriptElement,img:window.HTMLImageElement,iframe:window.HTMLIFrameElement,link:window.HTMLLinkElement}[e],o="link"===e?"href":"src",s="onerror",i=Ye("[prevent-element-src-loading snippet]"),a=Ve(arguments),c="prevent-element-src-loading "+a,{mark:l,end:u}=De("prevent-element-src-loading");l();const f=Be(t);if(so.push({tagName:e,searchRegex:f}),i("info",`Added filter rule\nFILTER: prevent-element-src-loading ${a}`),!ao.has(e)){ao.add(e);const t={apply:(e,t,r)=>{if(!r[0]||!r[1])return to.apply(e,t,r);const s=t.nodeName.toLowerCase(),a=r[0].toLowerCase(),l=r[1];return a===o&&so.some((e=>s===e.tagName&&e.searchRegex.test(l)))?(oo.add(t),i("success",`Replaced setAttribute for ${a}: ${l} → ${n[s]}`),io.has(c)||(io.add(c),Je(c)),to.apply(e,t,[a,n[s]])):to.apply(e,t,r)}};r.prototype.setAttribute=new Proxy(r.prototype.setAttribute,t),i("info","Wrapped setAttribute function");const s=eo.getOwnPropertyDescriptor(r.prototype,o);if(!s)return;eo.defineProperty(r.prototype,o,{enumerable:!0,configurable:!0,get(){return s.get.call(this)},set(e){const t=this.nodeName.toLowerCase();so.some((n=>t===n.tagName&&n.searchRegex.test(e)))?(oo.add(this),i("success",`Replaced in src/href setter ${e} → ${n[t]}`),io.has(c)||(io.add(c),Je(c)),s.set.call(this,n[t])):s.set.call(this,e)}}),i("info","Wrapped src/href property setter")}if(1===so.length){const e=eo.getOwnPropertyDescriptor(HTMLElement.prototype,s);if(!e)return;eo.defineProperty(HTMLElement.prototype,s,{enumerable:!0,configurable:!0,get(){return e.get.call(this)},set(t){oo.has(this)?(i("success",`Replaced in onerror setter ${t} → () => {}`),io.has(c)||(io.add(c),Je(c)),e.set.call(this,(()=>{}))):e.set.call(this,t)}}),i("info","Wrapped onerror property setter");const t={apply:(e,t,n)=>{if(!n[0]||!n[1]||!t)return to.apply(e,t,n);const r=n[0];return"function"==typeof t.getAttribute&&oo.has(t)&&"error"===r?(i("success",`Replaced error event handler on ${t} with () => {}`),io.has(c)||(io.add(c),Je(c)),to.apply(e,t,[r,()=>{}])):to.apply(e,t,n)}};EventTarget.prototype.addEventListener=new Proxy(EventTarget.prototype.addEventListener,t),i("info","Wrapped addEventListener");(()=>{Yr("error",(e=>{const t=e.target;if(!t||!t.nodeName)return;const n=t.src||t.href,r=t.nodeName.toLowerCase();so.some((e=>r===e.tagName&&n&&e.searchRegex.test(n)))&&(t.onerror=()=>{})}),!0),i("info","Added event listener to defuse global errors")})()}u()},"prevent-listener":function(e,t,n){if(!e)throw new co("[prevent-listener snippet]: No event type.");if(!go){go=new lo;let e=Ye("[prevent]");const{mark:t,end:n}=De("prevent-listener");let r=l(yo,(function(r,s){t();for(let{evt:t,handlers:n,selectors:o,formattedArgs:a}of go.values()){if(!t.test(r))continue;let c=this instanceof Element;for(let l=0;l<n.length;l++){const u=n[l],f=o[l];if(f&&(!c||!Te(this).matches(f)))continue;if(u){const t=function(){try{const e=String("function"==typeof s?s:s.handleEvent);return u.test(e)}catch(t){return e("error","Error while trying to stringify listener: ",t),!1}};if(!function(){try{const e=i(po,"function"==typeof s?s:s.handleEvent);return u.test(e)}catch(t){return e("error","Error while trying to stringify listener: ",t),!1}}()&&!t())continue}const p="prevent-listener "+a;return wo.has(p)||(wo.add(p),Je(p)),void(Xe()&&(fo.groupCollapsed("DEBUG [prevent] was successful",`\nFILTER: prevent-listener ${a}`),e("success",`type: ${r} matching ${t}`),e("success","handler:",s),u&&e("success",`matching ${u}`),f&&e("success","on element: ",this,` matching ${f}`),e("success","was prevented from being added"),fo.groupEnd()))}}return n(),o(yo,this,arguments)}));ot(r,yo),uo.defineProperty(ho,"addEventListener",{value:r}),e("info","Wrapped addEventListener")}const r=Ve(arguments);go.has(e)||go.set(e,{evt:Be(e),handlers:[],selectors:[],formattedArgs:r});let{handlers:s,selectors:a}=go.get(e);s.push(t?Be(t):null),a.push(n)},profile:function(){Ie=!1},"replace-fetch-response":function(e,t="",n=null){const r=Ve(arguments),o=Ye("replace-fetch-response"),{mark:s,end:i}=De("replace-fetch-response");if(!e)return void o("error","The parameter 'search' is required");if(!$o){const e=e=>{s();return Te(e).clone().text().then((t=>{let n=Te(t);for(const[e,{replacement:t,needle:r,formattedArgs:s}]of $o){if(r){if(!Be(r).test(n)){Xe()&&(console.groupCollapsed(`DEBUG [replace-fetch-response] warn: '${r}' not found in fetch response`),o("warn",`${n}`),console.groupEnd());continue}Xe()&&(console.groupCollapsed(`DEBUG [replace-fetch-response] success: '${r}' found in fetch response`),o("info",`${n}`),console.groupEnd())}const i=n.toString();if(n=n.replace(e,t),n.toString()!==i){const r="replace-fetch-response "+s;To.has(r)||(To.add(r),Je(r)),Xe()&&(console.groupCollapsed(`DEBUG [replace-fetch-response] success: '${e}' replaced with '${t}' in fetch response`,`\nFILTER: replace-fetch-response ${s}`),o("success",`${n}`),console.groupEnd())}}if(n.toString()===t.toString())return e;const r=new Po(n.toString(),{status:e.status,statusText:e.statusText,headers:e.headers});return Oo.defineProperties(r,{ok:{value:e.ok},redirected:{value:e.redirected},type:{value:e.type},url:{value:e.url}}),i(),r}))};$o=new Ro,o("info","Network API proxied"),xo(e)}const a=Be(e),c=new ko(a,"g");$o.set(c,{replacement:t,needle:n,formattedArgs:r})},"replace-outbound-value":function(e,t="",n="",r="",s="",i=""){if(!e)throw new jo("[replace-outbound-value snippet]: Missing method path.");let a=Ye("replace-outbound-value");const{mark:c,end:u}=De("replace-outbound-value"),f=Ve(arguments);let p=!1;function d(){p||(p=!0,Je("replace-outbound-value "+f))}function h(e,t,n,r){if("base64"===r)try{if(function(e){try{if(""===e)return!1;const t=Lo(e),n=Co(t),r=Te(e).replace(/=+$/,"").toString();return Te(n).replace(/=+$/,"").toString()===r}catch(e){return!1}}(e)){const r=Lo(e);a("info",`Decoded base64 content: ${r}`);const o=t?Te(r).replace(t,n).toString():r;a("info",o!==r?`Modified decoded content: ${o}`:"Decoded content was not modified");const s=Co(o);return a("info",`Re-encoded to base64: ${s}`),s}a("info",`Content is plain text: ${e}`);const r=t?Te(e).replace(t,n).toString():e;a("info",r!==e?`Modified plain text content: ${r}`:"Plain text content was not modified");const o=Co(r);return a("info",`Encoded to base64: ${o}`),o}catch(t){return a("info",`Error processing base64 content: ${t.message}`),e}return t?Te(e).replace(t,n).toString():e}function y(e,t,n,r,o,s){const i=n?new Mo(Be(n),"g"):null;if(t.length&&"object"==typeof e&&null!==e){const c=n?function(e,t,n,r,o){if(!t.length)return e;let s=e;for(let n=0;n<t.length-1;n++){if(!s||"object"!=typeof s)return a("info",`Cannot navigate to path: property '${t[n]}' not found`),e;s=s[t[n]]}const i=t[t.length-1];if(!s||"object"!=typeof s||!(i in s))return a("info",`Target property '${i}' not found at path`),e;const c=s[i];if("string"!=typeof c)return a("info","Property at path is not a string: "+typeof c),e;const l=h(c,n,r,o);if(l!==c){const n=JSON.parse(JSON.stringify(e));let r=n;for(let e=0;e<t.length-1;e++)r=r[t[e]];return r[i]=l,a("info",`Replaced value at path '${t.join(".")}': '${c}' -> '${l}'`),n}return e}(e,t,i,r,o):e;return c!==e&&(a("success",`Replaced outbound value\nFILTER: replace-outbound-value ${s}`),d()),c}if("string"==typeof e){n||a("info",`Original text content: ${e}`);const t=n?h(e,i,r,o):e;return t!==e&&(a("success",`Replaced outbound value: ${t} \nFILTER: replace-outbound-value ${s}`),d()),t}return e}c();const g=function(e,t){let n=e,r=Te(t).split(".");for(let e=0;e<r.length-1;e++){let t=r[e];if(!n||"object"!=typeof n&&"function"!=typeof n)return{base:n,prop:t,remainingPath:r.slice(e).join("."),success:!1};n=n[t]}return{base:n,prop:r[r.length-1],success:!0}}(window,e);if(!g.success)return a("error",`Could not reach the end of the prop chain: ${e}. Remaining path: ${g.remainingPath}`),void u();const{base:w,prop:m}=g,v=w[m];if(!v||"function"!=typeof v)return a("error",`Could not retrieve the method: ${e}`),void u();let b=[];s&&(b=Te(s).split("."));let E=[];i&&(E=Te(i).split(",").map((e=>e.trim())));let S=!1,x=l(v,(function(){if(S)return o(v,this,arguments);S=!0;const e=o(v,this,arguments);if(E.length&&!jt(E,a))return S=!1,e;if(e&&"function"==typeof e.then)return a("info","Method returned a Promise, modifying resolved value"),S=!1,e.then((e=>{const o="object"==typeof e?JSON.stringify(e):e;return a("info",`Promise resolved with value: ${o}`),y(e,b,t,n,r,s)})).catch((e=>{throw a("info",`Promise rejected: ${e.message}`),e}));const i=y(e,b,t,n,r,s);return S=!1,i}));ot(x,v),Ao.defineProperty(w,m,{value:x}),a("info",`Wrapped ${e}`),u()},"replace-xhr-request":function(e,t="",n=null,r="replace"){const o=Ve(arguments),s=Ye("replace-xhr-request"),{mark:i,end:a}=De("replace-xhr-request");if(!e)throw new zo("[replace-xhr-request]: Missing 'search' parameter");function c(e){try{return Uo.parse(e)}catch(t){return e}}function l(e,t,n){let r=e[t];Vo.isArray(r)?Vo.isArray(n)?e[t]=Te(r).concat(n):Te(r).push(n):"object"!=typeof r||null===r||"object"!=typeof n||null===n||Vo.isArray(n)?e[t]="string"==typeof r?r+Te(n).toString():n:Xo.assign(r,n)}var u;if(_o||(_o=new Map,s("info","XMLHttpRequest proxied"),u=e=>{i();let t=e;for(const[n,{replacement:r,needle:o,formattedArgs:i,isJsonPath:a,jsonPathEngine:u,mode:f}]of _o){if(o){if(!Be(o).test(t))continue;s("info",`'${o}' found in XHR request body`)}if(a)try{let e=Uo.parse(t);const n=u.evaluate(e);Te(n).forEach((({parent:e,key:t})=>{let n=c(r);"append"===f?l(e,t,n):e[t]=n,s("success",`JSONPath [${f}] at [${t}] with `+r,"\nFILTER: replace-xhr-request "+i);const o="replace-xhr-request "+i;Ko.has(o)||(Ko.add(o),Je(o))})),t=Uo.stringify(e)}catch(e){s("info","JSONPath: skipping non-JSON body or evaluation error: "+e.message)}else if(t=Te(t).replace(n,r).toString(),e.toString()!==t.toString()){s("success",`'${n}' replaced with '${r}' in XHR request body`,"\nFILTER: replace-xhr-request "+i);const e="replace-xhr-request "+i;Ko.has(e)||(Ko.add(e),Je(e))}}return a(),t},Fo.push(u),Bo()),Te(e).startsWith("jsonpath(")){let i;try{const t=Te(e).slice(9,-1).toString();i=new $r(t)}catch(t){return void s("error",`Invalid JSONPath query: ${e}. Error: ${t.message}`)}_o.set(e,{replacement:t,needle:n,formattedArgs:o,isJsonPath:!0,jsonPathEngine:i,mode:r})}else{const s=Be(e),i=new Go(s,"g");_o.set(i,{replacement:t,needle:n,formattedArgs:o,isJsonPath:!1,jsonPathEngine:null,mode:r})}},"replace-xhr-response":function(e,t="",n=null){const r=Ve(arguments),o=Ye("replace-xhr-response"),{mark:s,end:i}=De("replace-xhr-response");if(e)if(Qo||(Qo=new Map,o("info","XMLHttpRequest proxied"),Jo((e=>{s();let t=e;for(const[n,{replacement:r,needle:s,formattedArgs:i,isJsonPath:a,jsonPathEngine:c}]of Qo){if(s){if(!Be(s).test(t)){Xe()&&(console.groupCollapsed(`DEBUG [replace-xhr-response] warn: '${s}' not found in XHR response`),o("warn",t),console.groupEnd());continue}Xe()&&(console.groupCollapsed(`DEBUG [replace-xhr-response] success: '${s}' found in XHR response`),o("info",t),console.groupEnd())}if(a)try{let e=Yo.parse(t);const n=c.evaluate(e);Te(n).forEach((({parent:e,key:t})=>{e[t]=Tt(r),o("success",`JSONPath match at [${t}], replaced with `+r,"\nFILTER: replace-xhr-response "+i);const n="replace-xhr-response "+i;es.has(n)||(es.add(n),Je(n))})),t=Yo.stringify(e)}catch(e){o("info","JSONPath: skipping non-JSON response or evaluation error: "+e.message)}else if(t=Te(t).replace(n,r).toString(),e.toString()!==t.toString()){const e="replace-xhr-response "+i;es.has(e)||(es.add(e),Je(e)),Xe()&&(console.groupCollapsed(`DEBUG [replace-xhr-response] success: '${n}' replaced with '${r}' in XHR response`,"\nFILTER: replace-xhr-response "+i),o("success",t),console.groupEnd())}}return i(),t.toString()}))),Te(e).startsWith("jsonpath(")){let s;try{const t=Te(e).slice(9,-1).toString();s=new $r(t)}catch(t){return void o("error",`Invalid JSONPath query: ${e}. Error: ${t.message}`)}Qo.set(e,{replacement:t,needle:n,formattedArgs:r,isJsonPath:!0,jsonPathEngine:s})}else{const o=Be(e),s=new Zo(o,"g");Qo.set(s,{replacement:t,needle:n,formattedArgs:r,isJsonPath:!1,jsonPathEngine:null})}else o("error","The parameter 'pattern' is required")},"strip-fetch-query-parameter":function(e,t=null){const n=Ve(arguments),r=Ye("strip-fetch-query-parameter"),{mark:o,end:s}=De("strip-fetch-query-parameter"),i=e=>{o();for(let[t,n]of ts.entries()){const{reg:o,args:s}=n;if((!o||o.test(e))&&rs(e.searchParams,t)){r("success",`${t} has been stripped from url ${e}`,`\nFILTER: strip-fetch-query-parameter ${s}`);const n="strip-fetch-query-parameter "+s;os.has(n)||(os.add(n),Je(n)),ns(e.searchParams,t)}}s()};var a;ts||(ts=new Map,a=i,bo.push(a),So()),ts.set(e,{reg:t&&Be(t),args:n})},"timer-override":function(e,t="",n="",r=ps.BOTH,s=""){if(!e)throw new ss("[timer-override snippet]: Missing required parameter timerValue.");if(!is.values(ps).includes(r))throw new ss("[timer-override snippet]: Invalid mode. Acceptable values are: "+is.values(ps).join(", "));const a=as(e,10);if(cs(a))throw new ss("[timer-override snippet]: timerValue must be a number.");if(!ds){ds=Te([]);const u=Ye("timer-override"),{mark:f,end:p}=De("timer-override");function d(e){try{return"function"==typeof e?i(ls,e):""+e}catch(e){return""}}function h(e,t,n,r,s,i,a){const c=d(s);for(const l of ds){if(r.indexOf(l.mode)<0)continue;if(l.needleRegex){const e=""+i;if(!l.needleRegex.test(c)&&!l.needleRegex.test(e))continue;u("info",l.needle+" found in "+c)}if(l.stackNeedles.length>0&&!jt(l.stackNeedles,u))continue;let f=s;const p=l.newDelay;l.isNoop&&(f=()=>{},u("success","Callback replaced with noop for "+c)),u("success",n+" replaced with "+p+" for "+c);const d="timer-override "+l.formattedArgs;hs.has(d)||(hs.add(d),Je(d));const h=Te([f,p]);for(let e=2;e<a.length;e++)h.push(a[e]);return o(t,e,h)}return null}f();const y=Te([ps.TIMEOUT,ps.BOTH]);let g=l(us,(function(e,t){const n=h(this,us,"setTimeout",y,e,t,arguments);return null!==n?n:o(us,this,arguments)}));ot(g,us),is.defineProperty(window,"setTimeout",{value:g});const w=Te([ps.INTERVAL,ps.BOTH]);let m=l(fs,(function(e,t){const n=h(this,fs,"setInterval",w,e,t,arguments);return null!==n?n:o(fs,this,arguments)}));ot(m,fs),is.defineProperty(window,"setInterval",{value:m}),u("info","timer APIs proxied"),p()}let c=[];s&&(c=s.split(/ +/)),ds.push({newDelay:a,needle:t,needleRegex:t?Be(t):null,mode:r,isNoop:"noop"===n,stackNeedles:c,formattedArgs:Ve(arguments)})},trace:function(...e){o(Qe,null,e)},"tmp-yt-buffering-spoof":function(e,t,n,r){if(xs)return;xs=!0;const{Document:s,HTMLIFrameElement:i,Response:a}=Te(window),c=Ye("tmp-yt-buffering-spoof"),{mark:u,end:f}=De("tmp-yt-buffering-spoof");u();let p=$s,d=null,h=0,y=0;const g=window.JSON.stringify,w=window.JSON.parse,m=ws.getOwnPropertyDescriptor(s.prototype,"visibilityState"),v=()=>{try{ws.defineProperty(bs,"visibilityState",{get:()=>"visible",configurable:!0})}catch(e){}},b=function(e){for(let t=1;t<arguments.length;t++){if(null==e)return;e=e[arguments[t]]}return e},E=function(e){const t=[],n=[];if("string"!=typeof e||0===e.length)return{allow:t,deny:n};const r=e.split(/\s+/);for(let e=0;e<r.length;e++){const o=r[e];o&&("!"===o.charAt(0)&&o.length>1?n.push(o.slice(1).toLowerCase()):t.push(o.toLowerCase()))}return{allow:t,deny:n}}("string"==typeof r&&r.replace(/\s+/g,"").length>0?r:"!homepage !shorts watch"),S=new ms;if("string"==typeof e){const t=e.split(/\s+/);for(let e=0;e<t.length;e++){const n=Es(t[e],10);n>=1&&S.add(n)}}const x=e=>!S.has(e),$=(e,t,n)=>{x(e)&&function(e,t,n){try{e()}catch(e){n("error",`Failed to install ${t}: ${e}`)}}(t,n,c)},R=()=>{const e=Ss.location.href;return-1!==e.indexOf("/shorts/")||-1!==e.indexOf("youtube.com/tv")||-1!==e.indexOf("youtube.com/embed/")},O=()=>R()||!function(e,t){const n=function(e){if("string"!=typeof e||0===e.length)return"homepage";let t=e;const n=t.indexOf("?");-1!==n&&(t=t.slice(0,n));const r=t.indexOf("#");-1!==r&&(t=t.slice(0,r));const o=t.indexOf("://");-1!==o&&(t=t.slice(o+3));const s=t.indexOf("/");if(-1===s)return"homepage";const i=t.slice(s),a=/^\/([^/]+)/.exec(i);return a?a[1].toLowerCase():"homepage"}(e);for(let e=0;e<t.deny.length;e++)if(t.deny[e]===n)return!1;if(0===t.allow.length)return!0;for(let e=0;e<t.allow.length;e++)if(t.allow[e]===n)return!0;return!1}(Ss.location.href,E),k=e=>{if(!e.playbackContext&&!e.playerRequest)return;const t=b(e,"context","client","configInfo");t&&t.appInstallData&&delete t.appInstallData},P=(e,t)=>{try{if(!e||!t)return;(e=>{const t=e.videoId;"string"==typeof t&&0!==t.length&&(null!==d&&d!==t&&(c("info",`New video ${t} (was ${d}) — reset to ${$s}`),p=$s),d=t)})(e);let n=p;const r=(()=>{try{const e=bs.getElementById("movie_player");if(!e||"function"!=typeof e.getPlayerResponse)return null;const t=e.getPlayerResponse();return b(t,"playabilityStatus","status")}catch(e){return null}})();"LOGIN_REQUIRED"!==r&&"CONTENT_CHECK_REQUIRED"!==r||(n=Ts);const o=b(e,"context","client","clientScreen"),s=()=>{t.contentPlaybackContext&&(t.contentPlaybackContext.lactMilliseconds=`${gs.now()}`)};if(n===$s&&o!==Ls)return e.params=js,e.playerRequest&&e.playerRequest.params!==js&&(e.playerRequest.params=js),e.playbackContext&&e.playbackContext.params!==js&&(e.playbackContext.params=js),s(),v(),k(e),void h++;if(n===Rs&&o!==Ls)return e.params!==As&&(e.params=As),e.playerRequest&&e.playerRequest.params!==As&&(e.playerRequest.params=As),e.playbackContext&&e.playbackContext.params!==As&&(e.playbackContext.params=As),!e.playlistId&&e.context&&e.context.client&&(e.context.client.clientScreen=Ls),s(),v(),k(e),void h++;if(n===Os&&o!==Ls){const n=t.params;if("string"==typeof n&&(0===n.indexOf(js)||0===n.indexOf(As)))return;return t.adPlaybackContext={pyv:!0},s(),k(e),void h++}if(n===ks){if("WEB"!==b(e,"context","client","clientName"))return;return e.context.client.clientScreen=Ls,s(),v(),k(e),void h++}if(n===Ps)return t.adPlaybackContext={adType:"AD_TYPE_INSTREAM"},s(),v(),k(e),void h++;n===Ts&&(t.adPlaybackContext&&delete t.adPlaybackContext,(()=>{try{m&&ws.defineProperty(bs,"visibilityState",m)}catch(e){}})())}catch(e){}},T=e=>{e&&e.context&&e.context.client&&(e.playbackContext&&void 0===e.playbackContext.adPlaybackContext&&P(e,e.playbackContext),e.playerRequest&&e.playerRequest.playbackContext&&void 0===e.playerRequest.playbackContext.adPlaybackContext&&P(e,e.playerRequest.playbackContext))},j=l(g,(function(){if(R())return o(g,this,arguments);try{const e=arguments[0];e&&"object"==typeof e&&T(e)}catch(e){}return o(g,this,arguments)}));ot(j,g),$(1,(()=>{ws.defineProperty(window.JSON,"stringify",{value:j,writable:!0,configurable:!0})}),"JSON.stringify");const A=l(w,(function(){if(O()||p===Ts)return o(w,this,arguments);let e;try{e=o(w,this,arguments)}catch(e){return o(w,this,arguments)}try{if(!e||"object"!=typeof e)return e;if(!e.responseContext&&!e.playabilityStatus)return e;y++;const t=g(e);let n=!1;for(const e of Cs)if(-1!==t.indexOf(e)){n=!0;break}const r=-1!==t.indexOf("CONTENT_CHECK_REQUIRED");if(n&&!r)return(e=>{let t;t=p===$s?Rs:p===Rs?Os:p===Os?ks:p===ks?Ps:Ts,c("info",`State: ${p} → ${t} (${e})`),p=t})("response had error marker"),e;if(p===$s){const t=b(e,"playerConfig","audioConfig");if(t&&t.muteOnStart){const n=-1!==Ss.location.href.indexOf("/watch"),r=b(e,"playabilityStatus","miniplayer");if(n||e.cards&&!r){delete t.muteOnStart;const n=e.messages;n&&n[0]&&n[0].youThereRenderer&&delete n[0].youThereRenderer}}}if(p===Ps){const t=b(e,"playerConfig","granularVariableSpeedConfig");t&&(t.maximumPlaybackRate=200,t.minimumPlaybackRate=25)}}catch(e){}return e}));ot(A,w),$(2,(()=>{ws.defineProperty(window.JSON,"parse",{value:A,writable:!0,configurable:!0})}),"JSON.parse");const L=window.TextEncoder.prototype.encode,C=l(L,(function(){if(R())return o(L,this,arguments);try{const e=arguments[0];if("string"==typeof e&&(-1!==e.indexOf('"contentPlaybackContext"')||-1!==e.indexOf('"adSignalsInfo"'))){const t=w(e);t&&t.context&&t.context.client&&(T(t),arguments[0]=g(t))}}catch(e){}return o(L,this,arguments)}));ot(C,L),$(3,(()=>{ws.defineProperty(window.TextEncoder.prototype,"encode",{value:C,writable:!0,configurable:!0})}),"TextEncoder.prototype.encode");const M=new Proxy(window.Request,{construct(e,t,n){try{if(R())return Reflect.construct(e,t,n);const r=t[0],o=t[1],s="string"==typeof r?r:r&&"string"==typeof r.url?r.url:"",i=o&&o.body;if(-1!==s.indexOf("youtubei")&&"string"==typeof i&&(-1!==i.indexOf('"contentPlaybackContext"')||-1!==i.indexOf('"adSignalsInfo"'))){const e=w(i);e&&e.context&&e.context.client&&(T(e),o.body=g(e))}}catch(e){}return Reflect.construct(e,t,n)}});$(4,(()=>{ws.defineProperty(window,"Request",{value:M,writable:!0,configurable:!0})}),"Request");const N=window.XMLHttpRequest.prototype.send,I=l(N,(function(){if(R())return o(N,this,arguments);try{const e=arguments[0],t=ys.isArray(e),n=t?e[0]:e;if("string"==typeof n&&(-1!==n.indexOf('"contentPlaybackContext"')||-1!==n.indexOf('"adSignalsInfo"'))){const e=w(n);if(e&&e.context&&e.context.client){T(e);const n=g(e);t?arguments[0][0]=n:arguments[0]=n}}}catch(e){}return o(N,this,arguments)}));ot(I,N),$(5,(()=>{ws.defineProperty(window.XMLHttpRequest.prototype,"send",{value:I,writable:!0,configurable:!0})}),"XMLHttpRequest.prototype.send");const D={apply(e,t,n){const r=Reflect.apply(e,t,n);try{if(r&&r.responseContext){delete r.adSlots,delete r.playerAds;const e=b(r,"playerConfig","audioConfig");if(e&&e.muteOnStart){const t=-1!==Ss.location.href.indexOf("/watch"),n=b(r,"playabilityStatus","miniplayer");if(t||r.cards&&!n){delete e.muteOnStart;const t=r.messages;t&&t[0]&&t[0].youThereRenderer&&delete t[0].youThereRenderer}}}}catch(e){}return r}},W={apply(e,t,n){try{const e=n[0];if(e&&"string"==typeof e.value&&-1!==e.value.indexOf("playerResponse")){let t=e.value;const r=-1!==Ss.location.href.indexOf("/watch"),o=-1!==t.indexOf("cards")&&-1===t.indexOf('"miniplayer"');(r||o)&&-1!==t.indexOf('"muteOnStart":true')&&(t=t.replace('"muteOnStart":true','"muteOnStart":false'),-1!==t.indexOf('"youThereRenderer":')&&(t=t.replace('"youThereRenderer":','"no_youThereRenderer":'))),t=t.replace(/"(adSlots|playerAds)":/g,'"no_ads":'),e.value=t,n[0]=e}}catch(e){}return Reflect.apply(e,t,n)}},F=window.Promise.prototype.then,q=l(F,(function(){if(O())return o(F,this,arguments);try{const e=arguments[0];if("function"==typeof e){const t=e.toString();-1!==t.indexOf("jspbResponseCtor")?arguments[0]=new Proxy(e,D):-1!==t.indexOf(".next(")&&(arguments[0]=new Proxy(e,W))}}catch(e){}return o(F,this,arguments)}));ot(q,F),$(6,(()=>{ws.defineProperty(window.Promise.prototype,"then",{value:q,writable:!0,configurable:!0})}),"Promise.prototype.then");const H=window.Node.prototype.appendChild,B=l(H,(function(){const e=o(H,this,arguments);if(R())return e;try{e instanceof i&&"about:blank"===e.src&&e.contentWindow&&(e.contentWindow.fetch=Ss.fetch,e.contentWindow.Request=Ss.Request)}catch(e){}return e}));ot(B,H),$(7,(()=>{ws.defineProperty(window.Node.prototype,"appendChild",{value:B,writable:!0,configurable:!0})}),"Node.prototype.appendChild");const J=["/youtubei/v1/player","/get_watch","/get_video_info"];let _=0,V=0,z=0;xo(((e,t)=>{if(!x(8)||!t||"string"!=typeof t.url||O())return e;let n=!1;for(const e of J)if(-1!==t.url.indexOf(e)){n=!0;break}if(!n)return e;if("string"==typeof e.url&&0===e.url.indexOf("data:"))return z++,e;if(-1===(e.headers.get("content-type")||"").toLowerCase().indexOf("json"))return e;const r=Is(Ss.location.href);return e.clone().json().then((t=>{let n=!1;const o=[];if(t&&t.playabilityStatus&&o.push(t),ys.isArray(t))for(const e of t)e&&e.playerResponse&&e.playerResponse.playabilityStatus&&o.push(e.playerResponse);for(const e of o){Ms(e)&&(n=!0),Ns(e,r)&&(n=!0,V++)}if(!n)return e;_++;const s=new a(g(t),{status:e.status,statusText:e.statusText,headers:e.headers});return ws.defineProperties(s,{ok:{value:e.ok},redirected:{value:e.redirected},type:{value:e.type},url:{value:e.url}}),s})).catch((()=>e))})),Jo(((e,t)=>{if(!x(9)||!t||"string"!=typeof t.url||O())return e;let n=!1;for(const e of J)if(-1!==t.url.indexOf(e)){n=!0;break}if(!n)return e;if(0===t.url.indexOf("data:"))return z++,e;if("string"!=typeof e||0===e.length)return e;if(-1===e.indexOf("playerResponse")&&-1===e.indexOf("playabilityStatus"))return e;const r=Is(Ss.location.href);try{const t=w(e);let n=!1;const o=[];if(t&&t.playabilityStatus&&o.push(t),ys.isArray(t))for(const e of t)e&&e.playerResponse&&e.playerResponse.playabilityStatus&&o.push(e.playerResponse);for(const e of o){const t=Ms(e),o=Ns(e,r);t&&(n=!0),o&&(n=!0,V++)}return n?(_++,g(t)):e}catch(t){return e}}));const U=(e,t)=>{if(null==e)return t;const n=Es(`${e}`,10);return n>=0?n:t},X=U(t,5e3),G=U(n,600),K=new ms,Q=new ms,Y=new vs;let Z=0,ee=0;const te=()=>{try{const e=bs.getElementById("movie_player"),t=e&&"function"==typeof e.getPlayerResponse?e.getPlayerResponse():null;return t&&t.videoDetails&&t.videoDetails.videoId||""}catch(e){return""}},ne=()=>!O(),re=e=>{let t=!1;try{const e=bs.getElementById("movie_player");e&&"function"==typeof e.unMute&&(e.unMute(),t=!0,"function"==typeof e.getVolume&&"function"==typeof e.setVolume&&0===e.getVolume()&&e.setVolume(100))}catch(e){}try{e&&e.muted&&(e.muted=!1)}catch(e){}return t},oe=()=>{if(O())return;const e=bs.querySelector("video.html5-main-video")||bs.querySelector("video.video-stream");if(!e||Y.has(e))return;Y.add(e);let t=0,n=0;e.addEventListener("playing",(()=>{try{if(t=gs.now(),n=0,!ne())return;if(!e.muted)return;const r=te();if(r&&Q.has(r))return;if(r&&K.has(r))return;r&&K.add(r),Z++;const o=re(e);c("info",`[video.playing] muted at first playing for videoId=${r||"?"} — unmuted (via `+(o?"player.unMute()":"element")+").")}catch(e){}})),e.addEventListener("volumechange",(()=>{try{if(!ne())return;const r=te(),o=0!==ee&&gs.now()-ee<G;if(!e.muted)return void(o&&r&&Q.delete(r));if(o)return r&&Q.add(r),void c("info",`[video.volumechange] mute within user-gesture window — remembering + respecting user mute (videoId=${r||"?"}).`);if(r&&Q.has(r))return void c("info",`[video.volumechange] mute on user-muted video — respecting (videoId=${r}).`);if(0===t)return;const s=gs.now()-t;if(s>=X)return;if(n>=5)return;n++,Z++;const i=re(e);c("info",`[video.volumechange] late mute at +${s}ms after playing for videoId=${r||"?"} — unmuted (via `+(i?"player.unMute()":"element")+").")}catch(e){}})),c("info",`[video-watcher] attached to <video> element (late-mute window=${X}ms).`)};if(x(10)){oe();new MutationObserver((()=>{oe()})).observe(bs,{childList:!0,subtree:!0}),bs.addEventListener("yt-navigate-finish",(()=>{oe()}));const e=()=>{ee=gs.now()};bs.addEventListener("click",(t=>{try{const n=t.target;n&&"function"==typeof n.closest&&n.closest(".ytp-mute-button")&&e()}catch(e){}}),!0),bs.addEventListener("keydown",(t=>{try{const n=t.key;if("m"!==n&&"M"!==n)return;const r=bs.activeElement,o=r&&r.tagName?r.tagName:"";if("INPUT"===o||"TEXTAREA"===o||r&&r.isContentEditable)return;e()}catch(e){}}),!0)}c("info",`Installed. Starting state: ${p}. Hooks: JSON.{stringify,parse}, TextEncoder.encode, Request, XMLHttpRequest.send, Promise.then, Node.appendChild, fetch-postFetch, xhr-postResponse, video-unmute. Counters: ${h} mutations, ${y} responses inspected, ${_} response-rewrites, ${V} startSeconds-injects, ${z} honeypot bypasses, ${Z} video-element unmutes. Windows: late-mute=${X}ms, user-gesture=${G}ms.`+(S.size>0?` Disabled hooks: ${[...S].join(",")}.`:"")+function(e){if(0===e.allow.length&&0===e.deny.length)return"";const t=[];e.allow.length>0&&t.push("allow=["+e.allow.join(",")+"]");e.deny.length>0&&t.push("deny=["+e.deny.join(",")+"]");return" Path filter: "+t.join(" ")+"."}(E)),f()},"tmp-yt-force-reload":function(e,t,n,r){if(_s)return;_s=!0;const o=Ye("tmp-yt-force-reload"),{mark:s,end:i}=De("tmp-yt-force-reload");s();const a=(()=>{const e="string"==typeof n?n.toString():"0",t=Hs(e,10);return isNaN(t)||t<0?0:t})(),c="every"===("string"==typeof e?e.toString():"").toLowerCase()?"every":"first",l=(()=>{const e=("string"==typeof t?t.toString():"").toLowerCase();return"dom"===e||"player"===e||"both"===e?e:"none"})(),u=function(e){const t=[],n=[];if("string"!=typeof e||0===e.length)return{allow:t,deny:n};const r=e.split(/\s+/);for(let e=0;e<r.length;e++){const o=r[e];o&&("!"===o.charAt(0)&&o.length>1?n.push(o.slice(1).toLowerCase()):t.push(o.toLowerCase()))}return{allow:t,deny:n}}(r),f=Ds.now();let p="",d=0,h=!1;const y=new Fs;let g=!1,w=0;const m=()=>{if("none"===l)return;if(-1===Js.location.href.indexOf("/watch?"))return;if(!zs(Js.location.href,u))return;const e=qs.getElementById("movie_player");if(!e||"function"!=typeof e.loadVideoById)return;if(!(e=>{if("none"===l||!e)return!1;let t=!1,n=!1;if("dom"===l||"both"===l)try{t=e.classList.contains("ytp-error")||null!==e.querySelector(".ytp-error")}catch(e){}if("player"===l||"both"===l)try{const t="function"==typeof e.getPlayerResponse?e.getPlayerResponse():null,r=t&&t.playabilityStatus&&t.playabilityStatus.status;n="string"==typeof r&&"OK"!==r&&"OK_LIMITED"!==r}catch(e){}return"both"===l?t&&n:"player"===l?n:t})(e))return;let t;try{t="function"==typeof e.getPlayerResponse?e.getPlayerResponse():null}catch(e){t=null}const n=t&&t.videoDetails&&t.videoDetails.videoId;if("string"!=typeof n||""===n)return;if(y.has(n))return;y.add(n);const r=t.playerConfig&&t.playerConfig.playbackStartConfig&&t.playerConfig.playbackStartConfig.startSeconds||0;w++;const s=w,i=Ds.now()-f,a=t&&t.playabilityStatus&&t.playabilityStatus.status;o("info",`error#${s} [+${i}ms] Error detected for "${n}" (signal=${l}, playabilityStatus=${a}). Firing loadVideoById("${n}", ${r}).`);try{e.loadVideoById(n,r)}catch(e){o("error",`error#${s} loadVideoById threw: ${e}`)}},v=()=>{if(h)return!0;if(-1===Js.location.href.indexOf("/watch?"))return!1;if(!zs(Js.location.href,u))return!1;const e=qs.getElementById("movie_player");if(!e||"function"!=typeof e.loadVideoById)return!1;let t;(e=>{if("none"===l)return;if(g||!e)return;g=!0,new Ws((()=>{m()})).observe(e,{attributes:!0,attributeFilter:["class"],childList:!0,subtree:!0}),o("info",`Error arm attached to movie_player (signal=${l}).`),m()})(e);try{t="function"==typeof e.getPlayerResponse?e.getPlayerResponse():null}catch(e){t=null}const n=t&&t.videoDetails&&t.videoDetails.videoId;if("string"!=typeof n||""===n)return!1;if(n===p)return!1;const r=Vs(e,"getPlayerState"),s=Vs(e,"getCurrentTime"),i=Vs(e,"getVideoLoadedFraction"),y=Vs(e,"getDuration"),w=Vs(e,"getPlayerStateObject"),v=`state=${r}, current=${s}, loadedFraction=${i}, duration=${y}, isBuffering=${w&&w.isBuffering}`;let b,E;if(1===r||2===r||0===r?(b=!1,E="already playing/paused/ended"):3===r&&"number"==typeof s&&s>=1&&("number"==typeof i&&i>=.05)?(b=!1,E="mid-playback buffer"):(b=!0,E="fresh / pre-playback"),!b)return p=n,o("info",`Skipping reload for "${n}": ${E}. ${v}`),!0;const S=t.playerConfig&&t.playerConfig.playbackStartConfig&&t.playerConfig.playbackStartConfig.startSeconds||0;p=n,d++;const x=d,$=n,R=S,O=()=>{try{const t=Ds.now()-f;o("info",`#${x} [+${t}ms] Firing loadVideoById("${$}", ${R}). ${v}`),e.loadVideoById($,R)}catch(e){o("error",`#${x} loadVideoById threw: ${e}`)}};return a>0?Bs(O,a):O(),"first"===c&&(h=!0,o("info","first-mode: disabling further reloads after this fire.")),!0},b=()=>{if(v())return;let e=new Ws((()=>{v()&&e&&(e.disconnect(),e=null)}));e.observe(qs,{childList:!0,subtree:!0}),Bs((()=>{e&&(e.disconnect(),e=null)}),1e4)};"loading"===qs.readyState?qs.addEventListener("DOMContentLoaded",b):b(),qs.addEventListener("yt-navigate-finish",(()=>{let e=30;const t=()=>{v()||(e--,e<=0||Bs(t,100))};Bs(t,100)})),o("info","Installed. Mode="+c+". "+("first"===c?"Fires once on the first video, then disables.":"Fires on every new video (cold load + SPA nav).")+(a>0?` +${a}ms delay.`:"")+("none"===l?" Error arm disabled.":` Error arm via ${l} signal (1 reload/video).`)+function(e){if(0===e.allow.length&&0===e.deny.length)return"";const t=[];e.allow.length>0&&t.push("allow=["+e.allow.join(",")+"]");e.deny.length>0&&t.push("deny=["+e.deny.join(",")+"]");return" Path filter: "+t.join(" ")+"."}(u)),i()}};
const snippets=Us;
let context;
for (const [name, ...args] of filters) {
if (snippets.hasOwnProperty(name)) {
try { context = snippets[name].apply(context, args); }
catch (error) { console.error(error); }
}
}
context = void 0;
};
const graph = new Map([["abort-current-inline-script",null],["abort-on-iframe-property-read",null],["abort-on-iframe-property-write",null],["abort-on-property-read",null],["abort-on-property-write",null],["array-override",null],["blob-override",null],["cookie-remover",null],["debug",null],["event-override",null],["freeze-element",null],["hide-if-canvas-contains",null],["hide-if-shadow-contains",null],["json-override",null],["json-prune",null],["map-override",null],["override-property-read",null],["prevent-element-src-loading",null],["prevent-listener",null],["profile",null],["replace-fetch-response",null],["replace-outbound-value",null],["replace-xhr-request",null],["replace-xhr-response",null],["strip-fetch-query-parameter",null],["timer-override",null],["trace",null],["tmp-yt-buffering-spoof",null],["tmp-yt-force-reload",null]]);
callback.get = snippet => graph.get(snippet);
callback.has = snippet => graph.has(snippet);
callback.getGraph = () => graph;
callback.setEnvironment = env => {
  if (typeof currentEnvironment !== "undefined")
    currentEnvironment = env;
};
callback.setDebugStyle = styles => {
  if (typeof currentEnvironment !== "undefined")
  {
    delete currentEnvironment.initial;
    currentEnvironment.debugCSSProperties = styles;
  }
    
};
callback.getEnvironment = () => currentEnvironment;
/* harmony default export */ const main = (callback);
;// ./src/content/shared/constants.js
/*
 * This file is part of eyeo's Web Extension Ad Blocking Toolkit (EWE),
 * Copyright (C) 2006-present eyeo GmbH
 *
 * EWE is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * EWE is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with EWE.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Prefix that should be used for storage and synchronization to avoid conflicts
 * when multiple extensions are installed in the same session.
 *
 * !!! IMPORTANT - DO NOT CHANGE THIS VALUE !!!
 * This exact string "ab" is hardcoded in the build
 * configurations and is replaced during the build process with host-specific
 * values (e.g., "ab" for Adblock, "abp" for Adblock Plus).
 *
 * If you change this value, the build process will NOT replace it, and the
 * extension will fail to work properly due to namespace conflicts.
 *
 * Build configuration references:
 * - host/adblock/build/config/base.mjs (replacements.search)
 * - host/adblockplus/build/webext/config/base.mjs (replacements.search)
 *
 * @type {string}
 */
const HOST_PREFIX_TO_REPLACE = "ab";

/**
 * Dataset key used to exchange the communication channel name between content
 * scripts in different contexts (main world and isolated world)
 * @type {string}
 */
const COMMS_CHANNEL_DATASET_KEY = `${HOST_PREFIX_TO_REPLACE}FiltersChannel`;

/**
 * Event used to communicate between content script contexts
 * @type {string}
 */
const HANDSHAKE_EVENT_NAME = `${HOST_PREFIX_TO_REPLACE}-handshake`;

/**
 * Storage key used to cache the filters config in content scripts
 * @type {string}
 */
const CACHED_FILTERS_CONFIG_KEY = `${HOST_PREFIX_TO_REPLACE}-filters-config`;

;// ./src/all/snippets.js
/**
 * CSS properties applied to elements hidden in debug mode
 * @type {string[][]}
 */
const DEBUG_CSS_PROPERTIES = [
    ["background", "repeating-linear-gradient(to bottom, #e67370 0, #e67370 9px, white 9px, white 10px)"],
    ["outline", "solid red"]
  ];
  
;// ./src/content/main/shims/storage.js
/*
 * This file is part of eyeo's Web Extension Ad Blocking Toolkit (EWE),
 * Copyright (C) 2006-present eyeo GmbH
 *
 * EWE is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * EWE is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with EWE.  If not, see <http://www.gnu.org/licenses/>.
 */

/* eslint-disable no-extend-native */

function shimStorage(CACHED_FILTERS_CONFIG_KEY) {
  // =================== Secured copies of native functions ====================
  // These are captured before page scripts run.
  // Used inside Proxy apply handlers which run after page scripts.
  const {parse: $JSONparse, stringify: $JSONstringify} = JSON;
  const {keys: $ObjectKeys} = Object;
  const {
    apply: $ReflectApply,
    ownKeys: $ReflectOwnKeys,
    get: $ReflectGet,
    set: $ReflectSet,
    has: $ReflectHas,
    getOwnPropertyDescriptor: $ReflectGetOwnPropertyDescriptor,
    defineProperty: $ReflectDefineProperty,
    deleteProperty: $ReflectDeleteProperty
  } = Reflect;
  const {filter: $ArrayFilter} = Array.prototype;
  const {get: $MapGet, set: $MapSet, has: $MapHas} = Map.prototype;
  const $String = String;

  // Helpers using secured copies
  const filter = (arr, fn) => $ReflectApply($ArrayFilter, arr, [fn]);
  const mapGet = (map, key) => $ReflectApply($MapGet, map, [key]);
  const mapSet = (map, key, val) => $ReflectApply($MapSet, map, [key, val]);
  const mapHas = (map, key) => $ReflectApply($MapHas, map, [key]);

  // Need to unwrap our own proxies when multiple extensions run this shim.
  const realLocalStorage = window.localStorage;
  const realSessionStorage = window.sessionStorage;
  let localStorageProxy;
  let sessionStorageProxy;
  function unwrapStorage(storage) {
    if (storage === localStorageProxy) {
      return realLocalStorage;
    }
    if (storage === sessionStorageProxy) {
      return realSessionStorage;
    }
    return storage;
  }

  const originalToStrings = new Map();

  const storageGetItemDesc = Object.getOwnPropertyDescriptor(
    Storage.prototype, "getItem"
  );
  const originalStorageGetItem = storageGetItemDesc.value;

  // =================== Conditional application of the shim ===================
  function shouldShimStorage() {
    const config = getConfig(window.sessionStorage) ||
      getConfig(window.localStorage);
    return Boolean(config);
  }

  if (!shouldShimStorage()) {
    return;
  }

  // ===================== Storage.prototype.getItem ======================
  // @docs https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem
  function getConfig(storage) {
    try {
      const configSerialized = $ReflectApply(
        originalStorageGetItem, unwrapStorage(storage),
        [CACHED_FILTERS_CONFIG_KEY]
      );
      if (configSerialized) {
        return $JSONparse(configSerialized);
      }
    }
    catch (e) {
      // If we can't parse, return null
    }
    return null;
  }

  function websiteHasValue(config) {
    return config && typeof config.websiteValue === "string";
  }
  const storageGetItemProxy = new Proxy(originalStorageGetItem, {
    apply(target, thisArg, argumentsList) {
      const key = argumentsList[0];
      const unwrappedThis = unwrapStorage(thisArg);
      if (key === CACHED_FILTERS_CONFIG_KEY) {
        const config = getConfig(unwrappedThis);
        if (websiteHasValue(config)) {
          return config.websiteValue;
        }
        return null;
      }
      return $ReflectApply(target, unwrappedThis, argumentsList);
    }
  });
  Object.defineProperty(Storage.prototype, "getItem", {
    ...storageGetItemDesc,
    value: storageGetItemProxy
  });
  mapSet(
    originalToStrings,
    storageGetItemProxy,
    originalStorageGetItem.toString.bind(originalStorageGetItem)
  );

  // ===================== Storage.prototype.setItem ===========================
  // @docs https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem
  const storageSetItemDesc = Object.getOwnPropertyDescriptor(
    Storage.prototype, "setItem"
  );
  const originalStorageSetItem = storageSetItemDesc.value;
  const storageSetItemProxy = new Proxy(originalStorageSetItem, {
    apply(target, thisArg, argumentsList) {
      const key = argumentsList[0];
      const unwrappedThis = unwrapStorage(thisArg);
      if (key === CACHED_FILTERS_CONFIG_KEY) {
        const config = getConfig(unwrappedThis) || {};
        config.websiteValue = $String(argumentsList[1]);
        $ReflectApply(
          target,
          unwrappedThis,
          [CACHED_FILTERS_CONFIG_KEY, $JSONstringify(config)]
        );
        return void 0;
      }
      return $ReflectApply(target, unwrappedThis, argumentsList);
    }
  });
  Object.defineProperty(Storage.prototype, "setItem", {
    ...storageSetItemDesc,
    value: storageSetItemProxy
  });
  mapSet(
    originalToStrings,
    storageSetItemProxy,
    originalStorageSetItem.toString.bind(originalStorageSetItem)
  );

  // ================== Storage.prototype.removeItem ==========================
  // @docs https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem
  const storageRemoveItemDesc = Object.getOwnPropertyDescriptor(
    Storage.prototype, "removeItem"
  );
  const originalStorageRemoveItem = storageRemoveItemDesc.value;
  const storageRemoveItemProxy = new Proxy(originalStorageRemoveItem, {
    apply(target, thisArg, argumentsList) {
      const key = argumentsList[0];
      const unwrappedThis = unwrapStorage(thisArg);
      if (key === CACHED_FILTERS_CONFIG_KEY) {
        const config = getConfig(unwrappedThis);
        if (websiteHasValue(config)) {
          delete config.websiteValue;
          $ReflectApply(
            originalStorageSetItem,
            unwrappedThis, [CACHED_FILTERS_CONFIG_KEY, $JSONstringify(config)]
          );
        }
        return void 0;
      }
      return $ReflectApply(target, unwrappedThis, argumentsList);
    }
  });
  Object.defineProperty(Storage.prototype, "removeItem", {
    ...storageRemoveItemDesc,
    value: storageRemoveItemProxy
  });
  mapSet(
    originalToStrings,
    storageRemoveItemProxy,
    originalStorageRemoveItem.toString.bind(originalStorageRemoveItem)
  );

  // ==================== Storage.prototype.clear ============================
  // @docs https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear
  const storageClearDesc = Object.getOwnPropertyDescriptor(
    Storage.prototype, "clear"
  );
  const originalStorageClear = storageClearDesc.value;
  const storageClearProxy = new Proxy(originalStorageClear, {
    apply(target, thisArg, argumentsList) {
      const unwrappedThis = unwrapStorage(thisArg);
      const config = getConfig(unwrappedThis);
      if (config) {
        delete config.websiteValue;
      }

      $ReflectApply(target, unwrappedThis, argumentsList);

      // Restore our config (without websiteValue)
      if (config && $ObjectKeys(config).length > 0) {
        $ReflectApply(
          originalStorageSetItem,
          unwrappedThis, [CACHED_FILTERS_CONFIG_KEY, $JSONstringify(config)]
        );
      }
      return void 0;
    }
  });
  Object.defineProperty(Storage.prototype, "clear", {
    ...storageClearDesc,
    value: storageClearProxy
  });
  mapSet(
    originalToStrings,
    storageClearProxy,
    originalStorageClear.toString.bind(originalStorageClear)
  );

  // ===================== Storage.prototype.key ===============================
  // @docs https://developer.mozilla.org/en-US/docs/Web/API/Storage/key
  const storageKeyDesc = Object.getOwnPropertyDescriptor(
    Storage.prototype, "key"
  );
  const originalStorageKey = storageKeyDesc.value;
  const storageKeyProxy = new Proxy(originalStorageKey, {
    apply(target, thisArg, argumentsList) {
      const unwrappedThis = unwrapStorage(thisArg);
      const config = getConfig(unwrappedThis);
      if (!config || websiteHasValue(config)) {
        return $ReflectApply(target, unwrappedThis, argumentsList);
      }

      const requestedIndex = argumentsList[0];
      for (let i = 0; i <= requestedIndex; i++) {
        const key = $ReflectApply(target, unwrappedThis, [i]);
        if (key === CACHED_FILTERS_CONFIG_KEY) {
          return $ReflectApply(target, unwrappedThis, [requestedIndex + 1]);
        }
      }
      return $ReflectApply(target, unwrappedThis, argumentsList);
    }
  });
  Object.defineProperty(Storage.prototype, "key", {
    ...storageKeyDesc,
    value: storageKeyProxy
  });
  mapSet(
    originalToStrings,
    storageKeyProxy,
    originalStorageKey.toString.bind(originalStorageKey)
  );

  // =================== Storage.prototype.length ============================
  // @docs https://developer.mozilla.org/en-US/docs/Web/API/Storage/length
  const storageLengthDesc = Object.getOwnPropertyDescriptor(
    Storage.prototype, "length"
  );
  const originalStorageLengthGetter = storageLengthDesc.get;
  Object.defineProperty(Storage.prototype, "length", {
    ...storageLengthDesc,
    get() {
      const unwrappedThis = unwrapStorage(this);
      const originalLength =
        $ReflectApply(originalStorageLengthGetter, unwrappedThis, []);
      const config = getConfig(unwrappedThis);
      if (config && !websiteHasValue(config)) {
        return originalLength - 1;
      }
      return originalLength;
    }
  });

  // ================== Proxy wrapper for localStorage ===========
  // Handles: {...localStorage}, Object.keys(), Object.values(), for...in, etc.
  const methodProxyCache = new Map();

  function getMethodProxy(method) {
    if (mapHas(methodProxyCache, method)) {
      return mapGet(methodProxyCache, method);
    }
    const methodProxy = new Proxy(method, {
      apply(fn, thisArg, args) {
        return $ReflectApply(fn, thisArg, args);
      }
    });
    mapSet(methodProxyCache, method, methodProxy);
    // Register toString for the wrapper to preserve function name
    const originalMethod = mapGet(originalToStrings, method);
    if (originalMethod) {
      mapSet(originalToStrings, methodProxy, originalMethod);
    }
    return methodProxy;
  }

  const storageInstanceProxyConfig = {
    ownKeys(target) {
      const keys = $ReflectOwnKeys(target);
      const config = getConfig(target);
      if (config && !websiteHasValue(config)) {
        return filter(keys, key => key !== CACHED_FILTERS_CONFIG_KEY);
      }
      return keys;
    },

    // Required for spread operator
    getOwnPropertyDescriptor(target, prop) {
      if (prop === CACHED_FILTERS_CONFIG_KEY) {
        const config = getConfig(target);
        if (config && !websiteHasValue(config)) {
          return void 0; // Hide the property entirely
        }
        // When website has set a value, return a proper enumerable descriptor
        // with the website's value (not our internal config)
        if (websiteHasValue(config)) {
          return {
            value: config.websiteValue,
            writable: true,
            enumerable: true,
            configurable: true
          };
        }
      }
      return $ReflectGetOwnPropertyDescriptor(target, prop);
    },

    // Needed for 'in' operator
    has(target, prop) {
      if (prop === CACHED_FILTERS_CONFIG_KEY) {
        const config = getConfig(target);
        if (config && !websiteHasValue(config)) {
          return false;
        }
      }
      return $ReflectHas(target, prop);
    },

    // Forward get/set using original target so native methods work correctly
    get(target, prop) {
      if (prop === CACHED_FILTERS_CONFIG_KEY) {
        return target.getItem(CACHED_FILTERS_CONFIG_KEY);
      }
      // Return correct toStringTag so Object.prototype.toString returns
      // [object Storage] instead of [object Object] (for older Firefox)
      if (prop === Symbol.toStringTag) {
        return "Storage";
      }
      const value = $ReflectGet(target, prop, target);
      // For methods, wrap in a proxy to bind `this` to original target
      // while preserving toString behavior
      if (typeof value === "function") {
        return getMethodProxy(value);
      }
      return value;
    },

    set(target, prop, value) {
      if (prop === CACHED_FILTERS_CONFIG_KEY) {
        target.setItem(CACHED_FILTERS_CONFIG_KEY, value);
        return true;
      }
      return $ReflectSet(target, prop, value, target);
    },

    defineProperty(target, prop, descriptor) {
      if (prop === CACHED_FILTERS_CONFIG_KEY) {
        if ("value" in descriptor) {
          target.setItem(CACHED_FILTERS_CONFIG_KEY, descriptor.value);
        }
        return true;
      }
      return $ReflectDefineProperty(target, prop, descriptor);
    },

    deleteProperty(target, prop) {
      if (prop === CACHED_FILTERS_CONFIG_KEY) {
        target.removeItem(CACHED_FILTERS_CONFIG_KEY);
        return true;
      }
      return $ReflectDeleteProperty(target, prop);
    }
  };

  localStorageProxy = new Proxy(
    window.localStorage,
    storageInstanceProxyConfig
  );

  Object.defineProperty(window, "localStorage", {
    value: localStorageProxy,
    writable: false,
    configurable: true,
    enumerable: true
  });

  sessionStorageProxy = new Proxy(
    window.sessionStorage,
    storageInstanceProxyConfig
  );

  Object.defineProperty(window, "sessionStorage", {
    value: sessionStorageProxy,
    writable: false,
    configurable: true,
    enumerable: true
  });

  // ===================== Function.prototype.toString =========================
  // @docs https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString
  const functionToStringDesc = Object.getOwnPropertyDescriptor(
    Function.prototype, "toString"
  );
  const originalFunctionToString = functionToStringDesc.value;
  const functionToStringProxy = new Proxy(originalFunctionToString, {
    apply(target, thisArg, argumentsList) {
      // Call "super" first, just in case the function was overwritten and had
      // checks if it was called
      const r = $ReflectApply(target, thisArg, argumentsList);

      const restoredToString = mapGet(originalToStrings, thisArg);
      if (restoredToString) {
        return $ReflectApply(restoredToString, thisArg, argumentsList);
      }

      return r;
    }
  });
  Object.defineProperty(Function.prototype, "toString", {
    ...functionToStringDesc,
    value: functionToStringProxy
  });
  mapSet(
    originalToStrings,
    functionToStringProxy,
    originalFunctionToString.toString.bind(originalFunctionToString)
  );
}

;// ./src/content/shared/helpers.js
/*
 * This file is part of eyeo's Web Extension Ad Blocking Toolkit (EWE),
 * Copyright (C) 2006-present eyeo GmbH
 *
 * EWE is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * EWE is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with EWE.  If not, see <http://www.gnu.org/licenses/>.
 */



/**
 * Claims a communication channel name from the document's dataset.
 *
 * If a channel name already exists in the dataset, it is consumed (removed
 * from the dataset and returned). If no channel name exists, the fallback
 * channel is stored in the dataset and returned.
 *
 * This mechanism ensures that only one content script can claim the
 * channel name at a time, preventing conflicts when the main world
 * and isolated world scripts execution order is not consistent.
 * @see https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/139#changes_for_add-on_developers
 * @see https://bugzil.la/1792685
 * @see https://eyeo.atlassian.net/wiki/spaces/B2C/pages/1666678786/Content-script+based+snippets
 *
 * @param {string} fallbackChannel - The channel name to use and store if
 *   none is present.
 * @returns {string} The claimed channel name (either the existing one
 *   or the fallback).
 */
function claimCommsChannel(fallbackChannel) {
  let channelName = document.documentElement.dataset[COMMS_CHANNEL_DATASET_KEY];

  if (!channelName) {
    channelName = fallbackChannel;
    document.documentElement.dataset[COMMS_CHANNEL_DATASET_KEY] = channelName;
  }
  else {
    delete document.documentElement.dataset[COMMS_CHANNEL_DATASET_KEY];
  }

  return channelName;
}

;// ./src/all/errors.js
/*
 * This file is part of eyeo's Web Extension Ad Blocking Toolkit (EWE),
 * Copyright (C) 2006-present eyeo GmbH
 *
 * EWE is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * EWE is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with EWE.  If not, see <http://www.gnu.org/licenses/>.
 */

const ERROR_NO_CONNECTION = (/* unused pure expression or super */ null && ("Could not establish connection. " +
      "Receiving end does not exist."));
const ERROR_CLOSED_CONNECTION = (/* unused pure expression or super */ null && ("A listener indicated an asynchronous " +
      "response by returning true, but the message channel closed before a " +
      "response was received"));
// https://bugzilla.mozilla.org/show_bug.cgi?id=1578697
const ERROR_MANAGER_DISCONNECTED = "Message manager disconnected";

/**
 * Reconstructs an error from a serializable error object
 *
 * @param {Object} errorData - Error object
 *
 * @returns {Error} error
 */
function fromSerializableError(errorData) {
  const error = new Error(errorData.message);
  error.cause = errorData.cause;
  error.name = errorData.name;
  error.stack = errorData.stack;

  return error;
}

/**
 * Filters out `browser.runtime.sendMessage` errors to do with the receiving end
 * no longer existing.
 *
 * @param {Promise} promise The promise that should have "no connection" errors
 *   ignored. Generally this would be the promise returned by
 *   `browser.runtime.sendMessage`.
 * @return {Promise} The same promise, but will resolve with `undefined` instead
 *   of rejecting if the receiving end no longer exists.
 */
function ignoreNoConnectionError(promise) {
  return promise.catch(error => {
    if (typeof error == "object" &&
        (error.message == ERROR_NO_CONNECTION ||
         error.message == ERROR_CLOSED_CONNECTION ||
         error.message == ERROR_MANAGER_DISCONNECTED)) {
      return;
    }

    throw error;
  });
}

/**
 * Creates serializable error object from given error
 *
 * @param {Error} error - Error
 *
 * @returns {Object} serializable error object
 */
function toSerializableError(error) {
  return {
    cause: error.cause instanceof Error ?
      toSerializableError(error.cause) :
      error.cause,
    message: error.message,
    name: error.name,
    stack: error.stack
  };
}

;// ./src/content/main/snippets.entry.js
/*
 * This file is part of eyeo's Web Extension Ad Blocking Toolkit (EWE),
 * Copyright (C) 2006-present eyeo GmbH
 *
 * EWE is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * EWE is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with EWE.  If not, see <http://www.gnu.org/licenses/>.
 */









// Use chrome.storage to detect if we're in an isolated world.
// Note: chrome.runtime is unreliable since other extensions may expose it
// in the main world.
const isMainWorld = !(
  (typeof chrome === "object" && !!chrome.storage) ||
  (typeof browser === "object" && !!browser.storage)
);

const nativeDispatch = document.dispatchEvent.bind(document);

// Get or create a unique channel name for communicating with the isolated world
const commsChannelName = claimCommsChannel(esm_browser_v4());

// Creates a sendSnippetHitEvent function that dispatches hit events back to
// the isolated world via the comms channel. The isolated-world listener
// receives, validates, and forwards the event to the telemetry pipeline.
const createMainWorldHitEventSender = (commsChannel, dispatch) => {
  const dispatchFn = dispatch || document.dispatchEvent.bind(document);
  return function sendSnippetHitEvent(filter, domain) {
    try {
      dispatchFn(new CustomEvent(commsChannel, {
        detail: {
          type: "ewe:snippet-hit",
          filter,
          domain
        }
      }));
    }
    catch (e) {
      // telemetry must never break snippet execution
    }
  };
};

const runStorageShim = (shimFn, configKey) => {
  try {
    if (typeof shimFn === "function" && configKey) {
      shimFn(configKey);
    }
  }
  catch (err) {
    // It would be good to report this error to Sentry, but we don't currently
    // have a way to do that from the main world.
  }
};

const runSnippets = snippetsConfig => {
  const {callback, filters, env, commsChannel, serializeError,
    dispatchFn} = snippetsConfig;

  if (filters.length) {
    try {
      callback(env, ...filters);
    }
    catch (e) {
      // It would be good to report this error to Sentry, but we don't currently
      // have a way to do that from the main world.
      const errorEvent = new CustomEvent(commsChannel, {
        detail: {
          type: "ewe:main-error",
          error: serializeError(e)
        }
      });
      dispatchFn(errorEvent);
    }
  }
};

const createTrustedScriptPolicy = () => {
  const isTrustedTypesSupported = typeof trustedTypes !== "undefined";
  let policy = null;

  try {
    if (isTrustedTypesSupported) {
      policy = trustedTypes.createPolicy(esm_browser_v4(), {
        createScript: code => code,
        createScriptURL: url => url
      });
    }
  }
  catch (_) {
  }
  return policy;
};

const injectScript = (executable, policy) => {
  const script = document.createElement("script");
  script.type = "application/javascript";
  script.async = false;

  if (policy) {
    script.textContent = policy.createScript(executable);
  }
  else {
    script.textContent = executable;
  }

  try {
    document.documentElement.appendChild(script);
  }
  catch (_) {}
  document.documentElement.removeChild(script);
};

const appendSnippets = snippetsConfig => {
  const policy = createTrustedScriptPolicy();
  const {
    callback,
    filters,
    env,
    shimFn,
    shimConfigKey,
    commsChannel,
    serializeError
  } = snippetsConfig;

  const snippetsCode = filters.length ? `
    const callback = (${callback});
    const runSnippets = (${runSnippets});
    const serializeError = (${serializeError});
    const createHitSender = (${createMainWorldHitEventSender});
    const env = ${JSON.stringify(env)};
    env.sendSnippetHitEvent = createHitSender(
      "${commsChannel}", null
    );
    const snippetsConfig = {
      callback,
      env,
      filters: ${JSON.stringify(filters)},
      commsChannel: "${commsChannel}",
      serializeError,
      dispatchFn: document.dispatchEvent.bind(document)
    };
    runSnippets(snippetsConfig);
  ` : "";

  const code = `(function () {
    const shimFn = (${shimFn});
    const shimConfigKey = "${shimConfigKey}";
    const runStorageShim = (${runStorageShim});
    runStorageShim(shimFn, shimConfigKey);
    ${snippetsCode}
  })();`;

  injectScript(code, policy);
};

const onFiltersReceived = event => {
  if (!event || !event.detail) {
    return;
  }

  const {type, filters, debug} = event.detail;

  // ignore other events that are not related to filters config
  if (type !== "ewe:filters-config") {
    return;
  }

  // Check which snippets need to be executed in the main world.
  const mainSnippets = [];
  for (const filter of filters) {
    for (const [name, ...args] of filter) {
      if (main.has(name)) {
        mainSnippets.push([name, ...args]);
      }
    }
  }

  // sendDetectionEvent is intentionally not included in the main world env.
  // Detection events rely on ServerLogger and Sentry, which require extension
  // API access only available in the isolated world. See snippet-events.js.
  const snippetsConfig = {
    callback: main,
    env: {
      debugCSSProperties: debug ? DEBUG_CSS_PROPERTIES : null,
      sendSnippetHitEvent: createMainWorldHitEventSender(
        commsChannelName, isMainWorld ? nativeDispatch : null
      )
    },
    filters: mainSnippets,
    shimFn: shimStorage,
    shimConfigKey: CACHED_FILTERS_CONFIG_KEY,
    commsChannel: commsChannelName,
    serializeError: toSerializableError,
    dispatchFn: nativeDispatch
  };

  // If this script is injected into the main world we can execute directly.
  // If we are on isolated world (MV2), we need to create an inline script to
  // inject the snippets into page context.
  if (isMainWorld) {
    runStorageShim(shimStorage, CACHED_FILTERS_CONFIG_KEY);
    runSnippets(snippetsConfig);
  }
  else {
    appendSnippets(snippetsConfig);
  }
};

document.addEventListener(commsChannelName, onFiltersReceived);
document.dispatchEvent(new CustomEvent(HANDSHAKE_EVENT_NAME));

/******/ })()
;
