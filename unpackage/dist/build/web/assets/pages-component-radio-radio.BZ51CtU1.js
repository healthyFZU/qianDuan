import{r as a,_ as e}from"./uni-app.es.DH3McOWf.js";import{r as l,c as t,w as s,i as u,a as n,b as r,e as i,v as d,x as c,t as o,F as f,B as m,z as _,C as p}from"./index-DD8SDI5w.js";import{_ as v}from"./_plugin-vue_export-helper.BCo6x5W8.js";const h=v({data:()=>({title:"radio 单选框",items:[{value:"USA",name:"美国"},{value:"CHN",name:"中国",checked:"true"},{value:"BRA",name:"巴西"},{value:"JPN",name:"日本"},{value:"ENG",name:"英国"},{value:"FRA",name:"法国"}],current:0}),methods:{radioChange(a){for(let e=0;e<this.items.length;e++)if(this.items[e].value===a.detail.value){this.current=e;break}}}},[["render",function(v,h,g,C,k,x){const F=a(l("page-head"),e),y=u,j=m,w=_,A=p;return n(),t(y,null,{default:s((()=>[r(F,{title:k.title},null,8,["title"]),r(y,{class:"uni-padding-wrap"},{default:s((()=>[r(y,{class:"uni-title"},{default:s((()=>[i("默认样式")])),_:1}),r(y,null,{default:s((()=>[r(w,{class:"radio",style:{"margin-right":"30rpx"}},{default:s((()=>[r(j,{value:"r1",checked:"true"}),i("选中 ")])),_:1}),r(w,{class:"radio"},{default:s((()=>[r(j,{value:"r2"}),i("未选中 ")])),_:1})])),_:1})])),_:1}),r(y,{class:"uni-padding-wrap"},{default:s((()=>[r(y,{class:"uni-title"},{default:s((()=>[i("不同颜色和尺寸的radio")])),_:1}),r(y,null,{default:s((()=>[r(w,{class:"radio",style:{"margin-right":"30rpx"}},{default:s((()=>[r(j,{value:"r1",checked:"true",color:"#FFCC33",style:{transform:"scale(0.7)"}}),i("选中 ")])),_:1}),r(w,{class:"radio"},{default:s((()=>[r(j,{value:"r2",color:"#FFCC33",style:{transform:"scale(0.7)"}}),i("未选中 ")])),_:1})])),_:1})])),_:1}),r(y,{class:"uni-title uni-common-mt uni-common-pl"},{default:s((()=>[i("推荐展示样式")])),_:1}),r(y,{class:"uni-list"},{default:s((()=>[r(A,{onChange:x.radioChange},{default:s((()=>[(n(!0),d(f,null,c(k.items,((a,e)=>(n(),t(w,{class:"uni-list-cell uni-list-cell-pd",key:a.value},{default:s((()=>[r(y,null,{default:s((()=>[r(j,{value:a.value,checked:e===k.current},null,8,["value","checked"])])),_:2},1024),r(y,null,{default:s((()=>[i(o(a.name),1)])),_:2},1024)])),_:2},1024)))),128))])),_:1},8,["onChange"])])),_:1})])),_:1})}],["__scopeId","data-v-71f21319"]]);export{h as default};