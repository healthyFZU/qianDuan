<template>
  <div class="record-page">
    <div class="main-image">
      <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
    </div>
    
    <!-- 顶部导航栏 -->
    <div class="header">
      <img :src="avatar || '/pages/images/logo-black.jpg'" alt="avatar" class="avatar" @click="goToUserProfile" />

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
	<div class="section-title">体重管理</div>
    <div class="weight-management">
		<div class="weight-info">
        <span>目标: {{ targetWeight }} 公斤</span>
      </div>
      <input type="range" :min="initialWeight" :max="targetWeight" v-model="currentWeight" class="weight-slider" />
      <div class="weight-labels">
        <span>当前: {{ currentWeight }}公斤</span>
      </div>
    </div>

    <!-- 健康记录标题 -->
    <div class="section-title">健康记录</div>

    <!-- 热量记录 -->
    <div class="card" @click="goToCalorieDetails()">
      <div class="card-header">
        🔆
        <span class="record-title">️热量记录</span>
        <span class="record-time">更新于 上次</span>
      </div>
      <div class="card-content">
        <span>--点击查看--</span>
      </div>
    </div>

    <!-- 体重、喝水、围度等卡片 -->
    <div class="record-cards">
      <div v-for="record in records" :key="record.title" class="card" @click="goToDetailPage(record.route)">
        <div class="card-header">
          🔆
          <span class="record-title">{{ record.title }}</span>
          <span class="record-time">{{ record.updateTime }}</span>
        </div>
        <div class="card-content">--点击查看--</div>
      </div>
	</div>  
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
// Vuex store
const store = useStore(); // 直接从 store 中读取状态
const userId = ref(store.state.userId); // Vuex 存储用户 ID
const accessToken = ref(store.state.access_token); // Vuex 存储 access_token
const avatar=ref(store.state.avatar_url);
const router = useRouter();
// 状态数据
const currentWeight = ref(0);
const initialWeight = ref(0);
const targetWeight = ref(0);
const weightLost = ref(0);
const lastCalorieUpdate = ref("");
const remainingCalories = ref(0);
const searchQuery = ref("");
const aiResponse = ref("");
const userAvatar = ref(""); // 存储用户头像 URL
const exerciseRecords = ref([]);
const totalCaloriesBurned = ref(0);

// async function getUserProfile(userId) {
//   try {
//      const response = await axios.get(`http://129.204.151.245:5001/user/${userId.value}/profile`, {
//       headers: {
// 		"Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken.value}`,
//       },
//     });
//     const { avatar_url} = response.data;
//     userAvatar.value = avatar_url || "/pages/images/logo-black.jpg"; // 使用默认头像
//     console.log("Avatar URL:", avatar_url);
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//   }
// }
const records = ref([
  { title: "体重", updateTime: "", info: "", route: "/pages/weight-details/weight-details" },
  { title: "喝水记录", updateTime: "", info: "", route: "/pages/water-details/water-details" },
  { title: "围度", updateTime: "", info: "", route: "/pages/waist-details/waist-details" },
]);

// 刷新所有数据
async function refreshData() {
  if (!userId.value || !accessToken.value) {
    alert("请先登录！");
	router.push('/pages/login/login');
    return;
  }

  // await getUserProfile(userId.value);
  await loadUserData();

}
// 页面挂载时加载数据
onMounted(async () => {
  if (!userId.value || !accessToken.value) {
    alert("请先登录！");
	router.push('/pages/login/login');
    return;
  }
  
  await refreshData();
});


// 加载用户身体信息
async function loadUserData() {
  try {
    const response = await axios.get(`http://129.204.151.245:5001/user/${userId.value}/body-info`, {
      headers: {
		  "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.value}`,
      },
    });

    const data = response.data;
    initialWeight.value = data.weight;
    targetWeight.value = data.weight_target;
    currentWeight.value = data.weight;
    weightLost.value = (initialWeight.value - currentWeight.value).toFixed(2);
  } catch (error) {
    console.error("加载用户身体信息失败:", error);
    alert("无法加载用户信息，请稍后重试！");
  }
}


// 获取当前日期
function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}


// 跳转到用户个人主页
function goToUserProfile() {
  uni.switchTab({
    url: "/pages/me/me",
  });
}

// 跳转到热量记录详情
function goToCalorieDetails() {
  uni.navigateTo({
    url: "/pages/calorie-details/calorie-details",
  });
}

// 跳转到各个详情页面
function goToDetailPage(route) {
  uni.navigateTo({
    url: route,
  });
}

// 点击搜索按钮时调用 AI 接口
async function onSearch() {
  if (!searchQuery.value) {
    alert("请输入问题");
    return;
  }

  try {
    const response = await axios.post("http://129.204.151.245:5002/ask_question", {
      user_id: userId.value,
      question: searchQuery.value,
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    aiResponse.value = response.data.answer || "未获取到回答，请稍后重试";
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