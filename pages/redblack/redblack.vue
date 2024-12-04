<template>
  <view class="page">
	<div class="main-image">
	  <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
	</div>
    <!-- 营养诉求 -->
    <text class="card-title">营养诉求</text>
    <view class="card">
      <view class="button-wrapper" v-for="(button, index) in buttons1" :key="index" @click="navigateToDetail(button)">
        <button class="circle-button" :style="{ backgroundImage: 'url(' + button.icon + ')' }"></button>
        <text class="button-title">{{ button.title }}</text>
      </view>
    </view>
    
    <!-- 疾病分类 -->
    <text class="card-title">疾病分类</text>
    <view class="card">
      <view class="button-wrapper" v-for="(button, index) in buttons2" :key="index" @click="navigateToDetail(button)">
        <button class="circle-button" :style="{ backgroundImage: 'url(' + button.icon + ')' }"></button>
        <text class="button-title">{{ button.title }}</text>
      </view>
    </view>
    
    
    <!-- 其他诉求 -->
    
  </view>
</template>

<script>
export default {
  data() {
    return {
      buttons1: [
        { id: '1', icon: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/button/1.png', title: '减肥' },
        { id: '2', icon: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/button/2.png', title: '健身' }
      ],
      buttons2: [
        { id: '3', icon: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/button/3.png', title: '糖尿病'},
	    { id: '4', icon: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/button/4.png', title: '高血压'},
	    { id: '5', icon: 'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/image/button/5.png', title: '血脂异常'},
	   
      ],
	  
	  
    };
  },
  methods: {
    navigateToDetail(button) {
     // 跳转到不同的详情界面，根据项目ID
     switch(button.id) {
       case '1':
         uni.navigateTo({ url: '/pages/redblack/1/1' });
         break;
       case '2':
         uni.navigateTo({ url: '/pages/redblack/1/2' });
         break;
	   case '3':
		   uni.navigateTo({ url: '/pages/redblack/1/3' });
		   break;
	   case '4':
		  uni.navigateTo({ url: '/pages/redblack/1/4' });
		  break; 
		case '5':
		  uni.navigateTo({ url: '/pages/redblack/1/5' });
		  break;
       // ... 其他 case
       default:
         break;
     }
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
.card-title {
  font-size: 15px; /* 设置标题字体大小 */
  color: #333; /* 设置标题颜色 */
  margin-left: 20px; /* 增加左边距 */
  position: relative;
  top: 18px;
}

.card {
  display: flex;
  flex-direction: row;
  width: 337px; /* 设置卡片宽度 */
  background-color: #ffffff; /* 设置卡片背景色 */
  border-radius: 16px; /* 设置卡片圆角 */
  margin: 20px auto; /* 设置卡片外边距，水平居中 */
  padding: 10px; /* 设置卡片内边距 */
  flex-wrap: wrap; /* 允许卡片内的项目换行 */
  gap: 15px; /* 控制两行按钮之间的距离 */
  margin-bottom: -10px;
}

.button-wrapper {
  display: flex; /* 使用flex布局 */
  flex-direction: column; /* 设置为垂直布局 */
  align-items: center; /* 垂直居中 */
  margin-bottom: 0px; /* 增加与其他元素的间距 */
  margin-left: 19px;
}

.circle-button {
  width: 45px; /* 设置按钮宽度 */
  height: 45px; /* 设置按钮高度 */
  background-size: cover; /* 覆盖整个按钮 */
  border-radius: 50%; /* 设置圆形 */
  border: none; /* 移除默认边框 */
  background-color: transparent; /* 移除默认背景色 */
  margin-bottom: 5px; /* 在按钮和标题之间增加间距 */
}

.button-title {
  font-size: 12px; /* 设置标题字体大小 */
  color: #333333; /* 设置标题颜色 */
  text-align: center; /* 文本居中 */
  margin-top: 5px;
}
</style>