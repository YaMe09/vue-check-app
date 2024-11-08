<template>
  <div class="total-points">
    <span class="points-value">{{ totalPoints }}</span>
    <span class="points-text">Gram CO2 sparet</span>
  </div>
</template>

<script>
export default {
  name: 'TotalPoints',
  props: {
    totalPoints: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>
.total-points {
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.points-value {
  font-size: 24px;
  font-weight: bold;
  text-align: right; /* Right-aligns the points number */
}

.points-text {
  font-size: 16px;
  font-weight: bold;
  color: #3E7A00;
  text-align: left; /* Left-aligns the text */
}
</style>
