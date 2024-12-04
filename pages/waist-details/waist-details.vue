<template>
  <div class="dimension-record">
    <div class="main-image">
      <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
    </div>
    <!-- 顶部导航 -->
    <div class="header"></div>

    <!-- 围度记录卡片 -->
    <div class="dimension-cards">
      <div
        v-for="(dimension, index) in dimensions"
        :key="index"
        class="dimension-card"
        @click="selectDimension(dimension.name)"
      >
        <text class="text">{{ dimension.name }}</text>
        <p>{{ dimension.value }} cm</p>
      </div>
    </div>

    <!-- 折线图展示 -->
    <div class="chart-container" id="dimensionChart"></div>

    <!-- 数据录入部分 -->
    
        <!-- 数据录入部分 -->
        <div class="record-section">
          <button @click="openEditModal">修改记录</button>
        </div>
    
        <!-- 修改记录弹窗 -->
        <div v-if="isModalVisible" class="modal">
          <div class="modal-content">
            <h3>修改围度记录</h3>
            <div v-for="dimension in dimensions" :key="dimension.name" class="dimension-input">
              <label :for="dimension.name">{{ dimension.name }}:</label>
              <input
                v-model="editingDimensions[dimension.name]"
                :placeholder="dimension.name"
                type="number"
              />
            </div>
            <div class="modal-actions">
              <button class="b1" @click="cancelEdit">取消</button>
              <button class="b1" @click="saveEdit">确定</button>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { useStore } from "vuex";

export default {
  data() {
    return {
      dimensions: [
        { name: "腰围", value: 0, history: [], dates: [] },
        { name: "大腿", value: 0, history: [], dates: [] },
        { name: "小腿", value: 0, history: [], dates: [] },
        { name: "臀围", value: 0, history: [], dates: [] },
        { name: "胸围", value: 0, history: [], dates: [] },
        { name: "手臂", value: 0, history: [], dates: [] },
      ],
      selectedDimension: "腰围",
      chart: null,
      userId: null,
      accessToken: null,
      isModalVisible: false, // 控制弹窗显示
      editingDimensions: {}, // 编辑维度的临时存储
    };
  },
  setup() {
    const store = useStore();
    return { store };
  },
  mounted() {
    this.userId = this.$store.state.userId;
    this.accessToken = this.$store.state.access_token;

    if (this.userId && this.accessToken) {
      this.loadMeasurements();
    } else {
      alert("请先登录！");
    }
     this.initChart();  // 初始化图表
  },
methods: {
	 // 选择维度并更新图表
	  selectDimension(dimensionName) {
	    this.selectedDimension = dimensionName;  // 更新当前选择的维度
	    this.updateChart(); // 更新图表
	  },
	// 初始化图表
	    initChart() {
	      const chartDom = document.getElementById("dimensionChart");
	      if (!chartDom) {
	        console.error("图表容器未找到");
	        return;
	      }
	      this.chart = echarts.init(chartDom);
	      this.updateChart();
	    },
	
	    // 更新图表数据
	    updateChart() {
	      if (!this.chart) return;
	
	      const selected = this.dimensions.find(
	        (dimension) => dimension.name === this.selectedDimension
	      );
	      if (!selected) {
	        console.error("未找到选定的维度数据：", this.selectedDimension);
	        return;
	      }
	
	
	      const option = {
	        title: {
	          text: `${selected.name} 变化趋势`,
	          left: "center",
	        },
	        tooltip: {
	          trigger: "axis",
	          axisPointer: {
	            type: "cross",
	          },
	        },
	        xAxis: {
	          type: "category",
	          data: selected.dates,
	        },
	        yAxis: {
	          type: "value",
	          name: "围度 (cm)",
	        },
	        series: [
	          {
	            name: selected.name,
	            type: "line",
	            data: selected.history,
	          },
	        ],
	      };
	      this.chart.setOption(option);
	    },
  // 加载围度记录
    initChart() {
      this.chart = echarts.init(document.getElementById("dimensionChart"));
    },
  async loadMeasurements() {
    try {
      const response = await fetch(
        `http://129.204.151.245:5001/user/${this.userId}/measurements`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        if (!data || data.length === 0) {
          console.warn("无测量记录");
          this.measurementId = null; // 如果没有记录，设置为 null
          return;
        }
  
        // 提取最新记录的 ID
        const latestRecord = data[data.length - 1]; // 最新记录在最后
        this.measurementId = latestRecord.measurement_id;
        
        // 处理最新记录
        this.dimensions.forEach((dimension) => {
          const key = this.getDimensionKey(dimension.name);
          if (key && latestRecord[key]) {
            // 获取最新记录中的时间戳值
            const latestTimestamp = Object.keys(latestRecord[key]).pop(); // 获取最新时间戳
            dimension.value = latestRecord[key][latestTimestamp] || 0; // 最新围度值
          }
        });
  
        // 清空历史记录
        this.dimensions.forEach((dimension) => {
          dimension.history = [];
          dimension.dates = [];
        });
  
        // 累积所有记录到 dimensions 的 history 和 dates
        data.forEach((record) => {
          this.dimensions.forEach((dimension) => {
            const key = this.getDimensionKey(dimension.name);
            if (key && record[key]) {
              // 处理时间戳数据
              for (let timestamp in record[key]) {
                dimension.history.push(record[key][timestamp]); // 历史数据
                dimension.dates.push(timestamp); // 使用时间戳作为日期
              }
            }
          });
        });
  
        this.updateChart(); // 更新折线图
      } else {
        console.error("加载围度记录失败，状态码：", response.status);
      }
    } catch (error) {
      console.error("加载围度记录失败：", error);
    }
  },
  
  // 显示图表
  updateChart() {
    if (!this.chart) return;

    const selected = this.dimensions.find(
      (dimension) => dimension.name === this.selectedDimension
    );
    if (!selected) {
      console.error("未找到选定的维度数据：", this.selectedDimension);
      return;
    }

    const option = {
      title: {
        text: `${selected.name} 变化趋势`,
        left: "center",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
      },
      xAxis: {
        type: "category",
        data: selected.dates,
      },
      yAxis: {
        type: "value",
        name: "围度 (cm)",
      },
      series: [
        {
          name: selected.name,
          type: "line",
          data: selected.history,
        },
      ],
    };

    this.chart.setOption(option);
  },

  // 映射维度名称到后端字段
  getDimensionKey(dimensionName) {
    const mapping = {
      腰围: "waist",
      大腿: "thigh",
      小腿: "calf",
      胸围: "bust",
      臀围: "hips",
      手臂: "arm",
    };
    return mapping[dimensionName];
  },

  // 保存编辑
  async saveEdit() {
    // 如果 measurementId 为空，先创建一个新的记录
    if (!this.measurementId) {
      await this.createMeasurement();
    }

    const updatedValues = { ...this.editingDimensions };
    const payload = {
      waist: updatedValues["腰围"],
      thigh: updatedValues["大腿"],
      calf: updatedValues["小腿"],
      hips: updatedValues["臀围"],
      bust: updatedValues["胸围"],
      arm: updatedValues["手臂"],
      dates: [this.formatDate(new Date())], // 使用当前日期作为日期
    };

    try {
      const response = await fetch(
        `http://129.204.151.245:5001/user/${this.userId}/measurements`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.accessToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("记录保存成功！");
        this.measurementId = data.measurement_id; // 更新 measurementId 为最新的
        this.isModalVisible = false;
        await this.loadMeasurements(); // 重新加载数据
      } else {
        console.error("保存记录失败，状态码：", response.status);
      }
    } catch (error) {
      console.error("保存记录失败：", error);
    }
  },


    // 打开编辑弹窗
    openEditModal() {
      this.isModalVisible = true;
      this.editingDimensions = this.dimensions.reduce((acc, dimension) => {
        acc[dimension.name] = dimension.value;
        return acc;
      }, {});
    },

    // 取消编辑
    cancelEdit() {
      this.isModalVisible = false;
    },

    // 映射维度名称到后端字段
    getDimensionKey(dimensionName) {
      const mapping = {
        腰围: "waist",
        大腿: "thigh",
        小腿: "calf",
        胸围: "bust",
        臀围: "hips",
        手臂: "arm",
      };
      return mapping[dimensionName];
    },

    // 格式化日期
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
};
</script>


<style scoped>
.dimension-record {
  padding: 20px;
  height: 100vh;
  background-color: #ffffff;
}
.text{
	font-size: 18px;
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

.dimension-cards {
  display: grid; /* 使用网格布局 */
  grid-template-columns: repeat(3, 1fr); /* 每行 3 列 */
  gap: 15px; /* 卡片之间的间距 */
  justify-content: center; /* 水平居中 */
  margin-bottom: 20px;
  margin-top: 20px;
}
.dimension-card {
  background: #ffffff;
  padding: 10px;
  border-radius: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  border: 1px solid #ccc;
}
.dimension-card:hover {
  transform: scale(1.05);
}
.dimension-card h3 {
  font-size: 13px;
  font-weight: bold;
  margin: 0;
}
.dimension-card p {
  font-size: 14px;
  color: #888;
}
.chart-container {
  width: 100%;
  height: 400px;
  padding-left: 10px; /* 增加左侧内边距，确保刻度不会被裁剪 */
  box-sizing: border-box;
  background-color: #ffffff; /* 设置白色背景，避免透明背景干扰 */
}


.record-section {
  text-align: center;
}
input {
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 50px;
}
button {
  color: white;
  cursor: pointer;
  font-size: 16px;
  background-color: #50cc8e;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1px 20px;
  width: 150px;
}
button:hover {
  background-color: #45a049;
}
.modal{
	position: relative;
	top:30px;
}
h3{
	margin-bottom: 10px;
}
.modal-actions {
  display: flex;
  justify-content: space-between; /* 根据需要，可以改为 center 或 flex-end */
  gap: 10px; /* 按钮之间的间距 */

}

.b1 {
  padding: 1px 10px;
  font-size: 16px;
  cursor: pointer;
  width: 30%;
    margin-bottom: 30px;
}

</style>
