<template>
  <v-app>
    <v-main class="landing-background">
      <v-container max-width="600px">
        <v-card color="#3E3E29">
          <v-card-title>Dodaj novi recept</v-card-title>
          <v-card-text>
            <v-form ref="formRef">
              <v-text-field
                v-model="form.naziv_recepta"
                :rules="[v => !!v || 'Naziv je obavezan']"
                label="Naziv recepta"
                required
                color="white"
              />

              <v-textarea
                v-model="form.opis"
                label="Opis"
                :rules="[v => !!v || 'Opis je obavezan']"
                rows="3"
              />

              <v-text-field
                v-model="form.vrijeme_pripreme"
                label="Vrijeme pripreme (min)"
                type="number"
              />

              <v-text-field
                v-model="form.vrijeme_kuhanja"
                label="Vrijeme kuhanja (min)"
                type="number"
              />

              <v-text-field
                v-model="form.porcije"
                label="Broj porcija"
                type="number"
              />

              <v-text-field
                v-model="form.url_slike"
                :rules="[v => !!v || 'URL slike je obavezan']"
                label="URL slike"
              />

              <v-select
                v-model="form.kategorija_id"
                :items="kategorijeOpcije"
                label="Kategorije"
                item-title="naziv_kategorije"
                item-value="kategorija_id"
                :rules="[v => !!v || 'Naziv je obavezan']"
                :loading="loadingKategorije"
                :disabled="loadingKategorije"
              />

              <div class="mt-4">
                <div
                  v-for="(sastojak, i) in form.sastojci"
                  :key="i"
                  class="d-flex align-center mb-3"
                >
                  <v-text-field
                    v-model="sastojak.naziv_sastojka"
                    label="Naziv sastojka"
                    dense
                    outlined
                    class="me-2"
                    style="flex: 2"
                  />
                  <v-text-field
                    v-model="sastojak.kolicina"
                    label="Količina"
                    dense
                    outlined
                    class="me-2"
                    style="flex: 1"
                  />
                  <v-btn icon color="red" @click="removeSastojak(i)" :disabled="form.sastojci.length === 1">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </div>
                <v-btn text color="primary" @click="addSastojak">+ Dodaj sastojak</v-btn>
              </div>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="submit">Spremi recept</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../config/config.js'
import router from '@/router/index.js'

const formRef = ref(null)
const loadingKategorije = ref(false)
const kategorijeOpcije = ref([])

const form = ref({
  naziv_recepta: '',
  opis: '',
  vrijeme_pripreme: '',
  vrijeme_kuhanja: '',
  porcije: '',
  url_slike: '',
  kategorija_id: null,
  sastojci: [ { naziv_sastojka: '', kolicina: '' } ]
})

function addSastojak() {
  form.value.sastojci.push({ naziv_sastojka: '', kolicina: '' })
}

function removeSastojak(index) {
  if (form.value.sastojci.length > 1) {
    form.value.sastojci.splice(index, 1)
  }
}

async function fetchKategorije() {
  loadingKategorije.value = true
  try {
    const res = await api.get('recepti/kategorije')
    kategorijeOpcije.value = res.data
  } catch (err) {
    console.error('Greška prilikom dohvaćanja kategorija:', err)
  } finally {
    loadingKategorije.value = false
  }
}

onMounted(() => {
  fetchKategorije()
})

async function submit() {
  const { valid } = await formRef.value.validate()
  if (!valid) {
    alert('Molimo popunite obavezna polja.')
    return
  }

  const validniSastojci = form.value.sastojci.filter(s => s.naziv_sastojka.trim() !== '')

  if (validniSastojci.length === 0) {
    alert('Dodajte barem jedan sastojak.')
    return
  }

  const payload = {
    naziv_recepta: form.value.naziv_recepta,
    opis: form.value.opis,
    vrijeme_pripreme: Number(form.value.vrijeme_pripreme) || 0,
    vrijeme_kuhanja: Number(form.value.vrijeme_kuhanja) || 0,
    porcije: Number(form.value.porcije) || 1,
    url_slike: form.value.url_slike,
    kategorija_id: form.value.kategorija_id,
    sastojci: validniSastojci
  }

  try {
    await api.post('/recepti', payload)
    alert('Recept je uspješno dodan!')
    form.value = {
      naziv_recepta: '',
      opis: '',
      vrijeme_pripreme: '',
      vrijeme_kuhanja: '',
      porcije: '',
      url_slike: '',
      kategorija_id: null,
      sastojci: [ { naziv_sastojka: '', kolicina: '' } ]
    }
    formRef.value.resetValidation()
    router.push('/recepti')
  } catch (err) {
    console.error('Greška pri dodavanju recepta:', err)
    alert('Došlo je do greške pri dodavanju recepta.')
  }
}
</script>
