import { createRouter, createWebHistory } from "vue-router";
import checkDoctor from "./checkDoctor";
import checkAdmin from "./checkadmin";
import checkdonor from "./checkdonor";

const routes = [
  { path: "/", redirect: "/trang-chu" },

//admin
  {
    path: "/admin/trang-chu",
    component: () => import("../components/Admin/trangchu/index.vue"),
    meta: { layout: "admin" },
    beforeEnter: checkAdmin,
  },
  {
    path: "/admin/quan-li-nguoi-dung",
    component: () => import("../components/Admin/QuanLyUser/index.vue"),
    meta: { layout: "admin" },
    beforeEnter: checkAdmin,
  },
  {
    path: "/admin/dang-ki-bac-si",
    component: () => import("../components/Admin/DuyetBacSi/index.vue"),
    meta: { layout: "admin" },
    beforeEnter: checkAdmin,
  },
   {
    path: "/admin/appoint-control",
    component: () => import("../components/Admin/AppointControl/index.vue"),
    meta: { layout: "admin" },
    //  beforeEnter: checkAdmin,
  },

  
//hospital
  {
    path: "/Hospital/dashboard",
    component: () => import("../components/Hospital/dashboard/index.vue"),
    meta: { layout: "Hospital" },
    beforeEnter: checkDoctor,
  },
  {
    path: "/Hospital/blood-inventory",
    component: () => import("../components/Hospital/BloodInventory/index.vue"),
    meta: { layout: "Hospital" },
    beforeEnter: checkDoctor,
  },
  {
    path: "/Hospital/blood-inventory/:id",
    name: "BloodBatchDetail",
    component: () => import("../components/Hospital/BloodBatchDetail/index.vue"),
    meta: { layout: "Hospital" },
    beforeEnter: checkDoctor,
  },
  {
    path: "/Hospital/blood-inventory/log",
    name: "BloodStockLog",
    component: () => import("../components/Hospital/BloodStockLog/index.vue"),
    meta: { layout: "Hospital" },
    beforeEnter: checkDoctor,
  },
  {
    path: "/Hospital/donor-management",
    component: () => import("../components/Hospital/DonorManagement/index.vue"),
    meta: { layout: "Hospital" },
    beforeEnter: checkDoctor,
  },
  {
    path: "/Hospital/donor-management/:id",
    name: "DonorDetail",
    component: () => import("../components/Hospital/DonorDetail/index.vue"),
    meta: { layout: "Hospital" },
    beforeEnter: checkDoctor,
  },
  {
    path: "/Hospital/campaign-management",
    component: () => import("../components/Hospital/CampaignManagement/index.vue"),
    meta: { layout: "Hospital" },
    beforeEnter: checkDoctor,
  },
  {
    path: "/Hospital/support",
    component: () => import("../components/Hospital/Support/index.vue"),
    meta: { layout: "Hospital" },
    beforeEnter: checkDoctor,
  },
  {
    path: "/Hospital/report",
    component: () => import("../components/Hospital/Report/index.vue"),
    meta: { layout: "Hospital" },
    beforeEnter: checkDoctor,
  },

//donor
  {
    path: "/trang-chu",
    component: () => import("../components/trangchu/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/about",
    component: () => import("../components/Client/About/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/register",
    component: () => import("../components/Client/Registerdonateblood/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/news",
    component: () => import("../components/Client/News/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/see-details",
    component: () => import("../components/Client/Seedetails/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/guide-health",
    component: () => import("../components/Client/Guidehealth/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/profile",
    component: () => import("../components/Client/profile/index.vue"),
    meta: { layout: "client" },
    beforeEnter: checkdonor,
  },
  {
    path: "/blood-donation-history",
    component: () => import("../components/Client/blooddonationhistory/index.vue"),
    meta: { layout: "client" },
    beforeEnter: checkdonor,
  },
  {
    path: "/account-security",
    component: () => import("../components/Client/accountsecurity/index.vue"),
    meta: { layout: "client" },
    beforeEnter: checkdonor,
  },
  {
    path: "/register-blooddonation",
    component: () => import("../components/Client/Register_blooddonation/index.vue"),
    meta: { layout: "client" },
    beforeEnter: checkdonor,
  },
  {
    path: "/notification",
    component: () => import("../components/Client/notification/index.vue"),
    meta: { layout: "client" },
    beforeEnter: checkdonor,
  },
  {
    path: "/contact",
    component: () => import("../components/Client/Contact/index.vue"),
    meta: { layout: "client" },
  },

  {
    path: "/dang-nhap",
    component: () => import("../components/Client/DangNhap/index.vue"),
    meta: { layout: "blank" },
  },
  {
    path: "/dang-ky",
    component: () => import("../components/Client/Dangky/index.vue"),
    meta: { layout: "blank" },
  },
  {
    path: "/quen-mat-khau",
    component: () => import("../components/Client/Forgotpassword/index.vue"),
    meta: { layout: "blank" },
  },
  {
    path: "/doi-mat-khau",
    component: () => import("../components/Client/DoiMatKhau/index.vue"),
    meta: { layout: "blank" },
  },

  {
    path: "/:pathMatch(.*)*",
    component: () => import("../components/Client/not-found/index.vue"),
    meta: { layout: "client" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
