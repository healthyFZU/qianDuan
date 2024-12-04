<template>
  <div class="chat-interface">
    <div class="main-image">
      <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
    </div>
    <text v-if="searchFocused" class="back-to-recommendations" @click="backToRecommendations">
      回到推荐问题
    </text>

    <!-- 搜索框和聊天输入框共享同一个输入框 -->
    <div class="search-container">
      <input
        type="text"
        v-model="userInput"
        @focus="onSearchFocus"
        @blur="onSearchBlur"
        @keyup.enter="sendMessage"
        :placeholder="searchFocused ? '你的每一个饮食疑问都有答案' : '关于食物的事情都能问养养哦！'"
        class="search-box"
      />
      <text v-if="searchFocused" @click="sendMessage" class="send-btn">
        发送
      </text>
    </div>
    
    <!-- 推荐问题卡片 -->
    <div v-if="!searchFocused" class="recommendations">
      <div class="question-row">
        <div
          v-for="(question, index) in recommendedQuestions"
          :key="index"
          class="recommendation-card"
          @click="selectQuestion(question)"
        >
          {{ question }}
        </div>
      </div>
      <div class="change-suggestions" @click="changeSuggestions">🔄 换一批</div>
    </div>
    
    <!-- 聊天记录 -->
    <div v-if="searchFocused" class="chat-window">
      <div class="history" v-if="!showAllHistory">
        <text class="show-history-btn" @click="showAllHistory = true">----查看更多历史记录----</text>
      </div>
      <div class="chat-history" ref="chatHistory">
        <div
          v-for="(message, index) in visibleChatHistory"
          :key="index"
          :class="message.sender === 'user' ? 'chat-message user' : 'chat-message ai'"
        >
          <img :src="message.sender === 'user' ? userAvatar : aiAvatar" class="avatar" />
          <div class="message-bubble">
            {{ message.content }}
          </div>
        </div>
      </div>

      <!-- 添加返回按钮 -->
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex'; // 引入 Vuex store

export default {
  setup() {
    const store = useStore(); // 获取 Vuex store
    const userId = computed(() => store.state.userId); // 从 Vuex 获取全局 userId
    const avatar = computed(() => store.state.avatar_url); // 从 Vuex 获取用户头像
    const userAvatar = ref(avatar.value || '../../pages/images/logo-black.jpg'); // 默认头像
    const aiAvatar = 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/logo.jpg'; // AI头像路径

    onMounted(() => {
      if (userId.value) {
        // 调用接口获取用户信息并更新头像
        getUserInfoById(userId.value);
      }
    });

    // 获取用户信息并更新头像
    const getUserInfoById = async (id) => {
      try {
        const response = await axios.get(`http://129.204.151.245:5001/user/message/${id}`);
        if (response.data && response.data.avatar_url) {
          userAvatar.value = response.data.avatar_url; // 更新头像
          store.commit('setAvatar', response.data.avatar_url); // 更新 Vuex 中的头像
        } else {
          userAvatar.value = '../../pages/images/logo-black.jpg'; // 默认头像
        }
      } catch (error) {
        console.error("获取用户信息失败:", error);
        userAvatar.value = '../../pages/images/logo-black.jpg'; // 默认头像
      }
    };

    return {
      userId,
      userAvatar,
      aiAvatar,
    };
  },

  data() {
    return {
      searchFocused: false,
      userInput: "",
      recommendedQuestions: [
        "帮我生成适合减脂的一周的食谱",
        "水果黄瓜与普通黄瓜的营养成分区别",
        "我不知道今天该吃什么，请帮我选一个",
        "一天最多能吃几个鸡蛋？",
      ],
      chatHistory: [],
      showAllHistory: false,
      isKeyboardVisible: false, // 添加键盘状态变量
    };
  },

  computed: {
    visibleChatHistory() {
      return this.showAllHistory ? this.chatHistory : this.chatHistory.slice(-10); // 默认显示最近10条记录
    },
  },

  methods: {
    scrollToBottom() {
      const chatHistoryElement = this.$refs.chatHistory;
      if (!chatHistoryElement) return;

      const scroll = () => {
        chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight;
        if (
          chatHistoryElement.scrollTop + chatHistoryElement.clientHeight <
          chatHistoryElement.scrollHeight
        ) {
          requestAnimationFrame(scroll);
        }
      };
      this.$nextTick(() => {
        requestAnimationFrame(scroll);
      });
    },

    async changeSuggestions() {
      try {
        const response = await axios.get('http://129.204.151.245:5001/questions/random'); // 调用后端 API
        if (response.data && response.data.questions) {
          this.recommendedQuestions = response.data.questions; // 更新问题卡片
        } else {
          console.error("未获取到问题列表");
        }
      } catch (error) {
        console.error("获取随机问题失败", error);
      }
    },

    adjustForKeyboard() {
      window.addEventListener('resize', this.handleResize);
    },

    backToRecommendations() {
      this.searchFocused = false;  // 切换为展示推荐问题的状态
      this.userInput = '';  // 清空输入框
    },

    handleResize() {
      // 根据屏幕高度判断键盘是否显示
      if (window.innerHeight < 500) {  // 可以根据实际需求调整这个判断条件
        this.isKeyboardVisible = true;
      } else {
        this.isKeyboardVisible = false;
      }
    },

    onSearchFocus() {
      this.searchFocused = true;
    },

    onSearchBlur() {
      // 可以在此处执行其他操作，比如隐藏推荐问题
    },

    selectQuestion(question) {
      this.searchFocused = true;
      this.userInput = question;
      this.sendMessage();
    },

    async sendMessage() {
      if (!this.userInput.trim()) return;

      const userMessage = {
        sender: "user",
        content: this.userInput.trim(),
      };
      this.chatHistory.push(userMessage);
      this.scrollToBottom(); // 滚动到最底部
      this.userInput = ""; // 清空输入框

      const loadingMessage = {
        sender: "ai",
        content: "AI正在思考中，请稍候...",
      };
      this.chatHistory.push(loadingMessage);

      await this.fetchAIResponse(userMessage.content);

      this.chatHistory = this.chatHistory.filter(
        message => message.content !== "AI正在思考中，请稍候..."
      );
      this.scrollToBottom();
    },

    async fetchAIResponse(question) {
      try {
        const response = await axios.post('http://129.204.151.245:5002/ask_question', {
          user_id: this.userId, // 传递用户ID
          question: question,   // 传递用户问题
        });

        if (response.data.error) {
          throw new Error(response.data.error);
        }

        const aiResponse = response.data.answer || '未获取到回答，请稍后重试';

        const aiMessage = {
          sender: "ai",
          content: aiResponse,
        };
        this.chatHistory.push(aiMessage);
        this.scrollToBottom();

        this.saveChatHistory();
      } catch (error) {
        console.error("AI请求失败", error);

        const errorMessage = {
          sender: "ai",
          content: "发生错误，请稍后再试。",
        };
        this.chatHistory.push(errorMessage);
        this.scrollToBottom();
      }
    },

    saveChatHistory() {
      localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
    }
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>


<style scoped>
.chat-interface {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  height: 100vh;  /* 确保容器占满整个屏幕 */
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
/* 返回推荐问题按钮样式 */
.back-to-recommendations {
  margin-top: 0px;
  padding: 0px;
  background: #50cc8e;
  border: none;
  border-radius: 0px;
  cursor: pointer;
  width: 100%;
  font-size: 12px;
  text-align: center;
  transition: background 0.2s;
  color: #ffffff;
}

.back-to-recommendations:hover {
  background: #eaeaea;
}
.change-suggestions {
  font-size: 14px;
  color: #3590f1;
  margin-top: 10px; /* 调整按钮与建议卡片的间距 */
  cursor: pointer;
  text-align: center; /* 居中对齐 */
  position: static; /* 移除相对定位 */
  white-space: nowrap;
}
.search-container {
  position: relative;
  width: 100%;
  padding: 10px;
}

.search-box { 
  margin: 10px auto; 
  border: 1px solid #ddd; /* 边框 */
  border-radius: 50px; /* 圆角边框 */
  padding: 8px; /* 内边距 */
  width: 80%; /* 控制宽度 */
  display: flex;
  justify-content: center; /* 水平居中 */
  font-size: 15px;

  
}

.send-btn {
  position: absolute;
  top: 50%;
  right: 40px;
  transform: translateY(-50%);
  padding: 0px 15px;
  font-size: 15px;
  background: #ffffff;
  color: #3590f1;
  border: none;
  border-radius: 0px;
  cursor: pointer;
  transition: background 0.2s;
 
}

.send-btn:hover {
  background: #ffffff;
   color: #0056b3;
}

.recommendations {
  margin-top: 50px;
    width: 100%;
    display: flex;
    flex-direction: column; /* 纵向排列建议卡片和按钮 */
    align-items: center; /* 居中对齐 */
    justify-content: center;
}
.question-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
  width: 90%;
}
.recommendation-card {
  display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border: 1.8px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    margin: 5px 0;
    width: 48%; /* 控制每张卡片的宽度 */
    box-sizing: border-box;
    text-align: center;
    font-size: 14px;
    color: #555;
    box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.1); /* 一致的阴影效果 */
    height: 80px; /* 自适应高度 */
    transition: all 0.3s ease; /* 增加平滑过渡效果 */
}

.recommendation-card:hover {
  background: #eaeaea;
}

.chat-window {
  width: 100%;
  margin-top: 10px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;  /* 使内容垂直排列 */
 height: calc(100vh - 90px);
}

.chat-history {
  flex-grow: 1;  /* 让聊天记录区域占用剩余空间 */
  overflow-y: auto;
  padding: 0px;
  margin: 5px;
  -ms-overflow-style: none; /* 针对 IE 和 Edge */
    scrollbar-width: none; /* 针对 Firefox */
  
}
.chat-history::-webkit-scrollbar {
  display: none; /* 针对 Chrome、Safari 和 Edge */
}
.chat-message {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px; /* 增加消息之间的垂直间距 */
}

.chat-message.user {
  flex-direction: row-reverse;
  align-items: flex-start;
}
.chat-message.ai {
  align-items: flex-start; /* AI 消息顶部对齐 */
}
.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50px;
}

.message-bubble {
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
  word-wrap: break-word;
}

.chat-message.user .message-bubble {
  background: #fadf49;
  align-self: flex-end;
  border: 1px solid #fadf49;
  
}

.chat-message.ai .message-bubble {
  background: #fff;
  align-self: flex-start;
  border: 1px solid #ccc;
}

.show-history-btn {
  width: 100%;
  padding: 0px;
  background: #ffffff;
  cursor: pointer;
  color: #ccc;
  display: flex;
  justify-content: center;
  font-size: 12px;
  position: relative;
  bottom: 10px;
}
</style>