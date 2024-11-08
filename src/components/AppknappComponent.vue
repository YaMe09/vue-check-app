<template>
  <v-container fluid fill-height>
    <v-btn @click="goToTransportComponent" rounded="xl" size="x-large" variant="flat" :style="{ backgroundColor: 'rgb(62, 122, 0)', width: '358px' }">
      Kom i gang
    </v-btn>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'AppknappComponent',
  setup(props, { emit }) {
    const router = useRouter();

    const goToTransportComponent = () => {
      emit('navigate'); // Udløs en begivenhed for at skjule velkomstindholdet
      router.push('/transportComponent'); // Naviger til TransportComponent
    };

    return { goToTransportComponent };
  }
});
</script>
