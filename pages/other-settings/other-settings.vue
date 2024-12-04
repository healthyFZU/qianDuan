<template>
  <div class="no-settings-page">
    <div class="content">
      <!-- 图片 -->
      <img src="/pages/images/捂嘴.png" alt="暂无设置" class="image" />
      <!-- 提示语 -->
      <p class="message">暂无其他设置</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoSettingsPage",
};
</script>

<style scoped>
.no-settings-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 让内容居中 */
  background-color: #ffffff; /* 背景色 */
  font-family: Arial, sans-serif;
}

.content {
  text-align: center;
  position: relative;
  bottom: 150px;
}

.image {
  width: 300px; /* 图片宽度 */
  height: auto; /* 保持图片比例 */
}

.message {
  font-size: 18px;
  color: #666;
}
</style>

