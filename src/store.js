import { createStore } from 'vuex';

const store = createStore({
  state: {
    selectedItems: [],
    totalPoints: 0,
    userInfo: {
      id: null,
      name: '',
      level: 1, // Tilføj level her
      password: '',
    },
  },
  mutations: {
    updateSelectedItems(state, items) {
      state.selectedItems = items;
    },
    updateTotalPoints(state) {
      state.totalPoints = state.selectedItems.reduce((total, item) => total + item.score, 0);
    },
    setUserInfo(state, userInfo) {
      state.userInfo.id = userInfo.id;
      state.userInfo.name = userInfo.name;
      state.userInfo.level = userInfo.level;
      state.userInfo.password = userInfo.password;
    },
    incrementUserLevel(state) {
      state.userInfo.level += 1;
    }
  },
  actions: {
    updateSelectedItems({ commit }, items) {
      commit('updateSelectedItems', items);
      commit('updateTotalPoints');
    },
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
    },
    incrementUserLevel({ commit }) {
      commit('incrementUserLevel');
    }
  },
  getters: {
    getSelectedItems: (state) => state.selectedItems,
    getTotalPoints: (state) => state.totalPoints,
    getUserInfo: (state) => state.userInfo,
  },
});

export default store;
