
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

    <!-- 晚餐建议 -->
    <view class="meal-section">
      <text class="meal-title">晚餐建议</text>
      <view class="meal-details">
        <view class="food-item">
          <text>鸡肉：1.0片（中），358千卡</text>
        </view>
        <view class="food-item">
          <text>米饭：1.0碗（小碗），92千卡</text>
        </view>
      </view>
    </view>

    <!-- 营养分析 -->
    <view class="section">
      <text class="section-title">营养分析</text>
      <text class="section-content">根据您的饮食数据进行分析...</text>
    </view>

    <!-- 饮食建议 -->
    <view class="section">
      <text class="section-title">饮食建议</text>
      <text class="section-content">根据您的目标，建议增加蛋白质摄入...</text>
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
      <image class="icon" src="static/icons/gear.png" />
      <image class="icon" src="static/icons/water.png" />
      <image class="icon" src="static/icons/cup.png" />
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
  padding: 20