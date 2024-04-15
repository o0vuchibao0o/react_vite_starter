import { Form, Input, InputNumber, Modal, Select } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import axios from "axios";
import { useEffect } from "react";
import { IUsers } from "./users.table";

interface IProps {
  access_token: string;
  getAllUsersByAxios: () => Promise<void>;
  api: NotificationInstance;
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dataUpdate: IUsers | null;
  setDataUpdate: React.Dispatch<React.SetStateAction<IUsers | null>>;
}

const { Option } = Select;

const UpdateUserModal = (props: IProps) => {
  const {
    access_token,
    getAllUsersByAxios,
    api,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    dataUpdate,
    setDataUpdate,
  } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        name: dataUpdate.name,
        email: dataUpdate.email,
        age: dataUpdate.age,
        address: dataUpdate.address,
        gender: dataUpdate.gender,
        role: dataUpdate.role,
      });
    }
  }, [dataUpdate]);

  const onFinish = async (values) => {
    if (dataUpdate) {
      try {
        await axios({
          method: "patch",
          url: "http://localhost:8000/api/v1/users",
          data: { ...values, _id: dataUpdate._id },
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        api.success({
          message: "Update user thành công",
        });
        await getAllUsersByAxios();
        handleCancel();
      } catch (error) {
        api.error({
          message: "Có lỗi xảy ra",
          description: JSON.stringify(error.response.data.message),
        });
      }
    }
  };

  const handleCancel = () => {
    setDataUpdate(null);
    setIsUpdateModalOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Update new user"
      open={isUpdateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCancel()}
      maskClosable={false}
    >
      <Form
        name="basic"
        onFinish={(values) => onFinish(values)}
        layout="vertical"
        form={form}
      >
        <Form.Item
          style={{ marginBottom: 5 }}
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          label="Password"
          name="password"
          rules={[
            {
              required: dataUpdate ? false : true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password disabled={dataUpdate ? true : false} />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          label="Age"
          name="age"
          rules={[
            {
              required: true,
              message: "Please input your age!",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true }]}
          style={{ marginBottom: 5 }}
        >
          <Select
            placeholder="Select a option and change input text above"
            // onChange={onGenderChange}
            allowClear
          >
            <Option value="MALE">male</Option>
            <Option value="FEMALE">female</Option>
            <Option value="OTHER">other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true }]}
          style={{ marginBottom: 5 }}
        >
          <Select
            placeholder="Select a option and change input text above"
            // onChange={onGenderChange}
            allowClear
          >
            <Option value="ADMIN">admin</Option>
            <Option value="USER">user</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUserModal;
