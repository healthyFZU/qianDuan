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
<!-- pages/account-management/account-management.vue -->
<template>
  <view class="container">
    <!-- 选项列表 -->
    <view class="options-list">
      <view class="option-item" @click="logout">
        <text class="option-title">退出当前账户</text>
        <image class="arrow-icon" src="static/icons/arrow-right.png" />
      </view>
      <view class="option-item" @click="deleteAccount">
        <text class="option-title">删除账户选项</text>
        <image class="arrow-icon" src="static/icons/arrow-right.png" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'AccountManagementPage',
  methods: {
    logout() {
      // 退出账户的逻辑
      uni.showModal({
        title: '确认',
        content: '您确定要退出当前账户吗？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            // 执行退出账户逻辑
            // 例如，清除用户数据，跳转到登录页面
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },
    deleteAccount() {
      // 删除账户的逻辑
      uni.showModal({
        title: '确认',
        content: '您确定要删除账户吗？此操作不可逆。',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            // 执行删除账户逻辑
            // 例如，删除用户数据，跳转到注册页面
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
  width: 20px;
  height: 20px;
}
</style>