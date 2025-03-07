import React, { useState ,useEffect} from "react";
import { Button, Form, Input, message } from "antd";
import { useUpdateSchoolMutation } from "../../store/Apis/schoolsApi";

const EditSchoolForm = ({ onClose, schoolData }) => {
  const [form] = Form.useForm();
  const [updateSchool, { isLoading, error }] = useUpdateSchoolMutation();
  const [schoolId, setSchoolId] = useState();

  useEffect(() => {
    if (schoolData) {
      form.setFieldsValue(schoolData);
      setSchoolId(schoolData.id)
    } else {
      form.resetFields(); // Reset fields when adding a new school
    }
  }, [schoolData, form]);

  const onFinish = async (values) => {
    try{
        values = {'id':schoolId, ...values};
        await updateSchool(values);
        message.success('School Updated successfully!');
        form.resetFields();
        onClose();
        // console.log(values)
    }catch (err) {
      message.error('Error updating school. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
        🏫 Edit School
      </h2>

      {/* Form */}
      <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-4">
        {/* School Name */}
        <Form.Item
          name="name"
          label={<span className="text-gray-600 font-medium">School Name</span>}
          rules={[{ required: true, message: "School Name is required!" }]}
        >
          <Input.TextArea
            placeholder="Enter school name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            value={name}
          />
        </Form.Item>

        {/* City */}
        <Form.Item
          name="city"
          label={<span className="text-gray-600 font-medium">City</span>}
          rules={[{ required: true, message: "City is required!" }]}
        >
          <Input
            placeholder="Enter city"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </Form.Item>

        {/* State */}
        <Form.Item
          name="state"
          label={<span className="text-gray-600 font-medium">State</span>}
          rules={[{ required: true, message: "State is required!" }]}
        >
          <Input
            placeholder="Enter state"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </Form.Item>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            danger
            onClick={onClose}
            className="bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Close
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Updates 🏫
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditSchoolForm;
