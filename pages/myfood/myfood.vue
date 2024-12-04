<template>
  <div class="food-list-page">
	<div class="main-image">
	  <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
	</div>

    <div class="food-list">
      <div class="food-item" v-for="item in foodItems" :key="item.id" @click="navigateTo(item.route)">
        <div class="food-icon" :style="{ backgroundColor: item.color }">
          <img :src="item.icon" alt="图标" />
        </div>
        <div class="food-details">
          <h4 class="food-title">{{ item.title }}</h4>
          <p class="food-desc">{{ item.description }}</p>
        </div>
        <img src="@/pages/images/enter.png" alt="跳转" class="arrow-icon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      foodItems: [
        {
          id: 1,
          title: "自定义食物",
          description: "来定义记录，万物皆可记",
          icon: "https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/custom-food.png",
          route: "/pages/custom-food/custom-food",
        },
        {
          id: 2,
          title: "我上传的食品",
          description: "查询您使用过的食品数据或数据库",
          icon: "https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/uploaded-food.png",
          route: "/pages/uploaded-food/uploaded-food",
        },
        {
          id: 3,
          title: "我的收藏",
          description: "您爱吃的都在这儿",
          icon: "https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/my-recipes.png",
          route: "/pages/likes/likes",
        },
      ],
    };
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack();
    },
    // 跳转到对应详情页面
    navigateTo(route) {
      uni.navigateTo({
        url: route,
      });
    },
  },
};
</script>

<style scoped>
.food-list-page {
  max-width: 500px;
  margin: auto;
  font-family: Arial, sans-serif;
  background-color: #fff;
  padding: 20px;
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
  pointer-events: none; /* 允许事件穿透 */
}

.food-list {
  margin-top: 10px;
}

.food-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  margin-bottom: 15px;
  margin-top: 20;
}

.food-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 15px;
}

.food-icon img {
  width: 60px;
  height: 60px;
}

.food-details {
  flex: 1;
}

.food-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.food-desc {
  font-size: 14px;
  color: #777;
  margin: 5px 0 0;
}

.arrow-icon {
  width: 16px;
  height: 16px;
}
</style>

