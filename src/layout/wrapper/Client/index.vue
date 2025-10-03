<template>
  <div class="client-wrapper">
    <TopSBD />
    <main>
      <router-view />
    </main>
    <BotSBD />
  </div>
</template>

<script>
import TopSBD from "../../components/Client/Header.vue";
import BotSBD from "../../components/Client/Footer.vue";
import "../../../assets/js/bootstrap.bundle.min.js";

export default {
  name: "ClientLayout",
  components: {
    TopSBD,
    BotSBD,
  },
};
</script>

<style>
@import "../../../assets/css/bootstrap.min.css";
@import "../../../assets/css/all.min.css"; 
</style>
