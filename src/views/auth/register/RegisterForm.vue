<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Message from "primevue/message";
import Checkbox from "primevue/checkbox";
import { useToast } from "primevue/usetoast";

import { registerSchema, type RegisterInput } from "@/schemas/RegisterFormSchema";
import type { IBackendError } from "@/types/global";
import { registerAPI } from "@/lib/api/auth";

const router = useRouter();
const toast = useToast();
const isLoading = ref(false);
const serverError = ref("");

const form = reactive<RegisterInput>({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  terms: false,
  marketing_emails: false,
});

const errors = ref<Record<string, string>>({});

const handleRegister = async () => {
  isLoading.value = true;
  serverError.value = "";
  errors.value = {};

  const result = registerSchema.safeParse(form);
  if (!result.success) {
    errors.value = result.error.issues.reduce(
      (acc, issue) => {
        const key = issue.path[0]?.toString();
        if (key) acc[key] = issue.message;
        return acc;
      },
      {} as Record<string, string>,
    );

    isLoading.value = false;
    return;
  }

  try {
    const res = await registerAPI(result.data);

    toast.add({
      severity: "success",
      summary: "Thành công",
      detail: res.message || "Đăng ký tài khoản thành công! Đang chuyển hướng...",
      life: 3000,
    });
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  } catch (err) {
    const error = err as IBackendError;
    serverError.value = error.message || "Đăng ký thất bại, vui lòng thử lại";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 p-4">
    <Card class="w-full max-w-md shadow-lg border-none rounded-2xl">
      <template #title>
        <div class="text-center">
          <h2 class="text-2xl font-black text-slate-800 uppercase tracking-tight">
            Tham gia Votely
          </h2>
          <p class="text-sm text-slate-500 font-medium mt-1">Tạo tài khoản để bắt đầu bình chọn</p>
        </div>
      </template>

      <template #content>
        <form @submit.prevent="handleRegister" class="space-y-4">
          <Message v-if="serverError" severity="error" variant="simple">{{ serverError }}</Message>

          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1">
              <label class="text-sm font-bold text-slate-600">Họ</label>
              <InputText
                v-model="form.firstName"
                :invalid="!!errors.firstName"
                placeholder="Nguyễn"
              />
              <small class="text-red-500 text-xs">{{ errors.firstName }}</small>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm font-bold text-slate-600">Tên</label>
              <InputText v-model="form.lastName" :invalid="!!errors.lastName" placeholder="Văn A" />
              <small class="text-red-500 text-xs">{{ errors.lastName }}</small>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-sm font-bold text-slate-600">Email</label>
            <InputText
              v-model="form.email"
              :invalid="!!errors.email"
              placeholder="email@example.com"
            />
            <small class="text-red-500 text-xs">{{ errors.email }}</small>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-sm font-bold text-slate-600">Số điện thoại</label>
            <InputText v-model="form.phone" :invalid="!!errors.phone" placeholder="090..." />
            <small class="text-red-500 text-xs">{{ errors.phone }}</small>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-sm font-bold text-slate-600">Mật khẩu</label>
            <Password
              v-model="form.password"
              :invalid="!!errors.password"
              toggleMask
              :feedback="false"
              placeholder="******"
            />
            <small class="text-red-500 text-xs">{{ errors.password }}</small>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-sm font-bold text-slate-600">Xác nhận mật khẩu</label>
            <Password
              v-model="form.confirmPassword"
              :invalid="!!errors.confirmPassword"
              toggleMask
              :feedback="false"
              placeholder="******"
            />
            <small class="text-red-500 text-xs">{{ errors.confirmPassword }}</small>
          </div>
          <div class="flex items-start gap-2 mt-3">
            <Checkbox
              v-model="form.terms"
              :binary="true"
              inputId="terms"
              :invalid="!!errors.terms"
            />
            <label for="terms" class="text-sm text-slate-600 cursor-pointer">
              Tôi đồng ý với
              <a href="#" class="text-emerald-600 font-bold hover:underline"
                >Điều khoản & Điều kiện</a
              >
            </label>
          </div>
          <small v-if="errors.terms" class="text-red-500 text-xs block mt-1">
            {{ errors.terms }}
          </small>

          <div class="flex items-start gap-2 mt-2">
            <Checkbox v-model="form.marketing_emails" :binary="true" inputId="marketing" />
            <label for="marketing" class="text-sm text-slate-600 cursor-pointer">
              Gửi cho tôi thông tin khuyến mãi và cập nhật
            </label>
          </div>
          <Button
            type="submit"
            label="Đăng ký ngay"
            icon="pi pi-user-plus"
            class="w-full mt-4 font-bold p-3"
            :loading="isLoading"
          />

          <div class="text-center mt-4">
            <span class="text-sm text-slate-500">Đã có tài khoản? </span>
            <router-link to="/login" class="text-sm font-bold text-emerald-600 hover:underline"
              >Đăng nhập</router-link
            >
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>
