import{T as s,R as a,o as l,W as n,v as e,U as i,t,a as o}from"./index-DD8SDI5w.js";import{_ as c}from"./background.9mxQRA6f.js";import{_ as f}from"./_plugin-vue_export-helper.BCo6x5W8.js";const p=f({__name:"basic_info",setup(f){const p=s(),v=a({userId:3,birthday:"",sex:"",height:null,weight:null,special_time:"",special_circumstances:"",weight_target:null,target:"",stage:"",pre_over_time:""});l((()=>{!async function(){try{const s=await fetch(`http://129.204.151.245:5001/user/${u.value}/body-info`,{method:"GET",headers:{"Content-Type":"application/json"}});if(s.ok){const a=await s.json();v.value=a}else console.error("获取数据失败，请稍后重试！")}catch(s){console.error("获取数据时发生错误：",s)}}()}));const u=n((()=>p.state.userId));return console.log(u.value),(s,a)=>(o(),e("div",{class:"basic-info-page"},[i("div",{class:"main-image"},[i("img",{src:c,alt:"logo",class:"background-image"})]),i("div",{class:"header"},[i("h3",{class:"page-title"},"基本信息")]),i("div",{class:"info-list"},[i("div",{class:"info-item"},[i("span",{class:"info-label"},"性别"),i("div",{class:"info-content"},[i("span",null,t(v.value.sex),1)])]),i("div",{class:"info-item"},[i("span",{class:"info-label"},"出生日期"),i("div",{class:"info-content"},[i("span",null,t(v.value.birthday),1)])]),i("div",{class:"info-item"},[i("span",{class:"info-label"},"身高"),i("div",{class:"info-content"},[i("span",null,t(v.value.height)+"米",1)])]),i("div",{class:"info-item"},[i("span",{class:"info-label"},"最新体重"),i("div",{class:"info-content"},[i("span",null,t(v.value.weight)+"公斤",1)])]),i("div",{class:"info-item"},[i("span",{class:"info-label"},"特殊时期"),i("div",{class:"info-content"},[i("span",null,t(v.value.special_time),1)])]),i("div",{class:"info-item"},[i("span",{class:"info-label"},"管理目标"),i("div",{class:"info-content"},[i("span",null,t(v.value.target),1)])]),i("div",{class:"info-item"},[i("span",{class:"info-label"},"目标体重"),i("div",{class:"info-content"},[i("span",null,t(v.value.weight_target)+"公斤",1)])]),i("div",{class:"info-item"},[i("span",{class:"info-label"},"预估达成时间"),i("div",{class:"info-content"},[i("span",null,t(v.value.pre_over_time),1)])]),i("div",{class:"info-item"},[i("span",{class:"info-label"},"减重阶段"),i("div",{class:"info-content"},[i("span",null,t(v.value.stage),1)])]),i("div",{class:"info-item"},[i("span",{class:"info-label"},"特殊情况"),i("div",{class:"info-content"},[i("span",null,t(v.value.special_circumstances),1)])])]),i("p",{class:"save-tip"},"该页面只展示基本信息")]))}},[["__scopeId","data-v-8ca05fef"]]);export{p as default};