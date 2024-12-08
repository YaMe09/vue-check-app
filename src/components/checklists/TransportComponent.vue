<template>
  <NavComponent />
  <MenuComponent />
  <v-app class="transport" id="transport">
    <v-container fluid fill-height :style="{ backgroundColor: '#E9E5E5', padding: '14px'}">
      <v-col cols="12" md="8" lg="4" class="text-center">
        <h2 class="question">Hvordan har din transport været?</h2>
      </v-col>

      <CheckList :style="{ backgroundColor: '#8981A8', width: '100%' }"
        :checklistItems="checklistItems"
        :selectedItems="selectedItems"
        @update:selectedItems="updateSelectedItems"
      />

      <ArrowComponent nextRoute="/elUse" previousRoute="/userPage" />


    </v-container>
  </v-app>
</template>

<script>
import CheckList from '../features/CheckList.vue';
import NavComponent from '../navigation/NavComponent.vue';
import ArrowComponent from '../navigation/ArrowComponent.vue';
import MenuComponent from '../navigation/MenuComponent.vue';

export default {
  components: {
    MenuComponent,
    CheckList,
    NavComponent,
    ArrowComponent,
  },
  data() {
    return {
      checklistItems: [],
    };
  },
  computed: {
    selectedItems() {
      return this.$store.state.selectedItems; // Get selected items from Vuex state
    },
    totalPoints() {
      return this.$store.getters.getTotalPoints; // Get total points from Vuex getter
    },
    userLevel() {
      return this.$store.getters.getUserInfo.level; // Get user level from Vuex store
    },
  },
  created() {
    this.fetchChecklistItems();
  },
  methods: {
    async fetchChecklistItems() {
      try {
        // Antag at category_id for 'transport' er 2
        const categoryId = 2;
        const response = await fetch(`http://localhost:3000/api/checklists/${categoryId}/${this.userLevel}`);
        const data = await response.json();
        this.checklistItems = data;
      } catch (error) {
        console.error('Error fetching checklist items:', error);
      }
    },
    updateSelectedItems(newSelectedItems) {
      this.$store.dispatch('updateSelectedItems', newSelectedItems); // Update selected items in Vuex
      this.$store.dispatch('updateTotalPoints'); // Recalculate total points after updating selected items
    },
  },
};
</script>

<style scoped>
.v-container {
  padding: 0;
}

.question {
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 24px;
}
.selected {
  background-color: #4CAF50;
  color: white;
}
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
.award-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  border-radius: 25px;
  opacity: 0.9;
  background: #8981A8;
}
.award-badge .v-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.v-list-item-subtitle {
  font-size: 16px;
  color: #000;
}
.v-list-item-title {
  font-size: 20px;
  color: black;
  margin-top: 5px;
}
.v-list-item-action {
  width: 0;
  height: 0;
}
.v-list-item--density-default.v-list-item--one-line {
  padding: 15px;
  margin-top: 8px;
  margin-bottom: 12px;
  justify-content: center;
}
.v-list{
  padding: 0;
}
</style>
