<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
<!-- App.vue -->
<template>
  <view>
    <router-view />
    <component v-if="showNavBar" :is="currentTab" />
  </view>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      currentTab: 'NavBar',
      showNavBar: true
    }
  }
}
</script>

<style>
/* 全局样式 */
</style>