import{f as S,j as e,c as I,$ as f,S as R,u as G,F as l,T as h,r as x,B as v,a as A}from"./index-CE-45FQA.js";import{C as B,I as b}from"./Input-Cm8-Tm0V.js";const m=S(function(s,o){const{templateAreas:a,gap:i,rowGap:n,columnGap:c,column:u,row:d,autoFlow:p,autoRows:g,templateRows:t,autoColumns:w,templateColumns:j,...C}=s,y={display:"grid",gridTemplateAreas:a,gridGap:i,gridRowGap:n,gridColumnGap:c,gridAutoColumns:w,gridColumn:u,gridRow:d,gridAutoFlow:p,gridAutoRows:g,gridTemplateRows:t,gridTemplateColumns:j};return e.jsx(I.div,{ref:o,__css:y,...C})});m.displayName="Grid";function z(r,s,o,a){return f.post("/api/posts/create",{message:r,date:s,authorId:o},{headers:{Authorization:`Bearer ${a}`},withCredentials:!0})}async function P(r,s){return f.get(`/api/posts/user/${r}`,{headers:{Authorization:`Bearer ${s}`},withCredentials:!0})}async function $(r,s){return f.delete(`/api/posts/${r}`,{headers:{Authorization:`Bearer ${s}`},withCredentials:!0})}const k=()=>e.jsx(B,{w:"100%",h:"100%",children:e.jsx(R,{w:"50px",h:"50px",color:"blue.300"})}),D=({title:r,date:s,id:o})=>{const a=G(),i=localStorage.getItem("refresh"),n=()=>{i!==null&&($(o,i),a(0))};return e.jsxs(l,{flexDirection:"column",bgColor:"gray.100",w:"100%",h:"100%",borderRadius:"20px",p:"20px",gap:"10px",justifyContent:"space-between",children:[e.jsx(h,{fontWeight:500,lineHeight:"20px",fontSize:"17px",children:r}),e.jsxs(l,{alignItems:"center",justifyContent:"space-between",children:[e.jsx(h,{fontSize:"12px",fontWeight:400,children:s}),e.jsx(h,{fontSize:"12px",cursor:"pointer",color:"red.400",_hover:{color:"red.500"},onClick:n,children:"Удалить"})]})]})},F=()=>{const[r,s]=x.useState(""),[o,a]=x.useState([]),i=localStorage.getItem("id"),n=localStorage.getItem("refresh"),c=i?parseInt(i,10):null,[u,d]=x.useState(!1);x.useEffect(()=>{p()},[]);const p=async()=>{if(!(c===null||n===null))try{const t=await P(c,n);a(t.data)}catch(t){console.error("Failed to fetch posts:",t)}},g=async()=>{if(!r||!c){console.error("Message and author ID are required.");return}if(d(!0),n!==null)try{const t=new Date().toISOString();await z(r,t,c,n),s(""),p()}catch(t){console.error("Failed to create post:",t)}finally{d(!1)}};return e.jsxs(l,{w:"100%",h:"100%",px:"25px",position:"relative",flexDir:"column",children:[e.jsxs(l,{gap:"10px",pb:"20px",children:[e.jsx(b,{borderRadius:"10px",w:"500px",value:r,onChange:t=>s(t.target.value),placeholder:"Напишите что-нибудь..."}),e.jsx(v,{onClick:g,children:"Добавить"})]}),o&&!u&&e.jsx(l,{w:"100%",h:"100%",justifyContent:"flex-start",children:e.jsx(m,{templateColumns:["repeat(auto-fill, minmax(324px, 1fr))"],gridRowGap:"20px",gridColumnGap:"20px",children:o==null?void 0:o.map(t=>e.jsx(A,{w:"minmax(324px, 1fr)",children:e.jsx(D,{title:t.message,date:new Date(t.date).toLocaleString(),id:t.id})},t==null?void 0:t.id))})}),u&&e.jsx(k,{}),o.length===0&&e.jsx(l,{w:"100%",h:"100%",align:"center",justify:"center",children:e.jsx(h,{fontSize:"24px",fontWeight:600,children:"Здесь пока что пусто"})})]})},L=()=>e.jsx(l,{h:"80vh",children:e.jsx(F,{})});export{L as default};
