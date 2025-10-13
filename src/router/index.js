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
        path: "/About",
        component: () => import("../components/Client/About/index.vue"),
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
        path: "/News",
        component: () => import("../components/Client/News/index.vue"),
        meta : {
            layout : "client",
        }
    },
    {
        path: "/Seedetails",
        component: () => import("../components/Client/Seedetails/index.vue"),
        meta : {
            layout : "client",
        }
    },
    {
        path: "/Guidehealth",
        component: () => import("../components/Client/Guidehealth/index.vue"),
        meta : {
            layout : "client",
        }
    },

    // {
    //     path: "/RegisterAccount",
    //     component: () => import("../components/Client/RegisterAccount/index.vue"),
    //     meta : {
    //         layout : "client",
    //     }
    // },
    {
        path: "/RegisterAccount",
        component: () => import("../components/Client/RegisterAccount/index.vue"),
        meta : {
            layout : "client",
        }
    },
    {
        path: "/profile",
        component: () => import("../components/Client/profile/index.vue"),
        meta : {
            layout : "client",
        }
    },
    {
        path: "/blooddonationhistory",
        component: () => import("../components/Client/blooddonationhistory/index.vue"),
        meta : {
            layout : "client",
        }
    },
    {
        path: "/accountsecurity",
        component: () => import("../components/Client/accountsecurity/index.vue"),
        meta : {
            layout : "client",
        }
    },
    {
        path: "/Register_blooddonation",
        component: () => import("../components/Client/Register_blooddonation/index.vue"),
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
    {
        path: "/quen-mat-khau",
        component: () => import("../components/Client/Forgotpassword/index.vue"),
        meta : {
            layout : "blank",
        }
    },
    {
        path: "/doi-mat-khau",
        component: () => import("../components/Client/DoiMatKhau/index.vue"),
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
