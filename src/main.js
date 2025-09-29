import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Admin from './layout/wrapper/Admin/index.vue';
import Client from './layout/wrapper/Client/index.vue';
import Blank from './layout/wrapper/blank.vue';
import Toaster from "@meforma/vue-toaster";
import './style.css'

const app = createApp(App)

app.use(Toaster, {
    position: "top-right",
});
app.use(router)
app.component("client-layout",Client);
app.component("admin-layout",Admin)
app.component("blank-layout",Blank)

app.mount("#app")