<template>
  <view class="dish-detail">
    <!-- 背景图片 -->
    <image class="background-image" :src="dish.image"></image>
    <!-- 信息框 -->
    <view class="info-box">
      <view class="info-row">
        <text class="dish-name">{{ dish.name }}</text>
        <text class="dish-rating">9.0</text>
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
        name: '慢熬八宝粥',
        image: '/static/八宝粥/八宝粥1.jpg',
        rating: '9.0',
        description: '慢熬八宝粥是一道经典的传统美食，采用多种谷物和豆类，经过长时间的熬煮，口感绵软，营养丰富，适合各个年龄段的人群。'
      },
      restaurants: [
        { image: '/static/八宝粥/1.png', name: '健康粥铺' },
        { image: '/static/八宝粥/2.jpg', name: '八宝粥专卖店' },
        { image: '/static/八宝粥/3.png', name: '传统美食馆' },
        { image: '/static/八宝粥/4.jpg', name: '营养餐厅' },
        { image: '/static/八宝粥/5.png', name: '家常粥铺' },
        { image: '/static/八宝粥/6.png', name: '粥点心' }
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
  height: 200px; /* 设置图片高度为视口高度 */
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
  margin-right: 100px; /* 增加名称与评分之间的距离 */
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