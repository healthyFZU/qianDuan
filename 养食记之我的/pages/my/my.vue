<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
<!-- pages/my/my.vue -->
<template>
  <view class="container">
    <!-- 用户信息 -->
    <view class="user-info">
      <image class="avatar" src="https://via.placeholder.com/100" />
      <view class="nickname">熊养养（已黑化）</view>
      <image class="medal" src="https://via.placeholder.com/30" />
    </view>

    <!-- 选项 -->
    <view class="options">
      <view class="option-item">
        <text>基本信息</text>
      </view>
      <view class="option-item">
        <text>我的食物</text>
      </view>
      <view class="option-item">
        <text>我的收藏</text>
      </view>
    </view>

    <!-- 健康计划 -->
    <view class="section">
      <text class="section-title">健康计划</text>
      <view class="section-content">
        <text>查看你的健康计划</text>
      </view>
    </view>

    <!-- 上周小结 -->
    <view class="section">
      <text class="section-title">上周小结</text>
      <view class="section-content">
        <text>查看上周的健康小结</text>
      </view>
    </view>

    <!-- 本周食谱 -->
    <view class="section">
      <text class="section-title">本周食谱</text>
      <view class="section-content">
        <text>查看本周的食谱安排</text>
      </view>
    </view>

    <!-- 体检档案 -->
    <view class="section">
      <text class="section-title">体检档案</text>
      <view class="section-content">
        <text>查看你的体检记录</text>
      </view>
    </view>

    <!-- 帮助与反馈 -->
    <view class="section">
      <text class="section-title">帮助与反馈</text>
      <view class="section-content">
        <text>获取帮助或提供反馈</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'MyPage'
}
</script>

<style>
.container {
  padding: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-right: 20px;
}

.nickname {
  font-size: 18px;
  font-weight: bold;
}

.medal {
  width: 24px;
  height: 24px;
  margin-left: 10px;
}

.options {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.option-item {
  padding: 10px 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.section-content {
  font-size: 14px;
  color: #555;
}
</style>