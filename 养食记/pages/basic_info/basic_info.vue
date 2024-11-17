<template>
  <div class="basic-info-page">
	<div class="main-image">
	  <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
	</div>
    <div class="header">
      <h3 class="page-title">基本信息</h3>
    </div>

    <div class="info-list">
      <div class="info-item">
        <span class="info-label">性别</span>
        <div class="info-content">
          <span>{{ form.gender }}</span>
        </div>
      </div>

      <div class="info-item">
        <span class="info-label">出生日期</span>
        <div class="info-content">
          <span>{{ form.birthDate }}</span>
        </div>
      </div>

      <div class="info-item">
        <span class="info-label">身高</span>
        <div class="info-content">
          <span>{{ form.height }}厘米</span>
        </div>
      </div>

      <div class="info-item">
        <span class="info-label">最新体重</span>
        <div class="info-content">
          <span>{{ form.weight }}公斤</span>
        </div>
      </div>

      <div class="info-item">
        <span class="info-label">特殊时期</span>
        <div class="info-content">
          <span>{{ form.specialPeriod }}</span>
        </div>
      </div>

      <div class="info-item">
        <span class="info-label">管理目标</span>
        <div class="info-content">
          <span>{{ form.target }}</span>
        </div>
      </div>

      <div class="info-item">
        <span class="info-label">目标体重</span>
        <div class="info-content">
          <span>{{ form.targetWeight }}公斤</span>
        </div>
      </div>

      <div class="info-item">
        <span class="info-label">预计达成时间</span>
        <div class="info-content">
          <span>{{ form.targetDate }}</span>
        </div>
      </div>

      <div class="info-item">
        <span class="info-label">减重阶段</span>
        <div class="info-content">
          <span>{{ form.progress }}</span>
        </div>
      </div>

      <div class="info-item">
        <span class="info-label">特殊情况</span>
        <div class="info-content">
          <span>{{ form.specialCondition }}</span>
        </div>
      </div>
    </div>

    <p class="save-tip">该页面只展示基本信息</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        gender: "",
        birthDate: "",
        height: null,
        weight: null,
        specialPeriod: "",
        target: "",
        targetWeight: null,
        targetDate: "",
        progress: "",
        specialCondition: "",
      },
    };
  },
  mounted() {
    // 页面加载时从数据库中获取用户信息
    this.fetchData();
  },
  methods: {
    // 从后端获取数据
    async fetchData() {
      try {
        const response = await fetch("https://example.com/api/getBasicInfo", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          this.form = data; // 将数据绑定到 form
        } else {
          console.error("获取数据失败，请稍后重试！");
        }
      } catch (error) {
        console.error("获取数据时发生错误：", error);
      }
    },
    // 获取字段对应的中文标签
    getFieldLabel(key) {
      const labels = {
        gender: "性别",
        birthDate: "出生日期",
        height: "身高",
        weight: "最新体重",
        specialPeriod: "特殊时期",
        target: "管理目标",
        targetWeight: "目标体重",
        targetDate: "预计达成时间",
        progress: "减重阶段",
        specialCondition: "特殊情况",
      };
      return labels[key] || key;
    },
    // 格式化字段值
    formatValue(key, value) {
      if (key === "height") return `${value}厘米`;
      if (key === "weight" || key === "targetWeight") return `${value}公斤`;
      return value || "暂无";
    },
  },
};
</script>

<style>
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
  pointer-events: none; /* 允许事件穿透 */
}
.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.back-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
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

.edit-icon {
  width: 16px;
  height: 16px;
}

.save-tip {
  font-size: 12px;
  color: #777;
  text-align: center;
  margin-top: 20px;
}
</style>