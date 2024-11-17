<template>
  <view class="container" @tap="onImageClick">
    <image class="background-image" src="@/pages/images/launch.jpg" mode="aspectFill" />
  </view>
</template>

<script setup>
import { onMounted } from 'vue';

function onImageClick() {
  // 跳转到主页面
  wx.navigateTo({
    url: '/pages/login/login' 
  });
}

onMounted(() => {
  // 初始化加载逻辑（可选）
});
</script>

<style>
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 确保图片全屏覆盖 */
}
</style>
