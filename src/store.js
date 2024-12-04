import { createStore } from 'vuex';

const store = createStore({
  state: {
    selectedItems: [],
    totalPoints: 0,
    userInfo: {
      id: null,
      name: '',
      level: 1,
      password: '',
      points: 0,
    },
  },
  mutations: {
    updateSelectedItems(state, items) {
      state.selectedItems = items;
    },
    updateTotalPoints(state) {
      state.totalPoints = state.selectedItems.reduce((total, item) => total + item.score, 0);
      state.userInfo.points = state.totalPoints; // Opdater points i userInfo
    },
    setUserInfo(state, userInfo) {
      state.userInfo.id = userInfo.id;
      state.userInfo.name = userInfo.name;
      state.userInfo.level = userInfo.level;
      state.userInfo.password = userInfo.password;
      state.userInfo.points = userInfo.points;
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
    async setUserInfo({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/api/auth/user', {
          method: 'GET',
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        });
        const data = await response.json();
        commit('setUserInfo', data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    async incrementUserLevel({ commit, state }) {
      commit('incrementUserLevel');
      try {
        await fetch('http://localhost:3000/api/auth/user/level', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
          },
          body: JSON.stringify({ level: state.userInfo.level })
        });
      } catch (error) {
        console.error('Error updating user level:', error);
      }
    }
  },
  getters: {
    getSelectedItems: (state) => state.selectedItems,
    getTotalPoints: (state) => state.userInfo.points, // Returner points fra userInfo
    getUserInfo: (state) => state.userInfo,
  },
});

export default store;
