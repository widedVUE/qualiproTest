<template>
  <q-dialog v-model="open" persistent transition-show="scale" transition-hide="scale">
    <q-card class="q-pa-lg text-center" style="min-width: 400px;">
      <q-icon name="warning" color="negative" size="56px" class="q-mb-md" />
      <div class="text-h6 text-negative q-mb-sm">
        Confirmation de suppression
      </div>
      <div class="text-body1 q-mb-md">
        Voulez-vous vraiment supprimer <strong>{{ nom }}</strong> ?
      </div>

      <q-card-actions align="center" class="q-gutter-md">
        <q-btn flat label="Annuler" color="secondary" v-close-popup />
        <q-btn unelevated color="negative" label="Supprimer" @click="confirmer" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  nom: String
})
const emit = defineEmits(['update:modelValue', 'confirm'])
const open = ref(false)

watch(() => props.modelValue, val => (open.value = val))
watch(open, val => emit('update:modelValue', val))

function confirmer() {
  emit('confirm')
  open.value = false
}
</script>
