// #ifndef VUE3
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
// #endif

// #ifdef VUE3
import { createStore } from 'vuex';
const store = createStore({
// #endif
  state: {
    userId: localStorage.getItem('userId') || null,
    access_token: localStorage.getItem('accessToken') || null,
	avatar_url: localStorage.getItem('avatar_url') || null,
	nickname:localStorage.getItem('nickname') || null,
	
    hasLogin: !!localStorage.getItem('userId'),
    isUniverifyLogin: false,
    loginProvider: '',
    openid: null,
    testvuex: false,
    colorIndex: 0,
    colorList: ['#FF0000', '#00FF00', '#0000FF'],
    noMatchLeftWindow: true,
    active: 'componentPage',
    leftWinActive: '/pages/component/view/view',
    activeOpen: '',
    menu: [],
    univerifyErrorMsg: '',
  },
  mutations: {
    // 设置用户信息
    setUser(state, { userId, accessToken }) {
      state.userId = userId;
      state.access_token = accessToken;
      state.hasLogin = true;
      localStorage.setItem('userId', userId);
      localStorage.setItem('accessToken', accessToken);
    },
    // 清除用户信息
    logout(state) {
      state.userId = null;
      state.access_token = null;
      state.hasLogin = false;
      localStorage.removeItem('userId');
      localStorage.removeItem('accessToken');
    },
	setNickname(state,nickname) {
		state.nickname=nickname;
	},
	setAvatar_url(state,avatar_url) {
		state.avatar_url = avatar_url;
	},
    setUserId(state, userId) {
      state.userId = userId;
    },
    setAccessToken(state, access_token) {
      state.access_token = access_token;
    },
	
    login(state, provider) {
      state.hasLogin = true;
      state.loginProvider = provider;
    },
    setOpenid(state, openid) {
      state.openid = openid;
    },
    setTestTrue(state) {
      state.testvuex = true;
    },
    setTestFalse(state) {
      state.testvuex = false;
    },
    setColorIndex(state, index) {
      state.colorIndex = index;
    },
    setMatchLeftWindow(state, matchLeftWindow) {
      state.noMatchLeftWindow = !matchLeftWindow;
    },
    setActive(state, tabPage) {
      state.active = tabPage;
    },
    setLeftWinActive(state, leftWinActive) {
      state.leftWinActive = leftWinActive;
    },
    setActiveOpen(state, activeOpen) {
      state.activeOpen = activeOpen;
    },
    setMenu(state, menu) {
      state.menu = menu;
    },
    setUniverifyLogin(state, payload) {
      state.isUniverifyLogin = !!payload;
    },
    setUniverifyErrorMsg(state, payload = '') {
      state.univerifyErrorMsg = payload;
    },
  },
  getters: {
    currentColor: (state) => state.colorList[state.colorIndex],
    getUserId: (state) => state.userId,
    getAccessToken: (state) => state.access_token,
	getAvatar_url:(state) => state.avatar_url,
	getNickname:(state)=>state.nickname,
  },
  actions: {
    setUserId({ commit }, userId) {
      commit('setUserId', userId);
    },
    setAccessToken({ commit }, access_token) {
      commit('setAccessToken', access_token);
    },
	setAvatar_url({commit},avatar_url){
		commit('setAvatar_url',avatar_url);
	},
	setNickname({commit},nickname){
		commit('setNickname',nickname);
	},
    // 模拟获取 OpenId
    getUserOpenId({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.openid) {
          resolve(state.openid);
        } else {
          uni.login({
            success: (data) => {
              commit('login');
              setTimeout(() => {
                const openid = '123456789'; // 模拟返回的 openid
                console.log(`uni.request mock openid[${openid}]`);
                commit('setOpenid', openid);
                resolve(openid);
              }, 1000);
            },
            fail: (err) => {
              console.log('uni.login 接口调用失败', err);
              reject(err);
            },
          });
        }
      });
    },
    // 获取手机号示例
    getPhoneNumber({ commit }, univerifyInfo) {
      return new Promise((resolve, reject) => {
        uni.request({
          url: 'https://example.com/univerify-login',
          method: 'POST',
          data: univerifyInfo,
          success: (res) => {
            const data = res.data;
            if (data.success) {
              resolve(data.phoneNumber);
            } else {
              reject(res);
            }
          },
          fail: (err) => {
            reject(err);
          },
        });
      });
    },
    // 登录逻辑
    async login({ commit }, { userId, accessToken }) {
      commit('setUser', { userId, accessToken });
    },
    // 退出登录
    logout({ commit }) {
      commit('logout');
    },
  },
});

export default store;
