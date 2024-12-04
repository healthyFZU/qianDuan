<template>
  <view class="dish-detail">
    <!-- 信息框 -->
    <view class="info-box">
      <view class="info-row">
        <text class="dish-name">{{ dish.name }}</text>
        <text class="dish-rating">9.5</text>
      </view>
      <text class="dish-description">{{ dish.description }}</text>
    </view>
    <!-- 背景图片 -->
    <image class="background-image" :src="dish.image"></image>
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
        name: '番茄牛腩',
        image: '/static/番茄牛腩/番茄牛腩1.png',
        rating: '9.5',
        description: '番茄牛腩将鲜嫩的牛腩与酸甜可口的番茄完美结合，呈现出独特的口感和营养价值。牛腩炖至软烂，吸满了番茄的浓郁汤汁，滋味鲜美，令人回味无穷。'
      },
      restaurants: [
        { image: '/static/番茄牛腩/牛腩1.png' },
        { image: '/static/番茄牛腩/牛腩2.png' },
        { image: '/static/番茄牛腩/牛腩3.png' },
        { image: '/static/番茄牛腩/牛腩4.png' },
        { image: '/static/番茄牛腩/牛腩5.png' },
        { image: '/static/番茄牛腩/牛腩6.png' }
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

</style>