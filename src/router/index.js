import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save
const routes = [
  
    //admin
    {
        path: "/admin/trang-chu",
        component: () => import("../components/Admin/trangchu/index.vue"),
        meta: {
            layout : "admin"
        }
    },
    {
        path: "/admin/users",
        name: "UserManagement",
        component: () => import("../components/Admin/UserManagement.vue"),
        meta: {
            layout: "admin"
        }
      },     
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
