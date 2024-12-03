<template>
  <div class="user-level-display">
    <p class="level-text">Level {{ userLevel }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    userLevel() {
      return this.$store.getters.getUserInfo.level; // Get user level from Vuex store
    }
  }
};
</script>

<style scoped>
.user-level-display {
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
  color: black;
}

.level-text {
  font-size: 18px;
}
</style>
