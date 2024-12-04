<template>
	<div class="main-image">
	  <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
	</div>
  <view class="food-detail">
    <!-- 食物信息 -->
    <view class="food-header">
      <image class="food-image" :src="food.url|| '/pages/images/捂嘴.png'"  mode="aspectFit"></image>
      
    </view>
	<view class="food-header">
		<text class="food-name">{{ food.ingredient_name }}</text>
	</view>
    <!-- 营养信息 -->
    <view class="nutrition-info">
      <view class="info-row" v-for="(value, key) in food.nutritions" :key="key">
        <text class="info-name">{{ key }}</text>
        <text class="info-value">{{ value }}</text>
      </view>
    </view>

    <!-- 营养功效 -->
    <view class="nutrition-benefits">
      <text class="benefits-title">营养功效:</text>
      <view class="benefits">
        <view
          class="benefit"
          v-for="(benefit, index) in food.efficacy"
          :key="index"
          style="background-color: #d0f0d0; border-radius: 20px; margin-bottom: 10px;"
        >
          <text>{{ benefit }}</text>
        </view>
      </view>
    </view>

    <!-- 食用禁忌 -->
    <view class="dietary-advice">
      <text class="advice-title">食用禁忌:</text>
      <view class="advice-container">
        <view
          class="advice"
          v-for="(advice, index) in food.contraindications"
          :key="index"
          style="margin-bottom: 10px;"
        >
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
      foodId: '', // 从 URL 参数中获取 foodId
      food: {
        ingredient_name: '',
        efficacy: [],
        contraindications: [],
        type: '',
        url: '',
        nutritions: {},
        created_at: '',
        updated_at: ''
      },
      error: '' // 错误信息
    };
  },
  onLoad(options) {
    this.foodId = options.foodId; // 从 URL 获取参数
    this.fetchFoodData();
  },
  methods: {
    fetchFoodData() {
      console.log('Fetching data for foodId:', this.foodId);
      uni.request({
        url: `http://129.204.151.245:5001/ingredients/${this.foodId}`,
        method: 'GET',
        success: (res) => {
          console.log('API response:', res.data);
          if (res.statusCode === 200 && res.data) {
            const {
              nutritions,
              efficacy,
              contraindications,
              ...rest
            } = res.data;

            this.food = {
              ...rest,
              efficacy: efficacy ? efficacy.split(',') : [], // 转为数组
              contraindications: contraindications ? contraindications.split(',') : [], // 转为数组
              nutritions: nutritions ? JSON.parse(nutritions) : {} // 转为对象
            };

            console.log('Parsed food data:', this.food);
          } else {
            this.error = '获取食物数据失败';
          }
        },
        fail: (error) => {
          this.error = '请求食物数据失败';
          console.error('请求食物数据失败:', error);
        }
      });
    }
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
  height: 100vh;
  opacity: 0.1; /* 设置透明度 */
  z-index: -1; /* 确保背景图片在最底层 */
  object-fit: cover; /* 确保图片覆盖整个屏幕 */
}

.food-header {
  margin-bottom: 20px;
  text-align: center;
}

.food-image {
  width: 300px;
  height: 200px;
  margin: auto;
  border-radius: 90px;
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