<template>
  <v-app>
    <v-main class="landing-background">
      <v-container max-width="600px">
        <v-card v-if="recept" color="#3E3E29">
          <v-img :src="recept.url_slike" height="200px" />
          <v-card-title>{{ recept.naziv_recepta }}</v-card-title>
          <v-card-subtitle>
            Priprema: {{ recept.vrijeme_pripreme }} min | Kuhanje: {{ recept.vrijeme_kuhanja }} min | Porcije: {{ recept.porcije }}
          </v-card-subtitle>
          <v-card-text>
            <h3>Opis</h3>

            <p>{{ recept.opis }}</p>

            <h3 class="mt-4">Sastojci</h3>
            <v-list style="background-color: #3E3E29;">
              <v-list-item
                v-for="(s, i) in recept.sastojci"
                :key="i"
              >
                {{ s?.Recepti_Sastojci?.kolicina || '' }} {{ s.naziv_sastojka }}

              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
        <v-alert v-else type="error">Recept nije pronađen.</v-alert>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '@/config/config.js'

const recept = ref(null)
const route = useRoute()

async function fetchRecept() {

  try {
    const res = await api.get(`/recepti/${route.params.id}`)
    recept.value = res.data
    console.log(res.data)
  } catch (err) {
    console.error('Greška:', err)
  }
}

onMounted(() => {
  fetchRecept()
})
</script>
