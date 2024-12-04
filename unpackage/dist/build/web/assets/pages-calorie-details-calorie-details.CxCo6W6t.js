import{T as e,v as t,U as s,b as a,t as i,F as o,x as l,w as r,I as n,l as d,a as h,e as c,f as m}from"./index-DD8SDI5w.js";import{_ as u}from"./background.9mxQRA6f.js";import{_ as p}from"./_plugin-vue_export-helper.BCo6x5W8.js";const g=p({data(){return{recommendedCalories:1152,totalCalories:0,totalExercise:0,remainingCalories:1152,selectedDate:this.formatDate(new Date),lastLoadedDate:this.formatDate(new Date),meals:[{id:1,name:"早餐",suggestedRange:"311-380",items:[],totalCalories:0},{id:2,name:"午餐",suggestedRange:"400-600",items:[],totalCalories:0},{id:3,name:"晚餐",suggestedRange:"300-500",items:[],totalCalories:0},{id:4,name:"加餐",suggestedRange:"100-200",items:[],totalCalories:0},{id:5,name:"运动",suggestedRange:"600-700",items:[],totalCalories:0}],exercises:[]}},setup:()=>({store:e()}),mounted(){this.handleDateChange()},watch:{selectedDate(e){e!==this.lastLoadedDate&&this.handleDateChange()}},methods:{formatDate:e=>e.toISOString().split("T")[0],async handleDateChange(){this.lastLoadedDate!==this.selectedDate&&(this.resetDailyRecords(),this.lastLoadedDate=this.selectedDate),await this.loadDailyRecords(),await this.loadExerciseRecords()},async addFood(e){const t=this.store.state.userId,s=this.store.state.access_token;if(!t||!s)return void alert("请先登录！");alert("请输入食物名称和热量(如: 苹果 50)");const a=prompt();if(!a)return void alert("请输入有效的食物名称和热量！");const[i,o]=a.split(" ");if(!i||isNaN(o))return void alert("请输入有效的食物名称和热量！");const l=parseInt(o),r=this.meals.find((t=>t.id===e));if(!r)return void alert("未找到对应的餐点！");const n={name:i,calories:l};r.items.push(n),r.totalCalories+=l,this.totalCalories+=l,this.updateRemainingCalories();try{const e=await fetch(`http://129.204.151.245:5001/user/${t}/intake/date/${this.selectedDate}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`}});let a;if(e.ok){a=(await e.json()).intake_id}else{if(404!==e.status)throw new Error("获取每日记录失败！");{const e=await fetch(`http://129.204.151.245:5001/user/${t}/intake`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({date:this.selectedDate,eat_target:this.totalCalories||0,breakfast:this.meals[0].items||[],lunch:this.meals[1].items||[],dinner:this.meals[2].items||[],more:this.meals[3].items||[],have_eat:[],drink_target:0,have_drink:[],sports:this.meals[4].items||[]})});if(!e.ok)throw new Error("创建每日记录失败！");a=(await e.json()).intake_id}}const o={eat_target:this.totalCalories||0,breakfast:this.meals[0].items||[],lunch:this.meals[1].items||[],dinner:this.meals[2].items||[],more:this.meals[3].items||[],sports:this.meals[4].items||[]};(await fetch(`http://129.204.151.245:5001/user/${t}/intake/${a}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify(o)})).ok?(alert(`${i} 已添加到 ${r.name}！`),this.updateRemainingCalories()):alert("更新饮食记录失败，请稍后重试！")}catch(d){console.error("添加饮食记录出错：",d),alert("添加饮食记录失败，请检查网络连接！")}},async loadDailyRecords(){const e=this.store.state.userId,t=this.store.state.access_token;if(e&&t)try{const s=await fetch(`http://129.204.151.245:5001/user/${e}/intake/date/${this.selectedDate}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(s.ok){const e=await s.json();this.meals[0].items=e.breakfast||[],this.meals[1].items=e.lunch||[],this.meals[2].items=e.dinner||[],this.meals[3].items=e.more||[],this.meals[4].items=e.sports||[],this.totalCalories=this.meals.slice(0,5).reduce(((e,t)=>(t.totalCalories=t.items.reduce(((e,t)=>e+t.calories),0),e+t.totalCalories)),0),this.totalExercise=this.meals[4].items.reduce(((e,t)=>e+t.calories),0),this.updateRemainingCalories()}else 404===s.status?this.resetDailyRecords():alert("加载记录失败，请稍后重试！")}catch(s){console.error("加载记录出错：",s),alert("加载记录失败，请检查网络连接！")}else alert("请先登录！")},async saveDailyRecords(){const e=this.store.state.userId,t=this.store.state.access_token;if(!e||!t)return void alert("请先登录！");const s={date:this.selectedDate,eat_target:this.totalCalories,breakfast:this.meals[0].items,lunch:this.meals[1].items,dinner:this.meals[2].items,more:this.meals[3].items,sports:this.meals[4].items};try{(await fetch(`http://129.204.151.245:5001/user/${e}/intake`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(s)})).ok?alert("记录保存成功！"):alert("保存失败，请稍后重试！")}catch(a){console.error("保存记录出错：",a),alert("保存记录失败，请检查网络连接！")}},updateRemainingCalories(){this.remainingCalories=this.recommendedCalories-this.totalCalories+this.totalExercise+this.totalExercise},resetDailyRecords(){this.meals.forEach((e=>{e.items=[],e.totalCalories=0})),this.totalCalories=0,this.totalExercise=0,this.updateRemainingCalories()}}},[["render",function(e,p,g,C,f,D){const y=n,k=m,_=d;return h(),t("div",{class:"calorie-tracker"},[s("header",null,[s("div",{class:"main-image"},[s("img",{src:u,alt:"logo",class:"background-image"})]),a(y,{class:"date",type:"date",modelValue:f.selectedDate,"onUpdate:modelValue":p[0]||(p[0]=e=>f.selectedDate=e),onChange:e.onDateChange},null,8,["modelValue","onChange"]),s("div",{class:"stats"},[s("p",null,"推荐摄入 "+i(f.recommendedCalories)+" 千卡",1),s("p",null,"饮食摄入 "+i(f.totalCalories)+" 千卡",1),s("p",null,"还可以吃 "+i(f.remainingCalories)+" 千卡",1),s("p",null,"运动消耗 "+i(f.totalExercise)+" 千卡",1),s("img",{src:"/yangshiji/assets/%E7%9D%81%E7%9C%BC-%E6%94%BE%E5%A4%A7%E7%89%88-DqCbCyVW.png",class:"little-image"})])]),(h(!0),t(o,null,l(f.meals,(e=>(h(),t("div",{key:e.id,class:"meal-section"},[a(k,{style:{"font-size":"17px"}},{default:r((()=>[c(i(e.name)+" (建议"+i(e.suggestedRange)+" 千卡)",1)])),_:2},1024),s("ul",null,[(h(!0),t(o,null,l(e.items,((e,s)=>(h(),t("li",{key:s},i(e.name)+" - "+i(e.calories)+" 千卡 ",1)))),128))]),a(_,{class:"top-button",onClick:t=>D.addFood(e.id)},{default:r((()=>[c("+")])),_:2},1032,["onClick"]),s("p",null,"总热量: "+i(e.totalCalories)+" 千卡",1)])))),128)),s("div",{class:"footer"},[a(_,{class:"bottom-button",onClick:D.saveDailyRecords},{default:r((()=>[c("保存记录")])),_:1},8,["onClick"])])])}],["__scopeId","data-v-770e8ccc"]]);export{g as default};
