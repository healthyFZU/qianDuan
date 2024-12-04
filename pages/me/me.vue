<template>
  <view class="container">
    <div class="top-bar">
      <!-- 右侧图标 -->
      <div @click="navigateTo('setting')">
        <img src="@/pages/images/setting.png" class="icon" />
      </div>
    </div>
    
    <div class="main-image">
      <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
    </div>

    <!-- 用户信息 -->
    <view class="user-info" @click="navigateTo('detailed_info')">
      <!-- 使用 Vuex 存储的头像 -->
      <image class="avatar" :src="avatar || '@/pages/images/logo-black.jpg'" />
      <!-- 使用 Vuex 存储的昵称 -->
      <view class="nickname">{{ nickname || '未设置昵称' }}</view>
      <img src="@/pages/images/enter.png" class="enter-image" />
    </view>

    <!-- 选项 -->
    <view class="options">
      <view class="option-item" v-on:click="navigateTo('basic_info')">
        <img src="@/pages/images/basic_info.png" class="option-image" />
        <text>基本信息</text>
      </view>
      <view class="option-item" @click.stop="navigateTo('myfood')">
        <img src="@/pages/images/myfood.png" class="option-image" /> 
        <text>我的食物</text>
      </view>
      <view class="option-item" @click.stop="navigateTo('likes')">
        <img src="@/pages/images/likes.png" class="option-image" />
        <text>我的收藏</text>
      </view>
    </view>

    <view class="sections">
      <!-- 健康计划 -->
      <view class="section" @click="navigateTo('healthy_plan')">
        <img src="@/pages/images/healthy_plan.png" class="section-image" />
        <text class="section-title">健康计划</text>
      </view>
      <div class="divider"></div>

      <!-- 上周小结 -->
      <view class="section" @click="navigateTo('lastweek')">
        <img src="@/pages/images/lastweek.png" class="section-image" />
        <text class="section-title">上周小结</text>  
      </view>
      <div class="divider"></div>

      <!-- 本周食谱 -->
      <view class="section" @click="navigateTo('thisweek')">
        <img src="@/pages/images/thisweek.png" class="section-image" />
        <text class="section-title">本周食谱</text>
      </view>
      <div class="divider"></div>

      <!-- 体检档案 -->
      <view class="section" @click="navigateTo('document')">
        <img src="@/pages/images/document.png" class="section-image" />
        <text class="section-title">体检档案</text>
      </view>
      <div class="divider"></div>

      <!-- 帮助与反馈 -->
      <view class="section" @click="navigateTo('help')">
        <img src="@/pages/images/help.png" class="section-image" />
        <text class="section-title">帮助与反馈</text>
      </view>
    </view>
  </view>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'MyPage',
  setup() {
    const store = useStore();
    const avatar = computed(() => store.state.avatar_url); // 从 Vuex 获取头像
    const nickname = computed(() => store.state.nickname); // 从 Vuex 获取昵称

    const navigateTo = (page) => {
      console.log('Navigating to:', page);
      switch (page) {
        case 'detailed_info':
          uni.navigateTo({ url: '/pages/detailed_info/detailed_info' });
          break;
        case 'setting':
          uni.navigateTo({ url: '/pages/setting/setting' });
          break;
        case 'basic_info':
          uni.navigateTo({ url: '/pages/basic_info/basic_info' });
          break;
        case 'myfood':
          uni.navigateTo({ url: '/pages/myfood/myfood' });
          break;
        case 'likes':
          uni.navigateTo({ url: '/pages/likes/likes' });
          break;
        case 'healthy_plan':
          uni.navigateTo({ url: '/pages/healthy_plan/healthy_plan' });
          break;
        case 'lastweek':
          uni.navigateTo({ url: '/pages/lastweek/lastweek' });
          break;
        case 'thisweek':
          uni.navigateTo({ url: '/pages/thisweek/thisweek' });
          break;
        case 'document':
          uni.navigateTo({ url: '/pages/document/document' });
          break;
        case 'help':
          uni.navigateTo({ url: '/pages/help/help' });
          break;
        default:
          console.warn('Unknown page:', page);
      }
    };

    return {
      avatar,
      nickname,
      navigateTo
    };
  }
};
</script>

<style>
.container {
  padding: 20px;
}
.icon{
	transform: scale(0.3);
	position: relative;
	left: 240px;
	cursor: pointer;
}
/* 顶部导航栏样式 */
.top-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px; /* 根据需要设置高度 */
  padding: 0 10px;
  background-color: #ffffff; /* 背景颜色 */
  position: relative;
}
/* 中间标题样式 */
.title {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #000;
  position: absolute;
  left: 50%; /* 定义水平居中的位置 */
  transform: translateX(-50%); /* 偏移自身宽度的一半以实现居中 */
}


.divider {
  height: 1px; /* 分隔线的厚度 */
  background-color: #ccc; /* 分隔线颜色 */
  margin: 10px auto; /* 设置分隔线的上下间距 */
  width: 90%;
}
.enter-image{
	position: relative;
	left: 35px;
	transform: scale(0.9);
}
.option-image {
  width: 35px; /* 设置图片的宽度 */
  height: 35px; /* 设置图片的高度 */
  margin-bottom: 10px; /* 图片和文字之间的间距 */
}
.section-image{
	width: 40px; /* 设置图片的宽度 */
	height: 40px; /* 设置图片的高度 */
}
.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  margin-top: 10px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  border: 1.8px solid #ddd;
  border-radius: 8px;
  height: 100px;
  cursor: pointer;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 40px;
  margin-right: 20px;
  position: relative;
  left: 10px;
}

.nickname {
  font-size: 17px;
  font-weight: bold;
  position: relative;
  bottom: 10px;
  left: 10px;
}

.options {
  display: flex;
  margin-bottom: 20px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  border: 1.8px solid #ddd;
  border-radius: 8px;
  height: 80px;
  align-items: center; /* 垂直居中对齐 */
  padding: 10px; 
  justify-content: space-around;
  gap: 55px; 
}

.option-item {
  padding: 2px 0px;
  border-radius: 5px;
  height: 60px;
  font-size: 15px;
  display: flex; /* 子项使用 Flexbox 布局 */
  flex-direction: column; /* 子项垂直排列：图片在上，文字在下 */
  align-items: center; /* 子项内容水平居中 */
  width: 100px; /* 控制每个选项的宽度 */
  text-align: center; /* 文字居中对齐 */
  cursor: pointer;
}
.sections{
	margin-top: 50px;
	box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
	background-color: #ffffff;
	border: 1.8px solid #ddd;
	border-radius: 8px;
	height: 300px;
}
.section {
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex; /* 使用 Flex 布局 */
  align-items: center;
  position: relative;
  left: 20px;
  cursor: pointer;
}
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
  pointer-events: none; /* 允许事件穿透 */
}
.section-title {
  font-size: 15px;
  margin-bottom: 0px;
}

</style>