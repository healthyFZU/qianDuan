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
    <!-- 时间显示 -->
    <text class="time">12:00</text>

    <!-- 顶部导航栏 -->
    <NavBar />

    <!-- 选项列表 -->
    <view class="options-list">
      <view class="option-item" @click="navigateTo('thirdParty')">
        <text class="option-title">第三方服务授权管理</text>
        <image class="arrow-icon" src="static/icons/arrow-right.png" />
      </view>
      <view class="option-item" @click="navigateTo('subscription')">
        <text class="option-title">订阅服务管理</text>
        <image class="arrow-icon" src="static/icons/arrow-right.png" />
      </view>
      <view class="option-item" @click="navigateTo('payment')">
        <text class="option-title">支付设置</text>
        <image class="arrow-icon" src="static/icons/arrow-right.png" />
      </view>
    </view>
  </view>
</template>

<script>
import NavBar from '../../components/NavBar.vue'

export default {
  components: {
    NavBar
  },
  methods: {
    navigateTo(page) {
      // 导航到相应的设置页面
      uni.navigateTo({
        url: `/pages/settings/${page}/${page}`
      });
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
}

/* 时间显示 */
.time {
  font-size: 16px;
  color: #555;
  margin-bottom: 10px;
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