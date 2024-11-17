<template>
  <div class="custom-food-page">
	<div class="main-image">
	  <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
	</div>


    <!-- 上传图片 -->
    <div class="image-upload" @click="uploadImage">
      <div class="upload-icon">
        <img v-if="foodData.image" :src="foodData.image" alt="食物图片" />
        <img v-else src="@/pages/images/camera.png" alt="上传图标" />
      </div>
    </div>

    <!-- 表单输入 -->
    <div class="form">
      <div class="form-item" v-for="field in formFields" :key="field.name">
        <input
          v-model="foodData[field.name]"
          :placeholder="field.placeholder"
          :type="field.type || 'text'"
        />
      </div>
    </div>

    <!-- 保存按钮 -->
    <button class="save-button" @click="saveFood">保 存</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      foodData: {
        name: "",
        unit: "",
        quantity: "",
        calories: "",
        protein: "",
        fat: "",
        carbohydrates: "",
        image: "",
      },
      formFields: [
        { name: "name", placeholder: "名称 如：水果沙拉" },
        { name: "unit",  placeholder: "单位 如：克、个、碗" },
        { name: "quantity", placeholder: "数量 如：1" },
        { name: "calories", placeholder: "热量 千卡" },
        { name: "protein", placeholder: "蛋白质 克" },
        { name: "fat", placeholder: "脂肪 克" },
        { name: "carbohydrates", placeholder: "碳水化合物 克" },
      ],
    };
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    uploadImage() {
      const imageUrl = prompt("请输入图片URL地址");
      if (imageUrl) {
        this.foodData.image = imageUrl;
      }
    },
 
	saveFood() {
	    if (!this.foodData.name) {
	      alert("名称不能为空！");
	      return;
	    }
	    const newFood = { ...this.foodData, id: Date.now() };
	    const foodList = JSON.parse(localStorage.getItem("foodList")) || [];
	    foodList.push(newFood);
	    localStorage.setItem("foodList", JSON.stringify(foodList));
	    alert("保存成功！");
	    // 保存后通知主页面刷新数据并返回
	    this.goBack();
	  },
    resetForm() {
      this.foodData = {
        name: "",
        unit: "",
        quantity: "",
        calories: "",
        protein: "",
        fat: "",
        carbohydrates: "",
        image: "",
      };
    },
  },
};
</script>

<style scoped>
/* 上传图片样式 */
.image-upload {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 40px;
}

.upload-icon img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ffc107;
  display: block;
  object-fit: cover;
}

/* 表单样式 */
.form-item {
  display: flex; /* 使用 flexbox 布局 */
  justify-content: center; /* 子元素水平居中 */
  align-items: center; /* 子元素垂直居中 */
  margin-bottom: 15px;
}

.form-item input {
  width: 70%; /* 设置宽度为父元素宽度的 80% */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 15px;
}

/* 保存按钮 */
.save-button {
  width: 60%;
  padding: 0px;
  background-color: #ffc107;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  cursor: pointer;
  
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
</style>
