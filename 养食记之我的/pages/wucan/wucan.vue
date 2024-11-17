
<template>
  <view class="container">
    <!-- 顶部时间 -->
    <view class="header">
      <text class="time">12:00</text>
      <text class="week">周一</text>
    </view>

    <!-- 饮食计划 -->
    <view class="budget-section">
      <text class="budget-title">经典均衡饮食</text>
      <text class="budget-value">饮食预算：1946（依个人信息生成）</text>
    </view>

    <!-- 午餐 -->
    <view class="meal-section">
      <text class="meal-title">午餐</text>
      <view class="meal-details">
        <text class="meal-subtitle">建议量：370-600千卡</text>
        <view class="food-item">
          <text>鸡胸肉：1片（中），172千卡</text>
        </view>
        <view class="food-item">
          <text>米饭：1碗（中），300千卡</text>
        </view>
        <view class="food-item">
          <text>蔬菜：1份，80千卡</text>
        </view>
      </view>
    </view>

    <!-- 底部菜单 -->
    <view class="bottom-menu">
      <view class="menu-item" @click="navigateTo('breakfast')">
        <text>早餐</text>
      </view>
      <view class="menu-item" @click="navigateTo('lunch')">
        <text>午餐</text>
      </view>
      <view class="menu-item" @click="navigateTo('dinner')">
        <text>晚餐</text>
      </view>
    </view>

    <!-- 底部图标 -->
    <view class="bottom-icons">
      <image class="icon" src="static/icons/water.png" />
      <image class="icon" src="static/icons/hamburger.png" />
      <image class="icon" src="static/icons/gear.png" />
    </view>

    <!-- 其他提示 -->
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

/* 顶部时间 */
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.time,
.week {
  font-size: 16px;
  color: #555;
}

/* 饮食计划 */
.budget-section {
  width: 100%;
  margin-bottom: 20px;
}

.budget-title {
  font-size: 18px;
  font-weight: bold;
  color: #007AFF;