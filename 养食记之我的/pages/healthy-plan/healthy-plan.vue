<!-- pages/health-plan/health-plan.vue -->
<template>
  <view class="container">
    <!-- 顶部信息 -->
    <view class="header">
      <text class="time">12:00</text>
      <text class="title">健康计划</text>
    </view>

    <!-- 用户信息 -->
    <view class="user-info">
      <image class="avatar" src="https://via.placeholder.com/100" />
      <text class="message">根据我上周的饮食数据，为我生成一份健康计划</text>
    </view>

    <!-- 健康计划内容 -->
    <view class="plan">
      <!-- 总热量 -->
      <view class="section">
        <text class="section-title">总热量</text>
        <text class="section-content">上周摄入11,500千卡。根据您的目标调整。</text>
      </view>

      <!-- 营养素比例 -->
      <view class="section">
        <text class="section-title">营养素比例</text>
        <text class="section-content">碳水化合物40%，蛋白质30%，脂肪30%。继续保持。</text>
      </view>

      <!-- 水果蔬菜 -->
      <view class="section">
        <text class="section-title">水果蔬菜</text>
        <text class="section-content">每日2份水果，3份蔬菜。保持。</text>
      </view>

      <!-- 蛋白质 -->
      <view class="section">
        <text class="section-title">蛋白质</text>
        <text class="section-content">每日150克肉类，每周2次鱼类，3次豆类。保持。</text>
      </view>

      <!-- 乳制品 -->
      <view class="section">
        <text class="section-title">乳制品</text>
        <text class="section-content">每日250毫升牛奶，每周2次酸奶。保持。</text>
      </view>

      <!-- 谷物 -->
      <view class="section">
        <text class="section-title">谷物</text>
        <text class="section-content">每日3份全谷物，1份精制谷物。保持。</text>
      </view>

      <!-- 饮用水 -->
      <view class="section">
        <text class="section-title">饮用水</text>
        <text class="section-content">每日2升。保持。</text>
      </view>
    </view>

    <!-- 底部按钮 -->
    <button class="feedback-button" @click="openFeedback">我的饮食是否健康？有什么建议？</button>

    <!-- 底部导航栏 -->
    <view class="navbar">
      <view class="nav-item">
        <image class="nav-icon" src="static/icons/home.png" />
        <text class="nav-text">首页</text>
      </view>
      <view class="nav-item">
        <image class="nav-icon" src="static/icons/assistant.png" />
        <text class="nav-text">小助手</text>
      </view>
      <view class="nav-item">
        <image class="nav-icon" src="static/icons/record.png" />
        <text class="nav-text">记录</text>
      </view>
      <view class="nav-item">
        <image class="nav-icon" src="static/icons/my.png" />
        <text class="nav-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'HealthPlanPage',
  methods: {
    openFeedback() {
      // 打开反馈弹窗
      uni.showModal({
        title: '反馈',
        content: '请输入您的反馈内容',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
}

/* 顶部信息 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.time {
  font-size: 16px;
  color: #555;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

/* 用户信息 */
.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 15px;
}

.message {
  font-size: 16px;
  color: #333;
}

/* 健康计划内容 */
.plan {
  margin-bottom: 20px;
}

.section {
  margin-bottom: 15px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.section-content {
  font-size: 14px;
  color: #555;
}

/* 底部按钮 */
.feedback-button {
  width: 100%;
  height: 50px;
  background-color: #007AFF;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
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