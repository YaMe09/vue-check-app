<template>
  <NavComponent/>
  <MenuComponent/>
  <v-app >
    <v-container fluid fill-height  :style="{ backgroundColor: '#000', width: '100%', padding: '24px'}">
      <br/>
      <v-col cols="12" md="8" lg="4" class="text-center">
        <h2 class="question">Husholdning</h2>
      </v-col>
      <CheckList
        :style="{ width: '100%' }"
        :checklistItems="checklistItems"
        :selectedItems="selectedItems"
        @update:selectedItems="updateSelectedItems"
      />

      <ArrowComponent nextRoute="/foodWaste" previousRoute="/elUse" />
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
        // Antag at category_id for 'usedthing' er 4
        const categoryId = 4;
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
  background: #000;
  color: #85C7C7;
}

.question {
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 24px;
  color: #85C7C7;
}
</style>
