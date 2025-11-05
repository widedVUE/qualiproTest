<template>
  <q-dialog v-model="open" persistent transition-show="fade" transition-hide="fade">
    <q-card class="q-pa-md" style="min-width: 400px;">
      <q-card-section>
        <div class="text-h6">
          {{ local.id ? ' Modifier collaborateur' : ' Nouveau collaborateur' }}
        </div>
      </q-card-section>

      <q-form @submit.prevent="valider">
        <q-card-section class="q-gutter-md">
          <q-input
            filled
            v-model="local.nom"
            label="Nom"
            required
            :rules="[val => !!val || 'Nom requis']"
          />
          <q-input
            filled
            v-model="local.prenom"
            label="Prénom"
            required
            :rules="[val => !!val || 'Prénom requis']"
          />
          <q-input
            filled
            v-model="local.email"
            label="Email"
            type="email"
            required
            :rules="[val => !!val || 'Email requis', val => /.+@.+\..+/.test(val) || 'Email invalide']"
          />
          <q-input
            filled
            v-model="local.poste"
            label="Poste"
          />
          <q-input
            filled
            v-model="local.dateEntree"
            label="Date d’entrée"
            type="date"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="secondary" v-close-popup />
          <q-btn unelevated color="primary" label="Enregistrer" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  collaborateur: Object
})
const emit = defineEmits(['update:modelValue', 'submit'])
const open = ref(false)
const local = ref({})

// Synchroniser ouverture du dialogue
watch(() => props.modelValue, val => {
  open.value = val
  if (val) local.value = { ...props.collaborateur } 
})

// Fermer le dialogue quand on le ferme manuellement
watch(open, val => emit('update:modelValue', val))

function valider() {
  emit('submit', local.value)
  open.value = false
}
</script>
