import { useEffect, useState } from "react";
// import "../../styles/users.css";
import axios from "axios";
import { Button, Popconfirm, Table, TableProps, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CreateUserModal from "./create.user.modal";
import UpdateUserModal from "./update.user.modal";

const access_token = localStorage.getItem("access_token") as string;

export interface IUsers {
  _id: string;
  name: string;
  email: string;
  password: string;
  age: string;
  gender: string;
  address: string;
  role: string;
}

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [dataUpdate, setDataUpdate] = useState<IUsers | null>(null);

  const [api, contextHolder] = notification.useNotification();
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 5,
    pages: 0,
    total: 0,
  });

  useEffect(() => {
    getAllUsersByAxios();
  }, []);

  const getAllUsersByAxios = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8000/api/v1/users",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          current: meta.current,
          pageSize: meta.pageSize,
        },
      });

      setListUsers(response.data.data.result);
      setMeta({
        current: response.data.data.meta.current,
        pageSize: response.data.data.meta.pageSize,
        pages: response.data.data.meta.pages,
        total: response.data.data.meta.total,
      });
    } catch (error) {
      api.error({
        message: JSON.stringify(error.response.data.message),
      });
    }
  };

  const columns: TableProps<IUsers>["columns"] = [
    {
      title: "Email",
      dataIndex: "email",
      render: (value, record) => {
        return <a href="">{record.email}</a>;
      },
    },
    { title: "Name", dataIndex: "name" },
    { title: "Role", dataIndex: "role" },
    {
      title: "Role",
      render: (value, record) => {
        return (
          <div>
            <button
              onClick={() => {
                setDataUpdate(record);
                setIsUpdateModalOpen(true);
              }}
            >
              Edit
            </button>

            <Popconfirm
              title="Delete the user"
              description={`Are you sure to delete this user.name = ${record.name}`}
              onConfirm={() => confirm(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button style={{ marginLeft: 20 }} danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const confirm = async (user: IUsers) => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:8000/api/v1/users/${user._id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      api.success({
        message: "Xoá user thành công",
      });
      await getAllUsersByAxios();
    } catch (error) {
      api.error({
        message: "Có lỗi xảy ra",
        description: JSON.stringify(error.response.data.message),
      });
    }
  };

  const handleOnChange = async (page: number, pageSize: number) => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8000/api/v1/users",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          current: page,
          pageSize: pageSize,
        },
      });

      setListUsers(response.data.data.result);
      setMeta({
        current: response.data.data.meta.current,
        pageSize: response.data.data.meta.pageSize,
        pages: response.data.data.meta.pages,
        total: response.data.data.meta.total,
      });
    } catch (error) {
      api.error({
        message: JSON.stringify(error.response.data.message),
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Table User</h2>
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Add new
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={listUsers}
        rowKey="_id"
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          total: meta.total,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page: number, pageSize: number) =>
            handleOnChange(page, pageSize),
          showSizeChanger: true,
        }}
      />
      <CreateUserModal
        access_token={access_token}
        getAllUsersByAxios={getAllUsersByAxios}
        api={api}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      <UpdateUserModal
        access_token={access_token}
        getAllUsersByAxios={getAllUsersByAxios}
        api={api}
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};

export default UsersTable;
