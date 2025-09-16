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
import TopSBD from "../../components/Client/TopSBD.vue";
import BotSBD from "../../components/Client/BotSBD.vue";
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
