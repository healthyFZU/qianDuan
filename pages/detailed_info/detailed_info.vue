<template>
  <div class="profile-card">
    <h4 class="title">请完善个人资料卡</h4>
    <!-- 账号信息 -->
    <h4 class="t1">基本信息</h4>
	
	    <div class="avatar-section">
	        <label>切换头像</label>
	        <img class="avatar" :src="form.avatar || '/pages/images/logo-black.jpg'" alt="Avatar" />
	        <button class="upload-button" @click="uploadAvatar">+</button>
	      </div>
    <div class="form-section">
      <label>昵称</label>
      <input class="input" type="text" v-model="form.nickname" placeholder="请输入" />
     
    
      <button class="save-button" @click="saveProfile('basic')">保存账号信息</button>
    </div>

    <!-- 身体信息 -->
    <h4 class="t2">健康信息</h4>
    <div class="form-section">
		<label>血糖</label>
	  <input class="input" type="text" v-model="form.blood_sugar" placeholder="请输入(例:3.9~6.1)" />
	  <label>血压</label>
	  <input class="input" type="text" v-model="form.blood_pressure" placeholder="请输入(例:140/90)" />
      <label>过敏源</label>
      <input class="input" type="text" v-model="form.allergy" placeholder="请输入" />
	  <label>近期用药记录</label>
	  <input class="input" type="text" v-model="form.recent_medications" placeholder="请输入" />
      <label>既往病史</label>
      <input class="input" type="text" v-model="form.medicalHistory" placeholder="请输入" />
      <label>其他</label>
      <input class="input" type="text" v-model="form.other" placeholder="请输入" />
      <button class="save-button" @click="saveProfile('health')">保存健康信息</button>
    </div>

    <!-- 目标信息 -->
    <h4 class="t3">目标及身体信息</h4>
    <div class="form-section">
		<label>性别</label>
		<select v-model="form.gender" class="input2">
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
		<input class="input" type="number" v-model="form.height" placeholder="请输入" />
		<label>体重</label>
		<input class="input" type="number" v-model="form.weight" placeholder="请输入" />
		<label>特殊时期</label>
		<select class="input2" v-model="form.specialPeriod">
		  <option value="是">是</option>
		  <option value="否">否</option>
		</select>
		
		<label>管理目标</label>
		<input class="input" type="text" v-model="form.target" placeholder="请输入" />
      <label>目标体重</label>
      <input class="input" type="number" v-model="form.targetWeight" placeholder="请输入" />
	  <label>阶段进度</label>
	  <input class="input" type="text" v-model="form.progress" placeholder="请输入" />
      <label>预计达成时间</label>
      <div class="date-input">
        <input type="number" v-model="form.targetYear" placeholder="年" />
        <input type="number" v-model="form.targetMonth" placeholder="月" />
        <input type="number" v-model="form.targetDay" placeholder="日" />
      </div>
      <label>特殊情况</label>
      <select class="input2" v-model="form.specialCondition">
        <option value="有">有</option>
        <option value="无">无</option>
      </select>
      <button class="save-button" @click="saveProfile('target')">保存目标及身体信息</button>
    </div>
  </div>
</template>



<script setup>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();


const form = reactive({
  avatar: "",
  nickname: "",
  gender: "男",
  
  birthYear:'',
  birthMonth: '',
  birthDay: '',
  height: 0, // 修改为数值
  weight: 0, // 修改为数值
  
  
  blood_sugar:"",
  blood_pressure:"",
  recent_medications:"",
  allergy: "",
  medicalHistory: "",
  other: "",
  
  
  
  specialPeriod: "否",
  target: "",
  targetWeight: 0, // 修改为数值
  targetYear: '',
  targetMonth: '',
  targetDay: '',
  progress: "",
  specialCondition: "无",
});

const defaultAvatar = "https://via.placeholder.com/100";



const userId = computed(() => store.state.userId);
const access_token = computed(() => store.state.access_token);

console.log(access_token.value,userId.value)




const getUserInfoById = async () => {
  try {
    const response = await fetch(`http://129.204.151.245:5001/user/message/${userId.value}`, {
      method: "GET",
    });

    // 解析JSON数据
    const result = await response.json();
    // 如果返回的数据格式正确，并且包含avatar_url
    if (result.avatar_url) {
      form.avatar = result.avatar_url;  // 设置头像URL
    } else {
      form.avatar = "/pages/images/logo-black.jpg";  // 默认头像
    }
    form.nickname = result.nickname;  // 设置昵称
    // 可以继续设置其他字段
  } catch (error) {
    console.error("请求用户资料失败:", error);
    form.avatar = "/pages/images/logo-black.jpg";  // 默认头像
  }
};
getUserInfoById();

// 上传头像
const uploadAvatar = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ["original", "compressed"],
    sourceType: ["album", "camera"],
    success: async (res) => {
      const filePath = res.tempFilePaths[0];
      try {
        const response = await uni.uploadFile({
          url: `http://129.204.151.245:5001/upload/${userId.value}`,
          filePath,
          name: "file",
          header: {
            Authorization: `Bearer ${access_token.value}`,
          },
        });
        const result = JSON.parse(response.data);
        if (result.message === "File uploaded successfully") {
          form.avatar = result.url;
          alert("头像上传成功！");
        } else {
          alert(`头像上传失败：${result.error || result.message}`);
        }
      } catch (error) {
        console.error("上传头像失败：", error);
        alert("头像上传失败，请检查网络连接！");
      }
    },
    fail: (err) => {
      console.error("选择图片失败：", err);
      alert("图片选择失败！");
    },
  });
};


//const access_token='.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczMTk4NTk2NSwianRpIjoiYjliNjc3NzEtMDhlMS00Y2E1LWFiNWMtYzk2YzU4N2M1MzhkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEzMDE1NzIxNjU4IiwibmJmIjoxNzMxOTg1OTY1LCJjc3JmIjoiNjI3ZTE5MzEtYWFmMy00MDY4LWI5ZWQtNGY3ZTYzNTA3YzE1IiwiZXhwIjoxNzMxOTg2ODY1fQ.6OOHIvmB083GuILxeNcjsMTII7W5f65ywggo3nnDEo4'
// 分模块保存
const saveProfile = async (type) => {
  const endpointMap = {
    basic: `http://129.204.151.245:5001/user/update`,
    health: `http://129.204.151.245:5001/user/${userId.value}/health-info`,
    target: `http://129.204.151.245:5001/user/${userId.value}/body-info`,
  };

  let payload = {};
  if (type === 'basic') {
    payload = {

     nickname: form.nickname,
     avatar_url: form.avatar
    };
  } else if (type === 'health') {
    payload = {
	  "blood_sugar":form.blood_sugar,
	  "blood_pressure":form.blood_pressure,
	  "recent_medications":form.recent_medications,
      "allergens": form.allergy,
      "past_medical_history": form.medicalHistory,
      "other": form.other
    };
  } else if (type === 'target') {
	  
    payload = {
	  birthday: `${form.birthYear}-${form.birthMonth}-${form.birthDay}`,
	  sex: form.gender,
	  height: form.height,
	  weight: form.weight,
      special_time: form.specialPeriod,
      weight_target: form.targetWeight,
      pre_over_time: `${form.targetYear}-${form.targetMonth}-${form.targetDay}`,
      target: form.target,
      stage: form.progress,
      special_circumstances: form.specialCondition
    };
  }

  try {
	  console.log(userId,access_token)
    const response = await fetch(endpointMap[type], {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${access_token.value}`
      },
      body: JSON.stringify(payload),
    });
		console.log(payload)
    const result = await response.json();
    if (response.ok) {
      alert(`${type === 'basic' ? '基本信息' : type === 'health' ? '健康信息' : '目标信息'}保存成功！`);
    } else {
      alert(`保存失败：${result.message}`);
    }
  } catch (error) {
    console.error(`保存${type}时发生错误：`, error);
    alert(`保存${type}失败，请检查网络连接！`);
  }
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
