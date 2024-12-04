<template>
  <div class="basic-info-page">
    <div class="main-image">
      <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
    </div>
    <div class="header">
      <h3 class="page-title">体检信息</h3>
    </div>

    <div class="info-list">
      <div class="info-item"> 
        <span class="info-label">血糖</span>
        <div class="info-content">
          <span>{{ form.blood_sugar }}mmol/L</span>
        </div>
      </div>



      <div class="info-item">
        <span class="info-label">血压</span>
        <div class="info-content">
          <span>{{ form.blood_pressure }}mmHg</span>
        </div>
      </div>


      <div class="info-item">
        <span class="info-label">过敏原</span>
        <div class="info-content">
          <span>{{ form.allergens }}</span>
        </div>
      </div>



      <!-- 预估达成时间 -->
      <div class="info-item">
        <span class="info-label">近期特殊用药</span>
        <div class="info-content">
          <span>{{ form.recent_medications }}</span>
        </div>
      </div>


      <!-- 疾病情况 -->
      <div class="info-item">
        <span class="info-label">既往病史</span>
        <div class="info-content">
          <span>{{ form.past_medical_history }}</span>
        </div>
      </div>
    </div>
	
	<!-- 其他 -->
	<div class="info-item">
	    <span class="info-label">其他</span>
	    <div class="info-content">
	      <span>{{ form.other }}</span>
	    </div>
	</div>
	
	<!-- 更新时间 -->
	<div class="info-item">
	    <span class="info-label">更新时间</span>
	    <div class="info-content">
	      <span>{{ form.updated_at }}</span>
	    </div>
	</div>
	

    <p class="save-tip">该页面只展示个人信息中的体检相关信息</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
// 响应式数据
const form = ref({
  userId: null,
  blood_sugar: "",
  blood_pressure: "",
  allergens: "",
  recent_medications: "",
  past_medical_history: "",
  other: "",
  created_at: "",
  updated_at: "",
});

// 页面加载时获取数据
onMounted(() => {
  fetchData();
});

// 从后端获取数据
async function fetchData() {
  try {
    const userId = store.state.userId;  // 直接使用store
    //  const token = this.store.state.access_token; // 假设你的Vuex store中有一个access_token的状态
    const response = await fetch(`http://129.204.151.245:5001/user/${userId}/health-infos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 如果需要Authorization，确保后端接受这种格式
        // "Authorization": `Bearer ${token}`
      },
    });

    if (response.ok) {
      const data = await response.json();
      form.value = data; // 将数据绑定到 form
    } else {
      console.error("获取数据失败，请稍后重试！");
    }
  } catch (error) {
    console.error("获取数据时发生错误：", error);
  }
}

// 获取字段对应的中文标签
function getFieldLabel(key) {
  const labels = {
    blood_sugar: "血糖水平",
    blood_pressure: "血压",
    allergens: "过敏原",
    recent_medications: "近期特殊用药",
    past_medical_history: "既往病史",
    other: "其他",
    created_at: "创建时间",
    updated_at: "更新时间",
  };
  return labels[key] || key;
}
</script>


<style scoped>
.basic-info-page {
  max-width: 500px;
  margin: auto;
  font-family: Arial, sans-serif;
  background-color: #fff;
  padding: 20px;
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
  pointer-events: none;
}
.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.info-list {
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 19px;
}

.info-label {
  font-size: 14px;
  color: #333;
}

.info-content {
  display: flex;
  align-items: center;
}

.info-content span {
  font-size: 14px;
  margin-right: 10px;
}

.save-tip {
  font-size: 12px;
  color: #777;
  text-align: center;
  margin-top: 20px;
}
</style>
