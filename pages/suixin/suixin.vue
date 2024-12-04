<template>
  <view class="content">
    <div class="main-image">
      <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
    </div>
    <text class="greeting">Hi, 吃货！</text>
    <image class="food-image" src='../../static/foodphoto/f.jpg'></image>
    <button class="change" @click="changeFoodImage">换一换</button>

    <!-- 显示加载状态 -->
    <view v-if="loading" class="loading">加载中...</view>

    <!-- 显示错误信息 -->
    <view v-if="error" class="error">获取食物数据失败，请稍后再试。</view>

    <view class="food-cards">
      <view
        v-for="(food, index) in foods"
        :key="index"
        class="food-card"
        @click="navigateToDetail(food)"
      >
        <image :src="food.image" class="food-card-image"></image>
        <view class="food-card-info">
          <text class="food-title">{{ food.name }}</text>
          <text class="food-introduction">{{ food.introduction }}</text>
          <text class="food-score">评分: {{ food.score }}</text>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      foods: [],         // 食物数据
      loading: false,    // 加载状态
      error: false,      // 错误标志
    };
  },
  mounted() {
    this.getFoods();  // 页面加载时获取食物数据
  },
  methods: {
    // 获取食物数据的方法
    getFoods() {
      this.loading = true;  // 开始加载数据
      this.error = false;   // 重置错误状态

      axios.get('http://129.204.151.245:5001/dishes/random6') // 调用后端的随机菜品接口
        .then(response => {
          if (response.status === 200 && response.data) {
            if (Array.isArray(response.data)) { // 检查是否为数组
              this.foods = response.data.map(food => ({
                name: food.dish_name, // 菜品名称
                image: food.dish_image || '/pages/images/logo.jpg', // 菜品图片，默认图片处理
                introduction: food.introduction || '暂无介绍',
                score: food.score || '暂无评分', 
                link: `/pages/dishDetail/dishDetail?dishId=${food.dishId}&merchantId=${food.merchant_id}`, // 跳转到详情页，附带 dishId 参数
                dishId: food.dishId // 菜品 ID
              }));
              console.log('食谱推荐数据获取成功:', this.foods);
            } else {
              console.error('后端返回的数据不是数组:', response.data);
              this.error = true;
            }
          } else {
            console.error('获取食谱推荐数据失败:', response);
            this.error = true;
          }
        })
        .catch(error => {
          console.error('请求食谱推荐数据失败:', error);
          this.error = true;
        })
        .finally(() => {
          this.loading = false; // 数据加载完成，关闭加载状态
        });
    },

    // 切换食物图片
    changeFoodImage() {
      this.getFoods();  // 点击按钮时重新获取食物数据
    },

    // 导航到详情页面
    navigateToDetail(item) {
      if (item.link) {
        console.log('Navigating to:', item.link); // 打印导航目标链接
        uni.navigateTo({
          url: item.link,
          fail: (err) => {
            console.error('Navigation failed:', err); // 捕获导航失败
          }
        });
      } else {
        console.error('No link found for item:', item); // 如果 link 为空
      }
    }
  }
}
</script>


<style scoped>
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
.content{
	display: flex;
	flex-direction: column;
	align-items: start;
}
/* 加载中提示 */
.loading {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #999;
}

/* 错误提示 */
.error {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: red;
}

.greeting {
	font-weight: bold;
	font-size: 22px;
	margin-top: 15px;
	margin-bottom: -5px;
	margin-left: 20px;
}

.food-image {
	width: 335px;
	height: 153px;
	border-radius: 15px;
	margin-top: 20px;
	display: block;
	margin-left: auto;
	margin-right: auto;
}

.change {
	font-size: 16px;
	background-color: #ffffff;
	color:black;
	padding: 0px 10px;
	border-radius: 10px;
	cursor: pointer;
	display: block;
	margin-left: auto;
	margin-right: 20px;
	margin-top: 15px;
	text-align: center;
}

.food-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; /* 卡片间距 */
  justify-content: space-between;
  padding: 16px;
}

.food-card {
  width: calc(50% - 16px); /* 两列布局，减去间隙 */
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.food-card:hover {
  transform: translateY(-4px); /* 卡片悬浮效果 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.food-card-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.food-card-info {
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px; /* 内容间距 */
}

.food-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.food-introduction {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.food-score {
  font-size: 14px;
  color: #ff9900; /* 突出评分 */
}

</style>
