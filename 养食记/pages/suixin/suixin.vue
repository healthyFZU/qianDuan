<template>
  <view class="content">
	<div class="main-image">
	  <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
	</div>
	<text class="greeting">Hi,吃货！</text>
    <image class="food-image" src='../../static/foodphoto/chuan.jpg'></image>
    <button class="change-button">换一换</button>
    <view class="food-cards">
      <view v-for="(food, index) in foods" :key="index" class="food-card">
        <image :src="food.image" class="food-card-image"></image>
        <view class="food-card-info">
          <!-- 使用span标签包裹标题和按钮 -->
          <span class="food-info-container">
            <text class="food-title">{{ food.title }}</text>
            <button class="food-card-button" type="default">
              <!-- 可以在这里添加按钮文本，如果需要 -->
            </button>
          </span>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      foods: [
        { title: '煎蛋意面', image: '/static/foodphoto/yimian.png' },
        { title: '番茄牛腩', image: '/static/foodphoto/niunan.png' },
        { title: '糖醋小排', image: '/static/foodphoto/paigu.png' },
        { title: '三文鱼沙拉', image: '/static/foodphoto/shala.png' },
        { title: '鱼籽寿司', image: '/static/foodphoto/shousi.png' },
        { title: '茄汁面', image: '/static/foodphoto/mian.png' },
		
      ]
    }
  }
}
</script>


<style scoped>
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
.content{
	display: flex;
	flex-direction: column;
	align-items: start;
}
.greeting {
	font-weight: bold;
	font-size: 22px;
	margin-top: 15px;
	margin-bottom: -5px;
	margin-left: 20px;
}

.food-image {
	width: 335px;
	height: 153px;
	border-radius: 15px;
	margin-top: 20px;
	display: block;
	margin-left: auto;
	margin-right: auto;
}

.change-button {
	font-size: 16px;
	background-color: #FFF;
	color: black;
	padding: 0px 10px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	display: block;
	margin-left: auto;
	margin-right: 0;
	margin-top: 5px;
	text-align: center;
}

.food-cards {
	width: 100vw;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap; 
	justify-content:space-around; 
	margin-top: 10px;
}

.food-card {
	width: 45vw;
	height: 164px;
	background-color: #FFF;
	border-radius: 20px;
	margin-bottom: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	align-items: center;
}

.food-card-image {
	width: 157px;
	height: 122px;
	border-radius: 20px;
}

.food-card-info {
  display: flex;
  align-items: center; /* 确保图片和文字垂直居中对齐 */
  justify-content: flex-start; /* 确保标题和按钮在同一行，标题在左边 */
  padding: 10px; /* 添加内边距，为内容提供空间 */
}

.food-info-container {
  display: flex;
  align-items: center; /* 确保标题和按钮垂直居中对齐 */
}

.food-title {
  font-size: 16px;
  margin-right: 30px; /* 为按钮留出空间 */
}

.food-card-button {
  background-image: url('../../static/button/add.png'); /* 设置背景图片 */
  background-size: 25px 25px; /* 设置图片的具体大小 */
  background-position: center; /* 背景图片居中 */
  background-repeat: no-repeat; /* 不重复背景图片 */
  border: none; /* 无边框 */
  width: 25px; /* 按钮宽度 */
  height: 25px; /* 按钮高度 */
  border-radius: 50%; /* 设置为圆形 */
  cursor: pointer;
}

</style>
