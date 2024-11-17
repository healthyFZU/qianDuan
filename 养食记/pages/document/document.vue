<template>
  <div class="health-record-page">
	<!-- 上传按钮 -->
	<div class="upload-section">
	  <button @click="uploadImage" class="upload-button">点击上传</button>
	  <input
	    type="file"
	    ref="fileInput"
	    accept="image/*"
	    style="display: none;"
	    @change="handleFileUpload"
	  />
	</div>
    <!-- 体检档案列表 -->
    <div class="record-list">
      <div v-if="healthRecords.length === 0" class="empty-state">
        <img src="/pages/images/捂嘴.png" alt="暂无档案" />
        <p>您还没有上传任何体检档案哦！</p>
      </div>
      <div v-else>
        <div class="record-item" v-for="record in healthRecords" :key="record.id">
          <div class="record-image">
            <img :src="record.image" alt="体检档案" />
          </div>
          <div class="record-details">
            <p class="record-date">{{ record.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      healthRecords: [], // 体检档案列表
    };
  },
  methods: {
    // 上传图片按钮
    uploadImage() {
      this.$refs.fileInput.click();
    },
    // 处理文件上传
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newRecord = {
            id: Date.now(),
            image: e.target.result,
            date: new Date().toLocaleDateString(),
          };
          this.healthRecords.push(newRecord);
          this.saveRecords();
        };
        reader.readAsDataURL(file);
      }
    },
    // 保存体检档案到本地存储
    saveRecords() {
      localStorage.setItem("healthRecords", JSON.stringify(this.healthRecords));
    },
    // 从本地存储加载体检档案
    loadRecords() {
      const records = JSON.parse(localStorage.getItem("healthRecords")) || [];
      this.healthRecords = records;
    },
  },
  mounted() {
    // 页面加载时从本地存储读取体检档案数据
    this.loadRecords();
  },
};
</script>

<style scoped>
/* 上传按钮样式 */
.upload-section {
  text-align: center;
  margin: 20px 0;
  position: relative;
}

.upload-button {
  padding: 1px 10px;
  font-size: 16px;
  border: none;
  border-radius: 50px;
  background-color: #50cc8e;
  color: black;
  cursor: pointer;
  width: 30%;
}

.upload-button:hover {
  background-color: #ddd;
}

/* 体检档案列表样式 */
.record-list {
  padding: 10px;
}

.record-item {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.record-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
}

.record-details {
  margin-left: 10px;
}

.record-date {
  font-size: 14px;
  color: #666;
}

/* 空列表状态 */
.empty-state {
  text-align: center;
  margin-top: 50px;
}

.empty-state img {
  width: 300px;
  margin-bottom: 10px;
}
</style>
