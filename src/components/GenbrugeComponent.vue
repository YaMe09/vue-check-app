<template>
  <NavComponent />
  <v-app class="genbruge" id="genbruge">
    <v-container fluid fill-height :style="{backgroundColor:'#E9E5E5', width: '100%', padding: '24px'}">

      <!-- Heading -->
      <v-col cols="12" md="8" lg="4" class="text-center">
        <h2 class="question">Hvordan har dine indkøb været?</h2>
      </v-col>

      <!-- Transport Options -->
      <v-col
        cols="12"
        md="8"
        lg="4"
        align="center"
        :style="{ backgroundColor: '#8FCACA', borderRadius: '25px', padding: '24px', width: '485px', marginBottom: '24px' }"
      >
        <v-list :style="{ backgroundColor: '#8FCACA', flexDirection: 'column', alignItems: 'center' }">
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
                <v-list-item-subtitle> Score: {{ option.score }}</v-list-item-subtitle>
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
      <v-col cols="12" md="4" sm="6" class="award-badge" justify="center">
        <v-btn size="x-large" :style="{ backgroundColor: '#8FCACA', borderRadius: '18px', width: '100%' }">
          <img class="bg-img" src="../images/100.svg" /> &nbsp;
          <img src="../images/fa-solid_award.svg" />
        </v-btn>
      </v-col>
    </v-container>
  </v-app>
</template>


<script>
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import NavComponent from './NavComponent.vue';
import { VList, VListItem, VListItemTitle, VListItemSubtitle, VListItemAction, VCheckbox, VBtn, VCol, VRow, VContainer, VApp, VSpacer } from 'vuetify/components';

export default defineComponent({
  name: 'GenbrugeComponent',
  components: {
    NavComponent,
    VList,
    VListItem,

    VListItemTitle,
    VListItemSubtitle,
    VListItemAction,
    VCheckbox,
    VBtn,
    VCol,
    VRow,
    VContainer,
    VApp,
    VSpacer
  },
  setup() {
    const router = useRouter();

    const transportSchedule = ref([
      { id: '1', name: 'Sælg uønskede ting og find nye skatte.', score: 100 },
      { id: '2', name: 'Spar ressourcer ved at købe brugte bøger.', score: 100 },
      { id: '3', name: 'Lær at reparere i stedet for at smide væk.',  score: 100 },
      { id: '4', name: 'Skift til genanvendelige opbevaringsløsninger.',  score: 100 },
      { id: '5', name: 'Giv ubrugte ting nyt liv og mindsk affald.', score: 100 },
      { id: '6', name: 'Find genbrugte tøj og møbler og spar ressourcer',  score: 100 },
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
            return { backgroundColor: '#56AA3F' }; // Bil
          case '3':
            return { backgroundColor: '#56AA3F' }; // Bus
          case '4':
            return { backgroundColor: '#56AA3F' }; // Elbil
          case '5':
            return { backgroundColor: '#56AA3F' }; // Fly
          case '6':
            return { backgroundColor: '#56AA3F' }; // Tog
          default:
            return { backgroundColor: '#56AA3F' };
        }
      } else {
        return { backgroundColor: '#D9D9D9' };
      }
    };
    const nextStep = () => {
      alert("kommer snart");
      // this.$router.push('/nextRoute');
    };

    const previousStep = () => {
      router.push('/transportComponent');
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
      nextStep,
      previousStep,
      chooseAll
    };
  }
});
</script>

<style scoped>
.v-container{
  padding: 0;
}
.genbruge {
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
  color: red
}
.v-list-item-title{
  font-size: 20px;
  color: black;
  margin-top: 5px;
}
.v-list-item-action{
  width: 0;
  height:0;
}
.v-list-item--density-default.v-list-item--one-line{
  padding: 15px;
  margin-top: 8px;
  margin-bottom: 12px ;
  justify-content: center;
}

</style>
