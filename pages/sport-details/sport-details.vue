<template>
  <div class="exercise-record">
    <div class="main-image">
      <img src="@/pages/images/background.jpg" alt="logo" class="background-image" />
    </div>
    <!-- Header -->
    <header class="header"></header>

    <!-- Today Summary -->
    <section class="today-summary">
      <div class="date-section">
        <h3>{{ selectedDate }}</h3>
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
        <li v-for="(record, index) in historyRecords" :key="record.id">
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
      <text @click="updateRecommendations" style="display: block; margin-left: 120px; cursor: pointer;">🔄 换一下</text>
    </section>
  </div>
</template>

<script>
import { useStore } from "vuex";
import axios from 'axios';
export default {
   data() {
       return {
         caloriesBurned: 0, // 当前热量消耗
         showHistory: false, // 显示历史记录标志
         historyRecords: [], // 用户历史运动记录
         exercises: [
           { id: 1, name: "瑜伽伸展课程", description: "第一课 | 入门瑜伽伸展", time: 6, calories: 29 },
           { id: 2, name: "初级拳击课程", description: "第一课 | 燃脂拳击初级", time: 7, calories: 141 },
         ],
         selectedDate: this.formatDate(new Date()), // 当前日期
         measurementId: null, // 当前的记录 ID
         userId: null, // 用户ID
         accessToken: null, // 授权Token
       };
     },
  setup() {
    const store = useStore(); // 创建 store 实例
    return { store };
  },
  mounted() {
   this.checkDateAndReset(); // 检查日期并清零
       this.loadExerciseRecords(); // 加载用户运动记录
  },
  methods: {
    formatDate(date) {
      return date.toISOString().split("T")[0];
    },
  // 检查日期并重置当天记录
     checkDateAndReset() {
        const savedDate = localStorage.getItem("lastRecordedDate");
        const currentDate = this.formatDate(new Date());
        
        if (savedDate !== currentDate) {
          // 日期改变，清空历史记录
          this.caloriesBurned = 0;
          this.historyRecords = [];
          this.measurementId = null;
          localStorage.setItem("lastRecordedDate", currentDate);
          localStorage.setItem("caloriesBurned", 0);
          console.log("新的一天，创建初始记录...");
        //  this.createInitialRecord();
        } else {
          // 日期没变，加载历史记录
          this.caloriesBurned = parseInt(localStorage.getItem("caloriesBurned")) || 0;
          console.log(`加载当天的总热量：${this.caloriesBurned}`);
          this.loadExerciseRecords();
        }
      },
	// 保存当天的消耗热量
	    saveCalories() {
	      localStorage.setItem("caloriesBurned", this.caloriesBurned);
	      console.log(`保存热量到 localStorage：${this.caloriesBurned}`);
	    },


 // 加载用户的运动记录
  async loadExerciseRecords() {
    const userId = this.$store.state.userId;  // 从 Vuex 获取用户 ID
    const token = this.$store.state.access_token;  // 从 Vuex 获取用户 token
  
    if (!userId || !token) {
      alert("请先登录！");
      this.$router.push("/pages/login/login");
      return;
    }
  
    const date = this.selectedDate; // 当前日期
    try {
      // 请求后端 API 获取指定日期的运动记录
      const response = await axios.get(`http://localhost:5000/sports/user/${userId}/sports`, {
        params: { date }, // 传递日期作为查询参数
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        const { sports, total_calories } = response.data;
        this.historyRecords = sports.map(record => ({
          id: record.measurement_id,
          date: record.created_at,  // 记录的创建日期
          name: record.name,        // 运动名称
          calories: record.calories, // 消耗的热量
        }));
  
        this.caloriesBurned = total_calories; // 更新当天的总热量
      } else {
        console.error("加载运动记录失败");
      }
    } catch (error) {
      console.error("加载运动记录出错：", error);
      alert("加载运动记录失败，请检查网络连接！");
    }
  },
     // 创建初始运动记录（当没有 measurementId 时）
       async createInitialRecord() {
         const userId = this.$store.state.userId;
         const token = this.$store.state.access_token;
   
         if (!userId || !token) {
           alert("请先登录！");
           return false;
         }
   
         try {
           const response = await fetch(
             `http://127.0.0.1:5000/sports/user/${userId}/sports`,
             {
               method: "POST",
               headers: {
                 "Content-Type": "application/json",
                 Authorization: `Bearer ${token}`,
               },
               body: JSON.stringify({ sports: { name: "初始记录", calories: 0 } }),
             }
           );
   
           if (response.ok) {
             const result = await response.json();
             this.measurementId = result.measurement_id; // 保存新的记录 ID
             console.log("初始记录创建成功：", result);
             return true;
           } else {
             const error = await response.json();
             console.error("创建初始记录失败：", error);
             return false;
           }
         } catch (error) {
           console.error("创建初始记录失败：", error);
           return false;
         }
       },


    // 记录用户运动
      async recordExercise() {
        const userId = this.$store.state.userId;
        const token = this.$store.state.access_token;
      
        if (!userId || !token) {
          alert("请先登录！");
          return;
        }
      
        const exerciseCalories = prompt("请输入消耗的热量 (千卡):", "50");
        if (!/^\d+$/.test(exerciseCalories)) {
          alert("请输入一个有效的正整数值！");
          return;
        }
      
        const newExercise = {
          name: "自定义运动",
          calories: parseInt(exerciseCalories),
        };
      
        try {
          // 发送 POST 请求到后端创建运动记录
          const response = await axios.post(
            `http://localhost:5000/api/sports/user/${userId}`,
            { sports: newExercise },
            {
              headers: {
                "Authorization": `Bearer ${token}`,
              },
            }
          );
      
          if (response.status === 201) {
            this.historyRecords.push({
              id: response.data.measurement_id,
              date: this.selectedDate,
              name: newExercise.name,
              calories: newExercise.calories,
            });
            this.caloriesBurned += newExercise.calories;
            console.log("已记录运动：", newExercise);
            alert(`已记录 ${newExercise.name} 的运动，消耗 ${newExercise.calories} 千卡！`);
          } else {
            console.error("添加运动记录失败");
            alert("记录运动失败，请稍后重试！");
          }
        } catch (error) {
          console.error("记录运动出错：", error);
          alert("记录运动失败，请检查网络连接！");
        }
      },
	  
    toggleHistory() {
      this.showHistory = !this.showHistory;
    },
	
  // 记录具体运动
   // 记录具体运动
   async recordSpecificExercise(exercise) {
     const userId = this.$store.state.userId;
     const token = this.$store.state.access_token;
   
     if (!userId || !token) {
       alert("请先登录！");
       return;
     }
   
     try {
       // 如果没有 measurementId，则创建新记录
       if (!this.measurementId) {
         const response = await axios.post(
           `http://127.0.0.1:5000/sports/user/${userId}/sports`,
           { sports: { name: "初始记录", calories: 0 } },
           {
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
             },
           }
         );
   
         if (response.status === 201) {
           this.measurementId = response.data.measurement_id; // 保存新的记录 ID
           console.log("创建新的记录 ID：", this.measurementId);
         } else {
           console.error("创建初始记录失败");
           alert("无法创建初始记录！");
           return;
         }
       }
   
       // 记录运动
       const response = await axios.put(
         `http://127.0.0.1:5000/sports/user/${userId}/sports/${this.measurementId}`,
         { sports: { name: exercise.name, calories: exercise.calories } },
         {
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
           },
         }
       );
   
       if (response.status === 200) {
         this.historyRecords.push({
           id: this.measurementId,
           date: this.selectedDate,
           name: exercise.name,
           calories: exercise.calories,
         });
         this.caloriesBurned += exercise.calories;
         console.log("记录运动成功：", exercise);
         alert(`已记录 ${exercise.name} 的运动，消耗 ${exercise.calories} 千卡！`);
       } else {
         console.error("记录运动失败");
         alert("记录运动失败，请稍后重试！");
       }
     } catch (error) {
       console.error("记录运动出错：", error);
       alert("记录运动失败，请检查网络连接！");
     }
   }
,

    // 模拟从服务器获取新的推荐运动
    updateRecommendations() {
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
