<template>
  <q-dialog v-model="open" transition-show="scale" transition-hide="scale">
    <q-card class="q-pa-lg text-center" style="min-width: 380px;">
      <q-icon name="check_circle" color="positive" size="64px" class="q-mb-md" />
      <div class="text-h6 text-positive">Action réussie</div>
      <div class="text-body1 q-mt-sm">{{ message }}</div>

      <q-card-actions align="center" class="q-mt-md">
        <q-btn color="primary" unelevated label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  message: String
})
const emit = defineEmits(['update:modelValue'])
const open = ref(false)

watch(() => props.modelValue, val => (open.value = val))
watch(open, val => emit('update:modelValue', val))
</script>
