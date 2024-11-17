
<template>
  <view class="container">
    <!-- 推荐食物列表 -->
    <view class="food-list">
      <view class="food-item" v-for="food in foods" :key="food.id">
        <image class="food-image" :src="food.image" />
        <view class="food-details">
          <text class="food-title">{{ food.title }}</text>
          <text class="food-description">{{ food.description }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'RecommendedFoodsPage',
  data() {
    return {
      foods: [
        {
          id: 1,
          image: 'https://via.placeholder.com/100',
          title: '水煮鸡胸肉',
          description: '低脂高蛋白的健身餐界“清流”，让你在减脂路上“鸡不可失！”'
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/100',
          title: '水煮虾',
          description: '海洋的鲜甜在尖尖跳跃，低卡又高蛋白，让你轻松“虾”出健康新高度！'
        },
        {
          id: 3,
          image: 'https://via.placeholder.com/100',
          title: '蔬菜汤',
          description: '鲜嫩如初，滋味浓郁，一碗下肚，既暖胃又瘦身，蔬菜界的“瘦身法师！”'
        },
        {
          id: 4,
          image: 'https://via.placeholder.com/100',
          title: '牛油果鸡肉卷',
          description: '绿色益味的牛油果搭配嫩滑鸡肉卷，卷起健康与美味的完美邂逅，每一口都是对味蕾的温柔拥抱！'
        }
      ]
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
}

/* 推荐食物列表 */
.food-list {
  display: flex;
  flex-direction: column;
}

.food-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.food-image {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-right: 15px;
}

.food-details {
  display: flex;
  flex-direction: column;
}

.food-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.food-description {
  font-size: 14px;
  color: #555;
}
</style>