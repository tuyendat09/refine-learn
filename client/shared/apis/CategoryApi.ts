import {
  ICategoryQueryParams,
  GetOneCategoryResponse,
  ICategoryReponse,
} from "./../types/CategoryApi";
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

export async function handleCreateNewCategory(newCategoryName: string) {
  const response = await fetch(`${API_URL}/category`, {
    method: "POST",
    body: JSON.stringify({ newCategoryName: newCategoryName }),
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

export async function handleGetOneCategory(
  id: string | number,
): Promise<GetOneCategoryResponse> {
  const res = await fetch(`${API_URL}/category/${id}`);
  const data: GetOneCategoryResponse = await res.json();

  if (!data.success) {
    return Promise.reject({
      message: data.message,
      statusCode: 406,
    });
  }

  return data;
}

export async function handleUpdateCategory(
  id: BaseKey,
  newCategoryName: string,
): Promise<ICategoryReponse> {
  console.log("123");
  const res = await fetch(`${API_URL}/category/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ newCategoryName: newCategoryName }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: ICategoryReponse = await res.json();

  if (!data.success) {
    return Promise.reject({
      message: data.message,
      statusCode: 406,
    });
  }

  return data;
}
