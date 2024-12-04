<template>
	<div class="main-image">
	  <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
	</div>
  <view class="top-card">
    <!-- 添加两个按钮 -->
    <button class="top-card-text recommend" @click="navigateToRecommend">推荐食用</button>
    <button class="top-card caution" @click="navigateToCaution">谨慎食用</button>
  </view>
  <scroll-view style="flex: 1; padding: 10px;">
    <div class="food-list">
      <div class="food-item" v-for="item in foodItems" :key="item.name">
        <img :src="item.calories" alt="" class="food-image"/>
        <div class="food-info">
          <p class="food-name">{{ item.name }}</p>
          <p class="food-calories">
            <span class="calories-number">{{ item.image }}</span> 
            <span class="calories-unit">千卡/100克</span>
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
    foodItems: [],
    tagsQuery: '健身黑',
	heat:[]
  };
},
methods: {
  fetchFoodItems() {
    const url = `http://129.204.151.245:5001/ingredients/tags?tags=${this.tagsQuery}`;
    uni.request({
      url: url,
      method: 'GET',
      success: (response) => {
        if (response.statusCode === 200) {
          this.foodItems = response.data.map(item => (
		  {
            name: item.ingredient_name,
            calories: item.unit_heat,
            image: item.nutritions.slice(8,item.nutritions.indexOf("大卡"))
          }));
        } else {
          console.error('食材查询失败:', response.statusCode);
        }
      },
      fail: (error) => {
        console.error('请求食材数据时发生错误:', error);
      }
    });
  },
  navigateToRecommend() {
    // 点击“推荐食用”按钮时跳转到的页面
    uni.redirectTo({
      url: '/pages/redblack/1/2'
    });
  },
  navigateToCaution() {
    // 点击“谨慎食用”按钮时跳转到的页面
    uni.redirectTo({
      url: '/pages/redblack/2/2'
    });
  }
},

mounted() {
  this.fetchFoodItems();
}
}
</script>

<style>
.top-card {
  display: flex;
  flex-direction: row; /* 使按钮水平分布 */
  align-items: center;
  margin-bottom: 0px; /* 调整间距 */
}

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

.recommend {

    font-size: 14px; /* 设置字体大小 */
    color: black; /* 推荐食用按钮文本颜色 */
    margin: 0 50px; /* 调整按钮间的间距 */
    cursor: pointer; /* 鼠标悬停在上面时显示指针 */
    background-color:#ddd;
    margin-top: 10px;
    border-radius: 50px;
	width: 80%;
    white-space: nowrap; /* 禁止换行 */
    text-align: center; /* 文本居中 */
    padding: 1px 5px; /* 增加内边距确保文字与边框的间距 */
    display: inline-block; /* 让按钮占用一行 */
    overflow: hidden; /* 防止内容溢出 */ 
}

.caution {
  font-size: 14px; /* 设置字体大小 */
  color: black; /* 推荐食用按钮文本颜色 */
  margin: 0 50px; /* 调整按钮间的间距 */
  background-color: #fadf49;
  margin-top: 10px;
  width: 80%;
  border-radius: 50px;
  white-space: nowrap; /* 禁止换行 */
  text-align: center; /* 文本居中 */
  padding: 1px 5px; /* 增加内边距确保文字与边框的间距 */
  display: inline-block; /* 让按钮占用一行 */
  overflow: hidden; /* 防止内容溢出 */
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
  border-bottom: 1px solid #eee;
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
</style>