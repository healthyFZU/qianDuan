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
  </div>
</template>

<script setup>
function onResetPassword(){
	uni.navigateTo({
	  url: "/pages/login/login"
	});
}	
	
	
/*
import { ref } from 'vue';

const phone = ref('');
const verificationCode = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const isCodeButtonDisabled = ref(false);
const countdown = ref(60);

// 获取验证码的处理函数
function getVerificationCode() {
  if (!phone.value) {
    alert("请输入手机号");
    return;
  }
  
  isCodeButtonDisabled.value = true;
  alert("验证码已发送到您的手机号");

  // 启动倒计时
  const interval = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value <= 0) {
      clearInterval(interval);
      countdown.value = 60;
      isCodeButtonDisabled.value = false;
    }
  }, 1000);
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
  const resetData = {
    phone: phone.value,
    verificationCode: verificationCode.value,
    newPassword: newPassword.value
  };

  fetch("https://your-backend-api.com/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(resetData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("密码重置成功！");
        // 使用uni.navigateTo跳转到登录页面
        uni.navigateTo({
          url: "/pages/login/login"
        });
      } else {
        alert(`重置失败: ${data.message}`);
      }
    })
    .catch(error => {
      console.error("重置密码请求失败:", error);
      alert("重置密码请求失败，请稍后再试");
    });
}

*/
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
