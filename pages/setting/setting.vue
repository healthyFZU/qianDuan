<template>
  <div class="settings-page">
    <div class="main-image">
      <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
    </div>
    <!-- 设置选项列表 -->
    <div class="settings-list">
      <div
        class="settings-item"
        v-for="item in settingsOptions"
        :key="item.id"
        @click="navigateTo(item.route)"
      >
        <div class="item-text">{{ item.name }}</div>
        <div class="item-icon">➡</div>
      </div>
    </div>
	<!-- 退出登录按钮 -->
	<div class="logout-section">
	  <button @click="logout" class="logout-button">退出登录</button>
	</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 设置选项数据
      settingsOptions: [
        { id: 1, name: "账户安全", route: "/pages/account-security/account-security" },
        { id: 2, name: "个人信息", route: "/pages/detailed_info/detailed_info" },
        { id: 3, name: "数据管理", route: "/pages/data-management/data-management" },
        { id: 4, name: "帮助与反馈", route: "/pages/help/help" },
        { id: 5, name: "其他", route: "/pages/other-settings/other-settings" },
      ],
    };
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack(); // 使用 uni.navigateBack() 返回上一页
    },
    // 导航到指定路由
    navigateTo(route) {
      uni.navigateTo({
        url: route, // 使用目标路由进行导航
      });
    },
	// 退出登录逻辑
	logout() {
	    // 清除用户登录状态（例如，移除本地存储中的 token 或用户信息）
	    localStorage.removeItem("userToken");
	    localStorage.removeItem("userInfo");
	
	    // 跳转回登录页面
	    uni.reLaunch({
	      url: "/pages/login/login", // 假设登录页面路径为 /pages/login/login
	    });
	
	    // 可选：显示提示信息
	    alert("您已成功退出登录");
	},
  },
};
</script>

<style scoped>
/* 整体页面样式 */
.settings-page {
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
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
/* 设置选项列表样式 */
.settings-list {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 100%;
}

.settings-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;
}

.settings-item:last-child {
  border-bottom: none;
}
button{
	display: block;
	width: 70%;
	padding: 0px;
	background: #50cc8e;
	color: #fff;
	border: none;
	border-radius: 50px;
	cursor: pointer;
	font-size: 16px;
	position: relative;
	top: 300px;
}
.settings-item:hover {
  background-color: #f1f1f1;
}

.item-text {
  font-size: 16px;
  color: #333;
}

.item-icon {
  font-size: 18px;
  color: #999;
}
</style>
