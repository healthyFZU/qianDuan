<template>
  <div class="account-security-page">
	<div class="main-image">
	  <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
	</div>
    <!-- 修改登录密码 -->
    <div class="section">
      <h2>修改登录密码</h2>
      <input
        v-model="password.oldPassword"
        type="password"
        placeholder="请输入当前密码"
        class="input"
      />
      <input
        v-model="password.newPassword"
        type="password"
        placeholder="请输入新密码"
        class="input"
      />
      <input
        v-model="password.confirmPassword"
        type="password"
        placeholder="确认新密码"
        class="input"
      />
      <button class="action-button" @click="changePassword">确认修改</button>
    </div>

    <!-- 修改绑定手机号 -->
    <div class="section">
      <h2>修改绑定手机号</h2>
      <input
        v-model="phone.currentPhone"
        type="text"
        placeholder="当前绑定手机号"
        class="input"
        disabled
      />
      <input
        v-model="phone.newPhone"
        type="text"
        placeholder="请输入新手机号"
        class="input"
      />
      <!-- 验证码输入框与按钮 -->
      <div class="verification-container">
        <input
          v-model="phone.verificationCode"
          type="text"
          placeholder="输入验证码"
          class="verification-input"
        />
        <button class="verification-button" @click="sendVerificationCode">
          获取验证码
        </button>
      </div>
      <button class="action-button" @click="changePhone">确认修改</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      phone: {
        currentPhone: "138****1234", // 模拟当前绑定的手机号
        newPhone: "",
        verificationCode: "",
      },
    };
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack();
    },
    // 修改登录密码
    changePassword() {
      if (!this.password.oldPassword || !this.password.newPassword || !this.password.confirmPassword) {
        alert("请填写所有密码字段！");
        return;
      }
      if (this.password.newPassword !== this.password.confirmPassword) {
        alert("新密码与确认密码不一致！");
        return;
      }

      // 模拟密码修改逻辑
      console.log("当前密码：", this.password.oldPassword);
      console.log("新密码：", this.password.newPassword);
      alert("密码修改成功！");
      
      // 清空密码输入框
      this.password.oldPassword = "";
      this.password.newPassword = "";
      this.password.confirmPassword = "";
    },
    // 获取验证码
    sendVerificationCode() {
      if (!this.phone.newPhone) {
        alert("请输入新手机号！");
        return;
      }

      // 模拟发送验证码逻辑
      console.log("发送验证码到：", this.phone.newPhone);
      alert("验证码已发送，请注意查收！");
    },
    // 修改绑定手机号
    changePhone() {
      if (!this.phone.newPhone || !this.phone.verificationCode) {
        alert("请填写新手机号和验证码！");
        return;
      }

      // 模拟绑定手机号修改逻辑
      console.log("新手机号：", this.phone.newPhone);
      console.log("验证码：", this.phone.verificationCode);
      alert("手机号绑定修改成功！");

      // 更新当前手机号并清空输入框
      this.phone.currentPhone = this.phone.newPhone;
      this.phone.newPhone = "";
      this.phone.verificationCode = "";
    },
  },
};
</script>

<style scoped>
/* 页面样式 */
.account-security-page {
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  min-height: 100vh;
  box-sizing: border-box;
}


/* 分区样式 */
.section {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
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
h2 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

/* 输入框样式 */
.input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  height: 40px;
}

/* 验证码容器 */
.verification-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  
}

.verification-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px 0 0 5px;
  font-size: 14px;
  box-sizing: border-box;
  height: 40px;
}

.verification-button {
  padding: 1px 5px;
  font-size: 14px;
  color: #3590f1;
  background-color: #ffffff;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  margin-left: 10px;
}

.verification-button:hover {
  background-color: #45b97c;
}

/* 按钮样式 */
.action-button {
  width: 60%;
  padding: 0px;
  font-size: 16px;
  color: white;
  background-color: #50cc8e;
  border: none;
  border-radius: 50px;
  cursor: pointer;
}

.action-button:hover {
  background-color: #45b97c;
}
</style>
