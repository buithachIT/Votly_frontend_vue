<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import Menu from "primevue/menu";

const menu = ref();
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
};
const toggleMenu = (event: Event) => {
  menu.value.toggle(event);
};
const items = ref([
  {
    label: "Tài khoản",
    items: [
      {
        label: "Thông tin cá nhân",
        icon: "pi pi-user",
        command: () => {
          /* Chuyển hướng đến profile */
        },
      },
      {
        label: "Đăng xuất",
        icon: "pi pi-power-off",
        class: "text-red-500",
        command: () => {
          handleLogout();
        },
      },
    ],
  },
]);
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-white border-b-2 border-black/5 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center gap-8 h-full">
        <RouterLink
          to="/"
          class="text-2xl font-black text-emerald-600 tracking-tighter hover:opacity-80 transition-opacity"
        >
          VOTELY
        </RouterLink>

        <nav class="hidden md:flex items-center gap-1 h-full pt-1">
          <RouterLink
            to="/dashboard"
            active-class="border-emerald-500 text-emerald-600 bg-emerald-50/30"
            class="flex items-center gap-2 px-4 h-full border-b-4 border-transparent text-slate-600 font-black transition-all hover:text-emerald-500"
          >
            Tổng quan
          </RouterLink>
          <RouterLink
            to="/polls"
            active-class="border-emerald-500 text-emerald-600 bg-emerald-50/30"
            class="flex items-center gap-2 px-4 h-full border-b-4 border-transparent text-slate-600 font-black transition-all hover:text-emerald-500"
          >
            Cuộc bình chọn
          </RouterLink>
        </nav>
      </div>

      <div class="flex items-center gap-3">
        <div class="hidden sm:flex flex-col items-end leading-tight mr-1">
          <span class="text-[10px] text-slate-400 font-black uppercase tracking-wider"
            >Thành viên</span
          >
          <span class="text-sm font-black text-slate-800">{{ authStore.userFullName }}</span>
        </div>

        <div
          @click="toggleMenu"
          aria-haspopup="true"
          aria-controls="overlay_menu"
          class="w-10 h-10 rounded-full bg-emerald-100 border-2 border-black flex items-center justify-center text-emerald-700 font-black shadow-[2px_2px_0_0_#000] cursor-pointer hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-none transition-all active:scale-95"
        >
          {{ authStore.user?.firstName?.[0] }}{{ authStore.user?.lastName?.[0] }}
        </div>

        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
          <template #item="{ item, props }">
            <a v-ripple class="flex items-center p-3 gap-2" v-bind="props.action">
              <span :class="[item.icon, item.class]" />
              <span :class="item.class" class="font-bold">{{ item.label }}</span>
            </a>
          </template>
        </Menu>
      </div>
    </div>
  </header>
</template>
