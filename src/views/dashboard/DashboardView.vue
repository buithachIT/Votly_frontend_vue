<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import Card from "primevue/card";
import Avatar from "primevue/avatar";
import Tag from "primevue/tag";
import Divider from "primevue/divider";

// 1. Kết nối với Pinia Store
const authStore = useAuthStore();

// 2. Format ngày tháng (Vẫn giữ lại logic hiển thị)
const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return "...";
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-black text-slate-800">Bảng điều khiển</h1>
      <p class="text-slate-500 font-medium tracking-tight">
        Chào mừng bạn quay trở lại, {{ authStore.user?.firstName }}!
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card class="md:col-span-1 shadow-sm border-none overflow-hidden">
        <template #header>
          <div class="h-24 bg-emerald-600 flex items-end justify-center">
            <Avatar
              :label="authStore.user?.firstName?.charAt(0)"
              class="w-20 h-20 text-3xl font-bold -mb-10 border-4 border-white shadow-md bg-emerald-100 text-emerald-700"
              shape="circle"
            />
          </div>
        </template>
        <template #content>
          <div class="mt-10 text-center">
            <h2 class="text-xl font-bold text-slate-800">
              {{ authStore.user?.lastName }}
            </h2>
            <p class="text-sm text-slate-500 mb-4">{{ authStore.user?.email }}</p>
            <Tag value="Quản trị viên" severity="success" rounded />
          </div>

          <Divider />

          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-slate-400">Số điện thoại:</span>
              <span class="font-bold text-slate-700">{{ authStore.user?.phone || "N/A" }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Ngày tham gia:</span>
              <span class="font-bold text-slate-700">
                {{ formatDate(authStore.user?.createdAt) }}
              </span>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
