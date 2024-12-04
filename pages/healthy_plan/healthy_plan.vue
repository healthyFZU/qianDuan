<template>
  <div class="favorites-page">
    <!-- 收藏列表 -->
    <div class="favorites-list">
	  <!-- 无计划提示 -->
	  <div v-if="noPlan" class="no-plan">
	    <p>您还没有生成任何计划</p>
	  </div>
      <div v-if="favoritePlans.length === 0 && !planResult" class="empty-state">
        <img src="../../pages/images/捂嘴.png" alt="暂无收藏" />
      </div>
      <div v-else>
        <div class="favorite-item" v-for="plan in favoritePlans" :key="plan.id">
          <div class="plan-details">
            <h4 class="plan-title">{{ plan.title }}</h4>
            <p class="plan-description">{{ plan.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 健康计划生成部分 -->
    <div class="create-plan-section" v-if="!planResult">
      <button @click="viewPlan" class="view-button">查看健康计划</button>
	  <text @click="generatePlan" class="generate-button">--立即生成--</text>
    </div>

    <!-- 生成的健康计划 -->
    <div v-if="planResult" class="result">
      <h4>一周健康计划推荐：</h4>
      <pre>{{ planResult }}</pre>
      <!-- 保存和取消按钮 -->
	  <div class="result-buttons">
		<button @click="savePlan" class="save-button">保存</button>
		<button @click="cancelPlan" class="cancel-button">取消</button>
	  </div>
    </div>

    <!-- 保存成功提示 -->
    <div v-if="saveSuccess" class="save-success">
      <p>健康计划已成功保存！</p>
    </div>

  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore(); // 获取 Vuex store
    const userId = computed(() => store.state.userId); // 从 Vuex 获取 userId
    const favoritePlans = computed(() => store.state.favoritePlans || []); // 获取收藏的健康计划，默认为空数组

    const planResult = ref('');  // 使用 ref 来创建响应式数据
    const saveSuccess = ref(false);  // 控制保存成功提示的显示
    const noPlan = ref(false); // 控制无计划提示框的显示
	console.log(userId.value)
    // 生成健康计划
    const generatePlan = () => {
      // 检查 userId 是否有效
      if (!userId.value || isNaN(userId.value)) {
        alert('未能获取有效的用户ID');
        return;
      }

      // 发送 POST 请求生成健康计划
      fetch('http://129.204.151.245:5004/make_plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId.value }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.weekly_plan) {
          planResult.value = data.weekly_plan;  // 更新响应式数据，确保只返回一份健康计划
          noPlan.value = false;  // 清除无计划提示框
        } else {
          alert('未能生成健康计划，错误信息：' + (data.error || '未知错误'));
        }
      })
      .catch(error => {
        alert('请求失败: ' + error.message);
      });
    };

    // 保存健康计划到数据库
    const savePlan = () => {
      if (planResult.value) {
        // 向后端发送请求，将健康计划保存到数据库
        fetch('http://129.204.151.245:5003/save_plan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId.value,
            context: planResult.value,
          }),
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            saveSuccess.value = true; // 显示保存成功提示
            setTimeout(() => {
              saveSuccess.value = false; // 2秒后隐藏成功提示
            }, 2000);
          } else {
            alert('保存失败，错误信息：' + (data.error || '未知错误'));
          }
        })
        .catch(error => {
          alert('请求失败: ' + error.message);
        });
      } else {
        alert('请先生成健康计划');
      }
    };

    // 取消操作
    const cancelPlan = () => {
      planResult.value = '';  // 清除健康计划
    };

    // 查看健康计划
    const viewPlan = () => {
      // 发送请求获取该用户的最新健康计划
      fetch(`http://129.204.151.245:5005/get_plan?user_id=${userId.value}`)
        .then(response => response.json())
        .then(data => {
          if (data.plan) {
            planResult.value = data.plan;  // 显示该用户的健康计划
            noPlan.value = false;  // 清除无计划提示框
          } else {
            noPlan.value = true;  // 显示无计划提示框
          }
        })
        .catch(error => {
          alert('请求失败: ' + error.message);
        });
    };

    return { userId, favoritePlans, planResult, saveSuccess, noPlan, generatePlan, savePlan, cancelPlan, viewPlan };
  }
};
</script>

<style scoped>
/* 收藏列表样式 */
.favorites-list {
  padding: 10px;
}

.favorite-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.plan-details {
  margin-left: 10px;
}

.plan-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.plan-description {
  font-size: 14px;
  color: #666;
  margin: 5px 0 0;
}

/* 健康计划生成区域样式 */
.create-plan-section {
  margin-top: 100px;
  padding: 20px;
  border-radius: 10px;

}

/* 按钮样式 */

.view-button {
  flex: 1; /* 按钮等宽 */
  padding: 1px 5px;
  background-color: #50cc8e;
  width: 50%;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 25px;
  cursor: pointer;
  text-align: center;
  position: relative;
  bottom: 40px;
}
.generate-button{
	color: #666;
	cursor: pointer;
	display: flex; /* 使用 Flex 布局 */
	justify-content: center; /* 水平方向居中 */

}
.generate-button:hover{
	color: #45a049;
}
.view-button:hover {
  background-color: #45a049;
}

/* 健康计划容器样式 */
.result {
  width: 70%; /* 调整宽度，适应不同屏幕 */
  margin: 20px auto; /* 居中显示 */
  padding: 20px 30px; /* 增加内边距，显得更舒适 */
  background-color: #ffffcc; /* 柔和的背景色 */
  border: 1px solid #d1e9ff; /* 边框颜色 */
  border-radius: 15px; /* 轻微圆角 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  text-align: center; /* 居中对齐文字 */
}

/* 健康计划标题 */
.result h4 {
  color: #333; /* 标题颜色 */
  font-size: 18px; /* 字体大小 */
  margin-bottom: 15px; /* 与内容保持间距 */
}

/* 健康计划内容 */
.result pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Courier New', Courier, monospace; /* 修改字体风格 */
  font-size: 16px; /* 调整字体大小 */
  color: #555; /* 文字颜色 */
  background: #ffffff; /* 添加背景色 */
  padding: 10px;
  border-radius: 15px;
  border: 1px dashed #d1e9ff;
  text-align: left;
  margin-top: 10px;
}

/* 按钮容器 */
.result-buttons {
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex; /* 确保 Flex 布局生效 */
  justify-content: space-between; /* 水平分布按钮 */
  width: 100%; /* 确保容器宽度 */
  position: relative;
  top: 20px;
}

.save-button,
.cancel-button {
  flex: 1; /* 等宽 */
  max-width: 30%; /* 限制最大宽度 */
  padding: 0px; /* 适当的内边距 */
  background-color: #50cc8e; /* 保存按钮背景色 */
  color: white;
  border: none;
  border-radius: 25px; /* 圆角 */
  cursor: pointer;
  text-align: center;
  font-size: 16px; /* 字体大小 */
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #218838;
}

.cancel-button {
  background-color: #dc3545; /* 取消按钮背景色 */
}

.cancel-button:hover {
  background-color: #c82333;
}


/* 保存成功提示样式 */
.save-success {
  margin-top: 20px;
  padding: 10px;
  background-color: #28a745;
  color: white;
  text-align: center;
  border-radius: 5px;
}

/* 无健康计划提示样式 */
.no-plan {
  margin-top: 100px;
  background-color: #ffffff;
  color: black;
  text-align: center;
  border-radius: 5px;
}
/* 空列表状态 */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* 根据需要调整高度 */
  text-align: center;
}

.empty-state img {
  width: 300px; /* 设置图片的宽度，按需要调整 */
  margin-top: 120px;
}

</style>
