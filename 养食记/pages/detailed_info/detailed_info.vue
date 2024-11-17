<template>
  <div class="profile-card">
	<div class="main-image">
	  <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
	</div>
    <h4 class="title">请完善个人资料卡</h4>
    <div class="avatar-section">
      <img class="avatar" :src="form.avatar || defaultAvatar" alt="Avatar" />
      <button class="upload-button" @click="uploadAvatar">+</button>
    </div>
    <!-- 基本信息 -->
    <h4 class="t1">基本信息</h4>
    <div class="form-section">
      <label>昵称</label>
      <input class="input" type="text" v-model="form.nickname" placeholder="请输入" />

      <label>性别</label>
      <select v-model="form.gender" class="input2" >
        <option value="男">男</option>
        <option value="女">女</option>
      </select>

      <label>生日</label>
      <div class="date-input">
        <input type="number" v-model="form.birthYear" placeholder="年" />
        <input type="number" v-model="form.birthMonth" placeholder="月" />
        <input type="number" v-model="form.birthDay" placeholder="日" />
      </div>

      <label>身高</label>
      <input  class="input" type="number" v-model="form.height" placeholder="请输入" />

      <label>体重</label>
      <input  class="input" type="number" v-model="form.weight" placeholder="请输入" />
    </div>

    <!-- 身体信息 -->
    <h4 class="t2">身体信息</h4>
    <div class="form-section">
      <label>过敏源</label>
      <input class="input" type="text" v-model="form.allergy" placeholder="请输入" />

      <label>病史</label>
      <input class="input"type="text" v-model="form.medicalHistory" placeholder="请输入" />

      <label>其他</label>
      <input class="input" type="text" v-model="form.other" placeholder="请输入" />
    </div>

    <!-- 目标信息 -->
    <h4 class="t3">目标信息</h4>
    <div class="form-section">
      <label>特殊时期</label>
      <select class="input2" v-model="form.specialPeriod">
        <option value="是">是</option>
        <option value="否">否</option>
      </select>

      <label>管理目标</label>
      <input class="input" type="text" v-model="form.target" placeholder="请输入" />

      <label>目标体重</label>
      <input class="input" type="number" v-model="form.targetWeight" placeholder="请输入" />

      <label>预计达成时间</label>
      <div class="date-input">
        <input type="number" v-model="form.targetYear" placeholder="年" />
        <input type="number" v-model="form.targetMonth" placeholder="月" />
        <input type="number" v-model="form.targetDay" placeholder="日" />
      </div>

      <label>阶段进度</label>
      <input class="input" type="text" v-model="form.progress" placeholder="请输入" />

      <label>特殊情况</label>
      <select class="input2" v-model="form.specialCondition">
        <option value="有">有</option>
        <option value="无">无</option>
      </select>
    </div>

    <button class="save-button" @click="saveProfile">保存</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultAvatar: "https://via.placeholder.com/100", // 默认头像
      form: {
        avatar: "", // 头像地址
        nickname: "",
        gender: "男",
        birthYear: 2000,
        birthMonth: 1,
        birthDay: 1,
        height: "",
        weight: "",
        allergy: "",
        medicalHistory: "",
        other: "",
        specialPeriod: "否",
        target: "",
        targetWeight: "",
        targetYear: 2000,
        targetMonth: 1,
        targetDay: 1,
        progress: "",
        specialCondition: "无",
      },
    };
  },
  methods: {
    // 模拟上传头像
    uploadAvatar() {
      const newAvatar = prompt("请输入头像图片的 URL");
      if (newAvatar) {
        this.form.avatar = newAvatar;
      }
    },
    // 保存个人资料
    async saveProfile() {
      try {
        const response = await fetch("https://example.com/api/saveProfile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.form),
        });
        if (response.ok) {
          alert("保存成功！");
        } else {
          alert("保存失败，请重试！");
        }
      } catch (error) {
        console.error("保存时发生错误：", error);
        alert("保存失败，请检查网络！");
      }
    },
  },
};
</script>

<style scoped>
.profile-card {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
}
.t1{
	color: #3590f1;
}
.t2{
	color: #0bda83;
}
.t3{
	color: #fcce36;
}
.input{
	width: 95%;
	border-radius: 25px
}
.input2{
	border-radius: 25px
}
.avatar-section {
  text-align: center;
  position: relative;
  margin-top: 20px;
  margin-bottom: 10px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  margin-top: 10px;
}

.upload-button {
   position: absolute;
    bottom: 5px;
    right: 40%;
    transform: translateX(50%);
	transform: scale(0.8);
    background: #ff6f61;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 30px; /* 按钮宽度 */
    height: 30px; /* 按钮高度 */
    font-size: 20px; /* 字体大小 */
    display: flex; /* 使用 Flexbox 居中内容 */
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 按钮阴影 */
}
.title{
	margin-top: 5px;
}
h4 {
  margin-top: 20px;
  color: #333;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.form-section {
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
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input, select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.date-input {
  display: flex;
  gap: 5px;

}

.date-input input {
  flex: 1;
    border-radius: 25px;
}

.save-button {
  display: block;
  width: 70%;
  padding: 0px;
  background: #50cc8e;
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
}

.save-button:hover {
  background: #45b97c;
}
</style>
