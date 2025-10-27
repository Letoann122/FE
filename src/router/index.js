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
    {
        path: "/admin/roles",
        name: "RoleManagement",
        component: () => import("../components/Admin/RoleManagement.vue"),
        meta: {
            layout: "admin"
        }
      },
    {
        path: "/admin/content",
        name: "ContentManagement",
        component: () => import("../components/Admin/ContentManagement.vue"),
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
        path: "/GioiThieu",
        component: () => import("../components/Client/GioiThieu/index.vue"),
        meta : {
            layout : "client",
        }
    },
    {
        path: "/Register",
        component: () => import("../components/Client/Registerdonateblood/index.vue"),
        meta : {
            layout : "client",
        }
    },
    {
        path: "/RegisterAccount",
        component: () => import("../components/Client/RegisterAccount/index.vue"),
        meta : {
            layout : "client",
        }
    },
    //blank
    {
        path: "/LoginAccount",
        component: () => import("../components/Client/LoginAccount/index.vue"),
        meta : {
            layout : "blank",
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
