<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { loadTawk, removeTawk } from "./core/tawk";

const default_layout = "blank";

export default {
  name: "App",

  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    },
  },

  mounted() {
    this.applyTawkRule();
    window.addEventListener("storage", this.applyTawkRule);
  },

  beforeUnmount() {
    window.removeEventListener("storage", this.applyTawkRule);
  },

  watch: {
    $route() {
      this.applyTawkRule();
    },
  },

  methods: {
    applyTawkRule() {
      // ƯU TIÊN theo token (chắc nhất)
      const isAdmin = !!localStorage.getItem("token_admin");
      const isDoctor = !!localStorage.getItem("token_doctor");

      // admin/doctor => ẩn
      if (isAdmin || isDoctor) {
        removeTawk();
        return;
      }

      // guest hoặc donor => hiện
      loadTawk();
    },
  },
};
</script>
