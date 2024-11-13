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
<!-- pages/general-settings/general-settings.vue -->
<template>
  <view class="container">
    <!-- 语言选择 -->
    <view class="section">
      <text class="section-title">语言选择</text>
      <picker mode="selector" :range="languages" @change="onLanguageChange">
        <view class="picker">
          <text>{{ selectedLanguage }}</text>
          <image class="arrow-icon" src="static/icons/arrow-right.png" />
        </view>
      </picker>
    </view>

    <!-- 主题/界面风格选择 -->
    <view class="section">
      <text class="section-title">主题/界面风格选择</text>
      <view class="options">
        <view class="option-item" @click="toggleTheme('light')">
          <text>浅色模式</text>
          <image v-if="themeSetting === 'light'" class="check-icon" src="static/icons/check.png" />
        </view>
        <view class="option-item" @click="toggleTheme('dark')">
          <text>深色模式</text>
          <image v-if="themeSetting === 'dark'" class="check-icon" src="static/icons/check.png" />
        </view>
      </view>
    </view>

    <!-- 字体大小调整 -->
    <view class="section">
      <text class="section-title">字体大小调整</text>
      <view class="slider-container">
        <slider v-model="fontSize" show-value min="12" max="24" @change="onFontSizeChange" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'GeneralSettingsPage',
  data() {
    return {
      languages: ['中文', '英文', '其他'],
      selectedLanguage: '中文',
      themeSetting: 'light',
      fontSize: 16
    }
  },
  methods: {
    onLanguageChange(e) {
      this.selectedLanguage = this.languages[e.detail.value];
    },
    toggleTheme(theme) {
      this.themeSetting = theme;
      // 切换主题的逻辑
      if (theme === 'light') {
        // 设置浅色模式
        uni.setStorageSync('theme', 'light');
      } else {
        // 设置深色模式
        uni.setStorageSync('theme', 'dark');
      }
    },
    onFontSizeChange(e) {
      this.fontSize = e.detail.value;
      // 设置字体大小的逻辑
      uni.setStorageSync('fontSize', this.fontSize);
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
}

/* 设置列表 */
.section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.picker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #DDD;
}

.arrow-icon {
  width: 20px;
  height: 20px;
}

.options {
  display: flex;
  flex-direction: column;
}

.option-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #DDD;
}

.check-icon {
  width: 20px;
  height: 20px;
}

.slider-container {
  padding: 10px 0;
}
</style>