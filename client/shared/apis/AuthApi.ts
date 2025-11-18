import { IRegisterData } from "./../types/AuthApi";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function handleRegister({ username, password }: IRegisterData) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!data.success) {
      const error = {
        message: data.message,
        statusCode: 406,
      };
      return Promise.reject(error);
    }
    return data;
  } catch (error) {
    throw error;
  }
}
