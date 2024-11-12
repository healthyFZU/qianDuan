<template> 
  <view class="container">
    <!-- Logo -->
    <image class="logo" src="@/pages/images/register.jpg" mode="aspectFit" />

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
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // 引入 useRouter

// 定义表单数据
const phone = ref('');
const verificationCode = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

// 获取路由实例
const router = useRouter();

// 跳转到登录页面的函数
function navigateToLogin() {
  router.push({ name: 'Login' }); // 假设登录页面的路由名为 'Login'
}

// 模拟获取验证码的函数
function getVerificationCode() {
  if (!phone.value) {
    alert("请输入手机号");
    return;
  }
  // 这里模拟发送验证码请求
  alert("验证码已发送到您的手机号");
}

// 注册处理函数
function onRegister() {
  if (!phone.value || !verificationCode.value || !password.value || !confirmPassword.value) {
    alert("请完整填写所有信息");
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert("两次输入的密码不一致");
    return;
  }

  // 模拟发送注册请求
  const registrationData = {
    phone: phone.value,
    verificationCode: verificationCode.value,
    password: password.value
  };

  // 使用 fetch 发送请求（可以替换为实际的后端 API）
  fetch("https://your-backend-api.com/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(registrationData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("注册成功！");
        navigateToLogin(); // 注册成功后自动跳转到登录页面
      } else {
        alert(`注册失败: ${data.message}`);
      }
    })
    .catch(error => {
      console.error("注册请求失败:", error);
      alert("注册请求失败，请稍后再试");
    });
}
</script>

<style scoped>
/* 样式同前 */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  height: 100%;
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
  bottom: 40px;
}
</style>
