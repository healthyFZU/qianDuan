<template>
  <div class="weekly-recipes-page">
    <!-- 食谱列表 -->
    <div class="recipe-list">
      <div v-if="weeklyRecipes.length === 0" class="empty-state">
        <img src="/pages/images/捂嘴.png" alt="暂无食谱" />
        <p>您还没有记录任何本周食谱哦！</p>
      </div>
      <div v-else>
        <div class="recipe-item" v-for="recipe in weeklyRecipes" :key="recipe.id">
          <div class="recipe-details">
            <h4 class="recipe-title">{{ recipe.title }}</h4>
            <p class="recipe-description">{{ recipe.description }}</p>
            <p class="recipe-date">{{ recipe.date }}</p>
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
      weeklyRecipes: [], // 本周食谱列表
    };
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack();
    },
    // 从本地存储加载食谱列表
    loadRecipes() {
      const recipes = JSON.parse(localStorage.getItem("weeklyRecipes")) || [];
      this.weeklyRecipes = recipes;
    },
  },
  mounted() {
    // 页面加载时从本地存储读取食谱数据
    this.loadRecipes();

    // 监听其他页面的食谱更新事件
    const self = this;
    uni.$on("updateRecipes", () => {
      self.loadRecipes();
    });
  },
  beforeDestroy() {
    // 页面销毁时清理事件监听
    uni.$off("updateRecipes");
  },
};
</script>

<style scoped>
/* 食谱列表样式 */
.recipe-list {
  padding: 10px;
}

.recipe-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.recipe-details {
  margin-left: 10px;
}

.recipe-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.recipe-description {
  font-size: 14px;
  color: #666;
  margin: 5px 0;
}

.recipe-date {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
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

