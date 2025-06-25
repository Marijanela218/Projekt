<template>

  <v-app id="inspire">

    <!--Glavni sadržaj-->
    <v-main class="landing-background">
      <v-row class="landing-background">
        <v-col cols="12">
      <v-container class="fill-height d-flex flex-column justify-center align-center text-center">
        <h1 class="text-h4 text-md-h3 display-2 font-weight-bold mb-5" style="color: #3E3E29">
          Dobrodošli na Jumlicious
        </h1>
        <p class="text-h6 text-md-h4 mb-6" style="color: #4A4A4A">
          Pretražujte, dijelite i spremite ukusne recepte za svaki dan.
        </p>
        <div>
          <v-btn
            v-for="btn in btns"
            :key="btn"
            :text="btn"
            variant="elevated"
            color="deep-orange-darken-2"
            class="ma-2 text-white text-capitalize landing-btn"
            elevation="3"
            :href="btn === 'Istraži' ? '/recepti' : '/dodaj-recept'"
          ></v-btn>
        </div>


      </v-container>
      </v-col>
      </v-row>
      <v-row >
      <v-col cols="12" class="text-center mt-10 mb-10">
  <h2 class="text-h4 font-weight-bold mb-6" style="color: #3E3E29;">Korištene tehnologije</h2>
        <v-container class="tech-section my-12 text-center">
  <v-row justify="center" class="gap-4">
    <v-chip
      v-for="tehn in tehnologije"
      :key="tehn.name"
      color="deep-orange lighten-3"
      text-color="white"
      class="ma-2"
      outlined
      >
      <v-icon left>{{ tehn.icon }}</v-icon>
      {{ tehn.name }}
    </v-chip>
  </v-row>
</v-container>

      </v-col>
    </v-row>

      <v-row class="landing-background">

    <v-row justify="center" class="mt-10 text-center">
      <v-col cols="12" sm="8" md="6">
    <h2 class="text-h4 font-weight-bold mb-4" style="color: #3E3E29;">Funkcionalnosti aplikacije</h2>
      </v-col>
    </v-row>
    <v-row justify="center" dense class="ml-5 mr-5">
      <v-col
        v-for="item in funkcije"
        :key="item.title"
        cols="12"
        sm="6"
        md="4"
        class="mb-4"
      >
        <FunkcijaCard
        :title="item.title"
        :desc="item.desc"
        :icon="item.icon"
      />
      </v-col>
    </v-row>
    </v-row>

    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import FunkcijaCard from '@/components/KarticeFunkcionalnosti.vue'

const drawer = ref(false)
const btns = ref(['Istraži', 'Dodaj recept'])

const menuItems = [
  { title: 'Početna', link: '/' },
  { title: 'Recepti', link: '/recepti' },
  { title: 'Dodaj recept', link: '/dodaj-recept' }
]
const funkcije = [
  {
    title: 'Pretraga recepata',
    desc: 'Brzo pronađi recepte po imenu ili sastojku.',
    icon: 'mdi-magnify'
  },
  {
    title: 'Dodavanje recepata',
    desc: 'Objavi vlastite recepte s fotografijama.',
    icon: 'mdi-plus-box'
  },
  {
    title: 'Uredjivanje recepata',
    desc: 'Ažuriraj postojeće recepte s novim informacijama.',
    icon: 'mdi-pencil-outline'
  },
  {
    title: 'Brisanje recepata',
    desc: 'Ukloni recepte koje više ne želiš.',
    icon: 'mdi-delete-outline'
  },
  {
    title: 'Filtriranje',
    desc: 'Filtriraj po kategoriji.',
    icon: 'mdi-filter-variant'
  },
  {
    title: 'Responsivni dizajn',
    desc: 'Aplikacija prilagođena svim uređajima.',
    icon: 'mdi-responsive'
  }
]

const tehnologije = [
  { name: 'Vue 3', icon: 'mdi-vuejs' },
  { name: 'Vuetify 3', icon: 'mdi-vuetify' },
  { name: 'JavaScript', icon: 'mdi-language-javascript' },
  { name: 'Node.js', icon: 'mdi-nodejs' },
  { name: 'Express', icon: 'mdi-nodejs' },
  { name: 'MySQL', icon: 'mdi-database' },
  { name: 'Axios', icon: 'mdi-cloud-sync' },
  { name: 'Sequelize', icon: 'mdi-database'},
{ name: 'Swagger', icon: 'mdi-file-document-outline'},


]

</script>

<style>
.landing-background {
  background:  #ffd180;
  min-height: 100vh;
}
</style>
<style scoped>


.landing-btn:hover {
  background-color: #e65100 !important;
  transition: 0.3s ease;
}



.funkcija-card {
  transition: 0.3s ease;
  border-radius: 16px;
}
.funkcija-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}


@media (max-width: 600px) {
  .landing-background {
    padding: 0 !important;
  }
  .v-container {
    padding: 0 !important;
    max-width: 100vw !important;
  }
  h1 {
    word-break: break-word;
    font-size: 1.6rem !important;
  }
  p {
    word-break: break-word;
    font-size: 1.3rem !important;

  }
}
</style>
