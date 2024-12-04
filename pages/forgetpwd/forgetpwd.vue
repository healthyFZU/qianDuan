<template>
  <div class="forgot-password-container">
    <!-- Logo 和提示信息 -->
    <image class="logo" src="../../pages/images/forgetpwd.jpg" mode="aspectFit" />

    <!-- 手机号输入框 -->
    <div class="input-group">
      <span class="icon">📱</span>
      <input type="text" v-model="phone" placeholder="请输入您的手机号" />
    </div>

    <!-- 验证码输入框 -->
    <div class="input-group">
      <span class="icon">🔑</span>
      <input type="text" v-model="verificationCode" placeholder="请输入验证码" />
      <text class="get-code" @click="getVerificationCode">
        {{ isCodeButtonDisabled ? `${countdown}秒后重试` : "获取验证码" }}
      </text>
    </div>

    <!-- 新密码输入框 -->
    <div class="input-group">
      <span class="icon">🔒</span>
      <input type="password" v-model="newPassword" placeholder="请重新设置您的密码" />
    </div>

    <!-- 确认密码输入框 -->
    <div class="input-group">
      <span class="icon">📧</span>
      <input type="password" v-model="confirmPassword" placeholder="再次确认您的密码" />
    </div>

    <!-- 重置按钮 -->
    <button class="reset-button" @click="onResetPassword">重置密码</button>
	<!-- 错误消息显示 -->
	<div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 定义输入框绑定的数据和错误消息
const phone = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

// 定义API URL
const apiURL = 'http://127.0.0.1:5000/user/reset_password'; // 确保这是正确的API URL

// 重置密码处理函数
async function onResetPassword() {
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = '两次输入的密码不一致';
    return;
  }

  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNum: phone.value,
        password: newPassword.value
      })
    });

    // 检查响应状态
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // 检查响应内容类型
    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }

    // 解析返回的 JSON 响应
    const data = await response.json();
    console.log(data);

    // 检查JSON数据中的success字段
    if (data.success && data.success === "True") {
      alert('密码重置成功，请使用新密码登录');
      // 可以在这里添加跳转到登录页面的逻辑
	  uni.navigateTo({
	    url: '/pages/login/login' // 注册成功后自动跳转到登录页面
	  });
    } else {
      errorMessage.value = data.message || '密码重置失败';
    }
  } catch (error) {
    console.error('密码重置请求失败:', error);
    errorMessage.value ='密码重置请求失败，请稍后再试';
  }
}
</script>

<style scoped>
/* 样式同前 */
.forgot-password-container {
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
.logo {
  width: 100%;
  margin-bottom: 50px;
  position: relative;
  bottom: 80px;
  transform: scale(1.1);
}

.input-group {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 25px;
  padding: 10px 15px;
  margin-bottom: 32px;
  width: 80%;
  box-sizing: border-box;
  position: relative;
  bottom: 90px;
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

.get-code {
  font-size: 14px;
  color: #4c9bf0;
  margin-left: 10px;
  cursor: pointer;
}

.reset-button {
  width: 80%;
  height: 45px;
  background-color: #50cc8e;
  color: black;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
  position: relative;
  bottom: 107px;
}

.reset-button:hover {
  background-color: #45b97c;
}
</style>
