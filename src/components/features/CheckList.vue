<template>
  <v-container :style="{ padding: '22px', width: '100%', maxWidth: '380px' }">
    <v-list>
      <v-list-item
        v-for="item in checklistItems"
        :key="item.id"
        @click="selectItem(item)"
        :class="{ 'selected': localSelectedItems.includes(item), 'disabled': localSelectedItems.length && !localSelectedItems.includes(item) }"
        :style="itemStyle(item)"
        class="checklist-card"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  props: {
    checklistItems: {
      type: Array,
      required: true,
    },
    selectedItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      localSelectedItems: [...this.selectedItems], // Kopierer selectedItems
    };
  },
  watch: {
    selectedItems: {
      handler(newVal) {
        this.localSelectedItems = [...newVal]; // Opdaterer lokal kopi
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    selectItem(item) {
      if (this.localSelectedItems.includes(item)) {
        this.localSelectedItems = this.localSelectedItems.filter(i => i !== item);
      } else {
        this.localSelectedItems.push(item);
      }
      this.updateSelectedItems();
    },
    updateSelectedItems() {
      // Udsender opdaterede valgte elementer til forælderen
      this.$emit('update:selectedItems', this.localSelectedItems);
    },
    itemStyle(item) {
      return this.localSelectedItems.includes(item)
        ? { backgroundColor: '#4caf50' }
        : { backgroundColor: '#D9D9D9' };
    },
  },
};
</script>

<style scoped>
.v-container {
  justify-content: center;
  /* Padding inside the container */

}
.center-text {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 35px;
}
.checklist-card {
  margin: 12px 0; /* Margin for each checklist item */ /* Padding inside the card for touch */
  display: flex;
  height: 90px;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease; /* Smooth transition */
}
.checklist-card.selected {
  background-color: #4caf50; /* Green color when selected */
  color: white; /* Text color when selected */
}


.v-list{
   overflow: none;
    padding: 0;
    background: none;
}
.v-list-item.v-list-item--link.v-theme--light.v-list-item--density-default.rounded-0.v-list-item--variant-text.checklist-card{
  background: 'none';
}
</style>
