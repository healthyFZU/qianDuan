import{a0 as o,n as s,v as a,U as t,F as i,x as e,a as c,p as d,t as p}from"./index-DD8SDI5w.js";import{_ as l}from"./background.9mxQRA6f.js";import{_ as r}from"./enter.BZkF5oXj.js";import{_ as n}from"./_plugin-vue_export-helper.BCo6x5W8.js";const f=n({data:()=>({foodItems:[{id:1,title:"自定义食物",description:"来定义记录，万物皆可记",icon:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/custom-food.png",route:"/pages/custom-food/custom-food"},{id:2,title:"我上传的食品",description:"查询您使用过的食品数据或数据库",icon:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/uploaded-food.png",route:"/pages/uploaded-food/uploaded-food"},{id:3,title:"我的收藏",description:"您爱吃的都在这儿",icon:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/my-recipes.png",route:"/pages/likes/likes"}]}),methods:{goBack(){o()},navigateTo(o){s({url:o})}}},[["render",function(o,s,n,f,m,g){return c(),a("div",{class:"food-list-page"},[t("div",{class:"main-image"},[t("img",{src:l,alt:"logo",class:"background-image"})]),t("div",{class:"food-list"},[(c(!0),a(i,null,e(m.foodItems,(o=>(c(),a("div",{class:"food-item",key:o.id,onClick:s=>g.navigateTo(o.route)},[t("div",{class:"food-icon",style:d({backgroundColor:o.color})},[t("img",{src:o.icon,alt:"图标"},null,8,["src"])],4),t("div",{class:"food-details"},[t("h4",{class:"food-title"},p(o.title),1),t("p",{class:"food-desc"},p(o.description),1)]),t("img",{src:r,alt:"跳转",class:"arrow-icon"})],8,["onClick"])))),128))])])}],["__scopeId","data-v-a4291b58"]]);export{f as default};
