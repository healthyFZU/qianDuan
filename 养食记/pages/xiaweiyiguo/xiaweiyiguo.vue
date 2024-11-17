<template>
  <view class="food-detail">
    <!-- 背景图片 -->
    <image class="background-image" src="/static/背景.jpg"></image>
    <view class="food-header">
      <image class="food-image" :src="food.image" mode="aspectFit"></image>
      <text class="food-name">{{ food.name }}</text>
    </view>
    <view class="nutrition-info">
      <view class="info-row">
        <text class="info-name">热量</text>
        <text class="info-value" style="color: red;">{{ food.calories }}kcal</text>
      </view>
      <view class="info-row">
        <text class="info-name">碳水化合物</text>
        <text class="info-value" style="color: green;">{{ food.carbs }}g</text>
      </view>
      <view class="info-row">
        <text class="info-name">蛋白质</text>
        <text class="info-value" style="color: blue;">{{ food.protein }}g</text>
      </view>
      <view class="info-row">
        <text class="info-name">脂肪</text>
        <text class="info-value" style="color: yellow;">{{ food.fat }}g</text>
      </view>
    </view>
    <view class="nutrition-benefits">
      <text class="benefits-title">营养功效:</text>
      <view class="benefits">
        <view class="benefit" v-for="benefit in food.benefits" :key="benefit" style="background-color: #d0f0d0; border-radius: 20px; margin-bottom: 10px;">
          <text>{{ benefit }}</text>
        </view>
      </view>
    </view>
    <view class="dietary-advice">
      <text class="advice-title">食用禁忌:</text>
      <view class="advice-container">
        <view class="advice" v-for="(advice, index) in food.advice" :key="index">
          <text>{{ advice }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      food: {
        name: '夏威夷果',
        image: '/static/夏威夷果1.png',
        calories: 750,
        carbs: 26.5,
        protein: 3.0,
        fat: 79.6,
        benefits: [
          '富含不饱和脂肪酸，有助于降低胆固醇',
          '抗氧化，延缓衰老',
          '保护心脑血管健康',
          '改善记忆力和学习能力',
          '促进肠道健康'
        ],
        advice: [
          '过敏体质者慎食。',
          '肥胖或体重超标者应适量食用。',
          '夏威夷果不宜与鳖肉、野鸡肉、酒同食。'
        ]
      }
    };
  }
};
</script>

<style>
.food-detail {
  position: relative;
  padding: 20px;
}
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1; /* 设置透明度 */
  z-index: -1; /* 确保背景图片在最底层 */
  object-fit: cover; /* 确保图片覆盖整个屏幕 */
}
.food-header {
  margin-bottom: 20px;
  text-align: center;
}
.food-image {
  width: 150px;
  height: 110px;
  margin: auto;
}
.food-name {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
}
.nutrition-info {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #ebebeb; /* 浅灰色圆角框 */
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
}
.info-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 左对齐 */
}
.info-name {
  color: black;
}
.info-value {
  margin-top: 10px;
}
.nutrition-benefits {
  margin-bottom: 20px;
}
.benefits-title {
  text-align: left; /* 左对齐 */
  margin-bottom: 10px;
}
.benefits {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* 左对齐 */
}
.benefit {
  padding: 10px;
  margin: 5px 0;
  width: 100%; /* 占满整行 */
  background-color: #d0f0d0; /* 淡绿色背景 */
  border-radius: 20px;
}
.dietary-advice {
  text-align: left; /* 左对齐 */
}
.advice-title {
  margin-bottom: 10px;
}
.advice-container {
  background-color: #f5f5f5; /* 浅灰色背景 */
  border: 1px dashed #ccc;
  border-radius: 20px;
  padding: 10px;
}
.advice {
  margin: 5px 0;
}
</style>