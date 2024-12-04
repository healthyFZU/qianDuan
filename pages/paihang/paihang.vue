<template>
  <view class="top-card">
    <div class="main-image">
      <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
    </div>
    <text class="top-card-text">低热量 — 水果类</text>
  </view>
  <scroll-view style="flex: 1; padding: 10px;">
    <div class="food-list">
      <div class="food-item" v-for="item in foodItems" :key="item.name">
        <img :src="item.image" alt="" class="food-image"/>
        <div class="food-info">
          <p class="food-name">{{ item.name }}</p>
          <p class="food-calories">
            <span class="calories-number">{{ item.calories }}</span> 
            <span class="calories-unit">千卡/100克</span>
          </p>
        </div>
      </div>
    </div>
  </scroll-view>
  
  <view class="top-card">
    <div class="main-image">
      <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
    </div>
    <text class="top-card-text">高蛋白 — 食物类</text>
  </view>
  <scroll-view style="flex: 1; padding: 10px;">
    <div class="meat-list">
      <div class="meat-item" v-for="item in meatItems" :key="item.name">
        <img :src="item.image" alt="" class="meat-image"/>
        <div class="meat-info">
          <p class="meat-name">{{ item.name }}</p>
          <p class="meat-protein">
            <span class="protein-number">{{ item.protein }}</span> 
            <span class="protein-unit">克/100克</span>
          </p>
        </div>
      </div>
    </div>
  </scroll-view>
  
  <view class="top-card">
    <div class="main-image">
      <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
    </div>
    <text class="top-card-text">高纤维 — 蔬菜类</text>
  </view>
  <scroll-view style="flex: 1; padding: 10px;">
    <div class="vegetable-list">
      <div class="vegetable-item" v-for="item in vegetableItems" :key="item.name">
        <img :src="item.image" alt="" class="vegetable-image"/>
        <div class="vegetable-info">
          <p class="vegetable-name">{{ item.name }}</p>
          <p class="vegetable-fiber">
            <span class="fiber-number">{{ item.fiber }}</span> 
            <span class="fiber-unit">克/100克</span>
          </p>
        </div>
      </div>
    </div>
  </scroll-view>
  
  <view class="top-card">
    <div class="main-image">
      <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
    </div>
    <text class="top-card-text">优质 — 脂肪类</text>
  </view>
  <scroll-view style="flex: 1; padding: 10px;">
    <div class="carb-list">
      <div class="carb-item" v-for="item in carbItems" :key="item.name">
        <img :src="item.image" alt="" class="carb-image"/>
        <div class="carb-info">
          <p class="carb-name">{{ item.name }}</p>
          <p class="carb-carbs">
            <span class="carbs-number">{{ item.carbs }}</span> 
            <span class="carbs-unit">克/100克</span>
          </p>
        </div>
      </div>
    </div>
  </scroll-view>
</template>


<script>
export default {
data() {
return {
foodItems: [
  { name: '芦荟（鲜）', calories: 4, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/fruit/luhui.png' },
  { name: '白粉桃', calories: 26, image:  'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/fruit/peach.png' },
  { name: '甜瓜', calories: 26, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/fruit/gua.png' },
  { name: '青木瓜', calories: 29, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/fruit/qinggua.png' },
  { name: '西瓜（黄肉小瓜）', calories: 29, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/fruit/yellow.png' },
  { name: '木瓜', calories: 30, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/fruit/mugua.png' },
  { name: '杨梅', calories: 30, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/fruit/yangmei.png' },
  { name: '杨桃', calories: 31, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/fruit/yangtao.png' },
  { name: '西瓜', calories: 31, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/fruit/xigua.png' },
  { name: '草莓', calories: 32, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/fruit/caomei.png' }
],
meatItems: [
    { name: '鸡蛋', protein: 13.1, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/meat/egg.jpg' },
    { name: '牛奶', protein: 13.0, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/meat/milk.jpg' },
    { name: '鱼肉', protein: 18, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/meat/fish.jpg' },
    { name: '虾肉', protein: 16.8, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/meat/xia.jpg' },
    { name: '鸡肉', protein: 20.3, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/meat/chicken.jpg' },
    { name: '牛肉', protein: 22.6, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/meat/beef.jpg' },
    { name: '瘦猪肉', protein: 20.7, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/meat/pig.jpg' },
    { name: '鸭肉', protein: 15.5, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/meat/ya.jpg' },
    { name: '羊肉', protein: 20.5, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/meat/yang.jpg' },
    { name: '大豆', protein: 33.0, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/meat/dou.jpg' },
  ],
  vegetableItems: [
      { name: '彩椒', fiber: 3.3, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/vegetables/caijiao.jpg' },
      { name: '香菇', fiber: 3.3, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/vegetables/xianggu.jpg' },
      { name: '春笋', fiber: 2.8, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/vegetables/sun.jpg' },
      { name: '金针菇', fiber: 2.7, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/vegetables/jinzhengu.jpg' },
	  { name: '白玉菇', fiber: 2.6, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/vegetables/baiyugu.jpg' },
	  { name: '西兰花', fiber: 2.6, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/vegetables/xilanhua.jpg' },
	  { name: '木耳', fiber: 2.6, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/vegetables/muer.jpg' },
	  { name: '四季豆', fiber: 2.5, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/vegetables/dou.jpg' },
	  { name: '韭菜', fiber: 2.4, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/vegetables/jiucai.jpg' },
	  { name: '胡萝卜', fiber: 2.4, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/vegetables/carrot.jpg' },
	  
	  // ... 其他蔬菜数据
    ],
	carbItems: [
	    { name: '牛油果', carbs: 15.3, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/carbs/niuyou.jpg' },
	    { name: '橄榄油', carbs: 99.9, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/carbs/ganlan.jpg' },
	    { name: '花生', carbs: 25.4, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/carbs/huasheng.jpg' },
	    { name: '奶酪', carbs: 23.5, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/carbs/nailao.jpg' },
	    { name: '奇亚籽', carbs: 30.7, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/carbs/qiyazi.jpg' },
	    { name: '椰子油', carbs: 12.1, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/carbs/yeziyou.jpg' },
	    { name: '蛋黄', carbs: 5.0, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/carbs/egg.jpg' },
	    { name: '三文鱼', carbs: 13.0, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/carbs/sanwen.jpg' },
	    { name: '核桃', carbs: 65.0, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/carbs/hetao.jpg' },
	    { name: '夏威夷果', carbs: 75.8, image: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/carbs/guo.jpg' },
	    // ... 其他碳水化合物数据
	  ]
}
}
}
</script>

<style>
  .main-image .background-image {
    position: fixed; /* 使用 fixed 使背景图固定 */
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    opacity: 0.1;
    pointer-events: none; /* 允许事件穿透 */
  }
  .top-card {
    width: 375px;
    height: 74px;
    background-color: #fff; /* 卡片背景颜色，可根据需要调整 */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px; /* 卡片下方间距 */
    border-bottom: 1px solid #eee;
	border-top: 1px solid #eee;
  }
  
  .top-card-text {
    font-size: 20px;
    font-weight: bold;
    margin-right: 180px; /* 增加左边距，数值可以根据实际需求调整 */
  }
  
  .food-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .food-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
  }

  .food-image {
    width: 50px;
    height: 50px;
    margin-right: 15px;
  }

  .food-info {
    display: flex;
    flex-direction: column;
  }

  .food-name {
    font-size: 14px;
    font-weight: bold;
  }

  .food-calories {
    font-size: 13px;
  }

  .calories-number {
    color: #ff4d4f; /* 保持数字的红色 */
  }

  .calories-unit {
    color: #b0b0b0; /* 浅灰色 */
  }
  .meat-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  
    .meat-item {
      display: flex;
      align-items: center;
      padding: 10px 0;
    }
  
    .meat-image {
      width: 50px;
      height: 50px;
      margin-right: 15px;
    }
  
    .meat-info {
      display: flex;
      flex-direction: column;
    }
  
    .meat-name {
      font-size: 14px;
      font-weight: bold;
    }
  
    .meat-protein {
      font-size: 13px;
    }
  
    .protein-number {
      color: #ff4d4f; /* 保持数字的红色 */
    }
  
    .protein-unit {
      color: #b0b0b0; /* 浅灰色 */
    }
	.vegetable-list {
	    display: flex;
	    flex-direction: column;
	    gap: 10px;
	  }
	
	  .vegetable-item {
	    display: flex;
	    align-items: center;
	    padding: 10px 0;
	  }
	
	  .vegetable-image {
	    width: 50px;
	    height: 50px;
	    margin-right: 15px;
	  }
	
	  .vegetable-info {
	    display: flex;
	    flex-direction: column;
	  }
	
	  .vegetable-name {
	    font-size: 14px;
	    font-weight: bold;
	  }
	
	  .vegetable-fiber {
	    font-size: 13px;
	  }
	
	  .fiber-number {
	    color: #ff4d4f; /* 保持数字的红色 */
	  }
	
	  .fiber-unit {
	    color: #b0b0b0; /* 浅灰色 */
	  }
	  .carb-list {
	      display: flex;
	      flex-direction: column;
	      gap: 10px;
	    }
	  
	    .carb-item {
	      display: flex;
	      align-items: center;
	      padding: 10px 0;
	    }
	  
	    .carb-image {
	      width: 50px;
	      height: 50px;
	      margin-right: 15px;
	    }
	  
	    .carb-info {
	      display: flex;
	      flex-direction: column;
	    }
	  
	    .carb-name {
	      font-size: 14px;
	      font-weight: bold;
	    }
	  
	    .carb-carbs {
	      font-size: 13px;
	    }
	  
	    .carbs-number {
	      color: #ff4d4f; /* 保持数字的红色 */
	    }
	  
	    .carbs-unit {
	      color: #b0b0b0; /* 浅灰色 */
	    }
</style>