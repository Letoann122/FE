import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Admin from './layout/wrapper/Admin/index.vue';
import Client from './layout/wrapper/Client/index.vue';
const app = createApp(App)

app.use(router)
app.component("client-layout",Client);
app.component("admin-layout",Admin)



app.mount("#app")