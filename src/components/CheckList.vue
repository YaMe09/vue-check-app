<template>
  <v-container :style="{  borderRadius: '25px', padding: '24px', width:'360px'}">

      <v-list :style="{ flexDirection: 'column', alignItems: 'center' }">
        <v-list-item-group>
          <v-list-item
            v-for="item in checklistItems"
            :key="item.id"
            @click="selectItem(item)"
            :class="{ 'selected': localSelectedItems.includes(item), 'disabled': localSelectedItems.length && !localSelectedItems.includes(item) }"
            :style="itemStyle(item)"
            class="checklist-card"
          >
            <v-list-item-content class="center-text">
              <v-list-item-title class="center-text">{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle class="center-text"> Score: {{ item.score }}</v-list-item-subtitle>
            </v-list-item-content>

              <v-checkbox
                v-model="localSelectedItems"
                :value="item"
                :disabled="localSelectedItems.length && !localSelectedItems.includes(item)"
                :aria-label="item.name"
                class="custom-checkbox"
                @change="updateSelectedItems"
              />

          </v-list-item>
        </v-list-item-group>
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
  border-radius: 10px; /* Rounded corners */

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
  margin: 8px 0; /* Margin for each checklist item */ /* Padding inside the card for touch */
  padding: 16px;
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease; /* Smooth transition */
}
.checklist-card.selected {
  background-color: #4caf50; /* Green color when selected */
  color: white; /* Text color when selected */
}
.custom-checkbox {
  color: #4caf50; /* Checkbox color */
}
.custom-checkbox input:checked ~ .v-input__control .v-input__slot {
  background-color: #a6c9a8;
}

.v-list{
   overflow: none;
    padding: 0;
    background: none;
}

</style>
