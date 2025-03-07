import React, { useState } from "react";
import { motion } from "framer-motion";
import { Table, Input, Pagination, Button, message} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Modal from "../../../components/Modals/Model";
import AddSchoolForm from "../../../components/forms/AddSchoolForm";
import EditSchoolForm from "../../../components/forms/EditSchool";
import {useGetSchoolsQuery, useDeleteSchoolMutation } from "../../../store/Apis/schoolsApi";

function SchoolPage() {
  const { data: schools, isLoading, error } = useGetSchoolsQuery();
  const [deleteSchool] = useDeleteSchoolMutation();
  const [isOpenAddSchool, setIsAddSchoolOpen] = useState(false);
  const [isOpenEditSchool, setIsEditSchoolOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const schoolsPerPage = 10;



  const handleDelete = async(id) => {
    try{
      if(window.confirm("Are you sure to this School.")){
        await deleteSchool(id);
        message.success("School Deleted successfully.")
      }
    }catch(err){
      message.err("Oops try again !")
    }
  };

  const handleEdit=(school)=>{
    setSelectedSchool(school);
    setIsEditSchoolOpen(true);
  }

  // Ensure `schools` is always an array before filtering
  const filteredSchools = (schools || []).filter((school) =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginatedSchools = filteredSchools.slice(
    (currentPage - 1) * schoolsPerPage,
    currentPage * schoolsPerPage
  );

  return (
    <div className="p-6">
      <motion.h1
        className="text-2xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        School Management
      </motion.h1>

      {/* Search and Add Button */}
      <div className="flex justify-between items-center mb-4">
        <Input.Search
          placeholder="Search schools..."
          allowClear
          size="large"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-96"
        />
        <button
          onClick={() => setIsAddSchoolOpen(true)}
          className="mr-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          🏫 Add School
        </button>
      </div>

      {/* Show Loading & Error Messages */}
      {isLoading && <p className="text-center text-gray-500">Loading schools...</p>}
      {error && <p className="text-center text-red-500">Error loading schools.</p>}

      {/* School Table */}
      {!isLoading && !error && paginatedSchools.length > 0 && (
        <>
          <Table
            columns={[
              { title: "ID", dataIndex: "id", key: "id" },
              { title: "School Name", dataIndex: "name", key: "name" },
              { title: "City", dataIndex: "city", key: "city" },
              { title: "State", dataIndex: "state", key: "state" },
              {
                title: "Actions",
                key: "actions",
                render: (_, school) => (
                  <>
                    <Button
                      type="link"
                      icon={<EditOutlined />}
                      onClick={() => handleEdit(school)}
                    />
                    <Button
                      type="link"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(school.id)}
                    />
                  </>
                ),
              },
            ]}
            dataSource={paginatedSchools}
            rowKey="id"
            pagination={false}
          />

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <Pagination
              current={currentPage}
              total={filteredSchools.length}
              pageSize={schoolsPerPage}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        </>
      )}

      {/* Show message if no schools found */}
      {!isLoading && !error && paginatedSchools.length === 0 && (
        <p className="text-center text-gray-500">No schools found.</p>
      )}

      {/* Add/Edit School Modal */}
      <Modal isOpen={isOpenAddSchool} onClose={() => setIsAddSchoolOpen(false)}>
        <AddSchoolForm onClose={() => setIsAddSchoolOpen(false)} />
      </Modal>
      <Modal isOpen={isOpenEditSchool} onClose={() => setIsEditSchoolOpen(false)}>
        <EditSchoolForm onClose={() => setIsEditSchoolOpen(false)} schoolData={selectedSchool} />
      </Modal>
    </div>
  );
}

export default SchoolPage;
