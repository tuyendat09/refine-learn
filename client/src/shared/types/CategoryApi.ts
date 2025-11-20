export interface ICategoryReponse {
  success: boolean;
  message: string;
}

export interface ICreateCategoryReponse {
  success: boolean;
  message: string;
}

export interface ICategoryQueryParams {
  page: number;
  limit: number;
}

export interface Category {
  _id: string;
  categoryName: string;
}

export interface GetCategoryResponse {
  data: {
    categories: Category[];
    pagination: {
      total: number;
      totalPages: number;
      currentPage: number;
      limit: number;
    };
  };
  success?: boolean;
}

export interface GetOneCategoryParams {
  id: string;
}

export interface GetOneCategoryResponse {
  success: boolean;
  message?: string;
  category: Category;
}
