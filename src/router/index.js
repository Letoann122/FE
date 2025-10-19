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
    //bacsi
    {
        path: "/Hospital/dashboard",
        component: () => import("../components/Hospital/dashboard/index.vue"),
        meta: {
            layout : "Hospital"
        }
    },
    {
        path: "/Hospital/blood-inventory",
        component: () => import("../components/Hospital/BloodInventory/index.vue"),
        meta: {
            layout : "Hospital"
        }
    },
    {
        path: "/Hospital/blood-inventory/:id", 
        name: "BloodBatchDetail",
        component: () => import("../components/Hospital/BloodBatchDetail/index.vue"),
        meta: {
            layout: "Hospital"
        }
    },
    {
        path: "/Hospital/blood-inventory/log", 
        name: "BloodStockLog",
        component: () => import("../components/Hospital/BloodStockLog/index.vue"),
        meta: {
            layout: "Hospital"
        }
    },
     {
        path: "/Hospital/donor-management",
        component: () => import("../components/Hospital/DonorManagement/index.vue"),
        meta: {
            layout : "Hospital"
        }
    },
    {
        path: "/Hospital/donor-management/:id",
        name: "DonorDetail",
        component: () => import("../components/Hospital/DonorDetail/index.vue"),
        meta: {
            layout : "Hospital"
        }
    },
    {
        path: "/Hospital/campaign-management",
        component: () => import("../components/Hospital/CampaignManagement/index.vue"),
        meta: {
            layout : "Hospital"
        }
    },
     {
        path: "/Hospital/support",
        component: () => import("../components/Hospital/Support/index.vue"),
        meta: {
            layout : "Hospital"
        }
    },
    {
        path: "/Hospital/report",
        component: () => import("../components/Hospital/Report/index.vue"),
        meta: {
            layout : "Hospital"
        }
    },
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
