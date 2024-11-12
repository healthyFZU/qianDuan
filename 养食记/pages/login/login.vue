<template>
  <div class="login-container">
    <!-- Logo 和标题 -->
    <image class="logo" src="@/pages/images/login.jpg" mode="aspectFit" />

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

    <!-- 登录按钮 -->
    <button class="login-button" @click="onLogin">登录</button>

    <!-- 底部链接：注册和忘记密码 -->
    <div class="footer-links">
      <a href="#" class="register-link">注册账号</a>
      <a href="#" class="forgot-password-link">忘记密码</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const phone = ref('');
const password = ref('');

function onLogin() {
  if (!phone.value || !password.value) {
    alert('请输入手机号和密码');
  } else {
    alert('登录成功');
    // 这里可以添加实际的登录逻辑
  }
}
</script>

<style scoped>
/* 容器样式 */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  height: 100%;
  justify-content: center;
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
