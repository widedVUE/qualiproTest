<template>
  <q-layout view="lHh Lpr lFf">

    <!-- HEADER visible seulement après connexion -->
    <q-header
      v-if="showHeader"
      elevated
      class="bg-primary text-white shadow-2"
    >
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="drawer = !drawer" />
        <q-toolbar-title> Gestion RH</q-toolbar-title>
        <q-space />
        <q-btn
          outline
          color="white"
          icon="logout"
          label="Déconnexion"
          v-if="authStore.token"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="showHeader"
      v-model="drawer"
      show-if-above
      bordered
      class="bg-white text-dark"
    >
      <q-list>
        <q-item clickable v-ripple to="/dashboard">
          <q-item-section avatar>
            <q-icon name="dashboard" color="primary" />
          </q-item-section>
          <q-item-section>Tableau de bord</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/collaborateurs">
          <q-item-section avatar>
            <q-icon name="group" color="primary" />
          </q-item-section>
          <q-item-section>Collaborateurs</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- CONTENU PAGE -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'

const drawer = ref(false)
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

//  Masquer le header et drawer sur login/register
const showHeader = computed(() => {
  const hiddenRoutes = ['/login', '/register']
  return authStore.token && !hiddenRoutes.includes(route.path)
})

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>
