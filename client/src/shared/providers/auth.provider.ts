import { AuthProvider } from "@refinedev/core";
import { IGetIdentityResponse } from "../types/AuthProvider";
const API_URL = import.meta.env.VITE_BACKEND_URL;
import { handleRegister } from "../../shared/apis/AuthApi";

export const authProvider: AuthProvider = {
  onError: async (error) => {
    console.log(error);
    if (error?.status === 401) {
      return {
        logout: true,
        error: {
          message: "Unauthorized",
          name: "Error",
          statusCode: error?.status ?? 403,
        },
      };
    }

    return { error: new Error(error) };
  },
  getIdentity: async (): Promise<IGetIdentityResponse> => {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("my_access_token") as any,
      },
    });

    if (response.status < 200 || response.status > 299) {
      return null;
    }

    const data = await response.json();

    return data;
  },
  logout: async () => {
    localStorage.removeItem("my_access_token");
    return { success: true };
  },
  // login method receives an object with all the values you've provided to the useLogin hook.
  login: async ({ username, password }) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("my_access_token", data.token);
      return { success: true };
    }

    return { success: false };
  },
  register: handleRegister,
  check: async () => {
    const token = localStorage.getItem("my_access_token");

    return { authenticated: Boolean(token) };
  },
};
