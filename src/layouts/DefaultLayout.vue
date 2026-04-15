<script setup lang="ts">
import { RouterView } from 'vue-router'
import DefaultHeader from '@/views/DefaultHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-[#f9f8f4] relative">
    <div
      class="fixed inset-0 opacity-[0.06] pointer-events-none z-0"
      style="
        background-image: url('/assets/layout/bg-pattern-pages.svg');
        background-repeat: repeat;
      "
    ></div>
    <DefaultHeader />
    <main class="relative z-10 max-w-7xl mx-auto p-4 md:p-8">
      <div
        class="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-slate-200/50 min-h-[calc(100vh-120px)]"
      >
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.router-link-active {
  background: rgba(16, 185, 129, 0.05);
}
</style>
