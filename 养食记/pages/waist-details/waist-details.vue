<template>
  <div class="dimension-record">
    <div class="main-image">
      <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
    </div>
    <!-- 顶部导航 -->
    <div class="header">
   
    </div>

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
    <div class="record-section">
      <text>记录新数据 (cm):</text>
      <input type="number" v-model="newRecord" placeholder="输入新数据" />
      <button @click="addRecord">记录</button>
    </div>
  </div>
</template>





<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      dimensions: [
        {
          name: "腰围",
          value: 62.5,
          history: [62, 62.5, 63, 62],
          dates: ["2023-01-01", "2023-02-01", "2023-03-01", "2023-04-01"],
        },
        {
          name: "大腿",
          value: 60,
          history: [60, 61, 62, 63],
          dates: ["2023-01-01", "2023-02-01", "2023-03-01", "2023-04-01"],
        },
        {
          name: "小腿",
          value: 30,
          history: [30, 31, 32, 33],
          dates: ["2023-01-01", "2023-02-01", "2023-03-01", "2023-04-01"],
        },
        {
          name: "臀围",
          value: 90,
          history: [90, 91, 92, 93],
          dates: ["2023-01-01", "2023-02-01", "2023-03-01", "2023-04-01"],
        },
        {
          name: "胸围",
          value: 95,
          history: [95, 96, 97, 98],
          dates: ["2023-01-01", "2023-02-01", "2023-03-01", "2023-04-01"],
        },
        {
          name: "手臂",
          value: 35,
          history: [35, 36, 37, 38],
          dates: ["2023-01-01", "2023-02-01", "2023-03-01", "2023-04-01"],
        },
      ],
      selectedDimension: "腰围", // 当前选中的维度
      newRecord: "", // 新记录数据
      chart: null, // ECharts 实例
    };
  },
  
  mounted() {
    this.initChart();
    this.$nextTick(() => {
      this.updateChart(); // 确保图表更新在 DOM 渲染完成后执行
    });
  },
  methods: {
    // 初始化图表
    initChart() {
      const chartDom = document.getElementById("dimensionChart");
      if (!chartDom) {
        console.error("图表容器未找到");
        return;
      }
    
      this.chart = echarts.init(chartDom);
    
      this.$nextTick(() => {
        this.updateChart(); // 初始化后立即更新图表
      });
    }
,
    // 更新图表数据
updateChart() {
  if (!this.chart) return;

  const selected = this.dimensions.find(
    (dimension) => dimension.name === this.selectedDimension
  );

  const validHistory = selected.history.filter((value) => value !== null);
  const validDates = selected.dates.slice(0, validHistory.length);

  const option = {
    title: {
      text: `${selected.name} 变化趋势`,
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    grid: {
      left: "20%", // 增加左边距，避免刻度标签被裁剪
      right: "10%",
      top: "20%",
      bottom: "20%",
    },
    xAxis: {
      type: "category",
      data: validDates, // 横轴数据
      axisLabel: {
        color: "#333", // 横轴刻度颜色
      },
    },
    yAxis: {
      type: "value",
      name: "围度 (cm)", // 添加纵轴名称
      nameTextStyle: {
        color: "#333", // 确保名称颜色可见
        fontSize: 14,
        padding: [0, 0, 0, 20], // 给名称留出空间
      },
      axisLabel: {
        formatter: "{value} cm", // 格式化刻度值
        color: "#333", // 确保文字颜色清晰
        fontSize: 12,
      },
      splitLine: {
        lineStyle: {
          color: "#e0e0e0", // 设置网格线颜色
        },
      },
    },
    series: [
      {
        name: selected.name,
        type: "line",
        smooth: true,
        data: validHistory, // 数据
		label: {
		          show: true, // 启用数据标签
		          position: "top", // 显示在数据点上方
		          formatter: "{c}", // 显示数值并格式化
		          color: "#333", // 标签文字颜色
		          fontSize: 12,
		        },
        areaStyle: {
          color: "rgba(76, 175, 80, 0.2)", // 区域填充颜色
        },
        itemStyle: {
          color: "#50cc8e", // 数据点颜色
        },
        lineStyle: {
          width: 2, // 线条宽度
        },
      },
    ],
  };

  this.chart.setOption(option);
},

    // 切换维度
    selectDimension(name) {
      this.selectedDimension = name; // 更新选中的维度
      this.updateChart(); // 更新图表数据
    },
    // 添加新记录
    addRecord() {
      if (!this.newRecord) return;

      const selected = this.dimensions.find(
        (dimension) => dimension.name === this.selectedDimension
      );

      selected.history.push(Number(this.newRecord)); // 添加新的数据
      selected.dates.push(this.formatDate(new Date())); // 添加当前日期

      selected.value = this.newRecord; // 更新当前维度的值

      this.newRecord = ""; // 清空输入框
      this.updateChart(); // 更新图表
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
</style>
