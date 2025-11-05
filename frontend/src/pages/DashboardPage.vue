<template>
  <q-page class="q-pa-lg bg-gradient">
    <div class="row items-center q-mb-lg">
      <q-icon name="dashboard" size="32px" color="primary" class="q-mr-sm" />
      <div class="text-h5 text-primary text-weight-bold">Tableau de bord</div>
    </div>

    <q-card flat bordered class="q-pa-xl text-center shadow-3 welcome-card">
      <div class="text-h5 text-primary">
        Bienvenue dans <span class="text-weight-bold">TeamTracker</span>
      </div>
      <div v-if="userName" class="text-subtitle1 text-grey-8 q-mt-sm">
        Heureux de vous revoir, <b>{{ userName }}</b> 👋
      </div>

      <q-separator spaced class="q-my-md" />

      <div class="text-body1 text-grey-8 q-mx-xl">
        <p>
          <b>TeamTracker</b> est un outil interne développé pour
          <span class="text-primary text-weight-bold">Qualipro</span>,
          permettant de <b>suivre et gérer efficacement les collaborateurs</b> de l’entreprise.
        </p>
        <p>Chaque collaborateur est enregistré avec ses informations clés :</p>

        <div class="row justify-center q-gutter-md q-mt-md">
          <q-card class="info-card" flat bordered>
            <q-icon name="person" color="primary" size="28px" />
            <div class="text-subtitle2 text-grey-8 q-mt-xs">Nom & Prénom</div>
          </q-card>

          <q-card class="info-card" flat bordered>
            <q-icon name="email" color="primary" size="28px" />
            <div class="text-subtitle2 text-grey-8 q-mt-xs">Email professionnel</div>
          </q-card>

          <q-card class="info-card" flat bordered>
            <q-icon name="work" color="primary" size="28px" />
            <div class="text-subtitle2 text-grey-8 q-mt-xs">Poste occupé</div>
          </q-card>

          <q-card class="info-card" flat bordered>
            <q-icon name="event" color="primary" size="28px" />
            <div class="text-subtitle2 text-grey-8 q-mt-xs">Date d’entrée</div>
          </q-card>
        </div>

        <p class="q-mt-lg">
          Cet outil offre une vision claire et centralisée de l’équipe,
          pour faciliter la gestion et le suivi du personnel au quotidien.
        </p>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const userName = ref('Wided')
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #e8f0ff 0%, #ffffff 100%);
  min-height: 100vh;
}

.welcome-card {
  border-radius: 16px;
  background: white;
}

.info-card {
  width: 160px;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  transition: all 0.2s ease-in-out;
}
.info-card:hover {
  background-color: #efefef;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
</style>
