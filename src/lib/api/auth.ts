import axios from '@/lib/utils/axios.customize';
import type { LoginInput } from '@/schemas/LoginFormSchema';
import type { RegisterInput } from '@/schemas/RegisterFormSchema';
import type { IBackendRes, ILoginResponse, IUser } from '@/types/global';

export const loginAPI = (
  data: LoginInput
): Promise<IBackendRes<ILoginResponse>> => {
  return axios.post('/login', data);
};
export const registerAPI = (
  data: RegisterInput
): Promise<IBackendRes<IUser>> => {
  return axios.post('/register', data);
};
export const fetchProfileAPI = (): Promise<IBackendRes<IUser>> => {
  return axios.get('/me');
};
export const logoutAPI = (): Promise<IBackendRes<null>> => {
  return axios.post('/logout');
};
