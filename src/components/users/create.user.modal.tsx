import { Form, Input, InputNumber, Modal, Select } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import axios from "axios";

interface IProps {
  access_token: string;
  getAllUsersByAxios: () => Promise<void>;
  api: NotificationInstance;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const { Option } = Select;

const CreateUserModal = (props: IProps) => {
  const {
    access_token,
    getAllUsersByAxios,
    api,
    isCreateModalOpen,
    setIsCreateModalOpen,
  } = props;

  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      await axios({
        method: "post",
        url: "http://localhost:8000/api/v1/users",
        data: values,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      api.success({
        message: "Tạo mới user thành công",
      });
      await getAllUsersByAxios();
      handleCancel();
    } catch (error) {
      api.error({
        message: "Có lỗi xảy ra",
        description: JSON.stringify(error.response.data.message),
      });
    }
  };

  return (
    <Modal
      title="Add new user"
      open={isCreateModalOpen}
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
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
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

export default CreateUserModal;
