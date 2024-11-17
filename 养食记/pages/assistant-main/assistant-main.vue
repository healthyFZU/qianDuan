<template>
  <div class="ai-question-container">
    <!-- 顶部提示文字 -->
    <div class="history-link" @click="goToHistory">
      —— 点击查看历史记录 ——
    </div>

    <!-- 中心图片和提示内容 -->
    <div class="main-image">
      <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
    </div>

    <!-- 建议问题卡片 -->
    <div class="suggested-questions">
      <div class="question-row">
        <div class="question-card" v-for="(question, index) in questions" :key="index">
          <span class="icon">{{ question.icon }}</span>
          <span class="question-text">{{ question.text }}</span>
        </div>
      </div>
      <div class="change-suggestions" @click="changeSuggestions">🔄 换一下</div>
    </div>

    <div class="little-image">
       <img src="@/pages/images/close_eyes.png" alt="logo" class="little-image" />
    </div>
    <!-- 搜索框 -->
    <div class="search-bar">
      <input type="text" class="search-input" v-model="searchQuery" placeholder="关于食物的事情都可以问养养" />
      <button class="search-button" @click="onSearch">搜索</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const questions = ref([
  { icon: '✏️', text: '帮我生成适合减脂的一周的食谱' },
  { icon: '📄', text: '水果黄瓜与普通黄瓜的营养成分区别' },
  { icon: '🥗', text: '我不知道今天该吃什么，请帮我选一个' },
  { icon: '🥚', text: '一天最多能吃几个鸡蛋？' }
]);

const searchQuery = ref('');

function changeSuggestions() {
  questions.value = questions.value.reverse();
}

function goToHistory() {
  // 确保路径与pages.json中的配置一致
  uni.navigateTo({
    url: '/pages/assistant-history/assistant-history'  // 这里替换为实际历史记录页面的路径
  });
}

function onSearch() {
  uni.navigateTo({
    url: '/pages/assistant-question/assistant-question'  
  });
}
/*
import { ref, onMounted } from 'vue';

const questions = ref([]);
const searchQuery = ref('');

// 模拟的API请求URL
const apiBaseURL = 'https://your-backend-api.com';

// 加载推荐问题
async function loadSuggestedQuestions() {
  try {
    const response = await fetch(`${apiBaseURL}/suggested-questions`);
    if (response.ok) {
      questions.value = await response.json();
    } else {
      console.error('获取推荐问题失败');
    }
  } catch (error) {
    console.error('请求错误:', error);
  }
}

// 更换推荐问题
async function changeSuggestions() {
  try {
    const response = await fetch(`${apiBaseURL}/suggested-questions`);
    if (response.ok) {
      questions.value = await response.json();
    } else {
      console.error('更换推荐问题失败');
    }
  } catch (error) {
    console.error('请求错误:', error);
  }
}

// 历史记录页面跳转
function goToHistory() {
  uni.navigateTo({
    url: '/pages/assistant-history/assistant-history'
  });
}

// 点击推荐问题
function onQuestionClick(questionText) {
  searchQuery.value = questionText;
  onSearch();
}

// 搜索功能
async function onSearch() {
  if (!searchQuery.value) {
    alert('请输入搜索内容');
    return;
  }
  try {
    const response = await fetch(`${apiBaseURL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: searchQuery.value })
    });
    if (response.ok) {
      const result = await response.json();
      alert(`AI回复: ${result.answer}`);
    } else {
      console.error('搜索失败');
    }
  } catch (error) {
    console.error('请求错误:', error);
  }
}

// 页面加载时自动获取初始推荐问题
onMounted(() => {
  loadSuggestedQuestions();
});

*/

</script>

<style scoped>
.ai-question-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  height: 100vh;
  overflow-y: auto;
}

.history-link {
  font-size: 14px;
  color: #888;
  margin-top: 10px;
  cursor: pointer; /* 增加鼠标指针效果 */
}

.main-image .background-image {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  pointer-events: none; /* 允许事件穿透 */
}

.little-image {
  position: absolute;
  z-index: 0;
  top: 130px;
  right: 35px;
  bottom: 0;
  transform: scale(0.485);
}

.suggested-questions {
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 100px;
  left: 29px;
}

.question-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
  width: 90%;
}

.question-card {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: 1.8px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin: 5px 0;
  width: 48%;
  box-sizing: border-box;
  text-align: center;
  font-size: 14px;
  color: #555;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
}

.icon {
  margin-right: 5px;
}

.change-suggestions {
  font-size: 14px;
  color: #3590f1;
  margin-top: 10px;
  cursor: pointer;
  position: relative;
  top: 120px;
  right: 160px;
  white-space: nowrap;
}

.search-bar {
  display: flex;
  align-items: center;
  height: 20px;
  width: 70%;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  margin-top: 20px;
  position: relative;
  top: 290px;
  left: 50px;
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
  width: 32px;
  height: 32px;
  padding: 0;
  background-color: #ffffff;
  color: #50cc8e;
  border: none;
  outline: none;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
}
</style>
