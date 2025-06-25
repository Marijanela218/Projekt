<template>
  <v-app>
  <!--Navigacija -->
      <v-navigation-drawer
      v-model="drawer"
      temporary
      app
      class="drawer-style"
    >
    <!--Navigacijski meni -->
      <v-list>
        <v-list-item>
            <v-btn
              icon
              @click="drawer = false"
              class="close-btn"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>

        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
          @click="drawer = false"
        >
          <v-list-item-title class="text-brown-darken-4">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!--Navigacijska traka -->
   <v-app-bar flat elevation="0" style="background-color: #ffd180; color: #3E3E29;">
      <v-app-bar-nav-icon @click="drawer = true" style="color: #3E3E29" />
      <v-app-bar-title class="font-weight-bold" style="color: #3E3E29">Jumlicious</v-app-bar-title>
    </v-app-bar>
<v-main>
<router-view />
</v-main>
<footer class="text-center py-4" style="background-color: #3E3E29; color: white;">
  <p class="mb-0">Projekt izradila: Marijanela Pranjić</p>
  <p class="mb-0">Github: <a href="https://github.com/Marijanela218"  class="text-decoration-none">Marijanela218</a></p>
    </footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
  const drawer = ref(false)

const menuItems = [
  { title: 'Početna', link: '/' },
  { title: 'Filtirani Recepti', link: '/recepti' },
  { title: 'Dodaj recept', link: '/dodaj-recept' },
  {title: 'Svi recepti', link: '/paginacija'}
]
</script>

<style scoped>

.drawer-style {
  background-color: #fff8dc;
  padding-top: 16px;
  min-width: 250px;
}

.close-btn {
  margin-left: 10px;
  margin-right: 10px;
  color: #f5f5ec;
}

.v-list-item-title {
  font-weight: 500;
  font-size: 18px;
  padding: 10px 16px;
}</style>
