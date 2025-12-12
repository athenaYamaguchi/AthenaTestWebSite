// main.js
import { createApp } from 'vue'
import App from './App.vue'

// ★ Vue Router を追加
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

// ★ Router を使う
app.use(router)

// ★ Vuetify を使う
app.use(vuetify)

app.mount('#app')
