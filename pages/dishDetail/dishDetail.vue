<template>
  <view class="dish-detail">
	<div class="main-image">
	  <img src="/pages/images/background.jpg" alt="logo" class="background-image2" />
	</div>
    <!-- 背景图片 -->
    <image class="background-image" :src="dish.dish_image||'/pages/images/捂嘴.png'" mode="aspectFill"></image>

    <!-- 信息框 -->
    <view class="info-box">
      <view class="info-row">
        <text class="dish-name">{{ dish.dish_name || '未命名菜品' }}</text>
        <text class="dish-rating">评分: {{ dish.score || '暂无评分' }}</text>
      </view>
      <text class="dish-description">{{ dish.detail || '暂无描述信息' }}</text>
    </view>

    <!-- 菜品营养信息 -->
	<view class="nutrition-info">
		<text class="section-title">营养信息</text>
		<view v-if="Array.isArray(dish.nutrition) && dish.nutrition.length" class="nutritions-tags">
			<view class="nutrition-tag" v-for="item in dish.nutrition" :key="item">
				<text>{{ item }}</text>
			</view>
		</view>
		<view v-else class="no-data">暂无营养信息</view>
	</view>


    <!-- 菜品食材 -->
    <view class="ingredients-info">
      <text class="section-title">菜品食材</text>
      <view v-if="dish.ingredients && dish.ingredients.length" class="ingredients-tags">
        <view class="ingredient-item" v-for="(ingredient, index) in dish.ingredients" :key="index">
          <text>{{ ingredient }}</text>
        </view>
      </view>
      <view v-else class="no-data">暂无菜品食材信息</view>
    </view>

    <!-- 菜品过敏原 -->
    <view class="allergens-info">
      <text class="section-title">过敏原</text>
      <view v-if="dish.allergens && dish.allergens.length" class="allergen-tags">
        <view class="allergen-item" v-for="(allergen, index) in dish.allergens" :key="index">
          <text>{{ allergen }}</text>
        </view>
      </view>
      <view v-else class="no-data">暂无过敏原信息</view>
    </view>

    <!-- 相关店铺推荐 -->
    <view class="related-restaurants">
        <text class="section-title">相关店铺信息</text>
    
        <!-- 商家卡片 -->
        <view v-if="merchant.Merchant_name" class="merchant-card">
            <!-- 商家 Logo -->
            <image :src="merchant.logo" alt="商家 Logo" class="merchant-logo"></image>
    
            <!-- 商家信息 -->
            <view class="merchant-info">
                <text class="merchant-name">{{ merchant.Merchant_name }}</text>
                <text class="merchant-address">{{ merchant.address }}</text>
            </view>
        </view>
    
        <!-- 无数据提示 -->
        <view v-else class="no-data">暂无店铺推荐</view>
    </view>


  </view>
</template>




<script>
export default {
  data() {
    return {
      dishId: '', // 从 URL 获取的参数
      dish: {
        dish_name: '',
        dish_image: '',
        nutrition: [], // 营养信息
        ingredients: [], // 菜品食材
        allergens: [], // 过敏原信息
        detail: '',
        score: '',
      },
	  
	  merchantId: '', // 从 URL 获取的参数
	  merchant: {
	    Merchant_name: '',
	    address: '',
	    logo: '',
	    menu: [], // 菜单信息
	    created_at: '',
	    updated_at: ''
	        },
      error: '' // 错误信息
    };
  },
  onLoad(options) {
    // 获取 dishId 参数
    this.dishId = options.dishId || '';
    this.fetchDishData();
	 // 获取 merchantId 参数
	this.merchantId = options.merchantId || '';
	if (this.merchantId) {
	    this.fetchMerchantData();
	}
  },
  methods: {
    fetchDishData() {
      if (!this.dishId) {
        console.error('未提供有效的 dishId');
        this.error = '无效的菜品 ID';
        return;
      }
    
      console.log('Fetching data for dishId:', this.dishId);
    
      uni.request({
        url: `http://129.204.151.245:5001/dishes/${this.dishId}`,
        method: 'GET',
        success: (res) => {
          console.log('API response:', res.data);
    
          if (res.statusCode === 200 && res.data) {
            const { nutrition, ingredients, allergens, ...rest } = res.data;
    
            // 验证并处理字段
            this.dish = {
              ...rest,
              nutrition: this.validateArrayField(nutrition, 'nutrition'),
              ingredients: this.validateArrayField(ingredients, 'ingredients'),
              allergens: this.validateArrayField(allergens, 'allergens'),
            };
    
            console.log('Processed dish data:', this.dish);
          } else {
            this.error = '获取菜品数据失败';
            console.error('获取菜品数据失败:', res);
          }
        },
        fail: (error) => {
          this.error = '请求菜品数据失败';
          console.error('请求菜品数据失败:', error);
        }
      });
    },
	// 获取商家信息
	    fetchMerchantData() {
	      if (!this.merchantId) {
	        console.error('未提供有效的 merchantId');
	        this.error = '无效的商家 ID';
	        return;
	      }
	    
	      console.log('Fetching data for merchantId:', this.merchantId);
	    
	      uni.request({
	        url: `http://129.204.151.245:5001/merchants/${this.merchantId}`,
	        method: 'GET',
	        success: (res) => {
	          console.log('API response for merchant:', res.data);
	    
	          if (res.statusCode === 200 && res.data) {
	            this.merchant = res.data;
	            console.log('Processed merchant data:', this.merchant);
	          } else {
	            this.error = '获取商家数据失败';
	            console.error('获取商家数据失败:', res);
	          }
	        },
	        fail: (error) => {
	          this.error = '请求商家数据失败';
	          console.error('请求商家数据失败:', error);
	        }
	      });
	    },
    validateArrayField(field, fieldName) {
      try {
        // 如果已经是数组，直接返回
        if (Array.isArray(field)) return field;
    
        // 如果是字符串形式的 JSON，尝试解析为数组
        if (typeof field === 'string' && field.trim().startsWith('[')) {
          return JSON.parse(field);
        }
    
        // 如果是普通字符串，尝试以逗号分隔解析为数组
        if (typeof field === 'string') {
          return field.split(',').map(item => item.trim()).filter(item => item);
        }
      } catch (error) {
        console.error(`解析 ${fieldName} 数据失败:`, error);
      }
    
      return []; // 默认返回空数组
    },
  
	}
};
</script>

<style>
.dish-detail {
  position: relative;
  padding: 0;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 250px; /* 增加高度更突出背景效果 */
  object-fit: cover;
  z-index: -1;
  filter: brightness(0.8); /* 调暗背景图片 */
}
.background-image2 {
   position: absolute;
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
.info-box {
  width: 90%; /* 比例调整让内容居中 */
  margin: 0 auto; /* 居中对齐 */
  padding: 15px 20px; /* 优化内边距 */
  background-color: rgba(255, 255, 255, 0.9); /* 提高透明度 */
  border-radius: 15px; /* 略微减少圆角半径 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  position: relative;
  top: 180px; /* 微调位置 */
  z-index: 1;
  margin-bottom: 200px;
}

.info-row {
  display: flex;
  justify-content: space-between; /* 左右对齐 */
  align-items: center; /* 垂直居中 */
}

.dish-name {
  font-size: 26px;
  font-weight: bold;
  color: #333; /* 深灰色 */
  flex: 1; /* 左右对齐 */
}

.dish-rating {
  font-size: 20px;
  font-weight: bold;
  color: #ff5722; /* 更柔和的红色 */
}


.dish-description {
  font-size: 16px;
  color: #666;
  margin-top: 10px;
}
.nutrition-info, .ingredients-info, .allergens-info, .related-restaurants {
  margin-top: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 10px;
  min-height: 80px; /* 保证板块高度一致 */
}

.nutritions-tags, .ingredients-tags, .allergen-tags, .restaurant-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* 标签之间的间距 */
  margin-left: 15px;
}

.nutrition-tag  {
  display: inline-block;
  padding: 5px 10px;
  background-color: #50cc8e;
  border-radius: 20px;
  font-size: 14px;
  color: white;
  margin-top: 10px;
}
.ingredient-item{
	display: inline-block;
	padding: 5px 10px;
	background-color: #fcce36;
	border-radius: 20px;
	font-size: 14px;
	color: white;
	margin-top: 10px;
}
.allergen-item{
	display: inline-block;
	padding: 5px 10px;
	background-color: #3590f1;
	border-radius: 20px;
	font-size: 14px;
	color: white;
	margin-top: 10px;
}
.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  border-left: 5px solid #ff5722; /* 左侧强调线 */
  padding-left: 10px;
}


.restaurant-item {
  width: 30%;
  margin: 10px 1.5%;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
/* 商家卡片 */
.merchant-card {
    display: flex; /* 横向排列 */
    align-items: center; /* 垂直居中 */
    padding: 16px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    gap: 16px; /* Logo 和信息之间的间距 */
}

/* 商家 Logo */
.merchant-logo {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    object-fit: cover;
    border: 1px solid #ddd;
}

/* 商家信息 */
.merchant-info {
    display: flex;
    flex-direction: column; /* 纵向排列 */
    gap: 8px; /* 信息项之间的间距 */
    flex: 1; /* 占据剩余空间 */
}

.merchant-name {
    font-size: 16px;
    font-weight: bold;
    color: #333;
}

.merchant-address {
    font-size: 14px;
    color: #666;
}

/* 无菜单信息 */
.no-menu {
    font-size: 14px;
    color: #999;
    text-align: center;
    margin-top: 12px;
}

/* 无数据提示 */
.no-data {
    font-size: 14px;
    color: #999;
    text-align: center;
    margin-top: 16px;
}

</style>