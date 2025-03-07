import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin, message } from "antd";
import { useLoginMutation } from "../../store/Auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/Auth/authSlice";

const LoginForm = (props) => {
  const {onClose, openRegistartion} = props
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  const onFinish = async (values) => {
    try{
      const response = await login(values).unwrap();
        dispatch(setUser(response));
        message.success('Logged in successfully!');
        form.resetFields();
        onClose();
    }catch(err){
      message.error('Error creating event. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
      {/* Title */}
      <h2 className="text-gray-800 text-2xl font-semibold text-center mb-6">
        🔐 Login
      </h2>

      {/* Show Loader when Logging in */}
      {isLoading ? (
        <div className="flex justify-center py-4">
          <Spin size="large" />
        </div>
      ) : (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Email Input */}
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your Email!" }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-500" />}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </Form.Item>

          {/* Password Input */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="text-gray-500" />}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </Form.Item>

          <Form.Item>

          {/* Buttons */}
          <div className="flex flex-col items-center gap-3">
            {/* Login Button */}
            <Button
              block
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              Log in
            </Button>

            {/* Close Button */}
            <Button
              onClick={onClose}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg transition"
            >
              Close
            </Button>

            {/* Register Link */}
            <div className="text-gray-600 text-sm mt-2">
              Don't have an account?{" "}
              <button
                onClick={()=>openRegistartion(true)}
                className="text-blue-600 hover:underline"
              >
                Register now!
              </button>
            </div>
          </div>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default LoginForm;
