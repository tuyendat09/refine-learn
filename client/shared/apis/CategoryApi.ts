import { ICategoryQueryParams } from "./../types/CategoryApi";
import type { BaseKey } from "@refinedev/core";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function handleGetQueryCategory(paramsObj: ICategoryQueryParams) {
  const params = new URLSearchParams();
  Object.entries(paramsObj).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  const response = await fetch(`${API_URL}/category?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!data.success) {
    return Promise.reject({
      message: data.message,
      statusCode: 406,
    });
  }

  return data;
}

export async function handleDeleteCategory(id: BaseKey) {
  const response = await fetch(`${API_URL}/category/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!data.success) {
    return Promise.reject({
      message: data.message,
      statusCode: 406,
    });
  }

  return data;
}
