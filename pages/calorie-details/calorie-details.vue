<template>
  <div class="calorie-tracker">
    <header>
	  <div class="main-image">
	    <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
	  </div>
      <!-- 日期选择器 -->
      <input class="date" type="date" v-model="selectedDate" @change="onDateChange" />
      <div class="stats">
		<p>推荐摄入 {{ recommendedCalories }} 千卡</p>
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

    <!-- 功能按钮 -->
    <div class="footer">
      <button class="bottom-button" @click="saveDailyRecords">保存记录</button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  data() {
      return {
        recommendedCalories: 1152, // 推荐每日摄入热量
        totalCalories: 0, // 当前摄入热量
        totalExercise: 0, // 当前运动消耗热量
        remainingCalories: 1152, // 剩余可摄入热量
        selectedDate: this.formatDate(new Date()), // 默认选择今天的日期
        lastLoadedDate: this.formatDate(new Date()), // 用于记录上一次加载的日期
  
        meals: [
          { id: 1, name: "早餐", suggestedRange: "311-380", items: [], totalCalories: 0 },
          { id: 2, name: "午餐", suggestedRange: "400-600", items: [], totalCalories: 0 },
          { id: 3, name: "晚餐", suggestedRange: "300-500", items: [], totalCalories: 0 },
          { id: 4, name: "加餐", suggestedRange: "100-200", items: [], totalCalories: 0 },
		  { id: 5, name: "运动", suggestedRange: "600-700", items: [], totalCalories: 0 },
        ],
        exercises: [], // 用于存储运动记录
      };
    },
  setup() {
    const store = useStore();
    return { store };
  },
  mounted() {
    // 初始化加载当天记录
        this.handleDateChange();
  },
   watch: {
      // 监听日期变化
      selectedDate(newDate) {
        if (newDate !== this.lastLoadedDate) {
          this.handleDateChange();
        }
      },
    },
  methods: {
    // 格式化日期为 YYYY-MM-DD 格式
    formatDate(date) {
      return date.toISOString().split("T")[0];
    },
  
// 处理日期变化逻辑
 /*   async handleDateChange() {
      const today = this.formatDate(new Date());

      // 检查是否进入新的一天
      if (this.lastLoadedDate !== today) {
        this.resetDailyRecords();
        this.lastLoadedDate = today;
        this.selectedDate = today; // 同步到当天日期
      }

      // 加载记录
      await this.loadDailyRecords();
      await this.loadExerciseRecords();
    },*/
async handleDateChange() {
  // 如果是新的一天，重置记录
  if (this.lastLoadedDate !== this.selectedDate) {
    this.resetDailyRecords();
    this.lastLoadedDate = this.selectedDate;
  }

  // 加载当天记录
  await this.loadDailyRecords();
  await this.loadExerciseRecords();
},

// 添加饮食到指定的餐点
async addFood(mealId) {
  const userId = this.store.state.userId;
  const token = this.store.state.access_token;

  if (!userId || !token) {
    alert("请先登录！");
    return;
  }
	alert("请输入食物名称和热量(如: 苹果 50)");
  const foodInput = prompt();
  if (!foodInput) {
    alert("请输入有效的食物名称和热量！");
    return;
  }

  const [name, calories] = foodInput.split(" ");
  if (!name || isNaN(calories)) {
    alert("请输入有效的食物名称和热量！");
    return;
  }

  const calorieIntake = parseInt(calories);
  const meal = this.meals.find((m) => m.id === mealId);

  if (!meal) {
    alert("未找到对应的餐点！");
    return;
  }

  const newFood = { name, calories: calorieIntake };
  meal.items.push(newFood);
  meal.totalCalories += calorieIntake;
  this.totalCalories += calorieIntake;

// 调用方法更新剩余热量
  this.updateRemainingCalories();

  try {
    // 第一步：检查是否已有记录
    const getResponse = await fetch(
      `http://129.204.151.245:5001/user/${userId}/intake/date/${this.selectedDate}`,
      {
        method: "GET",
        headers: {
			"Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let intakeId;
    if (getResponse.ok) {
      const intakeData = await getResponse.json();
      intakeId = intakeData.intake_id; // 获取现有记录的 ID
    } else if (getResponse.status === 404) {
      // 如果记录不存在，则创建新记录
  const postResponse = await fetch(
    `http://129.204.151.245:5001/user/${userId}/intake`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date: this.selectedDate,
        eat_target: this.totalCalories || 0,
        breakfast: this.meals[0].items || [],
        lunch: this.meals[1].items || [],
        dinner: this.meals[2].items || [],
        more: this.meals[3].items || [],
        have_eat: [],
        drink_target: 0,
        have_drink: [],
		sports:this.meals[4].items || [],
      }),
    }
  );

      if (postResponse.ok) {
        const postData = await postResponse.json();
        intakeId = postData.intake_id; // 获取新记录的 ID
      } else {
        throw new Error("创建每日记录失败！");
      }
    } else {
      throw new Error("获取每日记录失败！");
    }

    // 第二步：更新记录
    const dailyData = {
      eat_target: this.totalCalories || 0,
      breakfast: this.meals[0].items || [],
      lunch: this.meals[1].items || [],
      dinner: this.meals[2].items || [],
      more: this.meals[3].items || [],
	  sports:this.meals[4].items || [],
    };

    const updateResponse = await fetch(
      `http://129.204.151.245:5001/user/${userId}/intake/${intakeId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dailyData),
      }
    );

    if (updateResponse.ok) {
      alert(`${name} 已添加到 ${meal.name}！`);
      this.updateRemainingCalories();
    } else {
      alert("更新饮食记录失败，请稍后重试！");
    }
  } catch (error) {
    console.error("添加饮食记录出错：", error);
    alert("添加饮食记录失败，请检查网络连接！");
  }
},

   async loadDailyRecords() {
     const userId = this.store.state.userId;
     const token = this.store.state.access_token;
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
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
           },
         }
       );
   
       if (response.ok) {
         const data = await response.json();
         
         // 加载各餐的食物记录
         this.meals[0].items = data.breakfast || [];
         this.meals[1].items = data.lunch || [];
         this.meals[2].items = data.dinner || [];
         this.meals[3].items = data.more || [];
         this.meals[4].items = data.sports || [];
   
         // 计算饮食总热量（不包括运动）
         this.totalCalories = this.meals.slice(0, 5).reduce((sum, meal) => {
           meal.totalCalories = meal.items.reduce((mealSum, item) => mealSum + item.calories, 0);
           return sum + meal.totalCalories;
         }, 0);
   
         // 计算运动消耗总热量
		 
         this.totalExercise = this.meals[4].items.reduce((exerciseSum, item) => exerciseSum + item.calories, 0);
   
         // 更新剩余热量
         this.updateRemainingCalories();
         
       } else if (response.status === 404) {
         this.resetDailyRecords(); // 如果没有记录，则重置
       } else {
         alert("加载记录失败，请稍后重试！");
       }
     } catch (error) {
       console.error("加载记录出错：", error);
       alert("加载记录失败，请检查网络连接！");
     }
   },

   
	async saveDailyRecords() {
	      const userId = this.store.state.userId;
	      const token = this.store.state.access_token;
	      if (!userId || !token) {
	        alert("请先登录！");
	        return;
	      }
	
	      const dailyData = {
	        date: this.selectedDate,
	        eat_target: this.totalCalories,
	        breakfast: this.meals[0].items,
	        lunch: this.meals[1].items,
	        dinner: this.meals[2].items,
	        more: this.meals[3].items,
			sports:this.meals[4].items,
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
	            body: JSON.stringify(dailyData),
	          }
	        );
	
	        if (response.ok) {
	          alert("记录保存成功！");
	        } else {
	          alert("保存失败，请稍后重试！");
	        }
	      } catch (error) {
	        console.error("保存记录出错：", error);
	        alert("保存记录失败，请检查网络连接！");
	      }
	    },
	
	    // 更新剩余可摄入热量
	updateRemainingCalories() {
	    this.remainingCalories =
	    this.recommendedCalories - this.totalCalories + this.totalExercise+this.totalExercise;
	},
	
	// 重置每日记录
	    resetDailyRecords() {
	      this.meals.forEach((meal) => {
	        meal.items = [];
	        meal.totalCalories = 0;
	      });
	      this.totalCalories = 0;
	      this.totalExercise = 0;
	      this.updateRemainingCalories();
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
	bottom: 110px;
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