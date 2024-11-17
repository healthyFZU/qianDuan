
<template>
  <view class="container">
    <!-- 时间显示 -->
    <text class="time">12:00</text>

    <!-- 卡通形象 -->
    <view class="avatar-section">
      <image class="avatar" src="https://via.placeholder.com/150" />
    </view>

    <!-- 反馈信息 -->
    <view class="feedback-section">
      <text class="feedback-title">已收到反馈！</text>
      <text class="feedback-message">我们将为您带来更好的服务</text>
      <text class="feedback-content">反馈内容：{{ feedback }}</text>
    </view>

    <!-- 回到主页按钮 -->
    <button class="home-button" @click="goHome">回到主页</button>
  </view>
</template>

<script>
export default {
  name: 'FeedbackSuccessPage',
  data() {
    return {
      feedback: '您的反馈内容已提交成功，感谢您的宝贵意见！'
    }
  },
  methods: {
    goHome() {
      // 跳转到主页的逻辑
      uni.reLaunch({
        url: '/pages/home/home'
      });
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* 时间显示 */
.time {
  font-size: 16px;
  color: #555;
  margin-bottom: 10px;
}

/* 卡通形象 */
.avatar-section {
  margin-bottom: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}

/* 反馈信息 */
.feedback-section {
  margin-bottom: 20px;
}

.feedback-title {
  font-size: 20px;
  font-weight: bold;
  color: #007AFF;
  margin-bottom: 10px;
}

.feedback-message {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

.feedback-content {
  font-size: 16px;
  color: #555;
}

/* 回到主页按钮 */
.home-button {
  width: 80%;
  height: 50px;
  background-color: #007AFF;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}
</style>