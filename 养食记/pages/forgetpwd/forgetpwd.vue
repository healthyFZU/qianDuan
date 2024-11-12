<template>
  <div class="forgot-password-container">
    <!-- Logo 和提示信息 -->
    <image class="logo" src="@/pages/images/forgetpwd.jpg" mode="aspectFit" />

    <!-- 手机号输入框 -->
    <div class="input-group">
      <span class="icon">📱</span>
      <input type="text" v-model="phone" placeholder="请输入您的手机号" />
    </div>

    <!-- 验证码输入框 -->
    <div class="input-group">
      <span class="icon">🔑</span>
      <input type="text" v-model="verificationCode" placeholder="请输入验证码" />
      <button class="get-code" @click="getVerificationCode">获取验证码</button>
    </div>

    <!-- 新密码输入框 -->
    <div class="input-group">
      <span class="icon">🔒</span>
      <input type="password" v-model="newPassword" placeholder="请重新设置您的密码" />
    </div>

    <!-- 确认密码输入框 -->
    <div class="input-group">
      <span class="icon">🔒</span>
      <input type="password" v-model="confirmPassword" placeholder="再次确认您的密码" />
    </div>

    <!-- 登录按钮 -->
    <button class="reset-button" @click="onResetPassword">登录</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const phone = ref('');
const verificationCode = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

// 获取验证码的处理函数
function getVerificationCode() {
  if (!phone.value) {
    alert("请输入手机号");
    return;
  }
  // 模拟发送验证码请求
  alert("验证码已发送到您的手机号");
}

// 重置密码处理函数
function onResetPassword() {
  if (!phone.value || !verificationCode.value || !newPassword.value || !confirmPassword.value) {
    alert("请完整填写所有信息");
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    alert("两次输入的密码不一致");
    return;
  }

  // 模拟重置密码请求
  alert("密码重置成功！");
  // 这里可以添加实际的重置密码逻辑
}
</script>

<style scoped>
/* 容器样式 */
.forgot-password-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  height: 100%;
  justify-content: center;
}

/* Logo 和提示信息样式 */

.logo {
  width: 100%;
  margin-bottom: 50px;
  position: relative;
  bottom: 110px;
  transform: scale(1.4);
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
  margin-bottom: 15px;
  box-sizing: border-box;
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

/* 获取验证码按钮样式 */
.get-code {
  font-size: 14px;
  color: #4c9bf0;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
}

/* 重置按钮样式 */
.reset-button {
  width: 80%;
  height: 45px;
  background-color: #50cc8e;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  margin-top: 10px;
}

.reset-button:hover {
  background-color: #45b97c;
}
</style>
