<template>
  <div class="calorie-tracker">
    <header>
	  <div class="main-image">
	    <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
	  </div>
      <!-- 日期选择器 -->
      <input class="date" type="date" v-model="selectedDate" @change="onDateChange" />
      <div class="stats">
        <p>饮食摄入 {{ totalCalories }} 千卡</p>
        <p>还可以吃 {{ remainingCalories }} 千卡</p>
        <p>运动消耗 {{ totalExercise }} 千卡</p>
		<img src="/pages/images/睁眼-放大版.png" class="little-image" />
      </div>
    </header>

    <!-- 各餐信息 -->
    <div v-for="meal in meals" :key="meal.id" class="meal-section">
      <text style="font-size: 17px;">{{ meal.name }} (建议{{ meal.suggestedRange }} 千卡)</text>

      <ul>
        <li v-for="(item, index) in meal.items" :key="index">
          {{ item.name }} - {{ item.calories }} 千卡
        </li>
      </ul>
      <button class="top-button"@click="addFood(meal.id)">+</button>
      <p>总热量: {{ meal.totalCalories }} 千卡</p>
    </div>

    <!-- 运动信息 -->
    <div class="exercise-section">
      <text style="font-size: 17px;">运动</text>
      <ul>
        <li v-for="(exercise, index) in exercises" :key="index">
		
          {{ exercise.name }} - 消耗 {{ exercise.calories }} 千卡
        </li>
      </ul>
      <button @click="addExercise" class="top-button">+</button>
    </div>

    <!-- 功能按钮 -->
    <div class="footer">
      <button class="bottom-button" @click="saveDailyRecords">保存记录</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommendedCalories: 1152, // 推荐的每日摄入热量
      totalCalories: 0, // 当前摄入热量
      totalExercise: 0, // 当前运动消耗热量
      remainingCalories: 1152, // 剩余可摄入热量
      selectedDate: this.formatDate(new Date()), // 默认选择今天的日期

      meals: [
        { id: 1, name: "早餐", suggestedRange: "311-380", items: [], totalCalories: 0 },
        { id: 2, name: "午餐", suggestedRange: "400-600", items: [], totalCalories: 0 },
        { id: 3, name: "晚餐", suggestedRange: "300-500", items: [], totalCalories: 0 },
        { id: 4, name: "加餐", suggestedRange: "100-200", items: [], totalCalories: 0 },
      ],
      exercises: [],
    };
  },
  mounted() {
    this.loadDailyRecords(); // 默认加载当天记录
  },
  methods: {
    // 格式化日期为 YYYY-MM-DD 格式
    formatDate(date) {
      return date.toISOString().split("T")[0];
    },
    // 日期更改时调用，加载新日期记录
    onDateChange() {
      this.loadDailyRecords();
    },
    loadDailyRecords() {
      const storedData = localStorage.getItem(`calorieRecords_${this.selectedDate}`);
      if (storedData) {
        const dailyData = JSON.parse(storedData);
        this.meals = dailyData.meals;
        this.exercises = dailyData.exercises;
        this.totalCalories = dailyData.totalCalories;
        this.totalExercise = dailyData.totalExercise;
        this.updateRemainingCalories();
      } else {
        // 如果没有数据，重置当天记录
        this.resetDailyRecords();
      }
    },
    // 保存选定日期的记录
    saveDailyRecords() {
      const dailyData = {
        meals: this.meals,
        exercises: this.exercises,
        totalCalories: this.totalCalories,
        totalExercise: this.totalExercise,
      };
      localStorage.setItem(`calorieRecords_${this.selectedDate}`, JSON.stringify(dailyData));
      alert("记录已保存！");
    },

    // 重置当天记录
    resetDailyRecords() {
      this.meals.forEach(meal => {
        meal.items = [];
        meal.totalCalories = 0;
      });
      this.exercises = [];
      this.totalCalories = 0;
      this.totalExercise = 0;
      this.updateRemainingCalories();
    },
    // 添加食物到指定的餐点
    addFood(mealId) {
      const food = prompt("请输入食物名称和热量(如: 苹果 50)");
      if (food) {
        const [name, calories] = food.split(" ");
        const meal = this.meals.find((m) => m.id === mealId);
        if (meal && name && !isNaN(calories)) {
          const calorieIntake = parseInt(calories);
          meal.items.push({ name, calories: calorieIntake });
          meal.totalCalories += calorieIntake;
          this.totalCalories += calorieIntake;
          this.updateRemainingCalories();
        }
      }
    },
    // 添加运动记录
    addExercise() {
      const exercise = prompt("请输入运动名称和消耗的热量(如: 跑步 100)");
      if (exercise) {
        const [name, calories] = exercise.split(" ");
        if (name && !isNaN(calories)) {
          const calorieBurn = parseInt(calories);
          this.exercises.push({ name, calories: calorieBurn });
          this.totalExercise += calorieBurn;
          this.updateRemainingCalories();
        }
      }
    },
    // 更新剩余可摄入热量
    updateRemainingCalories() {
      this.remainingCalories = this.recommendedCalories - this.totalCalories + this.totalExercise;
    },
    analyzeNutrition() {
      alert("营养分析功能待实现");
    },
    mealRecommendation() {
      alert("饮食建议功能待实现");
    },
  },
};
</script>

<style scoped>
.calorie-tracker {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #ffffff;
}
input[type="date"] {
  margin-top: 10px;
  font-size: 18px;
}

.stats {
  margin: 10px 0px; /* 减少上下间距 */
  padding: 10px; /* 减少内边距 */
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  font-size: 18px; /* 调整字体大小，减少卡片高度 */
  line-height: 30px; /* 调整行高 */
  text-align: left;
  height: 120px;
  margin-top: 30px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.little-image{
	width: 70px;
	height: 100px;
	transform: scale(1.2);
	border-radius: 10px;
	position: relative;
	left: 200px;
	bottom: 80px;
}
.meal-section, .exercise-section {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  font-size: 14px;
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
ul {
  list-style-type: none;
  padding: 0;
}
.top-button{
	position: relative;
	left: 120px;
   right: 40%;
   transform: translateX(50%);
  	transform: scale(0.8);
   background: #fadf49;
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
.bottom-button{
	margin-top: 10px;
	padding: 3px 20px;
	width: 200px;
	font-size: 16px;
	background-color: #50cc8e;
	color: white;
	border-radius: 50px;
}
.footer {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
</style>