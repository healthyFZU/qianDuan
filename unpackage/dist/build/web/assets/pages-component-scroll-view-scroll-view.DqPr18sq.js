import{s as l,r as o,c as e,w as s,i as c,a as t,b as n,e as r,f as i,S as a}from"./index-DD8SDI5w.js";import{r as u,_ as d}from"./uni-app.es.DH3McOWf.js";import{_ as p}from"./_plugin-vue_export-helper.BCo6x5W8.js";const m=p({data:()=>({scrollTop:0,old:{scrollTop:0}}),methods:{upper:function(l){console.log(l)},lower:function(l){console.log(l)},scroll:function(l){console.log(l),this.old.scrollTop=l.detail.scrollTop},goTop:function(o){this.scrollTop=this.old.scrollTop,this.$nextTick((function(){this.scrollTop=0})),l({icon:"none",title:"纵向滚动 scrollTop 值已被修改为 0"})}}},[["render",function(l,p,m,f,_,g){const w=u(o("page-head"),d),T=i,S=c,b=a;return t(),e(S,null,{default:s((()=>[n(w,{title:"scroll-view,区域滚动视图"}),n(S,{class:"uni-padding-wrap uni-common-mt"},{default:s((()=>[n(S,{class:"uni-title uni-common-mt"},{default:s((()=>[r(" Vertical Scroll "),n(T,null,{default:s((()=>[r("\\n纵向滚动")])),_:1})])),_:1}),n(S,null,{default:s((()=>[n(b,{"scroll-top":_.scrollTop,"scroll-y":"true",class:"scroll-Y",onScrolltoupper:g.upper,onScrolltolower:g.lower,onScroll:g.scroll},{default:s((()=>[n(S,{id:"demo1",class:"scroll-view-item uni-bg-red"},{default:s((()=>[r("A")])),_:1}),n(S,{id:"demo2",class:"scroll-view-item uni-bg-green"},{default:s((()=>[r("B")])),_:1}),n(S,{id:"demo3",class:"scroll-view-item uni-bg-blue"},{default:s((()=>[r("C")])),_:1})])),_:1},8,["scroll-top","onScrolltoupper","onScrolltolower","onScroll"])])),_:1}),n(S,{onClick:g.goTop,class:"uni-link uni-center uni-common-mt"},{default:s((()=>[r(" 点击这里返回顶部 ")])),_:1},8,["onClick"]),n(S,{class:"uni-title uni-common-mt"},{default:s((()=>[r(" Horizontal Scroll "),n(T,null,{default:s((()=>[r("\\n横向滚动")])),_:1})])),_:1}),n(S,null,{default:s((()=>[n(b,{class:"scroll-view_H","scroll-x":"true",onScroll:g.scroll,"scroll-left":"120"},{default:s((()=>[n(S,{id:"demo1",class:"scroll-view-item_H uni-bg-red"},{default:s((()=>[r("A")])),_:1}),n(S,{id:"demo2",class:"scroll-view-item_H uni-bg-green"},{default:s((()=>[r("B")])),_:1}),n(S,{id:"demo3",class:"scroll-view-item_H uni-bg-blue"},{default:s((()=>[r("C")])),_:1})])),_:1},8,["onScroll"])])),_:1}),n(S,{class:"uni-common-pb"})])),_:1})])),_:1})}],["__scopeId","data-v-9191317f"]]);export{m as default};