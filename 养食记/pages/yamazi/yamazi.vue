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
        name: '亚麻籽',
        image: '/static/亚麻籽1.png',
        calories: 534,
        carbs: 28.9,
        protein: 18.3,
        fat: 42.2,
        benefits: [
          '强效抗氧化',
          '改善炎症',
          '促进新陈代谢',
          '促进消化',
          '调节胆固醇'
        ],
        advice: [
          '脾胃虚弱人群不宜食用。',
          '乳腺癌患者及康复者不宜食用。',
          '种子过敏者、低血压人群、高血压人群、糖尿病患者、怀孕或哺乳期间谨慎食用。'
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