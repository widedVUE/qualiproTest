import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useCollaborateursStore = defineStore('collaborateurs', {
  state: () => ({
    liste: [],
    loading: false
  }),

  actions: {
    async chargerCollaborateurs() {
      this.loading = true
      try {
        const { data } = await api.get('/collaborateurs')
        this.liste = data
      } finally {
        this.loading = false
      }
    },

    async ajouter(collab) {
      await api.post('/collaborateurs', collab)
      await this.chargerCollaborateurs()
    },

    async modifier(id, collab) {
      await api.put(`/collaborateurs/${id}`, collab)
      await this.chargerCollaborateurs()
    },

    async supprimer(id) {
      await api.delete(`/collaborateurs/${id}`)
      await this.chargerCollaborateurs()
    }
  }
})
