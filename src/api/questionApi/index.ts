/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";

export const questionApi = {
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
  async fetchTopic(data: {
    grade: string;
    domain: string;
  }): Promise<AxiosResponse<any>> {
    const url = `/question/fetch-topic`;
    return axiosClient.post(url, data);
  },

  async fetchQuestionForTopic({
    domain,
    grade,
    topics,
  }: {
    domain: {
      value: string;
      label: string;
    };
    grade: {
      value: string;
      label: string;
    };
    topics: {
      value: string;
      label: string;
    }[];
  }) {
    const url = `/question/filter`;
    const dataRequest = {
      config: {
        domain,
        grade,
        topics,
        objectives: [],
        level: null,
        status: "0",
      },
    };
    return axiosClient.post(url, dataRequest);
  },
};
