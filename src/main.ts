import { createApp } from 'vue'
import App from './App.vue'

// router
import router from './router/index'

// vuetify
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
  .use(router)    // ← router-view を使うなら必須
  .use(vuetify)  // ← v-app を使うなら必須
  .mount('#app')
