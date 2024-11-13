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
<!-- pages/settings/settings.vue -->
<template>
  <view class="container">
    <!-- 设置列表 -->
    <view class="settings-list">
      <view class="setting-item" @click="navigateTo('accountSecurity')">
        <text class="setting-title">账户安全</text>
        <image class="arrow-icon" src="static/icons/arrow-right.png" />
      </view>
      <view class="setting-item" @click="navigateTo('notificationSettings')">
        <text class="setting-title">通知设置</text>
        <image class="arrow-icon" src="static/icons/arrow-right.png" />
      </view>
      <view class="setting-item" @click="navigateTo('privacySettings')">
        <text class="setting-title">隐私设置</text>
        <image class="arrow-icon" src="static/icons/arrow-right.png" />
      </view>
      <view class="setting-item" @click="navigateTo('generalSettings')">
        <text class="setting-title">通用设置</text>
        <image class="arrow-icon" src="static/icons/arrow-right.png" />
      </view>
      <view class="setting-item" @click="navigateTo('dataManagement')">
        <text class="setting-title">数据管理</text>
        <image class="arrow-icon" src="static/icons/arrow-right.png" />
      </view>
      <view class="setting-item" @click="navigateTo('helpAndFeedback')">
        <text class="setting-title">帮助与反馈</text>
        <image class="arrow-icon" src="static/icons/arrow-right.png" />
      </view>
      <view class="setting-item logout-item" @click="logout">
        <text class="setting-title">退出账户/账户删除</text>
        <image class="arrow-icon" src="static/icons/arrow-right.png" />
      </view>
      <view class="setting-item" @click="navigateTo('other')">
        <text class="setting-title">其他</text>
        <image class="arrow-icon" src="static/icons/arrow-right.png" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'SettingsPage',
  methods: {
    navigateTo(page) {
      // 导航到相应的设置页面
      uni.navigateTo({
        url: `/pages/settings/${page}/${page}`
      });
    },
    logout() {
      // 退出账户或删除账户的逻辑
      uni.showModal({
        title: '确认',
        content: '您确定要退出账户吗？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            // 执行退出逻辑
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

/* 设置列表 */
.settings-list {
  display: flex;
  flex-direction: column;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #DDD;
}

.setting-title {
  font-size: 16px;
  color: #333;
}

.arrow-icon {
  width: 20px;
  height: 20px;
}

/* 退出账户项的特殊样式 */
.logout-item {
  border-bottom: none;
  margin-top: 20px;
  padding: 15px 0;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.logout-item .setting-title {
  color: #ff0000;
}
</style>