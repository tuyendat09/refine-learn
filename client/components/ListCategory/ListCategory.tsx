import useCategory from "./hook/useCategory";
import { List } from "@refinedev/antd";
import { Table } from "antd";
import { Outlet } from "react-router";

export default function ListCategory() {
  const { tableProps, handleDeleteCategory } = useCategory();

  return (
    <>
      <List>
        <Table
          {...tableProps}
          pagination={{
            ...tableProps.pagination,
            position: ["bottomCenter"],
          }}
          rowKey="id"
        >
          <Table.Column dataIndex="_id" title="ID" />
          <Table.Column dataIndex="categoryName" title="Category Name" />
          <Table.Column
            dataIndex="status"
            title="Status"
            render={(_, record) => (
              <div className="space-x-2 ">
                <button>Edit</button>
                <button
                  className="cursor-pointer bg-black px-4 py-1 rounded-full text-white hover:bg-gray-neutral-700 transition duration"
                  onClick={() => handleDeleteCategory(record._id)}
                >
                  Delete
                </button>
              </div>
            )}
          />
        </Table>
      </List>
      <Outlet />
    </>
  );
}
