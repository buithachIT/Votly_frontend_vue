export interface IBackendRes<T> {
  success: boolean;
  data: T;
  message: string;
  errors: any;
}
export interface IBackendError {
  success: boolean;
  message: string;
  errors?: any;
}
export interface ILoginResponse {
  accessToken: string;
  user: IUser;
}
export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
