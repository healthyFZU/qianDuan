<template>
  <div class="favorites-page">
    <!-- 收藏列表 -->
    <div class="favorites-list">
      <div v-if="favoritePlans.length === 0" class="empty-state">
        <img src="/pages/images/捂嘴.png" alt="暂无收藏" />
        <p>您还没有收藏任何健康计划哦！</p>
      </div>
      <div v-else>
        <div class="favorite-item" v-for="plan in favoritePlans" :key="plan.id">
          <div class="plan-details">
            <h4 class="plan-title">{{ plan.title }}</h4>
            <p class="plan-description">{{ plan.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favoritePlans: [], // 收藏的健康计划列表
    };
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack();
    },
    // 从本地存储加载收藏列表
    loadFavorites() {
      const favorites = JSON.parse(localStorage.getItem("favoritePlans")) || [];
      this.favoritePlans = favorites;
    },
  },
  mounted() {
    // 页面加载时从本地存储读取收藏数据
    this.loadFavorites();

    // 监听其他页面的收藏变更事件
    const self = this;
    uni.$on("updateFavorites", () => {
      self.loadFavorites();
    });
  },
  beforeDestroy() {
    // 页面销毁时清理事件监听
    uni.$off("updateFavorites");
  },
};
</script>

<style scoped>
/* 收藏列表样式 */
.favorites-list {
  padding: 10px;
}

.favorite-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.plan-details {
  margin-left: 10px;
}

.plan-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.plan-description {
  font-size: 14px;
  color: #666;
  margin: 5px 0 0;
}

/* 空列表状态 */
.empty-state {
  text-align: center;
  margin-top: 50px;
}

.empty-state img {
  width: 300px;
  margin-bottom: 10px;
}
</style>

