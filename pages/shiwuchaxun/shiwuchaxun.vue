<template>
  <view class="container">
    <!-- 背景图片 -->
    <view class="main-image">
      <image src="@/pages/images/background.jpg" class="background-image" />
    </view>

    <!-- 食谱列表 -->
    <view class="recipes">
      <view v-if="loading" class="loading">加载中...</view>
      <view v-else-if="error" class="error">数据加载失败，请稍后重试。</view>
      <view v-else-if="recipes.length === 0" class="no-results">没有找到相关食谱。</view>
      <view v-else class="recipe-list">
        <view v-for="recipe in recipesWithDetails" :key="recipe.dishId" class="recipe-item" @click="navigateToDetail(recipe)">
          <image class="recipe-image" :src="recipe.dish_image" />
          <view class="recipe-info">
            <text class="recipe-name">{{ recipe.dish_name }}</text>
            <text class="recipe-type">{{ recipe.types }}</text>
            <text class="recipe-price">¥{{ recipe.price }}</text>
            <text class="recipe-ingredients">{{ recipe.ingredients.join(', ') }}</text>
          </view>
          <button class="add-to-favorite" @click.stop="addToFavorite(recipe)">收藏</button>
        </view>
      </view>
    </view>
  </view>
</template>


<script>
export default {
  data() {
    return {
      recipes: [], // 食谱数据
      ingredientsData: [], // 存储后端返回的食材数据
      loading: true, // 加载状态
      error: false, // 错误状态
      favorites: [] // 我的收藏数据
    };
  },
  computed: {
    // 处理后的食谱数据
    recipesWithDetails() {
      return this.recipes.map(recipe => ({
        ...recipe,
        healthIndex: recipe.nutrition || [], // 默认空数组
        types: recipe.types || '未知类型' // 默认值
      }));
    }
  },
  methods: {
    // 获取后端食材数据
    fetchIngredients() {
      uni.request({
        url: 'http://129.204.151.245:5001/ingredients',
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200 && res.data) {
            this.ingredientsData = res.data;
            console.log('获取食材数据成功:', this.ingredientsData);
          } else {
            this.handleError('获取食材数据失败');
          }
        },
        fail: (error) => {
          console.error('请求食材数据失败:', error);
          this.handleError('请求食材数据失败');
        },
        complete: () => {
          this.loading = false;
        }
      });
    },
    // 获取食谱数据
    getRecipes() {
      uni.request({
        url: 'http://129.204.151.245:5001/dishes',
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200 && res.data) {
            this.recipes = res.data;
            console.log('获取食谱数据成功:', this.recipes);
          } else {
            this.handleError('获取食谱数据失败');
          }
        },
        fail: (error) => {
          console.error('请求食谱数据失败:', error);
          this.handleError('请求食谱数据失败');
        },
        complete: () => {
          this.loading = false;
        }
      });
    },
    // 添加到我的收藏
    addToFavorite(recipe) {
      const existingRecipe = this.favorites.find(item => item.dishId === recipe.dishId);
      if (existingRecipe) {
        uni.showToast({
          title: '已收藏',
          icon: 'none',
          duration: 2000
        });
      } else {
        this.favorites.push(recipe);
        uni.showToast({
          title: '已添加到我的收藏',
          icon: 'success',
          duration: 2000
        });
      }
    },
    // 跳转到详情页面
    navigateToDetail(recipe) {
      const url = `/pages/dishDetail/dishDetail?dishId=${recipe.dishId}&merchantId=${recipe.merchant_id}`;
      console.log('Navigating to:', url);
      uni.navigateTo({
        url,
        fail: (err) => {
          console.error('Navigation failed:', err);
        }
      });
    },
    // 错误处理
    handleError(message) {
      this.error = true;
      uni.showToast({
        title: message,
        icon: 'none',
        duration: 2000
      });
    }
  },
  mounted() {
    this.fetchIngredients();
    this.getRecipes();
  }
};
</script>
<style lang="scss">
// 使用SCSS语法进行样式编写，可根据项目实际情况调整是否使用SCSS或其他预处理器

// 整体容器样式
.container {
  position: relative;
  background-size: cover; // 确保背景图片覆盖整个容器
  height: 100vh; // 高度覆盖整个视口
  width: 100%; // 宽度覆盖整个屏幕
}

// 背景图片样式
.main-image {
  .background-image {
    position: absolute; // 绝对定位
    z-index: 0; // 设置层级在最底层
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh; // 高度覆盖整个视口
    opacity: 0.1; // 设置背景图片透明度
    pointer-events: none; // 允许事件穿透，不影响其他元素
  }
}

// 食谱列表样式
.recipes {
  display: flex; // 使用flex布局
  flex-direction: column; // 垂直排列子元素
  align-items: center; // 水平居中对齐
  padding: 20px; // 内边距

  .loading,
  .error,
  .no-results {
    font-size: 16px; // 字体大小
    color: #333; // 文字颜色
    margin-top: 20px; // 上边距
  }

  .recipe-list {
    display: flex; // 使用flex布局
    flex-direction: column; // 垂直排列子元素
    align-items: center; // 水平居中对齐
    width: 100%; // 宽度占满父容器
  }

  .recipe-item {
    display: flex; // 使用flex布局
    align-items: center; // 垂直居中对齐
    width: 100%; // 宽度占满父容器的90%
    margin-bottom: 20px; // 下边距
    border: 1px solid #ccc; // 边框
    border-radius: 10px; // 圆角边框
    overflow: hidden; // 隐藏溢出内容
    background-color: #fff; // 背景颜色为白色
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); // 添加阴影
    position: relative; // 相对定位
	cursor: pointer; // 鼠标悬停时显示为指针

    .recipe-image {
      width: 100px; // 图片宽度
      height: 100px; // 图片高度
      margin: 10px; // 外边距
      border-radius: 5px; // 图片圆角
    }

    .recipe-info {
      display: flex; // 使用flex布局
      flex-direction: column; // 垂直排列子元素
      justify-content: space-between; // 子元素之间均匀分布
      padding: 10px; // 内边距
      flex: 1; // 占据剩余空间

      .recipe-name {
        font-size: 18px; // 字体大小
        font-weight: bold; // 加粗
        margin-bottom: 5px; // 下边距
      }

      .recipe-price {
        color: red; // 文字颜色为红色
        font-size: 15px; // 字体大小
        margin-bottom: 5px; // 下边距
      }

      .recipe-ingredients {
        font-size: 14px; // 字体大小
        color: #666; // 文字颜色
        margin-bottom: 10px; // 下边距
      }

      .recipe-health {
        display: flex; // 使用flex布局
        align-items: center; // 垂直居中对齐

        .health-label {
          font-weight: bold; // 加粗
          font-size: 16px; // 字体大小
          margin-right: 10px; // 右外边距
        }

        .health-indicators {
          display: flex; // 使用flex布局

          .indicator {
            width: 30px; // 宽度
            height: 30px; // 高度
            border-radius: 50%; // 圆形
            margin-right: 5px; // 右外边距
            display: flex; // 使用flex布局
            align-items: center; // 垂直居中对齐
            justify-content: center; // 水平居中对齐
            font-size: 14px; // 字体大小
            background-color: #add8e4; // 背景颜色
            color: #fff; // 文字颜色
          }
        }
      }
    }

    .add-to-favorite {
      background-color: #50cc8e; // 绿色背景
      border: none; // 无边框
      border-radius: 50px; // 圆角边框
      padding: 0px 10px; // 内边距
      font-size: 12px; // 字体大小o
      color: #fff; // 文字颜色
      display: block; // 块级元素
      margin-left: auto; // 自动左边距
      margin-right: 10px; // 右边距为0
      margin-top: 30px; // 上边距
      cursor: pointer; // 鼠标悬停时显示为指针

    }
  }
}
</style>