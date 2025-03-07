import React, { useState,useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Upload, message } from 'antd';
import SchoolSelect from '../SchoolSelect/Index';
import { useCreateEventMutation } from '../../pages/Events/apis';
import { getUserId } from '../../utils/authHelpers';


const { TextArea } = Input;
const { Item } = Form;

const EditEventForm = ({ onClose , eventData}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [schoolId, setSchoolId] = useState();


  const [createEvent, { isLoading, error }] = useCreateEventMutation();
  
  const userId = getUserId();

    useEffect(() => {
      if (eventData) {
        form.setFieldsValue(eventData);
        // setSchoolId(eventData.id)
      } else {
        form.resetFields(); // Reset fields when adding a new school
      }
    }, [eventData, form]);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };


  const onFinish = async (values) => {
    // try {
    //   const formattedDate = values.date?.format('YYYY-MM-DD'); // Convert DatePicker value to string
    //   const images = fileList.map((file) => file.originFileObj); // Extract image files

    //   const eventData = {
    //     ...values,
    //     date: formattedDate,
    //     user_id: userId,
    //     school_id: schoolId,
    //     images,
    //   };

    //   const formData = new FormData();
    //   formData.append('event[name]', eventData.name);
    //   formData.append('event[description]', eventData.description);
    //   formData.append('event[date]', eventData.date);
    //   formData.append('event[user_id]', eventData.user_id);
    //   formData.append('event[school_id]', eventData.school_id);
    //   formData.append('event[video_urls][]', [eventData.video_url]);

    //   images.forEach((image) => {
    //     formData.append('event[images][]', image);
    //   });

    //   await createEvent(formData).unwrap();
    //   message.success('Event created successfully!');
    //   form.resetFields();
    //   setFileList([]);
    //   onClose();
    // } catch (err) {
    //   message.error('Error creating event. Please try again.');
    //   console.error('Error:', err);
    // }
  };

  return (
    <div className="bg-white p-6 rounded-xl w-auto">
      <SchoolSelect setSchool={setSchoolId} />
      <Form
        layout="horizontal"
        form={form}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Item
          name="name"
          label="Event Name"
          rules={[{ required: true, message: 'Please enter the event name!' }]}
        >
          <Input />
        </Item>

        <Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter the event description!' }]}
        >
          <TextArea rows={4} />
        </Item>

        <Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Please select a date!' }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Item>

        <Item label="Upload">
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={() => false} // Prevent auto upload
            onChange={handleFileChange}
          >
            {fileList.length < 10 && (
              <button
                style={{
                  color: 'inherit',
                  cursor: 'pointer',
                  border: 0,
                  background: 'none',
                }}
                type="button"
              >
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            )}
          </Upload>
        </Item>

        {error && <p className="text-red-500">{error.message}</p>}

        <Item
          name="video_url"
          label="Video Url"
          rules={[{ required: true, message: 'Please enter the video link!' }]}
        >
          <Input />
        </Item>

        <Item>
          <Button type="primary" className="bg-gray-400" htmlType="submit" disabled={isLoading}>
            {isLoading ? 'Editing...' : 'Save Updates'}
          </Button>
          <Button onClick={onClose} className="m-4">
            Close
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default EditEventForm;
