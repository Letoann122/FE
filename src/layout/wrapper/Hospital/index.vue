<template>
    <div class="wrapper">
        <TheHeader />

        <main class="main-content">
            <div class="container-fluid py-4 px-lg-5"> 
                <slot />
            </div>
        </main>
        
        <TheFooter />
    </div>
</template>

<script>
import TheHeader from "../../components/Hospital/TheHeader.vue";
import TheFooter from "../../components/Hospital/TheFooter.vue";

export default {
    name: "HospitalLayout",
    components: {
        TheHeader,
        TheFooter,
    },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
}

.page-wrapper {
  flex-grow: 1; 
}

.page-content {
    padding: 20px; 
}
</style>