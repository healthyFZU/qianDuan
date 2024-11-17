
<template>
  <view class="container">
    <!-- 时间显示和状态栏 -->
    <view class="status-bar">
      <text class="time">12:00</text>
      <view class="icons">
        <image class="battery-icon" src="static/icons/battery.png" />
        <image class="signal-icon" src="static/icons/signal.png" />
      </view>
    </view>

    <!-- 聊天框 -->
    <view class="chat-box">
      <text class="chat-message">根据我上周的饮食数据，为我生成一份小结</text>
    </view>

    <!-- 总结信息 -->
    <view class="summary-section">
      <text class="summary-title">本周饮食小结：</text>
      <view class="summary-details">
        <text>总热量摄入：11,500千卡</text>
        <text>营养素比例：碳水化合物40%，蛋白质30%，脂肪30%</text>
        <text>水果蔬菜：每日2份水果，3份蔬菜</text>
        <text>蛋白质：每日150克肉类，每周2次鱼类</text>
        <text>乳制品：每日250毫升牛奶，每周2次酸奶</text>
        <text>谷物：每日3份全谷物，1份精制谷物</text>
        <text>饮水：每日2升</text>
      </view>
      <text class="summary-question">我的饮食是否健康？有什么建议？</text>
    </view>

    <!-- 底部导航栏 -->
    <view class="navbar">
      <view class="nav-item" @click="goHome">
        <image class="nav-icon" src="static/icons/home.png" />
        <text class="nav-text">首页</text>
      </view>
      <view class="nav-item" @click="goAssistant">
        <image class="nav-icon" src="static/icons/assistant.png" />
        <text class="nav-text">小助手</text>
      </view>
      <view class="nav-item" @click="goRecord">
        <image class="nav-icon" src="static/icons/record.png" />
        <text class="nav-text">记录</text>
      </view>
      <view class="nav-item" @click="goMy">
        <image class="nav-icon" src="static/icons/my.png" />
        <text class="nav-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'DietSummaryPage',
  methods: {
    goHome() {
      uni.reLaunch({
        url: '/pages/home/home'
      });
    },
    goAssistant() {
      uni.reLaunch({
        url: '/pages/assistant/assistant'
      });
    },
    goRecord() {
      uni.reLaunch({
        url: '/pages/record/record'
      });
    },
    goMy() {
      uni.reLaunch({
        url: '/pages/my/my'
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
}

/* 状态栏 */
.status-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.time {
  font-size: 16px;
  color: #555;
}

.icons {
  display: flex;
  align-items: center;
}

.battery-icon,
.signal-icon {
  width: 20px;
  height: 20px;
  margin-left: 5px;
}

/* 聊天框 */
.chat-box {
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
}

.chat-message {
  font-size: 16px;
  color: #333;
}

/* 总结信息 */
.summary-section {
  width: 100%;
}

.summary-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #007AFF;
}

.summary-details {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

.summary-question {
  font-size: 16px;
  color: #555;
}

/* 底部导航栏 */
.navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #FFFFFF;
  border-top: 1px solid #DDD;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-icon {
  width: 24px;
  height: 24px;
}

.nav-text {
  font-size: 12px;
  color: #555;
  margin-top: 5px;
}
</style>