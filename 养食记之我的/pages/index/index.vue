<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
<!-- components/NavBar.vue -->
<template>
  <view class="navbar">
    <text class="title">我的</text>
  </view>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style>
.navbar {
  height: 50px;
  background-color: #007AFF;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  color: white;
  font-size: 18px;
  font-weight: bold;
}
</style>