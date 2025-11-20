export interface IProductQueryParams {
  productName?: string;
  category?: string;
  latest?: boolean;
  oldest?: boolean;
  productPrice?: "desc" | "asc" | UnderlyingDefaultSource;
  productQuantity?: "desc" | "asc" | UnderlyingDefaultSource;
  id?: string;
  exceptId?: string;
  page?: number;
  limit?: number;
}

export interface CustomGetListParams {
  productName?: string;
  category?: string;
  latest?: boolean;
  oldest?: boolean;
  productPrice?: "desc" | "asc" | UnderlyingDefaultSource;
  productQuantity?: "desc" | "asc" | UnderlyingDefaultSource;
  exceptId?: string;
}

export interface ProductCategory {
  categoryId: string;
  categoryName: string;
}

export interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  productCategory: ProductCategory;
  createdAt: string;
}

export interface QueryProductResponse {
  success: boolean;
  products: Product[];
  total: number;
}
