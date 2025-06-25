<template>
  <v-app>
    <v-main class="landing-background">
      <v-container>
        <v-text-field
  v-model="pojamPretrage"
  label="Pretraži recepte"
  prepend-inner-icon="mdi-magnify"
  variant="outlined"
  class="mt-4 mb-6 polje-pretrage"
  clearable
  @update:model-value="pretraziRecepte"
/>

        <v-row v-if="grupePoKategorijama.length">
          <template v-for="(grupa, i) in grupePoKategorijama" :key="i">
            <v-col cols="12" class="mt-6">
              <h3 style="color: #3E3E29;">{{ grupa.kategorija }}</h3>
            </v-col>
            <v-col
              v-for="recept in grupa.recepti"
              :key="recept.id_recepta"
              cols="12" sm="6" md="4" lg="3"
            >
              <KarticaRecepata :recept="recept"  @refresh="dohvatiRecepte"/>
            </v-col>
          </template>
        </v-row>

        <v-row v-else>
          <v-col cols="12" class="text-center">
            <v-progress-circular indeterminate color="primary" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../config/config.js';
import KarticaRecepata from '@/components/KarticaRecepata.vue';
import debounce from 'lodash/debounce';


const grupePoKategorijama = ref([]);

function grupirajPoKategorijama(recepti) {
  const map = new Map();

  recepti.forEach(recept => {
    const katNaziv = recept.Kategorija?.naziv_kategorije || 'Bez kategorije';

    if (!map.has(katNaziv)) {
      map.set(katNaziv, []);
    }
    map.get(katNaziv).push(recept);
  });

  return Array.from(map, ([kategorija, recepti]) => ({ kategorija, recepti }));
}

const pojamPretrage = ref('');

const pretraziRecepte = debounce(async () => {
  try {
    if (!pojamPretrage.value.trim()) {
      await dohvatiRecepte();
      return;
    }

    const res = await api.get('/recepti/pretraga', {
      params: { naziv_recepta: pojamPretrage.value }
    });

    grupePoKategorijama.value = grupirajPoKategorijama(res.data);
  } catch (err) {
    console.error('Greška pri pretrazi:', err);
  }
}, 500);

async function dohvatiRecepte() {
  try {
    const res = await api.get('/recepti');
    console.log(res.data);
    grupePoKategorijama.value = grupirajPoKategorijama(res.data);
  } catch (err) {
    console.error('Greška pri dohvaćanju recepata:', err);
  }
}


onMounted(() => {
  dohvatiRecepte();
});
</script>

<style>
.polje-pretrage {
  max-width: 600px;
  margin: 0 auto;
  border-color: #3E3E29 !important;
}
.polje-pretrage .v-label,
.polje-pretrage .v-input__control,
.polje-pretrage .v-icon {
  color: #3E3E29 !important;
}
</style>
