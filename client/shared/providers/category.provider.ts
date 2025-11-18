import type { DataProvider } from "@refinedev/core";
import {
  handleGetQueryCategory,
  handleDeleteCategory,
} from "../../shared/apis/CategoryApi";

const CategoryProvider: DataProvider = {
  getOne: () => {
    throw new Error("Not implemented");
  },
  update: () => {
    throw new Error("Not implemented");
  },
  getList: async ({ pagination }) => {
    const page = pagination?.currentPage ?? 1;
    const limit = pagination?.pageSize ?? 10;

    const response = await handleGetQueryCategory({ page, limit });

    return {
      data: response.data.categories,
      total: response.data.pagination.total,
    };
  },

  create: () => {
    throw new Error("Not implemented");
  },
  deleteOne: ({ id }) => {
    const response = handleDeleteCategory(id);
    return response;
  },
  getApiUrl: () => {
    throw new Error("Not implemented");
  },
  // Optional methods:
  // getMany: () => { /* ... */ },
  // createMany: () => { /* ... */ },
  // deleteMany: () => { /* ... */ },
  // updateMany: () => { /* ... */ },
  // custom: () => { /* ... */ },
};
export default CategoryProvider;
