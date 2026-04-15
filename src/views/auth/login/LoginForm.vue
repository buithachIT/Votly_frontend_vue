<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Message from "primevue/message";
import { loginSchema } from "@/schemas/LoginFormSchema";
import { loginAPI } from "@/lib/api/auth";
import { useRouter } from "vue-router";
import type { IBackendError } from "@/types/global";
import { useAuthStore } from "@/stores/auth";
import { useToast } from "primevue/usetoast";
import { ROUTES } from "@/consts/routes";

const router = useRouter();
const email = ref<string>("");
const password = ref<string>("");
const isLoading = ref<boolean>(false);
const serverError = ref<string>("");
const errors = ref<{ email?: string; password?: string }>({});
const authStore = useAuthStore();
const toast = useToast();
const handleLogin = async () => {
  errors.value = {};
  serverError.value = "";

  const result = loginSchema.safeParse({
    email: email.value,
    password: password.value,
  });

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof typeof errors.value;
      errors.value[field] = issue.message;
    });
    return;
  }

  isLoading.value = true;
  try {
    const res = await loginAPI(result.data);

    if (res.success) {
      authStore.setAuth(res.data.user, res.data.accessToken);
      const initialized = await authStore.initialize();
      if (!initialized) {
        throw new Error("Không thể xác thực người dùng sau khi đăng nhập");
      }
      toast.add({
        severity: "success",
        summary: "Welcome back!",
        detail: "Chào mừng bạn quay trở lại!",
        life: 1000,
      });
      router.push(ROUTES.DASHBOARD);
    }
  } catch (err) {
    const error = err as IBackendError;

    serverError.value = error.message || "Đăng nhập thất bại";

    if (error.errors) {
      console.log("Chi tiết lỗi từ BE:", error.errors);
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-100 p-4">
    <div class="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-200">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-black text-emerald-600 tracking-tight">VOTELY</h2>
        <p class="text-slate-500 font-medium">Tạo và chia sẻ phòng bình chọn dễ dàng!</p>
      </div>

      <Message v-if="serverError" severity="error" variant="simple" class="mb-4">
        {{ serverError }}
      </Message>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
        <div class="flex flex-col gap-1">
          <label for="email" class="text-sm font-bold text-slate-700 ml-1">Email</label>
          <InputText
            id="email"
            v-model="email"
            placeholder="nam@example.com"
            class="w-full p-inputtext-lg"
            :class="{ 'p-invalid': errors.email }"
            :disabled="isLoading"
          />
          <small v-if="errors.email" class="text-red-500 font-semibold ml-1">{{
            errors.email
          }}</small>
        </div>

        <div class="flex flex-col gap-1">
          <label for="password" class="text-sm font-bold text-slate-700 ml-1">Mật khẩu</label>
          <Password
            id="password"
            v-model="password"
            :feedback="false"
            toggleMask
            placeholder="Nhập mật khẩu"
            :inputClass="['w-full p-inputtext-lg', { 'p-invalid': errors.password }]"
            class="w-full"
            :disabled="isLoading"
          />
          <small v-if="errors.password" class="text-red-500 font-semibold ml-1">{{
            errors.password
          }}</small>
        </div>

        <Button
          type="submit"
          label="Đăng nhập ngay"
          icon="pi pi-sign-in"
          class="w-full p-3 font-bold text-lg mt-2 shadow-lg shadow-emerald-100"
          severity="emerald"
          :loading="isLoading"
        />

        <div class="text-center mt-2">
          <span class="text-slate-500 text-sm">Chưa có tài khoản?</span>
          <router-link
            :to="ROUTES.REGISTER"
            class="text-emerald-600 text-sm font-bold ml-1 hover:underline"
          >
            Tạo mới
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-password-input) {
  width: 100% !important;
}
.p-invalid {
  border-color: #ef4444 !important;
}
</style>
