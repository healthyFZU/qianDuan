<template>
  <div class="exercise-record">
	<div class="main-image">
	  <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
	</div>
    <!-- Header -->
    <header class="header">
    </header>

    <!-- Today Summary -->
    <section class="today-summary">
      <div class="date-section">
        <h3>WEDNESDAY</h3>
        <text @click="toggleHistory">📅</text>
      </div>
      <div class="summary-info">
        <div class="today-exercise">
          <p>今日运动</p>
          <button class="button1" @click="recordExercise">+</button>
        </div>
        <div class="calories">
          <p>热量消耗</p>
          <p>{{ caloriesBurned }} 千卡</p>
        </div>
      </div>
      <p class="tip">
        温馨提示：合理安排饮食和运动时间。建议饭后2小时后运动，运动结束1小时后再进食。
      </p>
    </section>

    <!-- History Records -->
    <section v-if="showHistory" class="history-records">
      <text style="font-size: 18px;">历史运动记录</text>
      <ul>
        <li v-for="(record, index) in historyRecords" :key="index">
          {{ record.date }} - {{ record.name }} - {{ record.calories }} 千卡
        </li>
      </ul>
    </section>

    <!-- Recommended Exercises -->
    <section class="recommended-exercises">
      <text style="font-size: 18px;">推荐运动</text>
      
	  
      <div v-for="exercise in exercises" :key="exercise.id" class="exercise-card">
        <p>{{ exercise.name }}</p>
        <p>{{ exercise.description }}</p>
        <p>{{ exercise.time }} 分钟 - {{ exercise.calories }} 千卡</p>
        <button class="button2" @click="recordSpecificExercise(exercise)">+</button>
      </div>
	  <text @click="updateRecommendations" style=" display: block;margin-left: 120px; cursor: pointer;">🔄 换一下</text>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      caloriesBurned: 0,
      showHistory: false,
      historyRecords: [],
      exercises: [
        {
          id: 1,
          name: "瑜伽伸展课程",
          description: "第一课 | 入门瑜伽伸展",
          time: 6,
          calories: 29,
        },
        {
          id: 2,
          name: "初级拳击课程",
          description: "第一课 | 燃脂拳击初级",
          time: 7,
          calories: 141,
        },
      ],
    };
  },
  methods: {
    recordExercise() {
      // 弹出输入框让用户记录运动数据
      const exerciseCalories = prompt("请输入消耗的热量 (千卡):", "50");
      if (exerciseCalories && !isNaN(exerciseCalories)) {
        this.caloriesBurned += parseInt(exerciseCalories);
        this.historyRecords.push({
          date: new Date().toLocaleDateString(),
          name: "自定义运动",
          calories: parseInt(exerciseCalories),
        });
        alert(`已记录 ${exerciseCalories} 千卡的运动！`);
      } else {
        alert("请输入有效的热量数据！");
      }
    },
    recordSpecificExercise(exercise) {
      // 记录推荐运动的热量
      this.caloriesBurned += exercise.calories;
      this.historyRecords.push({
        date: new Date().toLocaleDateString(),
        name: exercise.name,
        calories: exercise.calories,
      });
      alert(`已记录 ${exercise.name} 的运动！消耗 ${exercise.calories} 千卡`);
    },
    toggleHistory() {
      // 显示或隐藏历史记录
      this.showHistory = !this.showHistory;
    },
    updateRecommendations() {
      // 模拟从服务器获取新的推荐运动
      this.exercises = [
        {
          id: 3,
          name: "跑步",
          description: "有氧跑步训练",
          time: 30,
          calories: 250,
        },
        {
          id: 4,
          name: "高强度间歇训练",
          description: "燃脂 HIIT 训练",
          time: 20,
          calories: 300,
        },
      ];
      alert("推荐运动已更新！");
    },
  },
};
</script>

<style scoped>
.exercise-record {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f9f9f9;
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
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.today-summary {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}

.date-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-info {
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
}

.today-exercise p,
.calories p {
  margin: 5px 0;
}

.tip {
  font-size: 12px;
  color: #666;
}

.history-records {
  background-color: #ddd;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.recommended-exercises {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 0spx;
}

.exercise-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 30px;
  background-color: #ffffff;
}

.button1 {
  right: 0%;
  transform: translateX(50%);
    transform: scale(0.8);
  background: #50cc8e;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 30px; /* 按钮宽度 */
  height: 30px; /* 按钮高度 */
  font-size: 20px; /* 字体大小 */
  display: flex; /* 使用 Flexbox 居中内容 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 按钮阴影 */
}
.button2 {
  left: 40%;
  transform: translateX(50%);
    transform: scale(0.8);
  background: #50cc8e;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 30px; /* 按钮宽度 */
  height: 30px; /* 按钮高度 */
  font-size: 20px; /* 字体大小 */
  display: flex; /* 使用 Flexbox 居中内容 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 按钮阴影 */
}

</style>
