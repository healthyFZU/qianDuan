<template>
  <div class="water-tracker">
    <!-- 背景图片 -->
    <div class="main-image">
      <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
    </div>

    <!-- 标题 -->
    <div class="header">
      <h2>今日饮水记录</h2>
    </div>

    <!-- 饮水进度条 -->
    <div class="progress">
      <div class="progress-bar" :style="{ width: progress + '%' }">
        <span>{{ progress }}%</span>
      </div>
    </div>

    <!-- 水杯图片 -->
    <div class="cup">
      <img src="@/pages/images/cup.png" alt="cup" />
    </div>

    <!-- 饮水信息 -->
    <div class="info">
      <p>今天，再喝 <strong>{{ remainingCups }}</strong> 杯 (<strong>{{ remainingMl }}</strong> ml)</p>
      <p>今日目标: <strong>{{ totalCups }}</strong> 杯 (<strong>{{ totalCups * cupSizeMl }}</strong> ml)</p>
      <p>水杯容量: <strong>{{ cupSizeMl }}</strong> ml</p>
    </div>

    <!-- 加水按钮 -->
    <button 
      @click="addWater"
      :disabled="currentCups >= totalCups"
      class="add-water-btn">
      {{ currentCups < totalCups ? '加一杯水' : '目标已达成！' }}
    </button>

    <!-- 饮水记录 -->
    <div class="records">
      <h3 class="title">喝水记录</h3>
      <p v-if="currentCups < totalCups">今天水还没喝够呢，再来一杯吧～</p>
      <ul>
        <li v-for="(record, index) in todayRecord" :key="index">
          第{{ index + 1 }}杯水: {{ formatTime(record.timestamp) }}
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { useStore } from "vuex";	
export default {
  data() {
    return {
      totalCups: 4,
      cupSizeMl: 400,
      currentCups: 0,
      todayRecord: [],
      selectedDate: this.formatDate(new Date()),
      intakeId: null, // 添加 intakeId
    };
  },
  setup() {
    const store = useStore();
    return { store };
  },
  computed: {
    remainingCups() {
      return this.totalCups - this.currentCups;
    },
    remainingMl() {
      return this.remainingCups * this.cupSizeMl;
    },
    progress() {
      return ((this.currentCups / this.totalCups) * 100).toFixed(0);
    },
  },
  mounted() {
	  this.checkDateAndReset();
	    this.dateWatcher = setInterval(() => {
	      this.checkDateAndReset();
	    }, 60000); // 每分钟检查一次
	  },
	  beforeUnmount() {
	    clearInterval(this.dateWatcher); // 清除定时器，避免内存泄漏
  },
  methods: {
    formatDate(date) {
      return date.toISOString().split("T")[0];
    },
	checkDateAndReset() {
		    const today = this.formatDate(new Date());
		    if (this.selectedDate !== today) {
		      // 日期变化，重置记录
		      this.selectedDate = today;
		      this.currentCups = 0;
		      this.todayRecord = [];
		      this.createDailyRecord();
		    }
		    this.loadWaterRecords(); // 加载新的日期记录
		  },
    // 加载饮水记录
    async loadWaterRecords() {
        const userId = this.$store.state.userId;
        const token = this.$store.state.access_token;
    
        if (!userId || !token) {
          alert("请先登录！");
          return;
        }
    
        try {
          const response = await fetch(
            `http://129.204.151.245:5001/user/${userId}/intake/date/${this.selectedDate}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (response.ok) {
            const data = await response.json();
            this.intakeId = data.intake_id; // 修复：使用 this.intakeId
            this.currentCups = data.have_drink ? data.have_drink.length : 0;
            this.todayRecord = data.have_drink || [];
          } else if (response.status === 404) {
            await this.createDailyRecord();
          } else {
            alert("加载饮水记录失败，请稍后重试！");
          }
        } catch (error) {
          console.error("加载饮水记录出错：", error);
          alert("加载饮水记录失败，请检查网络连接！");
        }
      },
    // 创建当天的记录
    async createDailyRecord() {
        const userId = this.$store.state.userId;
        const token = this.$store.state.access_token;
    
        if (!userId || !token) {
          alert("请先登录！");
          return;
        }
    
        const defaultData = {
          date: this.selectedDate,
          eat_target: 0,
          breakfast: [],
          lunch: [],
          dinner: [],
          more: [],
          have_eat: [],
          drink_target: 0,
          have_drink: [],
        };
    
        try {
          const response = await fetch(
            `http://129.204.151.245:5001/user/${userId}/intake`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(defaultData),
            }
          );
    
          if (response.ok) {
            const postData = await response.json();
            this.intakeId = postData.intake_id; // 修复：使用 this.intakeId
            alert("今日记录已创建！");
          } else {
            alert("创建今日记录失败，请稍后重试！");
          }
        } catch (error) {
          console.error("创建今日记录出错：", error);
          alert("创建今日记录失败，请检查网络连接！");
        }
      },
    // 添加饮水记录
    async addWater() {
        const userId = this.$store.state.userId;
        const token = this.$store.state.access_token;
    
        if (!userId || !token) {
          alert("请先登录！");
          return;
        }
    
        if (!this.intakeId) {
          alert("记录尚未加载，请稍后重试！");
          return;
        }
    
        if (this.currentCups < this.totalCups) {
          const timestamp = new Date().toISOString();
          this.currentCups++;
          this.todayRecord.push({ timestamp });
    
          const updatedData = {
            date: this.selectedDate,
            drink_target: this.totalCups * this.cupSizeMl,
            have_drink: this.todayRecord,
          };
    
          try {
            const response = await fetch(
              `http://129.204.151.245:5001/user/${userId}/intake/${this.intakeId}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
              }
            );
    
            if (response.ok) {
              alert("饮水记录更新成功！");
            } else {
              alert("饮水记录更新失败，请稍后重试！");
            }
          } catch (error) {
            console.error("更新饮水记录出错：", error);
            alert("更新饮水记录失败，请检查网络连接！");
          }
        } else {
          alert("今日饮水目标已达成！");
        }
      },
   
	
    formatTime(timestamp) {
      const date = new Date(timestamp);
      return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },

  }
}
</script>

<style scoped>
.title{
	margin-bottom: 10px;
	font-size: 20px;
	
}
.cup{
    height: 0px;
}
.water-tracker {
  text-align: center;
  padding: 10px;
  background-color: #ffffff;
  height: 100vh;
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
.progress {
  width: 90%;
  margin: 20px auto;
  background-color: #e0e0e0;;
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar {
  height: 25px;
  background-color: #50cc8e;
  color: black;
  line-height: 30px;
  text-align: center;
  
}

.info {
  margin: 20px 0;
  position: relative;
  top:150px;
  font-size: 15px;
}

button {
  padding: 0px 5px;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  top:150px;
  height: 45px;
  width:60%;
  text-align: center;
  background-color: #fadf49;
  border-radius: 50px;
  border: none;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
}

.records {
  margin-top: 20px;
  position: relative;
  top:150px;
  font-size: 15px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}


</style>