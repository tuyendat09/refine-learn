import getSorter from "../../shared/utils/getSorter";
import type {
  BaseRecord,
  DataProvider,
  GetListParams,
  GetListResponse,
} from "@refinedev/core";
import { handleGetQueryProduct } from "../../shared/apis/ProductApi";

export const ProductProvider: DataProvider = {
  getOne: () => {
    throw new Error("Not implemented");
  },
  update: () => {
    throw new Error("Not implemented");
  },
  getList: async <TData extends BaseRecord = BaseRecord>({
    pagination,
    meta,
    sorters,
  }: GetListParams): Promise<GetListResponse<TData>> => {
    const page = pagination?.currentPage ?? 1;
    const limit = pagination?.pageSize ?? 10;
    const productName = meta?.productName;
    const category = meta?.category;
    const latest = meta?.latest;
    const oldest = meta?.oldest;
    const exceptId = meta?.exceptId;

    const sortPrice = getSorter(sorters ?? [], "productPrice")?.order;
    const sortQuantity = getSorter(sorters ?? [], "productQuantity")?.order;

    const response = await handleGetQueryProduct({
      page: page,
      limit: limit,
      productName: productName,
      category: category,
      latest: latest,
      oldest: oldest,
      productPrice: sortPrice,
      productQuantity: sortQuantity,
      exceptId: exceptId,
    });

    return {
      data: response.products as unknown as TData[],
      total: response.total as unknown as number,
    };
  },
  create: () => {
    throw new Error("Not implemented");
  },
  deleteOne: () => {
    throw new Error("Not implemented");
  },
  getApiUrl: () => {
    throw new Error("Not implemented");
  },
};
