<template>
  <div class="feedback-page">
    <!-- 反馈标题 -->
    <div class="feedback-header">
      <img src="/pages/images/close_eyes.png" alt="反馈图标" class="feedback-icon" />
      <p class="feedback-title">您的意见，我们认真倾听</p>
    </div>

    <!-- 反馈表单 -->
    <div class="feedback-form">
      <!-- 反馈内容输入框 -->
      <div class="input-section">
        <textarea
          v-model="feedbackContent"
          placeholder="请告诉我们您遇到的问题"
          class="feedback-textarea"
        ></textarea>
      </div>

      <!-- 联系方式输入框 -->
      <div class="input-section">
        <input
          v-model="contactInfo"
          type="text"
          placeholder="请留下您的联系方式（可选）"
          class="contact-input"
        />
      </div>

      <!-- 提交按钮 -->
      <button @click="submitFeedback" class="submit-button" :disabled="!feedbackContent">
        提交反馈
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedbackContent: "", // 用户输入的反馈内容
      contactInfo: "", // 用户输入的联系方式
    };
  },
  methods: {
    // 提交反馈
    submitFeedback() {
      if (!this.feedbackContent) {
        alert("请填写反馈内容！");
        return;
      }

      const feedbackData = {
        content: this.feedbackContent,
        contact: this.contactInfo || "未提供联系方式",
        date: new Date().toLocaleString(), // 提交时间
      };

      // 模拟保存反馈数据（可以扩展为发送到服务器的请求）
      console.log("提交的反馈数据：", feedbackData);
      alert("感谢您的反馈！我们会尽快处理。");

      // 清空输入框
      this.feedbackContent = "";
      this.contactInfo = "";
    },
  },
};
</script>

<style scoped>
.feedback-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.feedback-header {
  text-align: center;
  margin-bottom: 20px;
}

.feedback-icon {
  width: 180px;
  margin-bottom: 10px;
  transform: scale(1.2);
}

.feedback-title {
  font-size: 18px;
  font-weight: bold;
  color: #555;
}

.feedback-form {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.input-section {
  margin-bottom: 20px;
}

.feedback-textarea {
  width: 100%;
  height: 150px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  resize: none;
}

.contact-input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  height: 50px;
}

.submit-button {
  width: 100%;
  padding: 5px;
  font-size: 16px;
  color: white;
  background-color: #50cc8e;
  border: none;
  border-radius: 50px;
  cursor: pointer;
}

.submit-button:disabled {
  background-color: #50cc8e;
  cursor: not-allowed;
}

.submit-button:hover:not(:disabled) {
  background-color: #50cc8e;
}
</style>

