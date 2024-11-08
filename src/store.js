// store.js (or vuex/store.js)
import { createStore } from 'vuex';

const store = createStore({
  state: {
    selectedItems: [],
    totalPoints: 0,
  },
  mutations: {
    setSelectedItems(state, selectedItems) {
      state.selectedItems = selectedItems;
    },
    setTotalPoints(state, points) {
      state.totalPoints = points;
    },
  },
  actions: {
    updateSelectedItems({ commit }, selectedItems) {
      commit('setSelectedItems', selectedItems);
    },
    updateTotalPoints({ commit, state }) {
      const totalPoints = state.selectedItems.reduce((sum, item) => {
        return sum + item.score;
      }, 0);
      commit('setTotalPoints', totalPoints);
    },
  },
  getters: {
    getTotalPoints(state) {
      return state.totalPoints;
    },
  },
});

export default store;
