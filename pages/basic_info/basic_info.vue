<template>
  <div class="basic-info-page">
    <div class="main-image">
      <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
    </div>
    <div class="header">
      <h3 class="page-title">基本信息</h3>
    </div>

    <div class="info-list">
      <!-- 性别 -->
      <div class="info-item">
        <span class="info-label">性别</span>
        <div class="info-content">
          <span>{{ form.sex }}</span>
        </div>
      </div>

      <!-- 出生日期 -->
      <div class="info-item">
        <span class="info-label">出生日期</span>
        <div class="info-content">
          <span>{{ form.birthday }}</span>
        </div>
      </div>

      <!-- 身高 -->
      <div class="info-item">
        <span class="info-label">身高</span>
        <div class="info-content">
          <span>{{ form.height }}米</span>
        </div>
      </div>

      <!-- 体重 -->
      <div class="info-item">
        <span class="info-label">最新体重</span>
        <div class="info-content">
          <span>{{ form.weight }}公斤</span>
        </div>
      </div>

      <!-- 特殊时期 -->
      <div class="info-item">
        <span class="info-label">特殊时期</span>
        <div class="info-content">
          <span>{{ form.special_time }}</span>
        </div>
      </div>

      <!-- 管理目标 -->
      <div class="info-item">
        <span class="info-label">管理目标</span>
        <div class="info-content">
          <span>{{ form.target }}</span>
        </div>
      </div>

      <!-- 目标体重 -->
      <div class="info-item">
        <span class="info-label">目标体重</span>
        <div class="info-content">
          <span>{{ form.weight_target }}公斤</span>
        </div>
      </div>

      <!-- 预估达成时间 -->
      <div class="info-item">
        <span class="info-label">预估达成时间</span>
        <div class="info-content">
          <span>{{ form.pre_over_time }}</span>
        </div>
      </div>

      <!-- 目标阶段 -->
      <div class="info-item">
        <span class="info-label">减重阶段</span>
        <div class="info-content">
          <span>{{ form.stage }}</span>
        </div>
      </div>

      <!-- 特殊情况 -->
      <div class="info-item">
        <span class="info-label">特殊情况</span>
        <div class="info-content">
          <span>{{ form.special_circumstances }}</span>
        </div>
      </div>
    </div>

    <p class="save-tip">该页面只展示基本信息</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

// 响应式数据
const form = ref({
  userId: 3,
  birthday: "",
  sex: "",
  height: null,
  weight: null,
  special_time: "",
  special_circumstances: "",
  weight_target: null,
  target: "",
  stage: "",
  pre_over_time: "",
});

// 页面加载时获取数据
onMounted(() => {
  fetchData();
});
const userId1 = computed(() => store.state.userId);
console.log(userId1.value)
// 从后端获取数据
async function fetchData() {
  try {
    const response = await fetch(`http://129.204.151.245:5001/user/${userId1.value}/body-info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
    sex: "性别",
    birthday: "出生日期",
    height: "身高",
    weight: "最新体重",
    special_time: "特殊时期",
    target: "管理目标",
    weight_target: "目标体重",
    pre_over_time: "预估达成时间",
    stage: "减重阶段",
    special_circumstances: "特殊情况",
  };
  return labels[key] || key;
}

// 格式化字段值
function formatValue(key, value) {
  if (key === "height") return `${value}米`;
  if (key === "weight" || key === "weight_target") return `${value}公斤`;
  return value || "暂无";
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
