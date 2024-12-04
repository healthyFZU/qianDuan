import{v as a,b as e,w as t,F as s,i as p,S as c,a as m,U as b,e as i,x as f,t as g,f as n}from"./index-DD8SDI5w.js";import{_ as l}from"./background.9mxQRA6f.js";import{_ as o}from"./_plugin-vue_export-helper.BCo6x5W8.js";const r=o({data:()=>({foodItems:[{name:"芦荟（鲜）",calories:4,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/fruit/luhui.png"},{name:"白粉桃",calories:26,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/fruit/peach.png"},{name:"甜瓜",calories:26,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/fruit/gua.png"},{name:"青木瓜",calories:29,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/fruit/qinggua.png"},{name:"西瓜（黄肉小瓜）",calories:29,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/fruit/yellow.png"},{name:"木瓜",calories:30,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/fruit/mugua.png"},{name:"杨梅",calories:30,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/fruit/yangmei.png"},{name:"杨桃",calories:31,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/fruit/yangtao.png"},{name:"西瓜",calories:31,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/fruit/xigua.png"},{name:"草莓",calories:32,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/fruit/caomei.png"}],meatItems:[{name:"鸡蛋",protein:13.1,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/meat/egg.jpg"},{name:"牛奶",protein:13,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/meat/milk.jpg"},{name:"鱼肉",protein:18,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/meat/fish.jpg"},{name:"虾肉",protein:16.8,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/meat/xia.jpg"},{name:"鸡肉",protein:20.3,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/meat/chicken.jpg"},{name:"牛肉",protein:22.6,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/meat/beef.jpg"},{name:"瘦猪肉",protein:20.7,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/meat/pig.jpg"},{name:"鸭肉",protein:15.5,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/meat/ya.jpg"},{name:"羊肉",protein:20.5,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/meat/yang.jpg"},{name:"大豆",protein:33,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/meat/dou.jpg"}],vegetableItems:[{name:"彩椒",fiber:3.3,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/vegetables/caijiao.jpg"},{name:"香菇",fiber:3.3,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/vegetables/xianggu.jpg"},{name:"春笋",fiber:2.8,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/vegetables/sun.jpg"},{name:"金针菇",fiber:2.7,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/vegetables/jinzhengu.jpg"},{name:"白玉菇",fiber:2.6,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/vegetables/baiyugu.jpg"},{name:"西兰花",fiber:2.6,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/vegetables/xilanhua.jpg"},{name:"木耳",fiber:2.6,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/vegetables/muer.jpg"},{name:"四季豆",fiber:2.5,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/vegetables/dou.jpg"},{name:"韭菜",fiber:2.4,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/vegetables/jiucai.jpg"},{name:"胡萝卜",fiber:2.4,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/vegetables/carrot.jpg"}],carbItems:[{name:"牛油果",carbs:15.3,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/carbs/niuyou.jpg"},{name:"橄榄油",carbs:99.9,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/carbs/ganlan.jpg"},{name:"花生",carbs:25.4,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/carbs/huasheng.jpg"},{name:"奶酪",carbs:23.5,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/carbs/nailao.jpg"},{name:"奇亚籽",carbs:30.7,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/carbs/qiyazi.jpg"},{name:"椰子油",carbs:12.1,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/carbs/yeziyou.jpg"},{name:"蛋黄",carbs:5,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/carbs/egg.jpg"},{name:"三文鱼",carbs:13,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/carbs/sanwen.jpg"},{name:"核桃",carbs:65,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/carbs/hetao.jpg"},{name:"夏威夷果",carbs:75.8,image:"https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/carbs/guo.jpg"}]})},[["render",function(o,r,d,u,x,h){const v=n,j=p,y=c;return m(),a(s,null,[e(j,{class:"top-card"},{default:t((()=>[b("div",{class:"main-image"},[b("img",{src:l,alt:"logo",class:"background-image"})]),e(v,{class:"top-card-text"},{default:t((()=>[i("低热量 — 水果类")])),_:1})])),_:1}),e(y,{style:{flex:"1",padding:"10px"}},{default:t((()=>[b("div",{class:"food-list"},[(m(!0),a(s,null,f(x.foodItems,(e=>(m(),a("div",{class:"food-item",key:e.name},[b("img",{src:e.image,alt:"",class:"food-image"},null,8,["src"]),b("div",{class:"food-info"},[b("p",{class:"food-name"},g(e.name),1),b("p",{class:"food-calories"},[b("span",{class:"calories-number"},g(e.calories),1),b("span",{class:"calories-unit"},"千卡/100克")])])])))),128))])])),_:1}),e(j,{class:"top-card"},{default:t((()=>[b("div",{class:"main-image"},[b("img",{src:l,alt:"logo",class:"background-image"})]),e(v,{class:"top-card-text"},{default:t((()=>[i("高蛋白 — 食物类")])),_:1})])),_:1}),e(y,{style:{flex:"1",padding:"10px"}},{default:t((()=>[b("div",{class:"meat-list"},[(m(!0),a(s,null,f(x.meatItems,(e=>(m(),a("div",{class:"meat-item",key:e.name},[b("img",{src:e.image,alt:"",class:"meat-image"},null,8,["src"]),b("div",{class:"meat-info"},[b("p",{class:"meat-name"},g(e.name),1),b("p",{class:"meat-protein"},[b("span",{class:"protein-number"},g(e.protein),1),b("span",{class:"protein-unit"},"克/100克")])])])))),128))])])),_:1}),e(j,{class:"top-card"},{default:t((()=>[b("div",{class:"main-image"},[b("img",{src:l,alt:"logo",class:"background-image"})]),e(v,{class:"top-card-text"},{default:t((()=>[i("高纤维 — 蔬菜类")])),_:1})])),_:1}),e(y,{style:{flex:"1",padding:"10px"}},{default:t((()=>[b("div",{class:"vegetable-list"},[(m(!0),a(s,null,f(x.vegetableItems,(e=>(m(),a("div",{class:"vegetable-item",key:e.name},[b("img",{src:e.image,alt:"",class:"vegetable-image"},null,8,["src"]),b("div",{class:"vegetable-info"},[b("p",{class:"vegetable-name"},g(e.name),1),b("p",{class:"vegetable-fiber"},[b("span",{class:"fiber-number"},g(e.fiber),1),b("span",{class:"fiber-unit"},"克/100克")])])])))),128))])])),_:1}),e(j,{class:"top-card"},{default:t((()=>[b("div",{class:"main-image"},[b("img",{src:l,alt:"logo",class:"background-image"})]),e(v,{class:"top-card-text"},{default:t((()=>[i("优质 — 脂肪类")])),_:1})])),_:1}),e(y,{style:{flex:"1",padding:"10px"}},{default:t((()=>[b("div",{class:"carb-list"},[(m(!0),a(s,null,f(x.carbItems,(e=>(m(),a("div",{class:"carb-item",key:e.name},[b("img",{src:e.image,alt:"",class:"carb-image"},null,8,["src"]),b("div",{class:"carb-info"},[b("p",{class:"carb-name"},g(e.name),1),b("p",{class:"carb-carbs"},[b("span",{class:"carbs-number"},g(e.carbs),1),b("span",{class:"carbs-unit"},"克/100克")])])])))),128))])])),_:1})],64)}],["__scopeId","data-v-652a4e07"]]);export{r as default};