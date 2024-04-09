/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";

export const authApi = {
  async login(data: {
    emailOrPhoneNumber: string;
    password: string;
  }): Promise<AxiosResponse<any>> {
    const url = `/login?phone=${data.emailOrPhoneNumber}&password=${data.password}`;
    return axiosClient.post(url);
  },
  async loginWithZalo(data: {
    phone: string;
    sentAt: number;
  }): Promise<AxiosResponse<any>> {
    const url = `/send-otp?phone=${data.phone}&sent_at=${data.sentAt}`;
    return axiosClient.post(url);
  },
  async verificationCodeLoginZalo(data: {
    phone: string;
    OTP: string;
  }): Promise<AxiosResponse<any>> {
    const url = `/verify-otp?phone=${data.phone}&otp=${data.OTP}`;
    return axiosClient.post(url);
  },
};
