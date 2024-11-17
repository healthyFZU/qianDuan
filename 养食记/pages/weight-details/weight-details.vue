<template>
  <view class="container">
	<div class="main-image">
	  <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
	</div>
    <!-- 设置初始体重和目标体重 -->
    <view class="settings">
      <view>
        <text>初始体重 (kg):</text>
        <input type="number" v-model="initialWeight" placeholder="输入初始体重" />
      </view>
      <view>
        <text>目标体重 (kg):</text>
        <input type="number" v-model="targetWeight" placeholder="输入目标体重" />
      </view>
    </view>

    <!-- 记录体重 -->
    <view class="record-weight">
      <text>记录新体重 (kg):</text>
      <input type="number" v-model="newWeight" placeholder="输入体重" />
      <button @click="addWeight">记录</button>
    </view>

    <!-- 显示完成度 -->
    <view class="progress">
      <text>目标完成度: {{ progressPercentage }}%</text>
    </view>

    <!-- 图表展示体重变化趋势 -->
    <div id="weightChart" class="chart-container"></div>
  </view>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      initialWeight: null, // 初始体重
      targetWeight: null,  // 目标体重
      newWeight: '',       // 新记录的体重
      weightRecords: [],   // 体重记录
      weightDates: [],     // 记录的日期数组
    };
  },
  computed: {
    progressPercentage() {
      if (this.initialWeight && this.targetWeight) {
        const latestWeight =
          this.weightRecords[this.weightRecords.length - 1] || this.initialWeight;
        const progress =
          ((this.initialWeight - latestWeight) /
            (this.initialWeight - this.targetWeight)) *
          100;
        return Math.max(0, Math.min(progress.toFixed(2), 100));
      }
      return 0;
    },
  },
  mounted() {
    this.initChart(); // 初始化图表
  },
  methods: {
    addWeight() {
      if (this.newWeight) {
        this.weightRecords.push(Number(this.newWeight)); // 添加体重
        this.weightDates.push(this.formatDate(new Date())); // 添加当前日期
        this.newWeight = '';
        this.updateChart(); // 更新图表
      }
    },
    initChart() {
      const chartDom = document.getElementById('weightChart'); // 获取容器
      if (chartDom) {
        this.chart = echarts.init(chartDom); // 初始化 echarts 实例
        this.updateChart(); // 绘制初始图表
      } else {
        console.error('图表容器未找到');
      }
    },
    updateChart() {
      if (!this.chart) return; // 确保图表实例已初始化
      const option = {
        title: {
          text: '体重变化趋势',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: this.weightDates, // 使用日期作为横轴数据
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '体重',
            data: this.weightRecords, // 体重数据
			label: {
			          show: true, // 启用数据标签
			          position: "top", // 显示在数据点上方
			          formatter: "{c}", // 显示数值并格式化
			          color: "#333", // 标签文字颜色
			          fontSize: 12,
			        },
            type: 'line',
            smooth: true, // 平滑曲线
          },
        ],
      };
      this.chart.setOption(option); // 设置图表配置
    },
    formatDate(date) {
      // 格式化日期为 YYYY-MM-DD
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
  },
};
</script>

<style>
.container {
  padding: 20px;
}
.chart-container {
  width: 100%;
  height: 350px;
}
.header {
  text-align: center;
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
}
.title {
  font-size: 24px;
  font-weight: bold;
}

.settings,
.record-weight,
.progress {
  margin-bottom: 20px;
  margin-top: 20px;
}

input {
  border: 1px solid #ccc;
  padding: 8px;
  margin: 5px 0;
  border-radius: 50px;
  margin-top: 10px;
}

button {
  background-color: #50cc8e;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1px 20px;
  width: 150px;
  font-size: 16px;
  margin-top: 20px;
}

.text {
  font-size: 16px;
  margin: 5px 0;
}
</style>
