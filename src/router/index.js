import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save
const routes = [
  
    //admin

    //bacsi

    //client
    {
        path: "/trang-chu",
        component: () => import("../components/trangchu/index.vue"),
        meta : {
            layout : "client",
        }
    },
    {
        path: "/login",
        component: () => import("../components/Client/Login/index.vue"),
        meta : {
            layout : "client",
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
