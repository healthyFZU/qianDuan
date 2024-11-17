
<template>
  <view class="container">
    <!-- 选项列表 -->
    <view class="options-list">
      <view class="option-item" @click="navigateTo('changePassword')">
        <text class="option-title">登录密码修改</text>
        <image class="arrow-icon" src="static/icons/arrow-right.png" />
      </view>
      <view class="option-item" @click="navigateTo('bindPhoneOrEmail')">
        <text class="option-title">绑定/解绑手机号或邮箱</text>
        <image class="arrow-icon" src="static/icons/arrow-right.png" />
      </view>
      <view class="option-item" @click="navigateTo('twoFactorAuth')">
        <text class="option-title">双重认证设置</text>
        <image class="arrow-icon" src="static/icons/arrow-right.png" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'AccountSecurityPage',
  methods: {
    navigateTo(page) {
      // 导航到相应的设置页面
      uni.navigateTo({
        url: `/pages/account-security/${page}/${page}`
      });
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
}

/* 选项列表 */
.options-list {
  display: flex;
  flex-direction: column;
}

.option-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #DDD;
}

.option-title {
  font-size: 16px;
  color: #333;
}

.arrow-icon {
  width