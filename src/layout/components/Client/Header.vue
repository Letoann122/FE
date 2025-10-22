<template>
  <div class="top-wrapper">
    <nav ref="nav" class="navbar navbar-expand-lg bg-white" :class="{ 'fixed-top shadow-sm': isSticky }">
      <div class="container-fluid">
        <router-link class="navbar-brand fw-bold ms-3" to="/trang-chu">
          <i class="fa-solid fa-heart text-danger"></i> Smart Blood Donation
        </router-link>

        <!-- toggler mobile -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item mx-3">
              <router-link class="nav-link" to="/trang-chu" exact-active-class="active">Trang chủ</router-link>
            </li>
            <li class="nav-item mx-3">
              <router-link class="nav-link" to="/About" exact-active-class="active">Giới thiệu</router-link>
            </li>
            <li class="nav-item mx-3">
              <router-link class="nav-link" to="/Register" exact-active-class="active">Đăng ký hiến máu</router-link>
            </li>
            <li class="nav-item mx-3">
              <router-link class="nav-link" to="/Register_blooddonation" exact-active-class="active">Đặt
                lịch</router-link>
            </li>
            <li class="nav-item mx-3">
              <router-link class="nav-link" to="/News" exact-active-class="active">Tin tức & chiến dịch</router-link>
            </li>

            <li class="nav-item dropdown mx-3">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Mục lục
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Xem thêm</a></li>
                <li><a class="dropdown-item" href="#">Xem thêm</a></li>
                <li><a class="dropdown-item" href="#">Xem thêm</a></li>
              </ul>
            </li>
          </ul>
          <div v-if="!isLoggedIn" class="d-flex">
            <router-link class="btn btn-outline-secondary me-2" to="/dang-nhap">Đăng nhập</router-link>
            <router-link class="btn btn-danger" to="/dang-ky">Đăng ký</router-link>
          </div>
          <div v-else class="dropdown">
            <a class="d-flex align-items-center text-decoration-none dropdown-toggle text-secondary fw-semibold"
              href="#" data-bs-toggle="dropdown">
              Xin chào, {{ user.full_name }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <router-link class="dropdown-item" to="/profile">Hồ sơ cá nhân</router-link>
              </li>
              <li>
                <a class="dropdown-item text-danger" @click="logout">Đăng xuất</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <div v-show="isSticky" :style="{ height: navHeight + 'px' }"></div>
  </div>
</template>

<script>
import baseRequestClient from "../../../core/baseRequestClient";
import { createToaster } from "@meforma/vue-toaster";

const toast = createToaster({ position: "top-right", duration: 3000 });

export default {
  name: "TopSBD",
  data() {
    return {
      isSticky: false,
      navHeight: 0,
      stickyOffset: 10,
      isLoggedIn: false,
      user: {},
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.measure();
      window.addEventListener("scroll", this.onScroll, { passive: true });
      window.addEventListener("resize", this.measure);
    });
    this.checkLogin();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.measure);
  },
  methods: {
    onScroll() {
      this.isSticky = window.scrollY > this.stickyOffset;
    },
    measure() {
      if (this.$refs.nav) this.navHeight = this.$refs.nav.offsetHeight || 64;
    },

    async checkLogin() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.isLoggedIn = false;
        return;
      }
      try {
        const res = await baseRequestClient.get("/auth/profile");
        if (res.data.status) {
          this.isLoggedIn = true;
          this.user = res.data.data;
        } else {
          this.isLoggedIn = false;
          localStorage.clear();
        }
      } catch (err) {
        this.isLoggedIn = false;
        localStorage.clear();
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
      }
    },
    async logout() {
      try {
        await baseRequestClient.get("/auth/logout");
        localStorage.clear();
        this.isLoggedIn = false;
        toast.success("Đăng xuất thành công!");
        this.$router.push("/dang-nhap");
      } catch (err) {
        toast.error("Có lỗi khi đăng xuất!");
      }
    },
  },
  watch: {
    "$route.fullPath"() {
      this.$nextTick(this.measure);
    },
  },
};
</script>

<style scoped>
.navbar {
  transition: box-shadow 0.2s ease, padding 0.2s ease;
}
</style>
