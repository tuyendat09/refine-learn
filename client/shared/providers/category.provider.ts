import type {
  BaseRecord,
  DataProvider,
  GetOneParams,
  GetOneResponse,
  UpdateParams,
  UpdateResponse,
} from "@refinedev/core";
import {
  handleGetQueryCategory,
  handleDeleteCategory,
  handleCreateNewCategory,
  handleGetOneCategory,
  handleUpdateCategory,
} from "../../shared/apis/CategoryApi";

const CategoryProvider: DataProvider = {
  getOne: async <TData extends BaseRecord = BaseRecord>(
    params: GetOneParams,
  ): Promise<GetOneResponse<TData>> => {
    const { id } = params;

    const response = await handleGetOneCategory(id);


    return {
      data: response as unknown as TData,
    };
  },

  update: async <TData extends BaseRecord = BaseRecord, TVariables = string>(
    params: UpdateParams<TVariables>,
  ): Promise<UpdateResponse<TData>> => {
    const { id, variables } = params;

    const response = await handleUpdateCategory(
      id,
      variables as unknown as string,
    );

    return {
      data: response as unknown as TData,
    };
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

  create: ({ variables }) => {
    const response = handleCreateNewCategory(variables as string);
    return response;
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
