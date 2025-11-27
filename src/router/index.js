import { createRouter, createWebHistory } from "vue-router";
import checkDoctor from "./checkDoctor";
import checkAdmin from "./checkAdmin";
import checkDonor from "./checkDonor";

const routes = [
  { path: "/", redirect: "/home-page" },

  //admin
  {
    path: "/admin/home",
    component: () => import("../components/Admin/trangchu/index.vue"),
    meta: { layout: "admin" },
    beforeEnter: checkAdmin,
  },
  {
    path: "/admin/user-management",
    component: () => import("../components/Admin/QuanLyUser/index.vue"),
    meta: { layout: "admin" },
    beforeEnter: checkAdmin,
  },
  {
    path: "/admin/login-doctor",
    component: () => import("../components/Admin/DuyetBacSi/index.vue"),
    meta: { layout: "admin" },
    beforeEnter: checkAdmin,
  },
  {
    path: "/admin/create-campaign",
    component: () => import("../components/Admin/TaoChienLuoc/index.vue"),
    meta: { layout: "admin" },
    beforeEnter: checkAdmin,
  },
  {
    path: "/admin/campaigns/:id",
    component: () => import("../components/Admin/CampaignDetail/index.vue"),
    meta: { layout: "admin" },
    beforeEnter: checkAdmin,
  },
  {
    path: "/admin/appoint-control",
    component: () => import("../components/Admin/AppointControl/index.vue"),
    meta: { layout: "admin" },
    beforeEnter: checkAdmin,
  },
  {
    path: "/admin/blood-inventory",
    component: () => import("../components/Admin/BloodInventory/index.vue"),
    meta: { layout: "admin" },
    beforeEnter: checkAdmin,
  },
  {
    path: "/admin/content-management",
    component: () => import("../components/Admin/ContentManagement/index.vue"),
    meta: { layout: "admin" },
    beforeEnter: checkAdmin,
  },

  //hospital
  {
    path: "/Hospital/profile",
    component: () => import("../components/Hospital/Profile/index.vue"),
    meta: { layout: "Hospital" },
    beforeEnter: checkDoctor,
  },
  {
    path: "/Hospital/doi-mat-khau",
    component: () => import("../components/Hospital/DoiMatKhau/index.vue"),
    meta: { layout: "Hospital" },
    beforeEnter: checkDoctor,
  },
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
    path: "/Hospital/blood-inventory-by-type",
    component: () => import("../components/Hospital/BloodGroupDetail/index.vue"),
    meta: { layout: "Hospital" },
    beforeEnter: checkDoctor,
  },
  {
    path: "/Hospital/blood-inventory/:id",
    name: "BloodBatchDetail",
    component: () =>
      import("../components/Hospital/BloodBatchDetail/index.vue"),
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
    component: () =>
      import("../components/Hospital/CampaignManagement/index.vue"),
    meta: { layout: "Hospital" },
    beforeEnter: checkDoctor,
  },
  {
    path: "/Hospital/campaigns/:id",
    component: () =>
      import("../components/Hospital/CampaignDetailView/index.vue"),
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
  {
    path: "/Hospital/check-booking",
    component: () => import("../components/Hospital/CheckBooking/index.vue"),
    meta: { layout: "Hospital" },
    beforeEnter: checkDoctor,
  },
  {
    path: "/Hospital/donation-complete",
    component: () =>
      import("../components/Hospital/DonationComplete/index.vue"),
    meta: { layout: "Hospital" },
    beforeEnter: checkDoctor,
  },
  //donor
  {
    path: "/home-page",
    component: () => import("../components/Homepage/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/about",
    component: () => import("../components/Client/About/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/news",
    component: () => import("../components/Client/News/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/campaigns/:id",
    component: () => import("../components/Client/CampaignDetail/index.vue"),
    meta: { layout: "client" },
    beforeEnter: checkDonor
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
    beforeEnter: checkDonor,
  },
  {
    path: "/blood-donation-history",
    component: () =>
      import("../components/Client/blooddonationhistory/index.vue"),
    meta: { layout: "client" },
    beforeEnter: checkDonor,
  },
  {
    path: "/account-security",
    component: () => import("../components/Client/accountsecurity/index.vue"),
    meta: { layout: "client" },
    beforeEnter: checkDonor,
  },
  {
    path: "/register-blooddonation",
    component: () =>
      import("../components/Client/Register_blooddonation/index.vue"),
    meta: { layout: "client" },
    beforeEnter: checkDonor,
  },
  {
    path: "/notification",
    component: () => import("../components/Client/notification/index.vue"),
    meta: { layout: "client" },
    beforeEnter: checkDonor,
  },
  {
    path: "/contact",
    component: () => import("../components/Client/Contact/index.vue"),
    meta: { layout: "client" },
  },

  {
    path: "/login",
    component: () => import("../components/Client/Login/index.vue"),
    meta: { layout: "blank" },
  },
  {
    path: "/register",
    component: () => import("../components/Client/Register/index.vue"),
    meta: { layout: "blank" },
  },
  {
    path: "/forgot-password",
    component: () => import("../components/Client/Forgotpassword/index.vue"),
    meta: { layout: "blank" },
  },
  {
    path: "/change-password",
    component: () => import("../components/Client/Changepassword/index.vue"),
    meta: { layout: "blank" },
  },
  {
    path: "/fa-question",
    component: () => import("../components/Client/Faquestion/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/privacy-policy",
    component: () => import("../components/Client/Privacypolicy/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/terms-use",
    component: () => import("../components/Client/TermsofUse/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../components/Client/Notfound/index.vue"),
    meta: { layout: "client" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
