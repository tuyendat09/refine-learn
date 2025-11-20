import { memo } from "react";
import { getDefaultSortOrder, List } from "@refinedev/antd";
import { Table } from "antd";
import { Outlet } from "react-router";

import useListProduct from "./hook/useListProduct";

const ListProduct = () => {
  const { tableProps, sorters } = useListProduct();

  return (
    <List
      breadcrumb={false}
      canCreate
      createButtonProps={{
        style: {
          backgroundColor: "#0d0d0d",
          borderRadius: "20px",
        },
      }}
    >
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          position: ["bottomCenter"],
        }}
        rowKey="id"
      >
        <Table.Column dataIndex="_id" title="ID" />
        <Table.Column dataIndex="productName" title="Product Name" />
        <Table.Column
          title="Category Name"
          dataIndex={["productCategory", "categoryName"]}
        />
        <Table.Column
          title="Product Price"
          dataIndex="productPrice"
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("productPrice", sorters)}
        />
        <Table.Column
          title="Product Quantity"
          dataIndex="productQuantity"
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("productQuantity", sorters)}
        />
        <Table.Column
          dataIndex="status"
          title="Action"
          render={(_, record) => (
            <button className="cursor-pointer bg-black px-4 py-1 rounded-full text-white hover:bg-gray-neutral-700 transition duration">
              Delete
            </button>
          )}
        />
      </Table>
      <Outlet />
    </List>
  );
};

const MemoizedListProduct = memo(ListProduct);

export default MemoizedListProduct;
