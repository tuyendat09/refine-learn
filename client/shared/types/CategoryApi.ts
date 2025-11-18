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
