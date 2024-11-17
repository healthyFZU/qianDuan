<<!-- components/NavBar.vue -->
<template>
  <view class="navbar">
    <text class="title">养生记</text>
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
