<template>
  <div class="main-image">
    <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
  </div>
	
  <div class="history-container">
    <div v-for="(record, index) in historyRecords" :key="index" class="history-card">
      <div class="date">{{ record.date }}</div>
      <div class="content">
        <p v-for="(item, i) in record.items" :key="i" class="item">{{ item }}</p>
      </div>
    </div>
  </div>
  
  <div class="little-image">
     <img src="@/pages/images/close_eyes.png" alt="logo" class="little-image" />
  </div>
  <!-- 搜索框 -->
  <div class="search-bar">
    <input type="text" class="search-input" v-model="searchQuery" placeholder="关于食物的事情都可以问养养" />
    <button class="search-button" @click="onSearch">搜索</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const historyRecords = ref([
  {
    date: '今天',
    items: [
      '一份炒饭大概多少热量？',
      '适合减肥的时候吃的水果有哪些？'
    ]
  },
  {
    date: '昨天',
    items: [
      '高蛋白食物排行榜？',
      '经常低血糖应该多吃什么？'
    ]
  },
  {
    date: '前7天',
    items: ['暂无历史记录...']
  }
]);
</script>

<style scoped>
.history-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  min-height: 100vh;
  overflow-y: auto;
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
.history-card {
  width: 90%;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
}

.date {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.content {
  font-size: 14px;
  color: #666;
}

.item {
  margin: 4px 0;
}

.little-image{
	position: absolute;
	z-index: 0;
	top: 130px;
	right: 35px;
	bottom: 0;
	transform: scale(0.485);
}
.search-bar {
  display: flex;
  align-items: center;
  height: 20px;
  width: 62%;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  margin-top: 20px;
  position: relative;
  bottom: 250px;
  left: 100px;
  
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #ffffff;
}

.search-button {
  width: 32px; /* 设置按钮的宽度和高度为相等 */
  height: 32px;
  padding: 0; /* 去除内边距，以保证圆形不被拉伸 */
  background-color: #ffffff; /* 背景色 */
  color: #50cc8e; /* 文字颜色 */
  border: none; /* 去除所有边框 */
  outline: none; /* 去除聚焦时的轮廓线 */
  border-radius: 50%; /* 设置圆角为50%，形成圆形 */
  font-size: 14px; /* 字体大小 */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none; /* 去除阴影 */
  -webkit-appearance: none; /* 清除一些浏览器的默认样式 */
  appearance: none; /* 确保跨浏览器的统一样式 */
}
</style>

