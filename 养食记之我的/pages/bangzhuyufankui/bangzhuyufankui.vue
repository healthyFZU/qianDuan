<template>
  <view class="container">
    <!-- 时间显示 -->
    <text class="time">12:00</text>

    <!-- 卡通形象和提示文字 -->
    <view class="avatar-section">
      <image class="avatar" src="https://via.placeholder.com/100" />
      <text class="message">您的意见，我们认真倾听</text>
    </view>

    <!-- 反馈文本框 -->
    <view class="feedback-section">
      <textarea
        class="feedback-textarea"
        v-model="feedback"
        placeholder="请告诉我们您遇到的问题"
        maxlength="500"
        @input="onInput"
      />
      <text class="char-count">{{ charCount }}/500</text>
    </view>

    <!-- 联系方式选项 -->
    <view class="contact-section">
      <checkbox-group v-model="contact">
        <label class="checkbox-label">
          <checkbox value="contact" /> 请留下您的联系方式（可选）
        </label>
      </checkbox-group>
    </view>

    <!-- 提交按钮 -->
    <button class="submit-button" @click="submitFeedback">提交反馈</button>
  </view>
</template>

<script>
export default {
  name: 'FeedbackPage',
  data() {
    return {
      feedback: '',
      contact: [],
      charCount: 0
    }
  },
  methods: {
    onInput() {
      this.charCount = this.feedback.length;
    },
    submitFeedback() {
      if (this.feedback.trim() === '') {
        uni.showToast({
          title: '请输入您的反馈',
          icon: 'none'
        });
        return;
      }

      // 提交反馈的逻辑
      console.log('用户反馈:', this.feedback);
      if (this.contact.includes('contact')) {
        console.log('用户联系方式:', this.contact);
      }

      uni.showToast({
        title: '感谢您的反馈',
        icon: 'success'
      });

      // 清空输入
      this.feedback = '';
      this.contact = [];
      this.charCount = 0;
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
}

/* 时间显示 */
.time {
  font-size: 16px;
  color: #555;
  margin-bottom: 10px;
}

/* 卡通形象和提示文字 */
.avatar-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
}

.message {
  font-size: 16px;
  color: #333;
}

/* 反馈文本框 */
.feedback-section {
  margin-bottom: 20px;
}

.feedback-textarea {
  width: 100%;
  height: 150px;
  border: 1px solid #DDD;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  resize: none;
}

.char-count {
  text-align: right;
  font-size: 14px;
  color: #999;
  margin-top: 5px;
}

/* 联系方式选项 */
.contact-section {
  margin-bottom: 20px;
}

.checkbox-label {
  font-size: 16px;
  color: #333;
}

/* 提交按钮 */
.submit-button {
  width: 100%;
  height: 50px;
  background-color: #007AFF;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}
</style>