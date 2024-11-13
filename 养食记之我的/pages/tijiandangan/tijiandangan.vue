<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
<!-- pages/health-record/health-record.vue -->
<template>
  <view class="container">
    <!-- 时间显示 -->
    <text class="time">12:00</text>

    <!-- 顶部导航栏 -->
    <NavBar />

    <!-- 健康状况 -->
    <view class="section">
      <text class="section-title">健康状况</text>
      <view class="section-content">
        <text>无慢性疾病</text>
        <text>无过敏现象</text>
      </view>
    </view>

    <!-- 生活习惯 -->
    <view class="section">
      <text class="section-title">生活习惯</text>
      <view class="section-content">
        <text>轻度运动</text>
        <text>经常久坐</text>
      </view>
    </view>

    <!-- 体检结果 -->
    <view class="section">
      <text class="section-title">体检结果</text>
      <view class="section-content">
        <text>血糖水平正常</text>
        <text>血脂水平正常</text>
      </view>
    </view>

    <!-- 其他指标 -->
    <view class="section">
      <text class="section-title">其他指标</text>
      <view class="section-content">
        <image class="chart" src="static/images/chart.png" />
        <text>图表和数据</text>
      </view>
    </view>
  </view>
</template>

<script>
import NavBar from '../../components/NavBar.vue'

export default {
  components: {
    NavBar
  }
}
</script>

<style>
.container {
  padding: 20px;
}

/* 时间显示 */
.time {
  font-size: 16px;
  color: #555;
  margin-bottom: 10px;
}

/* 体检档案内容 */
.section {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #DDD;
  border-radius: 5px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #007AFF;
}

.section-content {
  font-size: 16px;
  color: #333;
}

.chart {
  width: 100%;
  height: 200px;
  margin-top: 10px;
}
</style>