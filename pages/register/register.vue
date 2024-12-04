<template>
  <view class="container">
    <!-- Logo -->
    <image class="logo" src="../../pages/images/register.jpg" mode="aspectFit" />

    <!-- 手机号输入框 -->
    <view class="input-group">
      <text class="icon">📱</text>
      <input type="text" placeholder="请输入您的手机号" class="input" v-model="phone" />
    </view>

    <!-- 验证码输入框 -->
    <view class="input-group">
      <text class="icon">🔑</text>
      <input type="text" placeholder="请输入验证码" class="input" v-model="verificationCode" />
      <text class="get-code" @click="getVerificationCode">获取验证码</text>
    </view>

    <!-- 密码输入框 -->
    <view class="input-group">
      <text class="icon">🔒</text>
      <input type="password" placeholder="请设置您的密码" class="input" v-model="password" />
    </view>

    <!-- 确认密码输入框 -->
    <view class="input-group">
      <text class="icon">📧</text>
      <input type="password" placeholder="再次确认您的密码" class="input" v-model="confirmPassword" />
    </view>

    <!-- 注册按钮 -->
    <button class="register-button" @click="onRegister">立即注册</button>
	 <!-- 错误消息显示 -->
    <view class="error-message" v-if="errorMessage">{{ errorMessage }}</view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 定义表单数据和错误消息
const phone = ref('');
const verificationCode = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

// 模拟获取验证码的函数
function getVerificationCode() {
  if (!phone.value) {
    errorMessage.value = "请输入手机号";
    return;
  }
  // 这里模拟发送验证码请求
  errorMessage.value = "验证码已发送到您的手机号";
}

// 注册处理函数
function onRegister() {
  // 清空之前的错误消息
  errorMessage.value = '';

  if (!phone.value) {
    errorMessage.value = '请输入您的手机号';
    return;
  }
  if (!verificationCode.value) {
    errorMessage.value = '请输入验证码';
    return;
  }
  if (!password.value) {
    errorMessage.value = '请设置您的密码';
    return;
  }
  if (!confirmPassword.value) {
    errorMessage.value = '请再次确认您的密码';
    return;
  }
  if (password.value !== confirmPassword.value) {
    errorMessage.value = '两次输入的密码不一致';
    return;
  }

  // 发送注册请求
  fetch("http://129.204.151.245:5001/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      phoneNum: phone.value,
      // verificationCode: verificationCode.value,
      password: password.value
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message==='true') {
      alert("注册成功！");
      uni.navigateTo({
        url: '/pages/login/login' // 注册成功后自动跳转到登录页面
      });
    } else {
      errorMessage.value = data.message || '注册失败，请稍后再试';
    }
  })
  .catch(error => {
    console.error("注册请求失败:", error);
    errorMessage.value = '注册请求失败，请稍后再试';
  });
}
</script>

<style scoped>
/* 样式同前 */

/* 错误消息样式 */
.error-message {
  display: flex;
  color: red;
  font-size: 14px;
  margin-top: 10px;
/*  text-align: center; */
}
/* 样式同前 */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  height: 100vh;
}

.logo {
  width: 100%;
  margin-bottom: 10px;
  position: relative;
  bottom: 30px;
  transform: scale(1.2);
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
  bottom: 30px;
}

.icon {
  font-size: 18px;
  color: #f45b6c;
  margin-right: 10px;
}

.input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
}

.get-code {
  font-size: 14px;
  color: #4c9bf0;
  margin-left: 10px;
}

.register-button {
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
  bottom: 47px;
}
</style>