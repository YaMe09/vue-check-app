<template>
  <v-container>
    <v-col
      cols="12"
      md="8"
      lg="4"
      :style="{ borderRadius: '25px', width: '485px' }"
    >
      <v-list :style="{flexDirection: 'column', alignItems: 'center'}">
        <v-list-item-group>
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
        </v-list-item-group>
      </v-list>
    </v-col>
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
  padding: 10px; /* Padding inside the container */
  border-radius: 10px; /* Rounded corners */

}
.checklist-card {
  margin: 12px 0; /* Margin for each checklist item */
  padding: 10px; /* Padding inside the card for touch */
  border: 1px ; /* Border around the checklist card */
  box-shadow: #a6c9a8;
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
  background: none;
}

</style>
