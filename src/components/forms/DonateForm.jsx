import React from "react";
import { Button, Form, Input, message } from "antd";
import {useCreateDonationMutation} from "../../pages/Donations/apis";
import { getUserId, getToken } from "../../utils/authHelpers";

const DonateForm = ({ onClose , event}) => {
  const [form] = Form.useForm();
  const [createDonation, isLoading, error] = useCreateDonationMutation()
  const token = getToken();
  const onFinish = async(values) => {
    try{
    const userId = getUserId();
    const donationData = {...values,'user_id' : userId, 'event_id': event.id}
    await createDonation(donationData).unwrap();
    message.success('Donation successful!');
    form.resetFields();
    onClose();
    }catch(err){
      message.error('Error creating doantion. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      {
        token? ( <>
      
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
        💖 Donate Now
      </h2>

      {/* Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-4"
      >
        {/* Amount Input */}
        <Form.Item
          name="amount"
          label={<span className="text-gray-600 font-medium">Amount</span>}
          rules={[{ required: true, message: "Please enter an amount!" }]}
        >
          <Input
            placeholder="Enter donation amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </Form.Item>

        {/* Note Input */}
        <Form.Item
          name="note"
          label={<span className="text-gray-600 font-medium">Note</span>}
        >
          <Input.TextArea
            rows={3}
            placeholder="Add a message (optional)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
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
            Donate 💰
          </Button>
        </div>
      </Form>
      </>):(
        <>Please get Logged in </>
      )}
    </div>
  );
};

export default DonateForm;
