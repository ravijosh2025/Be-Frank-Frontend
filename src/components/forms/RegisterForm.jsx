import React from "react";
import { Button, Form, Input, Select, Spin, message} from "antd";
import { useRegisterMutation } from "../../store/UserApis/userApi";
import { getUserRole, getToken } from "../../utils/authHelpers";
import { useDispatch } from "react-redux";
import { adminApi } from "../../pages/AdminPage/apis";

const { Option } = Select;

const RegisterForm = ({ onClose, opneLogin }) => {
  const [form] = Form.useForm();
  const [register, { isLoading, error }] = useRegisterMutation();
  const role = getUserRole().toLowerCase();
  const token = getToken();
  const dispatch = useDispatch();


  const onFinish = async (values) => {
    try{
      await register( {"user": values });
      message.success("Registered successfully !")
      form.resetFields();
      onClose();
      dispatch(adminApi.util.invalidateTags(["Users"]))
    }catch(err){
      message.err("Something went wrong !")
    }

  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg min-w-[300px] flex flex-col items-center">
      {/* Title */}
      <h2 className="text-gray-800 text-2xl font-semibold text-center mb-4">
        📝 Register
      </h2>

      {/* Scrollable Content */}
      <div className="max-h-[80vh] overflow-y-auto w-full px-4">
        {/* Show Loader when Registering */}
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Spin size="large" />
          </div>
        ) : (
          <Form form={form} layout="vertical" onFinish={onFinish}>
            {/* First Name */}
            <Form.Item
              name="first_name"
              label="First Name"
              rules={[{ required: true, message: "Please enter your first name!" }]}
            >
              <Input />
            </Form.Item>

            {/* Last Name */}
            <Form.Item
              name="last_name"
              label="Last Name"
              rules={[{ required: true, message: "Please enter your last name!" }]}
            >
              <Input />
            </Form.Item>

            {/* Role Selection */}
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select a role!" }]}
            >
              <Select placeholder="Select your role">
                { (role==="admin" &&  token) ? (
                  <Option value="admin">Admin</Option>
                  ):(
                  <Option value="user">User</Option>
                )
                }
                
              </Select>
            </Form.Item>

            {/* Email */}
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                { type: "email", message: "The input is not a valid E-mail!" },
                { required: true, message: "Please enter your E-mail!" },
              ]}
            >
              <Input />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please enter your password!" }]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            {/* Confirm Password */}
            <Form.Item
              name="password_confirmation"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            {/* Mobile Number */}
            <Form.Item
              name="mobile_number"
              label="Mobile Number"
              rules={[{ required: true, message: "Please enter your phone number!" }]}
            >
              <Input />
            </Form.Item>

            {/* Address */}
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please enter your address!" }]}
            >
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            {/* Buttons */}
            <div className="flex flex-col items-center gap-3">
              {/* Register Button */}
              <Button
                block
                type="primary"
                htmlType="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                Register
              </Button>

              {/* Login Button */}
              <Button
                onClick={()=> opneLogin()}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg transition"
              >
                Login
              </Button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 mt-2 underline"
              >
                Close
              </button>
            </div>
          </Form>
        )}

        {/* Show Error Message (if any) */}
        {error && (
          <p className="text-red-600 text-center mt-4">
            {error?.data?.message || "Something went wrong!"}
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
