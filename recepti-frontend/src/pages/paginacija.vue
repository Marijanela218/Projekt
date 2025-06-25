<template>
  <v-container class="landing-background" fluid="">
    <v-row>
      <v-col
        v-for="recept in recepti"
        :key="recept.id_recepta"
        cols="12" sm="6" md="4"
      >
        <KarticaRecepata :recept="recept" />
      </v-col>
    </v-row>

    <v-pagination
      v-model="page"
      :length="totalPages"
      @update:model-value="dohvatiRecepte"
    />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../config/config.js'
import KarticaRecepata from '@/components/KarticaRecepata.vue'

const recepti = ref([])
const page = ref(1)
const totalPages = ref(1)
const limit = 6

async function dohvatiRecepte() {
  try {
    const res = await api.get(`/recepti/paginacija?page=${page.value}&limit=${limit}`)
    recepti.value = res.data.recepti
    totalPages.value = res.data.totalPages
  } catch (err) {
    console.error('Greška pri dohvaćanju recepata:', err)
  }
}

onMounted(() => {
  dohvatiRecepte()
})
</script>
