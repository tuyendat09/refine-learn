import { IProductQueryParams, QueryProductResponse } from "../types/ProductApi";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function handleGetQueryProduct(
  paramsObj: IProductQueryParams,
): Promise<QueryProductResponse> {
  const params = new URLSearchParams();
  Object.entries(paramsObj).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  const response = await fetch(`${API_URL}/product?${params.toString()}`, {
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
