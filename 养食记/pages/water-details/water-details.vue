<template>
  <div class="water-tracker">
	<div class="main-image">
	  <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
	</div>
	<div class="header">
	  <h2>今日饮水记录</h2>
	</div>
    <div class="progress">
      <div class="progress-bar" :style="{ width: progress + '%' }">
        <span>{{ progress }}%</span>
      </div>
    </div>
    <div class="cup">
	    <img src="@/pages/images/cup.png">
    </div>
    <div class="info">
      <p>今天,再喝,{{ remainingCups }}杯({{ remainingMl }}ml)</p>
      <p>今日目标: 4杯(1600ml)</p>
      <p>水杯容量: 400ml</p>
    </div>
    <button @click="addWater">加一杯水</button>
    <div class="records">
      <text class="title">喝水记录</text>
      <p v-if="todayRecord.length < 4">今天水还没喝够呢，再来一杯吧～</p>
      <ul>
        <li v-for="(record, index) in todayRecord" :key="index">
          第{{ index + 1 }}杯水: {{ formatTime(record.timestamp) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalCups: 4,
      cupSizeMl: 400,
      currentCups: 0,
      todayRecord: []
    };
  },
  computed: {
    remainingCups() {
      return this.totalCups - this.currentCups;
    },
    remainingMl() {
      return (this.totalCups - this.currentCups) * this.cupSizeMl;
    },
    progress() {
      return ((this.currentCups / this.totalCups) * 100).toFixed(0);
    }
  },
  methods: {
    addWater() {
      if (this.currentCups < this.totalCups) {
        this.currentCups++;
        const timestamp = new Date().toLocaleString();
        this.todayRecord.push({ timestamp });
      }
    },
    formatTime(timestamp) {
      // 格式化时间显示，可以根据需要自定义格式
      return timestamp;
    }
  }
};
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