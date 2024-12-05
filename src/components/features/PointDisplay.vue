<template>
  <!-- Award Badge -->
  <v-col cols="12" md="4" sm="6" class="award-badge" justify="center">
    <v-btn size="x-large" :style="{  borderRadius: '18px', width: '100%' }">
      <img src="@/images/drop.svg" :style="{ width: '24px', height: '24px', verticalAlign: 'middle' }" />
      &nbsp; {{ points }}
    </v-btn>
  </v-col>
</template>

<script>
export default {
  computed: {
    points() {
      return this.$store.state.totalPoints;
    },
  },
};
</script>
<style scoped>
.award-badge {
  text-align: center;
}
</style>
