<template>
  <q-page class="flex flex-center bg-gradient">
    <q-card
      class="q-pa-lg shadow-4"
      style="width: 380px; background: white; border-radius: 16px;"
    >
      <q-card-section class="text-center">
        <div class="text-h5 text-primary q-mb-md"> Créer un compte</div>
        <div class="text-caption text-grey-7">Entrez vos informations pour vous inscrire</div>
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
          label="S'inscrire"
          @click="handleRegister"
          :loading="loading"
          class="full-width"
          style="border-radius: 10px;"
        />
      </q-card-actions>

      <q-card-section class="text-center text-grey-7 q-mt-sm">
        Déjà un compte ?
        <router-link to="/login" class="text-primary text-weight-bold">Se connecter</router-link>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()
const $q = useQuasar()

const handleRegister = async () => {
  if (!email.value || !password.value) {
    $q.notify({ color: 'negative', message: 'Veuillez remplir tous les champs.' })
    return
  }

  loading.value = true
  try {
    await api.post('/register', { email: email.value, password: password.value })
    $q.notify({ color: 'positive', message: 'Compte créé avec succès ' })
    router.push('/login')
  } catch (err) {
    const msg = err.response?.data?.message || 'Erreur lors de l’inscription'
    $q.notify({ color: 'negative', message: msg })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #ffffff 0%, #ffffff 100%);
  min-height: 100vh;
}
.full-width {
  width: 100%;
}
</style>
