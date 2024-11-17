<template>
  <div class="summary-page">
    <!-- 小结列表 -->
    <div class="summary-list">
      <div v-if="weeklySummaries.length === 0" class="empty-state">
        <img src="/pages/images/捂嘴.png" alt="暂无小结" />
        <p>您还没有记录任何上周小结哦！</p>
      </div>
      <div v-else>
        <div class="summary-item" v-for="summary in weeklySummaries" :key="summary.id">
          <div class="summary-details">
            <h4 class="summary-title">{{ summary.title }}</h4>
            <p class="summary-content">{{ summary.content }}</p>
            <p class="summary-date">{{ summary.date }}</p>
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
      weeklySummaries: [], // 上周小结列表
    };
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack();
    },
    // 从本地存储加载小结列表
    loadSummaries() {
      const summaries = JSON.parse(localStorage.getItem("weeklySummaries")) || [];
      this.weeklySummaries = summaries;
    },
  },
  mounted() {
    // 页面加载时从本地存储读取小结数据
    this.loadSummaries();

    // 监听其他页面的小结变更事件
    const self = this;
    uni.$on("updateSummaries", () => {
      self.loadSummaries();
    });
  },
  beforeDestroy() {
    // 页面销毁时清理事件监听
    uni.$off("updateSummaries");
  },
};
</script>

<style scoped>
/* 小结列表样式 */
.summary-list {
  padding: 10px;
}

.summary-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.summary-details {
  margin-left: 10px;
}

.summary-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.summary-content {
  font-size: 14px;
  color: #666;
  margin: 5px 0;
}

.summary-date {
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
