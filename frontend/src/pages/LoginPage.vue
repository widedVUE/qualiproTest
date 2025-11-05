<template>
  <q-page class="flex flex-center bg-gradient">
    <q-card
      class="q-pa-lg shadow-4"
      style="width: 380px; background: white; border-radius: 16px;"
    >
      <q-card-section class="text-center">
        <div class="text-h5 text-primary q-mb-md">Connexion</div>
        <div class="text-caption text-grey-7">
          Bienvenue, connectez-vous à votre espace
        </div>
      </q-card-section>

      <q-separator spaced />

      <q-card-section>
        <q-input
          v-model="email"
          label="Email"
          type="email"
          outlined
          dense
          class="q-mb-md"
          :rules="[val => !!val || 'Email requis']"
        />
        <q-input
          v-model="password"
          label="Mot de passe"
          type="password"
          outlined
          dense
          :rules="[val => !!val || 'Mot de passe requis']"
        />
      </q-card-section>

      <q-card-actions align="center" class="q-mt-md">
        <q-btn
          color="primary"
          label="Se connecter"
          @click="handleLogin"
          :loading="loading"
          class="full-width"
          style="border-radius: 10px;"
        />
      </q-card-actions>

      <q-card-section class="text-center text-grey-7 q-mt-sm">
        Pas encore de compte ?
        <router-link to="/register" class="text-primary text-weight-bold">
          Créer un compte
        </router-link>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { useQuasar } from 'quasar'

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()
const store = useAuthStore()
const $q = useQuasar()

const handleLogin = async () => {
  if (!email.value || !password.value) {
    $q.notify({
      type: 'negative',
      message: ' Veuillez remplir tous les champs',
      position: 'top',
      timeout: 2500,
      progress: true,
      actions: [{ icon: 'close', color: 'white' }]
    })
    return
  }

  loading.value = true
  try {
    await store.login(email.value, password.value)
    $q.notify({
      type: 'positive',
      message: ' Connexion réussie, bienvenue ',
      position: 'top',
      timeout: 2000,
      progress: true
    })
    router.push('/')
  } catch (err) {
    const msg = err.response?.data?.message || ' Identifiants invalides'
    $q.notify({
      type: 'negative',
      message: msg,
      position: 'top',
      timeout: 2500,
      progress: true,
      actions: [{ icon: 'close', color: 'white' }]
    })
  } finally {
    loading.value = false
  }
}

</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #cdcdcd 0%, #f4f4f4 100%);
  min-height: 100vh;
}

.full-width {
  width: 100%;
}
</style>
