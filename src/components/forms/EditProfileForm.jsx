import React  from "react";
import { Button, Form, Input, Select, Spin,message } from "antd";
import { useState, useEffect } from "react";
import { useUpdateUserMutation } from "../../pages/AdminPage/apis";
const { Option } = Select;

const EditProfileForm = ({ onClose, UserData}) => {
  const [form] = Form.useForm();
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();
    const [userId, setUserId] = useState();
  

   useEffect(() => {
      if (UserData) {
        form.setFieldsValue(UserData);
        setUserId(UserData.id)
      } else {
        form.resetFields(); // Reset fields when adding a new school
      }
    }, [UserData, form]);

  const onFinish = async (values) => {

    try{
        values= {'id' : userId, ...values};
        await updateUser(values);
        message.success('User Updated successfully!');
        form.resetFields();
        onClose();
    }catch(err){
        message.error('Error updating user. Please try again.');
        console.error('Error:', err);
    }

  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg min-w-[300px] flex flex-col items-center">
      {/* Title */}
      <h2 className="text-gray-800 text-2xl font-semibold text-center mb-4">
        📝 Edit Profile
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
              <Select placeholder="Select your role" disabled>
                <Option value="user">User</Option>
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
              <Input disabled/>
            </Form.Item>

            {/* Password */}
            <p>If you don't want to change keep it blank.</p>
            <Form.Item
              name="password"
              label="Password"
              // rules={[{ required: true, message: "Please enter your password!" }]}
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
                Save Changes
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

export default EditProfileForm;
