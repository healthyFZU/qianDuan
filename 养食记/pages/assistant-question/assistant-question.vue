<template>
  <div class="ai-chat-container">
    <!-- 顶部链接 -->
    <div class="history-link">
      <text @click="goToHistory">—— 点击查看历史记录 ——</text>
    </div>

    <div class="main-image">
      <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
    </div>
	
	<!-- 消息展示区域 
	    <div v-for="(message, index) in chatMessages" :key="index" :class="message.isUser ? 'message-container user-message' : 'message-container ai-message'">
	      <div :class="message.isUser ? 'message-bubble user' : 'message-bubble ai'">
	        <span>{{ message.text }}</span>
	      </div>
	      <img :src="message.isUser ? '@/pages/images/logo-black.jpg' : '@/pages/images/logo.jpg'" alt="avatar" class="avatar" />
	    </div>
	  </div>
	-->
    <!-- 用户消息气泡 -->
    <div class="message-container user-message">
      <div class="message-bubble user">
        <span>减肥能吃肠粉吗</span>
      </div>
      <img src="@/pages/images/logo-black.jpg" alt="user-avatar" class="avatar" />
    </div>

    <!-- AI 回复消息气泡 -->
    <div class="message-container ai-message">
      <img src="@/pages/images/logo.jpg" alt="ai-avatar" class="avatar" />
      <div class="message-bubble ai">
        <span>
          减肥时可以吃肠粉，但要注意适量和选择健康的配料。肠粉通常含有米浆和淀粉，热量相对较高，所以建议搭配更多的蔬菜和瘦肉，减少油脂和酱料的使用。此外，控制摄入的总热量也是关键。如果能搭配均衡的饮食和适量的运动，适量享用肠粉是可以的。
        </span>
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

// 示例功能：跳转到历史记录
function goToHistory() {
  uni.navigateTo({
    url: '/pages/assistant-history/assistant-history'  // 修改为你的历史记录页面的路径
  });
}
/*
import { ref } from 'vue';

const searchQuery = ref('');
const chatMessages = ref([
  { text: '减肥能吃肠粉吗', isUser: true },
  { text: '减肥时可以吃肠粉，但要注意适量和选择健康的配料...', isUser: false }
]);

// 示例功能：跳转到历史记录
function goToHistory() {
  uni.navigateTo({
    url: '/pages/assistant-history/assistant-history'  // 修改为你的历史记录页面的路径
  });
}

// 向大语言模型API发送请求
async function onSearch() {
  if (!searchQuery.value) {
    alert('请输入内容');
    return;
  }

  // 添加用户消息到聊天记录
  chatMessages.value.push({ text: searchQuery.value, isUser: true });

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // 使用的模型
        messages: [{ role: 'user', content: searchQuery.value }],
        max_tokens: 100
      })
    });

    if (response.ok) {
      const data = await response.json();
      const aiMessage = data.choices[0].message.content;

      // 添加AI的回复到聊天记录
      chatMessages.value.push({ text: aiMessage, isUser: false });
    } else {
      console.error('AI响应失败', response);
    }
  } catch (error) {
    console.error('请求错误:', error);
  }

  // 清空搜索框
  searchQuery.value = '';
}
*/
</script>

<style scoped>
.ai-chat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  height: 100vh;
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
.history-link {
  font-size: 14px;
  color: #888;
  margin-top: 10px;
}
.little-image{
	position: absolute;
	z-index: 0;
	top: 130px;
	right: 35px;
	bottom: 0;
	transform: scale(0.485);
}

.message-container {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  width: 80%;
}

.user-message {
  justify-content: flex-end; /* 用户消息靠右 */
  position: relative;
  left:20px;
  top:20px;
}

.ai-message {
  justify-content: flex-start; /* AI 消息靠左 */
  position: relative;
  right:20px;
  top:20px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.message-bubble {
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  word-break: break-word;
}

.user-message .message-bubble.user {
  background-color: #ffffff;
  border: 1px solid #ddd;
  margin-right: 10px;
  align-self: flex-end; /* 用户消息的气泡在右边 */
}

.ai-message .message-bubble.ai {
  background-color: #fdf2c8;
  border: 1px solid #f6e58d;
  margin-left: 10px;
  align-self: flex-start; /* AI 消息的气泡在左边 */
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
  left:100px;
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