<template>
  <NavComponent />
  <v-app class="transport" id="transport">
    <v-container fluid fill-height :style="{backgroundColor:'#E9E5E5', width: '100%', padding: '24px'}">

      <!-- Heading -->
      <v-col cols="12" md="8" lg="4" class="text-center">
        <h2 class="question">Hvilket transportmiddel har du brugt?</h2>
      </v-col>

      <!-- Transport Options -->
      <v-col
        cols="12"
        md="8"
        lg="4"
        align="center"
        :style="{ backgroundColor: '#8981A8', borderRadius: '25px', padding: '24px', width: '485px', marginBottom: '24px' }"
      >
        <v-list :style="{ backgroundColor: '#8981A8', flexDirection: 'column', alignItems: 'center' }">
          <v-list-item-group>
            <v-list-item
              v-for="option in transportSchedule"
              :key="option.id"
              @click="selectOption(option.id)"
              :class="{ 'selected': selectedOption === option.id, 'disabled': selectedOption && selectedOption !== option.id }"
              :style="optionStyle(option.id)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ option.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ option.emission }} g CO₂ - Score: {{ option.score }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox
                  v-model="selectedOption"
                  :value="option.id"
                  :disabled="selectedOption && selectedOption !== option.id"
                  :aria-label="option.name"
                />
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>

      <!-- Navigation Arrows -->
      <v-col cols="12">
        <v-row align="center" justify="space-between">
          <v-col cols="auto">
            <img src="../images/Undo.svg" @click="previousStep" />
          </v-col>
          <v-spacer />
          <v-col cols="auto">
            <img src="../images/Forward Arrow.svg" @click="nextStep" />
          </v-col>
        </v-row>
      </v-col>
      <br/>
      <br/>
      <br/>
      <!-- Award Badge -->
      <PointDisplay :points="totalPoints" />
      <CalculatePoints :selectedItems="selectedItems" @update:points="updatePoints" />
    </v-container>
  </v-app>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import PointDisplay from './PointDisplay.vue';
import NavComponent from './NavComponent.vue';
import { VList, VListItem, VListItemTitle, VListItemSubtitle, VListItemAction, VCheckbox, VCol, VRow, VContainer, VApp, VSpacer } from 'vuetify/components';

export default defineComponent({
  name: 'TransportComponent',
  components: {
    NavComponent,
    PointDisplay,
    VList,
    VListItem,
    VListItemTitle,
    VListItemSubtitle,
    VListItemAction,
    VCheckbox,
    VCol,
    VRow,
    VContainer,
    VApp,
    VSpacer
  },
  setup() {
    const router = useRouter();

    const transportSchedule = ref([
      { id: '1', name: 'Cykel', emission: 0, score: 100 },
      { id: '2', name: 'Bil (benzin/diesel)', emission: 160, score: 40 },
      { id: '3', name: 'Offentlig transport (bus)', emission: 27, score: 70 },
      { id: '4', name: 'Elbil', emission: 0, score: 100 },
      { id: '5', name: 'Fly', emission: 223, score: 20 },
      { id: '6', name: 'Offentlig transport (tog)', emission: 37, score: 60 },
    ]);
    const selectedOption = ref(null);

    const selectOption = (optionId) => {
      selectedOption.value = selectedOption.value === optionId ? null : optionId;
    };

    const optionStyle = (optionId) => {
      if (selectedOption.value === optionId) {
        switch (optionId) {
          case '1':
            return { backgroundColor: '#56AA3F' }; // Cykel
          case '2':
            return { backgroundColor: '#E3F141' }; // Bil
          case '3':
            return { backgroundColor: '#80F360' }; // Bus
          case '4':
            return { backgroundColor: '#56AA3F' }; // Elbil
          case '5':
            return { backgroundColor: '#FF8205' }; // Fly
          case '6':
            return { backgroundColor: '#EBF957' }; // Tog
          default:
            return { backgroundColor: '#D9D9D9' };
        }
      } else {
        return { backgroundColor: '#D9D9D9' };
      }
    };

    const selectedItems = computed(() => {
      return transportSchedule.value.filter(option => selectedOption.value === option.id);
    });

    const totalPoints = ref(0);

    const updatePoints = (points) => {
      totalPoints.value = points;
    };

    const nextStep = () => {
      router.push('/elUse');
      // this.$router.push('/nextRoute');
    };

    const previousStep = () => {
      router.push('/');
      // this.$router.push('/previousRoute');
    };

    const chooseAll = computed({
      get() {
        return transportSchedule.value.every(option => option.selected);
      },
      set(checkedValue) {
        transportSchedule.value.forEach(option => {
          option.selected = checkedValue;
        });
      }
    });

    return {
      transportSchedule,
      selectedOption,
      selectOption,
      optionStyle,
      selectedItems,
      totalPoints,
      updatePoints,
      nextStep,
      previousStep,
      chooseAll
    };
  }
});
</script>

<style scoped>
.v-container {
  padding: 0;
}
.transport {
  height: 80vh;
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
  border-radius: 18px;
  opacity: 0.9px;
}
.award-badge .v-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Gør knappen fuld bredde */
}
.v-list-item-subtitle {
  font-size: 16px;
  color: red;
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
</style>
