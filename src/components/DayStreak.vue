<template>
  <div class="day-streak">
    <span class="streak-number">{{ streak }}</span>
    <span class="streak-text">Dage i træk</span>
  </div>
</template>

<script>
export default {
  name: 'DayStreak',
  props: {
    streak: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>
.day-streak {
  display: flex;
  align-items: baseline;
  gap: 5px; /* Space between number and text */
}

.streak-number {
  font-size: 24px; /* Adjust as needed */
  font-weight: bold;
  text-align: right; /* Right-aligns the number */
}

.streak-text {
  font-size: 16px; /* Adjust as needed */
  font-weight: bold;
  color: #3E7A00;
  text-align: left; /* Left-aligns the text */
}
</style>
