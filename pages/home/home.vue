<template>
  <view class="container">
    <!-- 背景图片 -->
    <div class="main-image">
      <img src="/pages/images/background.jpg" alt="logo" class="background-image" />
    </div>

   

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
    <view class="food-ranking" v-if="rankingItems.length > 0">
      <view class="ranking-header">
        <text class="ranking-title">食物排行</text>
		<text
		      class="refresh-icon"  
		      alt="换一换" 
		      @click="refreshRankingItems">🔄 </text>
        <text class="ranking-subtitle">更健康的食材</text>
      </view>
      <view class="ranking-items">
        <view class="ranking-item" v-for="item in rankingItems" :key="item.name" @click="navigateToDetail(item)">
          <image class="food-image" :src="item.image"></image>
          <view class="ranking-info">
            <text class="food-name">{{ item.name }}</text>
            <text class="food-type">{{ item.type }}</text>
          </view>
          <button class="view-button" @click.stop="navigateToDetail(item)">查看</button>
        </view>
      </view>
    </view>

    <!-- 食谱推荐 -->
    <view class="recipe-recommendation" v-if="recipes.length > 0">
      <view class="recommendation-header">
        <text class="recommendation-title">食谱推荐</text>
		<text 
		      class="refresh-icon"  
		      alt="换一换" 
		      @click="refreshRecipes">🔄 </text>
        <text class="recommendation-subtitle">更适合你的食谱</text>
      </view>
      <view class="recommendation-items">
        <view class="recommendation-item" v-for="recipe in recipes" :key="recipe.dishId" @click="navigateToDetail(recipe)">
          <image class="recipe-image" :src="recipe.image"></image>
          <view class="recipe-info">
            <text class="recipe-name">{{ recipe.name }}</text>
            <text class="recipe-score">{{ recipe.score }}</text>
          </view>
          <button class="view-button" @click.stop="navigateToDetail(recipe)">查看</button>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      icons: [
        { src: '../../static/食谱查询.png', link: '/pages/shiwuchaxun/shiwuchaxun' },
        { src: '../../static/排行榜.png', link: '/pages/paihang/paihang' },
        { src: '../../static/红黑榜.png', link: '/pages/redblack/redblack' },
        { src: '../../static/随心配.png', link: '/pages/suixin/suixin' },
      ],
      rankingItems: [], // 食物排行榜数据
      recipes: [],       // 食谱推荐数据
      loading: true,     // 加载状态
      error: false       // 错误状态
    };
  },
  mounted() {
    this.getRankingItems();
    this.getRecipes();
  },
  methods: {
    // 获取随机三个食材
    getRankingItems() {
      axios.get('http://129.204.151.245:5001/ingredients/random3')
        .then(response => {
          if (response.status === 200 && response.data) {
            if (Array.isArray(response.data)) { // 检查是否为数组
              this.rankingItems = response.data.map(item => ({
                name: item.ingredient_name, // 食材名称
                image: item.url || '/pages/images/logo.jpg', // 图片路径（后端返回 url 字段，提供默认值）
                type:item.type|| '暂无类型信息',
                link: `/pages/foodDetail/foodDetail?foodId=${item.ingredient_id}`, // 动态生成详情页链接
                foodId: item.ingredient_id // 食材 ID
              }));
              console.log('食物排行榜数据获取成功:', this.rankingItems);
            } else {
              console.error('后端返回的数据不是数组:', response.data);
              this.error = true;
            }
          } else {
            console.error('获取食物排行榜数据失败:', response);
            this.error = true;
          }
        })
        .catch(error => {
          console.error('请求食物排行榜数据失败:', error);
          this.error = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    // 获取随机三个食谱
    getRecipes() {
      axios.get('http://129.204.151.245:5001/dishes/random3') // 调用后端的随机菜品接口
        .then(response => {
          if (response.status === 200 && response.data) {
            if (Array.isArray(response.data)) { // 检查是否为数组
              this.recipes = response.data.map(recipe => ({
                name: recipe.dish_name, // 菜品名称
                image: recipe.dish_image || '/pages/images/logo.jpg', // 菜品图片，默认图片处理
                score: recipe.score || '暂无评分', 
                link: `/pages/dishDetail/dishDetail?dishId=${recipe.dishId}&merchantId=${recipe.merchant_id}`,

                dishId: recipe.dishId ,// 菜品 ID
				merchantId : recipe.merchant_id
              }));
              console.log('食谱推荐数据获取成功:', this.recipes);
            } else {
              console.error('后端返回的数据不是数组:', response.data);
              this.error = true;
            }
          } else {
            console.error('获取食谱推荐数据失败:', response);
            this.error = true;
          }
        })
        .catch(error => {
          console.error('请求食谱推荐数据失败:', error);
          this.error = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
 // 刷新食物排行榜
  refreshRankingItems() {
    console.log('刷新食物排行榜数据...');
    this.getRankingItems();
  },

  // 刷新食谱推荐
  refreshRecipes() {
    console.log('刷新食谱推荐数据...');
    this.getRecipes();
  },
    // 导航到详情页面
    navigateToDetail(item) {
        if (item.link) {
          console.log('Navigating to:', item.link); // 打印导航目标链接
          uni.navigateTo({
            url: item.link,
            fail: (err) => {
              console.error('Navigation failed:', err); // 捕获导航失败
            }
          });
        } else {
          console.error('No link found for item:', item); // 如果 link 为空
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

.main-image .background-image {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  opacity: 0.1; /* 设置背景图片透明度 */
  pointer-events: none; /* 允许事件穿透 */
}
.refresh-icon {
  display: inline-block; /* 使图标在行内 */
  font-size: 18px;
  cursor: pointer; /* 鼠标悬停时显示指针 */
  margin-left: 10px; /* 与标题的间距 */
  margin-right: 200px;

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
  background-color: #fff; /* 背景颜色 */
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
  background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */
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
  border-radius: 15px;
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
  background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */
}

.ranking-header, .recommendation-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  display: inline-block; /* 父级容器允许子元素显示为行内块 */

    text-align: left; /* 左对齐 */
}

.ranking-title, .recommendation-title {
  font-size: 16px;
  margin-bottom: 8px;
  display: inline-block; /* 使标题在行内 */
}

.ranking-subtitle, .recommendation-subtitle {
  font-size: 14px;
  color: #555;
}

.ranking-items, .recommendation-items {
  display: flex;
  flex-direction: column;
  width: 90%;
  
}

.ranking-item, .recommendation-item {
  display: flex;
  align-items: center;
  padding: 14px;
  width: 100%;
  gap: 16px; /* 添加间隔 */
  margin-bottom: 8px;
  background-color: #fff; /* 背景颜色 */
  border-radius: 10px; /* 圆角边框 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

.ranking-item:last-child, .recommendation-item:last-child {
  border-bottom: none;
}

.food-image, .recipe-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 15px;
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
}

.recipe-recommendation .view-button {
  background-color: #50cc8e; /* 蓝色 */
}
.recipe-recommendation{
  padding-bottom: 60px; /* 根据导航栏的高度调整 */
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