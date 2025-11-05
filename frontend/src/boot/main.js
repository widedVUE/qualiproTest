import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'    
import quasarUserOptions from './quasar-user-options'

const app = createApp(App)

app.use(Quasar, quasarUserOptions)
app.use(createPinia())                 
app.use(router)                        
app.mount('#q-app')
