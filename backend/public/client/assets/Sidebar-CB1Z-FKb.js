import{w as h,b as u}from"./auth-ByqfQS__.js";import{u as p,a as g,r as m,j as e,O as x}from"./chunk-DQRVZFIR-iiQLzre3.js";import{u as y}from"./authStore-Bl6YCSMu.js";import{c as a,y as r}from"./index-KeYFdd6Z.js";import{A as b}from"./AdminRoute-DvLfaCzf.js";import{c as t}from"./createLucideIcon-CV70i0aP.js";import{a as f,S as j}from"./store-Br-Ck7XH.js";import"./Loader-DrVFdCe6.js";/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],w=t("layout-dashboard",k);/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],v=t("log-out",N);/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"m15 11-1 9",key:"5wnq3a"}],["path",{d:"m19 11-4-7",key:"cnml18"}],["path",{d:"M2 11h20",key:"3eubbj"}],["path",{d:"m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4",key:"yiazzp"}],["path",{d:"M4.5 15.5h15",key:"13mye1"}],["path",{d:"m5 11 4-7",key:"116ra9"}],["path",{d:"m9 11 1 9",key:"1ojof7"}]],C=t("shopping-basket",S);/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["circle",{cx:"12",cy:"8",r:"5",key:"1hypcn"}],["path",{d:"M20 21a8 8 0 0 0-16 0",key:"rfgkzh"}]],L=t("user-round",_),A=()=>{const s=p(),d=g(),{fetchUser:i,user:M}=y(),[$,n]=m.useState(!1),o=c=>d.pathname===c,l=async()=>{n(!0);try{await u(),await i(),r.dismiss(),r.success("User successfully logged out"),s("/login",{replace:!0})}catch(c){r.dismiss(),r.error(c.message||"Something went wrong")}finally{n(!1)}};return e.jsx(b,{children:e.jsxs("div",{className:"flex gap-10 h-[100vh] justify-between",children:[e.jsxs("aside",{className:"w-64 bg-gray-900 text-white p-4 fixed  h-[100vh]",children:[e.jsx("h2",{className:"text-2xl font-bold mb-6",children:"ecommerce"}),e.jsxs("div",{className:"flex flex-col ",children:[e.jsxs("nav",{className:"space-y-2",children:[e.jsxs("button",{onClick:()=>s("/dashboard"),className:a("p-2 rounded flex gap-2 w-full cursor-pointer hover:bg-gray-700",o("/dashboard")&&"bg-gray-800"),children:[e.jsx(w,{}),"Dashboard"]}),e.jsxs("button",{onClick:()=>s("/dashboard/stores"),className:a("p-2 rounded flex gap-2 w-full cursor-pointer hover:bg-gray-700",o("/dashboard/stores")&&"bg-gray-800"),children:[e.jsx(f,{}),"Stores"]}),e.jsxs("button",{onClick:()=>s("/dashboard/products"),className:a("p-2 rounded flex gap-2 w-full cursor-pointer hover:bg-gray-700",o("/dashboard/products")&&"bg-gray-800"),children:[e.jsx(j,{}),"Products"]}),e.jsxs("button",{onClick:()=>s("/create-admin"),className:a("p-2 rounded flex gap-2 w-full cursor-pointer hover:bg-gray-700",o("/create-admin")&&"bg-gray-800"),children:[e.jsx(L,{}),"Create Admin"]}),e.jsxs("button",{onClick:()=>s("/shop"),className:a("p-2 rounded flex gap-2 w-full cursor-pointer hover:bg-gray-700",o("/shop")&&"bg-gray-800"),children:[e.jsx(C,{}),"Shop"]})]}),e.jsxs("button",{onClick:l,className:"p-2 rounded hover:bg-gray-700 flex gap-2 absolute bottom-10 cursor-pointer ",children:[e.jsx(v,{})," Logout"]})]})]}),e.jsx("div",{className:"pt-10 ml-76 w-full",children:e.jsx(x,{})})]})})},P=h(A);export{P as default};
