import React, { useState } from "react";
import { motion } from "framer-motion";
import { Table, Button, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {useGetUsersQuery,useDeleteUserMutation} from '../apis'
import EditProfileForm from "../../../components/forms/EditProfileForm";
import Modal from "../../../components/Modals/Model";
import RegisterForm from "../../../components/forms/RegisterForm";


const User=()=> {
  const {data:usersData ,isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation()
  const [selectedUser, setSelectedUser] = useState({});
  const [isOpenEditUser, setIsEditUserOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  
  const filteredAdmins =usersData?.filter((user) => user.role.toLowerCase().includes('admin' || 'Admin')) || [];

  const handledeleteUser = async(id) => {
      try{
        if(window.confirm("Are you sure to delete ")){
          await deleteUser(id)
          message.success("User deleted success.")
        }
      }catch(err){
        message.err("Try again !")
      }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditUserOpen(true);
  };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  //   setSelectedUser(null);
  // };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "First Name", dataIndex: "first_name", key: "first_name" },
    { title: "Last Name", dataIndex: "last_name", key: "last_name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Mobile", dataIndex: "mobile_number", key: "mobile_number" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Actions",
      key: "actions",
      render: (_, user) => (
        <>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(user)} />
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handledeleteUser(user.id)} />
        </>
      ),
    },
  ];

  return (
    <div className="p-6">
          <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="flex justify-between items-center mb-6"
          >
              <h1 className="text-3xl font-bold text-gray-800">User Management
              </h1>
              <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition"
              >
                  ➕ Create Admin
              </button>
          </motion.div>
   
      <Table columns={columns} dataSource={filteredAdmins} rowKey="id" />

      <Modal isOpen={isOpenEditUser} onClose={() => setIsEditUserOpen(false)}>
        <EditProfileForm onClose={() => setIsEditUserOpen(false)} UserData={selectedUser} />
      </Modal>

      {isRegisterOpen && (
        <Modal isOpen={isRegisterOpen} onClose={()=> setIsRegisterOpen(false)}>
          <RegisterForm onClose={() => setIsRegisterOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default User;
