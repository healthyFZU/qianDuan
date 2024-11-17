<template>
  <view class="container">
	<div class="main-image">
	  <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
	</div>
    <!-- 顶部搜索栏 -->
    <view class="search-bar">
      <input type="text" placeholder="搜索食物营养和热量" />
    </view>

    <!-- 功能图标 -->
    <view class="icon-group">
      <view class="icon-item" v-for="icon in icons" :key="icon.text" @click="navigateToDetail(icon)">
        <image class="icon-image" :src="icon.src"></image>
        <text class="icon-text">{{ icon.text }}</text>
      </view>
    </view>
	
     <!-- 营养日记 -->
    <view class="nutrition-diary">
        <view class="diary-item">
        <view class="diary-content">
            <text class="diary-title">营养日记</text>
            <text class="diary-fruit">草莓</text>
            <text class="diary-description">百变冬日小甜心，低卡低糖，营养不减。</text>
        </view>
        <image class="diary-image" src="/static/草莓.png"></image>
        </view>
    </view>

    <!-- 食物排行榜 -->
    <view class="food-ranking">
      <view class="ranking-header">
        <text class="ranking-title">食物排行榜</text>
        <text class="ranking-subtitle">益智脑宜吃</text>
      </view>
      <view class="ranking-items">
        <view class="ranking-item" v-for="item in rankingItems" :key="item.name" @click="navigateToDetail(item)">
          <image class="food-image" :src="item.image"></image>
          <view class="ranking-info">
            <text class="food-name">{{ item.name }}</text>
            <text class="food-calories">{{ item.calories }}</text>
          </view>
          <button class="view-button" @click.stop="navigateToDetail(item)">查看</button>
        </view>
      </view>
    </view>

    <!-- 食谱推荐 -->
    <view class="recipe-recommendation">
      <view class="recommendation-header">
        <text class="recommendation-title">食谱推荐</text>
        <text class="recommendation-subtitle">更适合你的食谱</text>
      </view>
      <view class="recommendation-items">
        <view class="recommendation-item" v-for="recipe in recipes" :key="recipe.name" @click="navigateToDetail(recipe)">
          <image class="recipe-image" :src="recipe.image"></image>
          <view class="recipe-info">
            <text class="recipe-name">{{ recipe.name }}</text>
            <text class="recipe-description">{{ recipe.description }}</text>
          </view>
          <button class="view-button" @click.stop="navigateToDetail(recipe)">查看</button>
        </view>
      </view>
    </view>


  </view>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        { src: '/static/食谱查询.png', link: '/pages/shiwuchaxun/shiwuchaxun' },
        { src: '/static/排行榜.png', link: '/pages/paihang/paihang' },
        { src: '/static/红黑榜.png', link: '/pages/redblack/redblack' },
        { src: '/static/随心配.png', link: '/pages/suixin/suixin' },
      
      ],
      rankingItems: [
        { name: '亚麻籽', image: '/static/亚麻籽.png', link: '/pages/yamazi/yamazi' },
        { name: '核桃（鲜）', image: '/static/核桃.png', link: '/pages/hetao/hetao' },
        { name: '夏威夷果', image: '/static/夏威夷果.png', link: '/pages/xiaweiyiguo/xiaweiyiguo' }
      ],
      recipes: [
        { name: '慢熬八宝粥', image: '/static/八宝粥.png', link: '/pages/babaozhou/babaozhou' },
        { name: '番茄牛腩', image: '/static/番茄牛腩.png', link: '/pages/fanqieniunan/fanqieniunan' },
        { name: '延吉牛肉冷面', image: '/static/牛肉冷面.png', link: '/pages/niuroulenmian/niuroulenmian' }
      ],

    };
  },
  methods: {
    navigateToDetail(item) {
      console.log('Navigating to:', item.link); // 调试信息
      if (item.link) {
        uni.navigateTo({
          url: item.link
        });
      } else {
        console.error('No link found for item:', item);
      }
    }
  }
};
</script>

<style>
.container {
  position: relative;
  background-size: cover; /* 确保背景图片覆盖整个容器 */
  height: 100vh;
  width: 100%; /* 确保宽度覆盖整个屏幕 */
}

.search-bar {
  margin-top: 16px;
  margin: 20px auto; 
  margin-bottom: 16px; /* 下边距 */
  border: 1px solid #ddd; /* 边框 */
  border-radius: 8px; /* 圆角边框 */
  padding: 8px; /* 内边距 */
  width: 80%; /* 控制宽度 */
  display: flex;
  justify-content: center; /* 水平居中 */
}

.search-bar input[type="text"] {
  width: 100%; /* 使输入框占满父容器的宽度 */
  border: none; /* 除默认的输入框边框 */
  outline: none; /* 除聚焦时的轮廓线 */
  background-color: #fff; /* 背景颜色 */
  border-radius: 8px; /* 圆角 */
  padding: 8px; /* 内边距 */
  font-size: 16px; /* 字体大小 */
}

.icon-group {
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

}

.icon-image {
  width: 50px;
  height: 65px;
  margin-bottom: 8px;
}

.icon-text {
  font-size: 14px;
  color: #555;
}

.nutrition-diary {
  margin-bottom: 15px;
  margin: 20px auto;
  border: 1px solid #ddd; /* 添加边框 */
  border-radius: 20px; /* 添加圆角 */
  padding: 16px; /* 添加内边距 */
  width: 85%; /* 控制宽度 */
  display: flex;
  justify-content: center;
  flex-direction: column; /* 垂直排列子元素 */
}

.diary-item {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 16px; /* 添加间隔 */
  margin-bottom: 8px;
  border-bottom: 1px solid #ddd;
}

.diary-item:last-child {
  border-bottom: none;
}

.diary-content {
  display: flex;
  flex-direction: column; /* 垂直排列文本 */
}

.diary-title {
  font-size: 16px;
  margin-bottom: 8px;
}

.diary-fruit {
  font-size: 16px;
  margin-bottom: 4px;
}

.diary-description {
  font-size: 14px;
    color: #666;
    margin-bottom: 8px; /* 为描述文本添加底部边距 */
  }
  
  .diary-image {
    width: 60px;
    height: 60px;
  }
  
  .food-ranking, .recipe-recommendation {
    margin-bottom: 15px;
	 margin: 20px auto; 
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 16px;
    width: 85%;
    display: flex;
    flex-direction: column;
  }
  
  .ranking-header, .recommendation-header {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
  }
  
  .ranking-title, .recommendation-title {
    font-size: 16px;
    margin-bottom: 8px;
  }
  
  .ranking-subtitle, .recommendation-subtitle {
    font-size: 14px;
    color: #555;
  }
  
  .ranking-items, .recommendation-items {
    display: flex;
    flex-direction: column;
  }
  
  .ranking-item, .recommendation-item {
    display: flex;
    align-items: center;
    padding: 14px;
    width: 100%;
    gap: 16px; /* 添加间隔 */
    margin-bottom: 8px;

  }
  
  .ranking-item:last-child, .recommendation-item:last-child {
    border-bottom: none;
  }
  
  .food-image, .recipe-image {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  
  .ranking-info, .recipe-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }
  
  .food-name, .recipe-name {
    font-size: 16px;
    margin-bottom: 4px;
  }
  
  .food-calories, .recipe-description {
    font-size: 14px;
    color: #555;
  }
  
  .view-button {
    background-color: #fadf49; /* 黄色 */
    border: none;
    border-radius: 50px;
    padding: 5px 17px;
    font-size: 12px;
    color: #fff;
    display: block;
    margin-left: auto;
    margin-right: 0;
    margin-top: 5px;
    cursor: pointer;
	position: relative;
	right: 15px;
  }
  
  .recipe-recommendation .view-button {
    background-color: #50cc8e; /* 蓝色 */
  }
  
  .tab-bar {
    display: flex; /* 使用flex布局 */
    justify-content: space-around; /* 图标之间的间隔均匀分布 */
    position: fixed; /* 固定定位 */
    bottom: 0; /* 位于页面底部 */
    width: 100%; /* 宽度覆盖整个页面宽度 */
    background-color: #fff; /* 背景颜色 */
    border-top: 1px solid #ddd; /* 上边框 */
    padding: 10px 0; /* 垂直内边距 */
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* 阴影效果，增强层次感 */
    z-index: 1000; /* 确保导航栏在最上层 */
  }
  
  .tab-bar-item {
    display: flex; /* 使用flex布局 */
    flex-direction: column; /* 图标和文字垂直排列 */
    align-items: center; /* 垂直居中对齐 */
  }
  
  .tab-bar-icon {
    width: 25px; /* 图标宽度 */
    height: 25px; /* 图标高度 */
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
  </style>
 