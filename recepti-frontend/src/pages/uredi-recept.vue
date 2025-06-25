<template>
  <v-app>
    <v-main class="landing-background">
      <v-container max-width="600px">
        <v-card v-if="recept" color="#3E3E29">
          <v-card-title>Uredi recept</v-card-title>
          <v-card-text>
            <v-form ref="formRef">
              <v-text-field
                v-model="recept.naziv_recepta"
                :rules="[v => !!v || 'Naziv je obavezan']"
                label="Naziv recepta"
                required
              />

              <v-textarea
                v-model="recept.opis"
                label="Opis"
                :rules="[v => !!v || 'Opis je obavezan']"
                rows="3"
              />

              <v-text-field
                v-model.number="recept.vrijeme_pripreme"
                label="Vrijeme pripreme (min)"
                type="number"
              />

              <v-text-field
                v-model.number="recept.vrijeme_kuhanja"
                label="Vrijeme kuhanja (min)"
                type="number"
              />

              <v-text-field
                v-model.number="recept.porcije"
                label="Broj porcija"
                type="number"
              />

              <v-text-field
                v-model="recept.url_slike"
                :rules="[v => !!v || 'URL slike je obavezan']"
                label="URL slike"
              />

              <v-select
                v-model="recept.kategorija_id"
                :items="kategorijeOpcije"
                label="Kategorije"
                item-title="naziv_kategorije"
                item-value="kategorija_id"
                :rules="[v => !!v || 'Kategorija je obavezna']"
                :loading="loadingKategorije"
                :disabled="loadingKategorije"
              />

            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="spremiIzmjene">Spremi izmjene</v-btn>
          </v-card-actions>
        </v-card>

        <v-alert v-else type="error" class="mt-4">Recept nije pronađen.</v-alert>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../config/config.js'

const route = useRoute()
const router = useRouter()

const recept = ref(null)
const formRef = ref(null)

const kategorijeOpcije = ref([])
const loadingKategorije = ref(false)

async function fetchKategorije() {
  loadingKategorije.value = true
  try {
    const res = await api.get('/recepti/kategorije')
    kategorijeOpcije.value = res.data
  } catch (err) {
    console.error('Greška pri dohvaćanju kategorija:', err)
  } finally {
    loadingKategorije.value = false
  }
}

async function dohvatiRecept() {
  try {
    const res = await api.get(`/recepti/${route.params.id}`)
    recept.value = res.data

    if (!recept.value.sastojci || recept.value.sastojci.length === 0) {
      recept.value.sastojci = [{ naziv_sastojka: '', Recepti_Sastojci: { kolicina: 0 } }]
    }
  } catch (err) {
    console.error('Greška pri dohvaćanju recepta:', err)
  }
}


async function spremiIzmjene() {
  if (!formRef.value) return

  const valid = await formRef.value.validate()
  if (!valid) {
    alert('Molimo popunite obavezna polja.')
    return
  }

  const payload = {
    naziv_recepta: recept.value.naziv_recepta,
    opis: recept.value.opis,
    vrijeme_pripreme: Number(recept.value.vrijeme_pripreme) || 0,
    vrijeme_kuhanja: Number(recept.value.vrijeme_kuhanja) || 0,
    porcije: Number(recept.value.porcije) || 1,
    url_slike: recept.value.url_slike,
    kategorija_id: recept.value.kategorija_id,
  }

  try {
    await api.put(`/recepti/${route.params.id}`, payload)
    alert('Recept uspješno ažuriran.')
    router.push('/recepti')
  } catch (err) {
    console.error('Greška pri ažuriranju recepta:', err)
    alert('Došlo je do greške prilikom ažuriranja recepta.')
  }
}

onMounted(() => {
  fetchKategorije()
  dohvatiRecept()
})
</script>
