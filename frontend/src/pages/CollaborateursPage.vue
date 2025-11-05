<template>
  <q-page class="q-pa-lg bg-grey-1">
    <q-card flat bordered class="q-pa-md q-mb-lg shadow-1 rounded-borders">
      <q-card-section class="row items-center justify-between">
        <div class="text-h5 text-primary">👥 Gestion des collaborateurs</div>
        <q-btn color="primary" icon="add" label="Nouveau" unelevated @click="ouvrirFormulaire()" />
      </q-card-section>

      <q-card-section>
        <q-input filled v-model="recherche" label="Rechercher..." debounce="300" clearable prefix="🔍" class="q-mb-md" />
        <q-table flat bordered square :rows="collaborateursFiltres" :columns="colonnesCollaborateurs" row-key="id">
          <template v-slot:body-cell-actions="props">
            <q-td align="center">
              <q-btn flat dense round color="info" icon="edit" @click="editer(props.row)" />
              <q-btn flat dense round color="negative" icon="delete" @click="confirmerSuppression(props.row)" />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Dialogs -->
    <CollaborateurDialog v-model="dialogForm" :collaborateur="form" @submit="sauvegarder" />
    <ConfirmDialog v-model="dialogSupp" :nom="form.nom" @confirm="supprimer" />
     <SuccessDialog v-model="dialogSuccess" :message="successMessage" />

  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCollaborateursStore } from 'src/stores/collaborateurs'
import CollaborateurDialog from 'src/components/CollaborateurDialog.vue'
import ConfirmDialog from 'src/components/ConfirmDialog.vue'
import { colonnesCollaborateurs } from 'src/utils/index.js'
import SuccessDialog from 'src/components/SuccessDialog.vue'

const dialogSuccess = ref(false)
const successMessage = ref('')
const store = useCollaborateursStore()
const recherche = ref('')
const dialogForm = ref(false)
const dialogSupp = ref(false)
const form = ref({})


onMounted(() => store.chargerCollaborateurs())

const collaborateursFiltres = computed(() => {
  const q = recherche.value.toLowerCase()
  return store.liste.filter(c =>
    [c.nom, c.prenom, c.email, c.poste].some(v => v?.toLowerCase().includes(q))
  )
})

function ouvrirFormulaire() {
  form.value = {}
  dialogForm.value = true
}

function editer(collab) {
  form.value = { ...collab }
  dialogForm.value = true
}

async function sauvegarder(data) {
  if (data.id) {
    // Cas modification
    await store.modifier(data.id, data)
    successMessage.value = `Collaborateur "${data.nom}" modifié avec succès `
  } else {
    //  Cas ajout
    await store.ajouter(data)
    successMessage.value = `Collaborateur "${data.nom}" ajouté avec succès `
  }
  dialogSuccess.value = true
}


function confirmerSuppression(collab) {
  form.value = collab
  dialogSupp.value = true
}


async function supprimer() {
  await store.supprimer(form.value.id)
  dialogSupp.value = false
  successMessage.value = `Collaborateur "${form.value.nom}" supprimé avec succès `
  dialogSuccess.value = true
}
</script>
