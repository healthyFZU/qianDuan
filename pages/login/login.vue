<template>
  <div class="login-container">
    <!-- Logo 和标题 -->
    <image class="logo" src="../../pages/images/login.jpg" mode="aspectFit" />

    <!-- 输入框：手机号 -->
    <div class="input-group">
      <span class="icon">📱</span>
      <input type="text" v-model="phone" placeholder="请输入您的手机号" />
    </div>

    <!-- 输入框：密码 -->
    <div class="input-group">
      <span class="icon">🔒</span>
      <input type="password" v-model="password" placeholder="请输入您的密码" />
    </div>

    <!-- 错误消息显示 -->
    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>

    <!-- 登录按钮 -->
    <button class="login-button" @click="onLogin">登录</button>

    <!-- 底部链接：注册和忘记密码 -->
    <div class="footer-links">
      <text @click="goToRegister" class="register-link">注册账号</text>
      <text @click="goToForgotPassword" class="forgot-password-link">忘记密码</text>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

// 使用 useStore 钩子获取 store 实例
const store = useStore();

const userId = ref('');
const access_token = ref('');
const phone = ref('');
const password = ref('');
const errorMessage = ref('');

const form = ref({
  avatar: '',
  nickname: ''
});

// 跳转到注册页面的函数
function goToRegister() {
  uni.navigateTo({
    url: '/pages/register/register'
  });
}

// 跳转到忘记密码页面的函数
function goToForgotPassword() {
  uni.navigateTo({
    url: '/pages/forgetpwd/forgetpwd'
  });
}

// 获取用户信息并设置头像和昵称
const getUserInfoById = async () => {
  try {
    const response = await fetch(`http://129.204.151.245:5001/user/message/${userId.value}`, {
      method: "GET",
    });

    // 解析JSON数据
    const result = await response.json();
	console.log(result);
    // 如果返回的数据格式正确，并且包含avatar_url
    if (result.avatar_url) {
      form.value.avatar = result.avatar_url;  // 设置头像URL
    } else {
      form.value.avatar = "/pages/images/logo-black.jpg";  // 默认头像
    }
    form.value.nickname = result.nickname;  // 设置昵称
	store.commit('setAvatar_url',form.value.avatar);
	store.commit('setNickname',form.value.nickname);
	
  } catch (error) {
    console.error("请求用户资料失败:", error);
    form.value.avatar = "/pages/images/logo-black.jpg";  // 默认头像
  }
}

// 登录处理函数
async function onLogin() {
  try {
    // 使用 fetch 发送 POST 请求到后端 API
    const response = await fetch('http://129.204.151.245:5001/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNum: phone.value,
        password: password.value
      })
    });

    // 解析返回的 JSON 响应
    const data = await response.json();
    console.log(data);
    if (response.ok && data.access_token) {
      alert('登录成功');
      
      // 保存 userId 和 access_token 到全局状态
      store.commit('setUserId', data.userId); // 使用 store 提交 mutation
      store.commit('setAccessToken', data.access_token); // 使用 store 提交 mutation

      // 更新 userId
      userId.value = data.userId;

      // 获取用户信息并更新头像
      await getUserInfoById();

      // 在登录成功后可以跳转到主页或其他页面
      uni.switchTab({
        url: '/pages/home/home'
      });
    } else {
      errorMessage.value = data.message || '登录失败，请检查您的手机号和密码';
    }
  } catch (error) {
    console.error('登录请求失败:', error);
    errorMessage.value = '登录请求失败，请稍后再试';
  }
}
</script>


<!-- 样式部分保持不变 -->
<style scoped>
/* 容器样式 */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  height: 100vh;
  justify-content: center;
}
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}
/* Logo 和标题样式 */
.logo {
  width: 100%;
  margin-bottom: 50px;
  position: relative;
  bottom: 110px;
  transform: scale(1.4);
}

.logo-image {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #8b4513;
}

/* 输入框组样式 */
.input-group {
  display: flex;
  align-items: center;
  width: 80%;
  padding: 10px 15px;
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  margin-bottom: 32px;
  box-sizing: border-box;
  position: relative;
  bottom: 85px;

}

.icon {
  font-size: 18px;
  color: #f45b6c;
  margin-right: 10px;
}

input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  background-color: transparent;
}

/* 登录按钮样式 */
.login-button {
  width: 80%;
  height: 45px;
  background-color: #50cc8e;
  color: black;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  margin-top: 10px;
  position: relative;
  bottom: 90px;
}

.login-button:hover {
  background-color: #45b97c;
}

/* 底部链接样式 */
.footer-links {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 20px;
  position: relative;
  bottom: 90px;
}

.register-link,
.forgot-password-link {
  color: #3590f1;
  font-size: 14px;
  text-decoration: none;
}

.register-link:hover,
.forgot-password-link:hover {
  text-decoration: underline;
}
</style>