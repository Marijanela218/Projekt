<template>
  <v-card class="d-flex flex-column justify-space-between align-center pa-2" style="background-color: #3E3E29;">
    <img :src="recept.url_slike" alt="Slika recepta" style="max-width: 100%; height: auto;" />


      <v-card-title class="text-white">{{ recept.naziv_recepta }}</v-card-title>
      <v-card-subtitle class="text-white">Priprema: {{ recept.vrijeme_pripreme }} min</v-card-subtitle>

    <v-card-actions>
      <v-btn @click="pogledajRecept(recept.id_recepta)" variant="elevated" color="deep-orange-darken-2" class="text-capitalize">
        Pogledaj
      </v-btn>
      <v-btn @click="urediRecept(recept.id_recepta)" variant="elevated" color="deep-orange-darken-2" class="text-capitalize ml-2">
        Uredi
      </v-btn>
      <v-btn @click="izbrisiRecept(recept.id_recepta)" variant="elevated" color="deep-orange-darken-2" class="text-capitalize ml-2">
        Izbriši
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {api} from '@/config/config.js';


const props = defineProps({
  recept: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['refresh']);
const router = useRouter();

function pogledajRecept(id) {
  router.push(`/recepti/${id}`);
}

function urediRecept(id) {
  router.push(`/uredi-recept/${id}`);
}

async function izbrisiRecept(id) {
  if (confirm('Jeste li sigurni da želite izbrisati recept?')) {
    try {
      await api.delete(`/recepti/${id}`);
      emit('refresh');
    } catch (err) {
      console.error('Greška pri brisanju recepta:', err);
      alert('Greška pri brisanju recepta.');
    }
  }
}
</script>

<style scoped>
.text-white {
  color: white;
}
</style>
