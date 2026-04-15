<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import Toast from 'primevue/toast';
const authStore = useAuthStore();

onMounted(() => {
  authStore.initialize();
});
</script>

<template>
  <Toast />
  <RouterView />
</template>

<style></style>
