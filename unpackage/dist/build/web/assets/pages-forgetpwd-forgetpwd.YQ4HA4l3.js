import{R as e,v as a,b as s,U as o,w as l,t,H as n,n as r,I as u,f as c,l as d,a as i,e as p,d as v}from"./index-DD8SDI5w.js";import{_ as m}from"./_plugin-vue_export-helper.BCo6x5W8.js";const g=m({__name:"forgetpwd",setup(m){const g=e(""),f=e(""),w=e(""),h=e("");async function y(){if(f.value===w.value)try{const e=await fetch("http://127.0.0.1:5000/user/reset_password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phoneNum:g.value,password:f.value})});if(!e.ok)throw new Error("Network response was not ok");const a=e.headers.get("Content-Type");if(!a||!a.includes("application/json"))throw new Error("Response is not JSON");const s=await e.json();console.log(s),s.success&&"True"===s.success?(alert("密码重置成功，请使用新密码登录"),r({url:"/pages/login/login"})):h.value=s.message||"密码重置失败"}catch(e){console.error("密码重置请求失败:",e),h.value="密码重置请求失败，请稍后再试"}else h.value="两次输入的密码不一致"}return(e,r)=>{const m=v,V=u,_=c,C=d;return i(),a("div",{class:"forgot-password-container"},[s(m,{class:"logo",src:"/yangshiji/assets/forgetpwd-BJwhyIfj.jpg",mode:"aspectFit"}),o("div",{class:"input-group"},[o("span",{class:"icon"},"📱"),s(V,{type:"text",modelValue:g.value,"onUpdate:modelValue":r[0]||(r[0]=e=>g.value=e),placeholder:"请输入您的手机号"},null,8,["modelValue"])]),o("div",{class:"input-group"},[o("span",{class:"icon"},"🔑"),s(V,{type:"text",modelValue:e.verificationCode,"onUpdate:modelValue":r[1]||(r[1]=a=>e.verificationCode=a),placeholder:"请输入验证码"},null,8,["modelValue"]),s(_,{class:"get-code",onClick:e.getVerificationCode},{default:l((()=>[p(t(e.isCodeButtonDisabled?`${e.countdown}秒后重试`:"获取验证码"),1)])),_:1},8,["onClick"])]),o("div",{class:"input-group"},[o("span",{class:"icon"},"🔒"),s(V,{type:"password",modelValue:f.value,"onUpdate:modelValue":r[2]||(r[2]=e=>f.value=e),placeholder:"请重新设置您的密码"},null,8,["modelValue"])]),o("div",{class:"input-group"},[o("span",{class:"icon"},"📧"),s(V,{type:"password",modelValue:w.value,"onUpdate:modelValue":r[3]||(r[3]=e=>w.value=e),placeholder:"再次确认您的密码"},null,8,["modelValue"])]),s(C,{class:"reset-button",onClick:y},{default:l((()=>[p("重置密码")])),_:1}),h.value?(i(),a("div",{key:0,class:"error-message"},t(h.value),1)):n("",!0)])}}},[["__scopeId","data-v-25ee949a"]]);export{g as default};
