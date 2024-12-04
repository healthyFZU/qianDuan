<template>
  <div class="data-management-page">
	<div class="main-image">
	  <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
	</div>
    <!-- 功能区域 -->
    <div class="section">
      <h2>历史记录管理</h2>
      <button class="action-button" @click="clearHistory">清除历史记录</button>
    </div>

    <div class="section">
      <h2>缓存管理</h2>
      <button class="action-button" @click="clearCache">清理缓存</button>
    </div>

    <div class="section">
      <h2>数据备份与恢复</h2>
      <button class="action-button" @click="backupData">备份数据</button>
      <button class="action-button" @click="restoreData">恢复数据</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 模拟存储数据
      history: ["记录1", "记录2", "记录3"],
      cache: { images: 100, files: 200 }, // 缓存大小示例（单位：MB）
      backup: null, // 数据备份的内容
    };
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack();
    },

    // 清除历史记录
    clearHistory() {
      if (this.history.length === 0) {
        alert("没有可清除的历史记录！");
        return;
      }
      this.history = []; // 清空历史记录
      alert("历史记录已清除！");
    },

    // 清理缓存
    clearCache() {
      if (!this.cache.images && !this.cache.files) {
        alert("没有可清理的缓存！");
        return;
      }
      this.cache = { images: 0, files: 0 }; // 清空缓存数据
      alert("缓存已清理！");
    },

    // 备份数据
    backupData() {
      // 模拟备份历史记录和缓存
      this.backup = {
        history: [...this.history],
        cache: { ...this.cache },
      };
      alert("数据备份成功！");
    },

    // 恢复数据
    restoreData() {
      if (!this.backup) {
        alert("没有可恢复的备份数据！");
        return;
      }

      // 恢复历史记录和缓存
      this.history = [...this.backup.history];
      this.cache = { ...this.backup.cache };
      alert("数据已恢复！");
    },
  },
};
</script>

<style scoped>
/* 页面样式 */
.data-management-page {
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  min-height: 100vh;
  box-sizing: border-box;
}

/* 分区样式 */
.section {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

h2 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
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
/* 按钮样式 */
.action-button {
 display: block;
 width: 50%;
 padding: 0px;
 background: #ffffff;
 color: black;
 border: none;
 border-radius: 50px;
 cursor: pointer;
 font-size: 16px;
 margin-bottom: 15px;
 margin-top: 15px;
}

.action-button:hover {
  background-color: #50cc8e;
}
</style>
