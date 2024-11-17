<template>
  <view class="top-card">
	<div class="main-image">
	  <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
	</div>
    <text class="top-card-text">低热量 — 水果类</text>
  </view>
  <scroll-view style="flex: 1; padding: 10px;">
    <div class="food-list">
      <div class="food-item" v-for="item in foodItems" :key="item.name">
        <img :src="item.image" alt="" class="food-image"/>
        <div class="food-info">
          <p class="food-name">{{ item.name }}</p>
          <p class="food-calories">
            <span class="calories-number">{{ item.calories }}</span> 
            <span class="calories-unit">千卡/100克</span>
          </p>
        </div>
      </div>
    </div>
  </scroll-view>
</template>

<script>
export default {
data() {
return {
foodItems: [
{ name: '芦荟（鲜）', calories: 4, image: '/static/fruit/luhui.png' },
{ name: '白粉桃', calories: 26, image:  '/static/fruit/peach.png' },
{ name: '甜瓜', calories: 26, image: '/static/fruit/gua.png' },
{ name: '青木瓜', calories: 29, image: '/static/fruit/qinggua.png' },
{ name: '西瓜（黄肉小瓜）', calories: 29, image: '/static/fruit/yellow.png' },
{ name: '木瓜', calories: 30, image: '/static/fruit/mugua.png' },
{ name: '杨梅', calories: 30, image: '/static/fruit/yangmei.png' },
{ name: '杨桃', calories: 31, image: '/static/fruit/yangtao.png' },
{ name: '西瓜', calories: 31, image: '/static/fruit/xigua.png' },
{ name: '草莓', calories: 32, image: '/static/fruit/caomei.png' }
]
}
}
}
</script>

<style>
	.main-image .background-image {
	  position: absolute;
	  z-index: 0;
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  width: 100%;
	  height: 100vh;
	  opacity: 0.1;
	}
	.top-card {
	  width: 375px;
	  height: 74px;
	  background-color: #fff; /* 卡片背景颜色，可根据需要调整 */
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  margin-bottom: 10px; /* 卡片下方间距 */
	  border-bottom: 1px solid #eee;
	}
	
	.top-card-text {
	  font-size: 20px;
	  font-weight: bold;
	  margin-right: 180px; /* 增加左边距，数值可以根据实际需求调整 */
	}
	
.food-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.food-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
}

.food-image {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

.food-info {
  display: flex;
  flex-direction: column;
}

.food-name {
  font-size: 14px;
  font-weight: bold;
}

.food-calories {
  font-size: 13px;
}

.calories-number {
  color: #ff4d4f; /* 保持数字的红色 */
}

.calories-unit {
  color: #b0b0b0; /* 浅灰色 */
}
</style>
