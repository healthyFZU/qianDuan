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

    <!-- 图表展示体重变化趋势 -->
    <div id="weightChart" class="chart-container"></div>
  </view>
</template>

<script>
import * as echarts from "echarts";
import { useStore } from "vuex";

export default {
  data() {
    return {
      initialWeight: null, // 初始体重
      targetWeight: null, // 目标体重
      newWeight: "", // 新记录的体重
      weightRecords: [], // 体重记录
      weightDates: [], // 记录的日期数组
      userId: null, // 当前用户ID
      accessToken: null, // 当前用户授权Token
    };
  },
  setup() {
    const store = useStore(); // 创建 store 实例
    return { store };
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
    this.userId = this.$store.state.userId;
    this.accessToken = this.$store.state.access_token;

    if (!this.userId || !this.accessToken) {
      alert("请先登录！");
      return;
    }

    this.initChart(); // 初始化图表
    this.fetchWeightRecords(); // 从数据库加载体重记录
  },
  methods: {
    // 添加体重记录
    async addWeight() {
        if (!this.newWeight) {
          alert("请输入新体重！");
          return;
        }
    
        const newRecord = {
          weight: Number(this.newWeight),
          pre_over_time: this.formatDate(new Date()), // 当前日期
        };
		console.log('111111',this.userId)
        try {
          // 使用 fetch 发起请求保存新体重记录
		  
          const response = await fetch(`http://129.204.151.245:5001/user/${this.userId}/body-info`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.accessToken}`,
            },
            body: JSON.stringify({
              weight: newRecord.weight,
              pre_over_time: newRecord.pre_over_time, // 更新日期字段
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            // 更新本地记录
            this.weightRecords.push(newRecord.weight); // 添加到记录列表
            this.weightDates.push(newRecord.pre_over_time); // 添加对应日期
            this.newWeight = ""; // 清空新体重输入框
    
            this.updateChart(); // 更新图表
            alert("体重记录成功！");
          } else {
            alert("保存体重记录失败，请稍后重试！");
          }
        } catch (error) {
          console.error("保存失败:", error);
          alert("保存体重记录失败，请检查网络连接！");
        }
      },

    // 获取体重记录
    async fetchWeightRecords() {
      try {
        // 使用 fetch 获取体重记录
        const response = await fetch(`http://129.204.151.245:5001/user/${this.userId}/body-info`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.accessToken}`,
          },
        });
    
       if (response.ok) {
             const data = await response.json();
       
             // 从后端数据中初始化体重记录
             this.weightRecords = [data.weight];
             this.weightDates = [data.pre_over_time];
       
             // 初始化初始体重和目标体重，仅在初始加载时设置
             if (!this.initialWeight) {
               this.initialWeight = data.weight;
             }
             this.targetWeight = data.weight_target;
       
             this.updateChart();
	
        } else {
          alert("加载体重记录失败，请稍后重试！");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // 若返回 404，表示没有体重记录，创建一条初始记录
          console.log("未找到体重记录，正在创建默认记录...");
          await this.createInitialWeightRecord();
        } else {
          console.error("加载体重记录失败:", error);
          alert("无法加载历史体重记录，请稍后重试！");
        }
      }
    },
    
    // 创建默认的初始体重记录
    async createInitialWeightRecord() {
      try {
        const defaultWeight = 70; // 默认体重值（可根据需求调整）
        const defaultTargetWeight = 65; // 默认目标体重值
        const currentDate = this.formatDate(new Date());
    
        const response = await fetch(`http://129.204.151.245:5001/user/${this.userId}/body-info`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.accessToken}`,
          },
          body: JSON.stringify({
            weight: defaultWeight,
            weight_target: defaultTargetWeight,
            pre_over_time: currentDate,
          }),
        });
    
        if (response.ok) {
          console.log("默认体重记录创建成功！");
    
          // 初始化体重数据
          this.initialWeight = defaultWeight;
          this.targetWeight = defaultTargetWeight;
          this.weightRecords = [defaultWeight];
          this.weightDates = [currentDate];
    
          this.updateChart(); // 更新图表
        } else {
          alert("无法创建默认体重记录，请稍后重试！");
        }
      } catch (error) {
        console.error("创建默认体重记录失败:", error);
        alert("创建默认体重记录失败，请检查网络连接！");
      }
    },


    // 初始化图表
    initChart() {
      const chartDom = document.getElementById("weightChart");
      if (chartDom) {
        this.chart = echarts.init(chartDom);
        this.updateChart();
      } else {
        console.error("图表容器未找到");
      }
    },

    // 更新图表数据
    updateChart() {
      if (!this.chart) return;
      const option = {
        title: {
          text: "体重变化趋势",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: this.weightDates,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "体重",
            data: this.weightRecords,
            type: "line",
            smooth: true,
            label: {
              show: true,
              position: "top",
            },
            itemStyle: {
              color: "#50cc8e",
            },
          },
        ],
      };
      this.chart.setOption(option);
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
</style>
