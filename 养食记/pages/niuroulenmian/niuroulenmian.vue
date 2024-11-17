<template>
  <view class="dish-detail">
    <!-- 背景图片 -->
    <image class="background-image" :src="dish.image"></image>
    <!-- 信息框 -->
    <view class="info-box">
      <view class="info-row">
        <text class="dish-name">{{ dish.name }}</text>
        <text class="dish-rating">{{ dish.rating }}</text>
      </view>
      <text class="dish-description">{{ dish.description }}</text>
    </view>
    <!-- 相关店铺推荐 -->
    <view class="related-restaurants">
      <text class="section-title">相关店铺推荐</text>
      <view class="restaurant-list">
        <view class="restaurant-item" v-for="(restaurant, index) in restaurants" :key="index">
          <image class="restaurant-image" :src="restaurant.image" mode="aspectFit"></image>
          <text class="restaurant-name">{{ restaurant.name }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      dish: {
        name: '延吉牛肉冷面',
        image: '/static/牛肉冷面/牛肉冷面1.png',
        rating: '8.5',
        description: '延吉牛肉冷面是朝鲜族的传统风味面食，以其独特的冷面汤和劲道的面条著称。牛肉鲜嫩，汤汁清凉，是夏日里的一道美味佳肴。'
      },
      restaurants: [
        { image: '/static/牛肉冷面/1.jpg', name: '延吉风味馆' },
        { image: '/static/牛肉冷面/2.png', name: '朝鲜族美食屋' },
        { image: '/static/牛肉冷面/3.jpg', name: '冷面大王' },
        { image: '/static/牛肉冷面/4.jpg', name: '传统面食店' },
        { image: '/static/牛肉冷面/5.png', name: '牛肉面馆' },
        { image: '/static/牛肉冷面/6.png', name: '面点之家' }
      ]
    };
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
  height: 200px; /* 设置图片高度 */
  object-fit: cover; /* 确保图片覆盖整个屏幕 */
  z-index: -1; /* 确保背景图片在最底层 */
}
.info-box {
  width: 100%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative; /* 相对于父元素定位 */
  top: 150px; /* 根据需要调整这个值来改变信息框的位置 */
  z-index: 1; /* 确保信息框在背景图片之上 */
}
.info-row {
  display: flex;
  align-items: center;
}

.dish-name {
  font-size: 24px;
  font-weight: bold;
  margin-right: 80px; /* 增加名称与评分之间的距离 */
}

.dish-rating {
  color: red;
  font-size: 32px;
  font-weight: bold;
  margin-left: 50px; /* 增加评分与名称之间的距离 */
}

.dish-description {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}
.related-restaurants {
  margin-top: 170px; /* 增加与信息框的距离 */
  padding: 20px; /* 增加内边距 */
  background-color: #fff; /* 设置背景颜色 */
  border-radius: 20px; /* 设置圆角 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  position: relative; /* 相对于父元素定位 */
  z-index: 1; /* 确保相关店铺推荐在背景图片之上 */
}
.section-title {
  font-size: 18px;
  margin-bottom: 10px;
}
.restaurant-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.restaurant-item {
  width: 30%; /* 一行三张图片 */
  margin-bottom: 10px;
}
.restaurant-image {
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
}
.restaurant-name {
  font-size: 16px;
}
</style>