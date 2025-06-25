<template>
  <v-card elevation="3" class="pa-4 text-left funkcija-card" style="background-color: #fffbe6;">
    <v-icon size="36" color="deep-orange-darken-2" class="mb-2">{{ icon }}</v-icon>
    <h3 class="text-subtitle-1 font-weight-bold mb-1" style="color: #3E3E29;">{{ title }}</h3>
    <p class="text-body-2" style="color: #4A4A4A;">{{ desc }}</p>
  </v-card>
</template>

<script setup>
defineProps({
  title: String,
  desc: String,
  icon: String,
})
</script>

<style scoped>
.funkcija-card {
  transition: 0.3s ease;
  border-radius: 16px;
}
.funkcija-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}
</style>
