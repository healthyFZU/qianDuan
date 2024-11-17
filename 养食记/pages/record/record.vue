<template>
  <div class="record-page">
    <div class="main-image">
      <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
    </div>
    
    <!-- 顶部导航栏 -->
    <div class="header">
      <img src="@/pages/images/logo-black.jpg" alt="avatar" class="avatar" @click="goToUserProfile" />
      <!-- 搜索框 -->
      <div class="search-bar">
        <input type="text" class="search-input" v-model="searchQuery" placeholder="请输入您的问题" />
        <button class="search-button" @click="onSearch">搜索</button>
      </div>
    </div>
    <!-- AI 回复显示区 -->
    <div v-if="aiResponse" class="ai-response">
      <h3>AI 回答:</h3>
      <p>{{ aiResponse }}</p>
    </div>
    <!-- 体重管理 -->
    <div class="weight-management">
      <div class="title">体重管理</div>
      <div class="weight-info">
        <span>已减少2.0</span>
        <span>单位：公斤</span>
      </div>
      <input type="range" min="44.5" max="51.5" v-model="currentWeight" class="weight-slider" />
      <div class="weight-labels">
        <span>初始: 51.5</span>
        <span>当前: {{ currentWeight }}</span>
        <span>目标: 44.5</span>
      </div>
    </div>

    <!-- 健康记录标题 -->
    <div class="section-title">健康记录</div>



    <!-- 热量记录 -->
    <div class="card" @click="goToCalorieDetails()">
      <div class="card-header">
	    🔆
        <span class="record-title">️热量记录</span>
        <span class="record-time">更新于 {{ lastUpdate }}</span>
      </div>
      <div class="card-content">
        <span>还可吃 {{ remainingCalories }} 卡路里</span>
      </div>
    </div>


    <!-- 体重、喝水、围度、运动记录等卡片 -->
    <div class="record-cards">
      <div v-for="record in records" :key="record.title" class="card" @click="goToDetailPage(record.route)">
        <div class="card-header">
		  🔆
          <span class="record-title">{{ record.title }}</span>
          <span class="record-time">{{ record.updateTime }} 更新</span>
        </div>
        <div class="card-content">{{ record.info }}</div>
      </div>
    </div> 
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';

const currentWeight = ref(49.5);
const lastUpdate = ref("15:03");
const remainingCalories = ref(794);
const searchQuery = ref('');
const aiResponse = ref(''); // 用于显示 AI 的回复

// 模拟健康记录数据
const records = ref([
  { title: "体重", updateTime: "1天前", info: "49.5公斤，目标45公斤", route: "/pages/weight-details/weight-details" },
  { title: "喝水记录", updateTime: "1天前", info: "还要喝1600毫升", route: "/pages/water-details/water-details" },
  { title: "围度", updateTime: "1天前", info: "腰围 70 公分", route: "/pages/waist-details/waist-details" },
  { title: "运动训练", updateTime: "1天前", info: "跑步 5 公里", route: "/pages/sport-details/sport-details" },
]);

// 跳转到用户个人主页
function goToUserProfile() {
  uni.switchTab({
    url: "/pages/me/me"
  });
}

// 跳转到热量记录详情
function goToCalorieDetails() {
  uni.navigateTo({
    url: "/pages/calorie-details/calorie-details"
  });
}

// 跳转到各个详情页面
function goToDetailPage(route) {
  uni.navigateTo({
    url: route
  });
}

// 点击搜索按钮时调用 AI 接口
async function onSearch() {
  if (!searchQuery.value) {
    alert("请输入问题");
    return;
  }

  try {
    const response = await fetch("https://example.com/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: searchQuery.value })
    });
    const data = await response.json();
    aiResponse.value = data.answer; // 假设返回的数据中包含 answer 字段
  } catch (error) {
    console.error("请求 AI 接口失败:", error);
    aiResponse.value = "无法获取答案，请稍后再试。";
  }
}
</script>

<style scoped>
.record-page {
  padding: 20px;
  background-color: #ffffff;
}
.record-time{
	display: flex;
	justify-content: flex-end;
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
.header {
  display: flex;
  align-items: center;
  gap: 10px;
}
.record-title{
  font-size: 17px;

}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

.search-bar {
  display: flex;
  align-items: center;
  width: 75%;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 5px;
  background-color: #ffffff;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 5px;
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

.weight-management {
  background: linear-gradient(to bottom, #f8d01b, #ffffff);
  padding: 20px;
  border-radius: 10px;
  margin: 15px 0;
  color: black;
  border: 1.8px solid #ddd;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 19px;
  margin-top: 20px;
  margin-left: 10px;
}

.card {
  background-color:#ffffff;
  padding: 15px;
  margin: 10px 0;
  border-radius: 10px;
  border: 1.8px solid #ddd;
  cursor: pointer;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  
}

.ai-response {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f9ff;
  border-radius: 10px;
  font-size: 14px;
}

.title{
	font-size: 19px;
}


</style>