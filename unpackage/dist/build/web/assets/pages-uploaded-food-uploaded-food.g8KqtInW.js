import{a0 as a,a7 as s,a8 as o,v as e,U as t,F as i,x as r,a as d,t as l}from"./index-DD8SDI5w.js";import{_ as v}from"./捂嘴.BnetWn1a.js";import{_ as c}from"./_plugin-vue_export-helper.BCo6x5W8.js";const f=c({data:()=>({favoriteFoods:[]}),methods:{goBack(){a()},loadFavorites(){const a=JSON.parse(localStorage.getItem("favoriteFoods"))||[];this.favoriteFoods=a}},mounted(){this.loadFavorites();const a=this;s("updateFavorites",(()=>{a.loadFavorites()}))},beforeDestroy(){o("updateFavorites")}},[["render",function(a,s,o,c,f,p){return d(),e("div",{class:"favorites-page"},[t("div",{class:"favorites-list"},[0===f.favoriteFoods.length?(d(),e("div",{key:0,class:"empty-state"},[t("img",{src:v,alt:"暂无上传的食物"}),t("p",null,"您还没有上传任何食物哦！")])):(d(),e("div",{key:1},[(d(!0),e(i,null,r(f.favoriteFoods,(a=>(d(),e("div",{class:"favorite-item",key:a.id},[t("div",{class:"food-image"},[t("img",{src:a.image||"/pages/images/logo.jpg",alt:"食物图片"},null,8,["src"])]),t("div",{class:"food-details"},[t("h4",{class:"food-name"},l(a.name),1),t("p",{class:"food-description"},l(a.description),1)])])))),128))]))])])}],["__scopeId","data-v-3e9a2adf"]]);export{f as default};