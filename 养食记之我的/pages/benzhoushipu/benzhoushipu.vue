
<template>
  <view class="container">
    <!-- 顶部日期 -->
    <view class="header">
      <text class="date">周一</text>
      <view class="icons">
        <image class="battery-icon" src="static/icons/battery.png" />
        <image class="signal-icon" src="static/icons/signal.png" />
      </view>
    </view>

    <!-- 饮食预算 -->
    <view class="budget-section">
      <text class="budget-title">经典均衡饮食</text>
      <text class="budget-value">饮食预算：1946（依个人信息生成）</text>
    </view>

    <!-- 早餐 -->
    <view class="meal-section">
      <text class="meal-title">早餐</text>
      <view class="meal-details">
        <text class="meal-subtitle">建议量：311-380千卡</text>
        <view class="food-item">
          <text>鸡蛋：1.0只（中），73千卡</text>
        </view>
        <view class="food-item">
          <text>小米粥：1.0碗（小碗），92千卡</text>
        </view>
        <view class="food-item">
          <text>花卷：1.0个，193千卡</text>
        </view>
      </view>
    </view>

    <!-- 底部菜单 -->
    <view class="bottom-menu">
      <view class="menu-item" @click="navigateTo('nutritionAnalysis')">
        <text>营养分析</text>
      </view>
      <view class="menu-item" @click="navigateTo('dietAdvice')">
        <text>饮食建议</text>
      </view>
    </view>

    <!-- 底部导航栏 -->
    <view class="bottom-navbar">
      <view class="nav-item" @click="navigateTo('breakfast')">
        <text>早餐</text>
      </view>
      <view class="nav-item" @click="navigateTo('lunch')">
        <text>午餐</text>
      </view>
      <view class="nav-item" @click="navigateTo('dinner')">
        <text>晚餐</text>
      </view>
    </view>

    <!-- 底部提示 -->
    <text class="bottom-tip">完整记录三餐分析才准确</text>
  </view>
</template>

<script>
export default {
  name: 'DietTrackerPage',
  methods: {
    navigateTo(page) {
      // 导航到相应的页面
      uni.navigateTo({
        url: `/pages/diet-tracker/${page}/${page}`
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

/* 顶部日期和状态栏 */
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.date {
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

/* 饮食预算 */
.budget-section {
  width: 100%;
  margin-bottom: 20px;
}

.budget-title {
  font-size: 18px;
  font-weight: bold;
  color: #007AFF;
  margin-bottom: 5px;
}

.budget-value {
  font-size: 16px;
  color: #333;
}

/* 早餐 */
.meal-section {
  width: 100%;
  margin-bottom: 20px;
}

.meal-title {
  font-size: 18px;
  font-weight: bold;
  color: #007AFF;
  margin-bottom: 10px;
}

.meal-subtitle {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

.food-item {
  font-size: 16px;
  color: #555;
  margin-bottom: 5px;
}

/* 底部菜单 */
.bottom-menu {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.menu-item {
  padding: 10px 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
}

/* 底部导航栏 */
.bottom-navbar {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #DDD;
  padding: 10px 0;
}

.nav-item {
  text-align: center;
  font-size: 16px;
  color: #007AFF;
}

/* 底部提示 */
.bottom-tip {
  font-size: 14px;
  color: #555;
  text-align: center;
  margin-top: 10px;
}
</style>