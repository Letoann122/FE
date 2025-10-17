<template>
  <component :is="layout">
    <router-view />
  </component>
   <nav class="nav">
    <router-link to="/trang-chu">Trang chủ</router-link>
    <router-link to="/about">Giới thiệu</router-link>
    <router-link to="/news">Tin tức</router-link>
    <router-link to="/guide-health">Hướng dẫn sức khỏe</router-link>
    <router-link to="/register-account">Đăng ký tài khoản</router-link>
    <router-link to="/register-blooddonation">Đăng ký hiến máu</router-link>
    <router-link to="/notification">Thông báo</router-link>
  </nav>

  <!-- Hiển thị trang tương ứng -->
  
</template>

<script>
const default_layout = "default";
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    },
  },
};
</script>
