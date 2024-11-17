<template>
  <div class="main-image">
    <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
  </div>
  <view class="recipe-list">
    <view class="recipe-item" v-for="recipe in recipes" :key="recipe.name">
      <image class="recipe-image" :src="recipe.image"></image>
      <view class="recipe-info">
        <text class="recipe-name">{{ recipe.name }}</text>
        <text class="recipe-price">¥{{ recipe.price }}</text>
        <text class="recipe-ingredients">{{ recipe.ingredients }}</text>
        <view class="recipe-health">
          <text class="health-label">健康指数</text>
          <view class="health-indicators">
            <view class="indicator" v-for="(value, index) in getHealthValues(recipe.healthIndex)" :key="index" :style="{ backgroundColor: '#add8e4', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', borderRadius: '50%' }">
              <text>{{ value }}</text>
            </view>
          </view>
        </view>
      </view>
      <button class="add-to-cart">+</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      recipes: [
        {
          name: '土豆炖牛腩',
          price: 25.6,
          image: '/static/食谱查询/土豆炖牛腩.png',
          ingredients: '土豆、牛肉、番茄、小麦、燕麦、豌豆、玉米',
          healthIndex: '155 0.5 50 98'
        },
        {
          name: '酱汁巴沙鱼',
          price: 49.9,
          image: '/static/食谱查询/酱汁巴沙鱼.png',
          ingredients: '巴沙鱼、黄瓜、胡萝卜、酱油、空心菜、芥菜',
          healthIndex: '128 1.0 60 57'
        },
        {
          name: '菲力牛排',
          price: 88.8,
          image: '/static/食谱查询/菲力牛排.png',
          ingredients: '牛肉、青菜、小辣椒、玫瑰盐、黑胡椒、芦笋、橄榄油',
          healthIndex: '433 0.5 50 98'
        },
        {
          name: '地中海风情烤鱼',
          price: 46.5,
          image: '/static/食谱查询/地中海风情烤鱼.png',
          ingredients: '鲈鱼、柠檬汁、橄榄油、黑胡椒、罗勒、彩椒',
          healthIndex: '433 0.5 50 98'
        },
        {
          name: '法式迷迭香烤虾',
          price: 78.8,
          image: '/static/食谱查询/法式迷迭香烤虾.png',
          ingredients: '黑虎虾、迷迭香、柠檬、黑胡椒、蒜片、白葡萄酒',
          healthIndex: '433 0.5 50 8'
        }
      ]
    };
  },
  methods: {
    getHealthValues(healthIndex) {
      const values = healthIndex.split(' ').map(Number);
      return values;
    }
  }
};
</script>

<style>
.main-image .background-image {
   position: absolute;
   z-index: 0;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   width: 100%;
   height: 100vh;
   opacity: 0.1;
 }
.recipe-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.recipe-item {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
}
.recipe-image {
  width: 100px;
  height: 80px;
  margin: 10px;
}
.recipe-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
}
.recipe-name {
  font-size: 18px;
  font-weight: bold;
}
.recipe-price {
  color: red;
  font-size:15px;
}
.recipe-ingredients {
  font-size: 1px;
  color: #666;
}
.recipe-health {
  font-size: 13px;
  color: #666;
}
.health-label {
  font-weight: bold;
  font-size: 16px;
}
.health-indicators {
  display: flex;
}
.indicator {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
.add-to-cart {
  background-color: yellow;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin: 10px;
  cursor: pointer;
}
</style>