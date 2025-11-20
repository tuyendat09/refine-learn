import useCategory from "./hook/useCategory";
import { List } from "@refinedev/antd";
import { Table } from "antd";
import { Outlet, useNavigate } from "react-router";
import { Icon } from "@iconify/react";

export default function ListCategory() {
  const { tableProps, handleDeleteCategory } = useCategory();
  const navigate = useNavigate();

  return (
    <>
      <List
        breadcrumb={false}
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
          <Table.Column
            title="Category Name"
            render={(_, record) => (
              <div className="flex gap-2">
                <p>{record.categoryName}</p>
                <button
                  onClick={() => navigate(`edit/${record._id}`)}
                  className="cursor-pointer"
                >
                  <Icon icon="guidance:pen" width="16" height="16" />
                </button>
              </div>
            )}
          />
          <Table.Column
            dataIndex="status"
            title="Action"
            render={(_, record) => (
              <button
                className="cursor-pointer bg-black px-4 py-1 rounded-full text-white hover:bg-gray-neutral-700 transition duration"
                onClick={() => handleDeleteCategory(record._id)}
              >
                Delete
              </button>
            )}
          />
        </Table>
      </List>
      <Outlet />
    </>
  );
}
