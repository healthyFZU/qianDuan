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
<!-- pages/privacy-settings/privacy-settings.vue -->
<template>
  <view class="container">
    <!-- 可见性设置 -->
    <view class="section">
      <text class="section-title">可见性设置</text>
      <view class="options">
        <view class="option-item" @click="toggleVisibility('everyone')">
          <text>所有人</text>
          <image v-if="visibilitySetting === 'everyone'" class="check-icon" src="static/icons/check.png" />
        </view>
        <view class="option-item" @click="toggleVisibility('friends')">
          <text>仅好友</text>
          <image v-if="visibilitySetting === 'friends'" class="check-icon" src="static/icons/check.png" />
        </view>
        <view class="option-item" @click="toggleVisibility('nobody')">
          <text>仅自己</text>
          <image v-if="visibilitySetting === 'nobody'" class="check-icon" src="static/icons/check.png" />
        </view>
      </view>
    </view>

    <!-- 好友请求设置 -->
    <view class="section">
      <text class="section-title">好友请求设置</text>
      <view class="options">
        <view class="option-item" @click="toggleFriendRequest('everyone')">
          <text>所有人</text>
          <image v-if="friendRequestSetting === 'everyone'" class="check-icon" src="static/icons/check.png" />
        </view>
        <view class="option-item" @click="toggleFriendRequest('friends')">
          <text>仅好友</text>
          <image v-if="friendRequestSetting === 'friends'" class="check-icon" src="static/icons/check.png" />
        </view>
        <view class="option-item" @click="toggleFriendRequest('nobody')">
          <text>关闭</text>
          <image v-if="friendRequestSetting === 'nobody'" class="check-icon" src="static/icons/check.png" />
        </view>
      </view>
    </view>

    <!-- 数据共享设置 -->
    <view class="section">
      <text class="section-title">数据共享设置</text>
      <view class="options">
        <view class="option-item" @click="toggleDataSharing('allow')">
          <text>允许</text>
          <image v-if="dataSharingSetting === 'allow'" class="check-icon" src="static/icons/check.png" />
        </view>
        <view class="option-item" @click="toggleDataSharing('deny')">
          <text>拒绝</text>
          <image v-if="dataSharingSetting === 'deny'" class="check-icon" src="static/icons/check.png" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'PrivacySettingsPage',
  data() {
    return {
      visibilitySetting: 'everyone',
      friendRequestSetting: 'everyone',
      dataSharingSetting: 'allow'
    }
  },
  methods: {
    toggleVisibility(setting) {
      this.visibilitySetting = setting;
    },
    toggleFriendRequest(setting) {
      this.friendRequestSetting = setting;
    },
    toggleDataSharing(setting) {
      this.dataSharingSetting = setting;
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
}

/* 设置列表 */
.section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.options {
  display: flex;
  flex-direction: column;
}

.option-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #DDD;
}

.check-icon {
  width: 20px;
  height: 20px;
}
</style>