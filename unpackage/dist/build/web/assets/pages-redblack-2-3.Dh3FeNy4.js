import{_ as a,$ as s,v as e,U as o,b as t,w as i,F as n,i as l,S as c,a as d,e as r,x as m,t as u,l as f}from"./index-DD8SDI5w.js";import{_ as g}from"./background.9mxQRA6f.js";import{_ as p}from"./_plugin-vue_export-helper.BCo6x5W8.js";const _=p({data:()=>({foodItems:[],tagsQuery:"糖尿病黑",heat:[]}),methods:{fetchFoodItems(){const s=`http://129.204.151.245:5001/ingredients/tags?tags=${this.tagsQuery}`;a({url:s,method:"GET",success:a=>{200===a.statusCode?this.foodItems=a.data.map((a=>({name:a.ingredient_name,calories:a.unit_heat,image:a.nutritions.slice(8,a.nutritions.indexOf("大卡"))}))):console.error("食材查询失败:",a.statusCode)},fail:a=>{console.error("请求食材数据时发生错误:",a)}})},navigateToRecommend(){s({url:"/pages/redblack/1/3"})},navigateToCaution(){s({url:"/pages/redblack/2/3"})}},mounted(){this.fetchFoodItems()}},[["render",function(a,s,p,_,h,v){const k=f,x=l,C=c;return d(),e(n,null,[o("div",{class:"main-image"},[o("img",{src:g,alt:"logo",class:"background-image"})]),t(x,{class:"top-card"},{default:i((()=>[t(k,{class:"top-card-text recommend",onClick:v.navigateToRecommend},{default:i((()=>[r("推荐食用")])),_:1},8,["onClick"]),t(k,{class:"top-card caution",onClick:v.navigateToCaution},{default:i((()=>[r("谨慎食用")])),_:1},8,["onClick"])])),_:1}),t(C,{style:{flex:"1",padding:"10px"}},{default:i((()=>[o("div",{class:"food-list"},[(d(!0),e(n,null,m(h.foodItems,(a=>(d(),e("div",{class:"food-item",key:a.name},[o("img",{src:a.calories,alt:"",class:"food-image"},null,8,["src"]),o("div",{class:"food-info"},[o("p",{class:"food-name"},u(a.name),1),o("p",{class:"food-calories"},[o("span",{class:"calories-number"},u(a.image),1),o("span",{class:"calories-unit"},"千卡/100克")])])])))),128))])])),_:1})],64)}],["__scopeId","data-v-25d9f787"]]);export{_ as default};
