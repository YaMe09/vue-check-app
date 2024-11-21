<template>
  <v-container :style="{ backgroundColor: '#E9E5E5' }">
    <br/>
    <br/><br/><br/><br/>
    <h1 class="score-title">Dagens score</h1>
    <br/>
    <v-col cols="auto" class="score-value">
        <img src="../images/fa-solid_award.svg"> &nbsp; 400
    </v-col>

    <v-card-text :style="{ fontWeight: '600', fontSize:'25px' }" align="center" justify="space-between">
      Du har sparet miljøet
    </v-card-text>
    <p class="co2-amount" :style="{fontSize:'20px' }">1000 gram CO₂ i dag</p>
    <br/><br/><br/>
    <p align="center" justify="space-between" :style="{ fontWeight: '600', fontSize:'20px' }">Vand dit træ og få dagens point</p>
    <br/><br/><br/>
    <v-row>
      <v-col cols="2" class=" justify-center">
        <img class="drop" src="../Images/drop.svg" alt="Drop Image" :style="{ width: '35px', marginLeft: '280px', border:'4px solid #3E7A00', borderRadius:'50%' }">
      </v-col>

      <v-col cols="2" class="træ">
        <img src="../Images/træ.svg" alt="Tree Image" :style="{ marginLeft: '-50px'}">
      </v-col>
    </v-row>


    <v-container class="carbon-reduction">
      <v-card-text :style="{ fontWeight: '600', fontSize:'20px', color:'#595562' }" align="center">
      REDUCERE 600KG CARBON
      </v-card-text>
      <p :style="{fontSize:'16px', color:'#1E1E1E' }" align="center">per uge</p>
      <br/>
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <v-btn rounded="xl" size="x-large"  @click="goHome" class="home-button" block :style="{background:'#3E7A00'}">Startside</v-btn><br/>
        <v-btn rounded="xl" size="x-large" @click="goBack" class="back-button" block outlined  :style="{border:'5px solid #3E7A00'}">Tilbage</v-btn>
      </v-col>
    </v-row>
    </v-container>

  </v-container>
</template>


<script>
import { useRouter } from 'vue-router';

export default {
  name: 'ScoreComponent',
  setup() {
    const router = useRouter();

    const goBack = () => {
      router.push('/foodWaste');
    };

    const goHome = () => {
      router.push('/frontPage');
    };

    return {
      goBack,
      goHome
    };
  }
};
</script>
<style>
.score-title{
  text-align: center;
  font-weight: 700;
}

.score-value{
  text-align: center;
  font-weight: 700;
  justify-content: center;
}
.co2-amount{
  text-align: center;
  font-weight: 600;
  color: #3E7A00;
  align-items: center;
}
.carbon-reduction{
  background-image: url('../Images/Vector 1.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.button-group {
  display: flex;
  flex-direction:
  column; gap: 1em;
  }
  .back-button,
  .home-button {
    font-size: 1em;
    color: #fff;
    background-color: #4caf50;
    border-radius: 5px;
    padding: 0.5em 1em;
    width: 100%; }
</style>
