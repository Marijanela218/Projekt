import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/pages/index.vue'
import ReceptiLista from '@/pages/recepti.vue'
import ReceptDetalji from '@/pages/recept.vue'
import DodajRecept from '@/pages/dodaj-recept.vue'
import UrediRecept from '@/pages/uredi-recept.vue'
import paginacija from '@/pages/paginacija.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/recepti',
    name: 'ReceptiLista',
    component: ReceptiLista,
  },
  {
    path: '/recepti/:id',
    name: 'ReceptDetalji',
    component: ReceptDetalji,
    props: true,
  },
  {
    path: '/uredi-recept/:id',
    name: 'UrediRecept',
    component: UrediRecept,
    props: true,
  },
  {
    path:'/dodaj-recept',
    name: 'DodajRecept',
    component: DodajRecept,
  },
  {
    path: '/paginacija',
    name: 'Paginacija',
    component: paginacija,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
