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
<!-- pages/notification-settings/notification-settings.vue -->
<template>
  <view class="container">
    <!-- 接收通知的类型选择 -->
    <view class="section">
      <text class="section-title">接收通知的类型选择</text>
      <view class="options">
        <view class="option-item" @click="toggleType('message')">
          <text>消息</text>
          <image v-if="notificationTypes.message" class="check-icon" src="static/icons/check.png" />
        </view>
        <view class="option-item" @click="toggleType('reminder')">
          <text>提醒</text>
          <image v-if="notificationTypes.reminder" class="check-icon" src="static/icons/check.png" />
        </view>
        <view class="option-item" @click="toggleType('activity')">
          <text>活动</text>
          <image v-if="notificationTypes.activity" class="check-icon" src="static/icons/check.png" />
        </view>
      </view>
    </view>

    <!-- 通知方式选择 -->
    <view class="section">
      <text class="section-title">通知方式选择</text>
      <view class="options">
        <view class="option-item" @click="toggleMethod('push')">
          <text>推送通知</text>
          <image v-if="notificationMethods.push" class="check-icon" src="static/icons/check.png" />
        </view>
        <view class="option-item" @click="toggleMethod('sms')">
          <text>短信</text>
          <image v-if="notificationMethods.sms" class="check-icon" src="static/icons/check.png" />
        </view>
        <view class="option-item" @click="toggleMethod('email')">
          <text>邮件</text>
          <image v-if="notificationMethods.email" class="check-icon" src="static/icons/check.png" />
        </view>
      </view>
    </view>

    <!-- 通知时间设置 -->
    <view class="section">
      <text class="section-title">通知时间设置</text>
      <view class="time-picker">
        <picker mode="time" @change="onTimeChange">
          <view class="picker">
            <text>允许接收通知的时间段：{{ startTime }} - {{ endTime }}</text>
          </view>
        </picker>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'NotificationSettingsPage',
  data() {
    return {
      notificationTypes: {
        message: true,
        reminder: true,
        activity: true
      },
      notificationMethods: {
        push: true,
        sms: true,
        email: true
      },
      startTime: '08:00',
      endTime: '22:00'
    }
  },
  methods: {
    toggleType(type) {
      this.notificationTypes[type] = !this.notificationTypes[type];
    },
    toggleMethod(method) {
      this.notificationMethods[method] = !this.notificationMethods[method];
    },
    onTimeChange(e) {
      const times = e.detail.value.split('-');
      this.startTime = times[0];
      this.endTime = times[1];
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
}

/* 接收通知的类型选择 */
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

/* 通知时间设置 */
.time-picker {
  padding: 10px 0;
  border-bottom: 1px solid #DDD;
}

.picker {
  display: flex;
  align-items: center;
}
</style>