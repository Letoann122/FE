import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save
const routes = [
    //redirect trang-chu
     {
        path: "/",
        redirect: "/trang-chu",   
    },
    //admin
    {
        path: "/admin/trang-chu",
        component: () => import("../components/Admin/trangchu/index.vue"),
        meta: {
            layout : "admin"
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
        path: "/QuenPassword",
        component: () => import("../components/Client/QuenPassword/index.vue"),
        meta : {
            layout : "client",
        }
    },
    {
        path: "/tintuc",
        component: () => import("../components/Client/TinTuc/index.vue"),
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
        path: "/dang-nhap",
        component: () => import("../components/Client/DangNhap/index.vue"),
        meta : {
            layout : "blank",
        }
    },
    {
        path: "/dang-ky",
        component: () => import("../components/Client/Dangky/index.vue"),
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
