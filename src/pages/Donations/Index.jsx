import React from "react";
import { Table } from "antd";
import { motion } from "framer-motion";
import { useGetDonationsQuery } from "./apis";

const Donations = () => {
  const { data, isLoading, error } = useGetDonationsQuery();
  console.log(data)

  const columns = [
    {
      title: "Donor Name",
      dataIndex: "user",
      key: "user",
      render: (user) => user ? `${user.first_name} ${user.last_name}` : "Anonymous",
    },
    {
      title: "Amount (₹)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="p-6 max-w-4xl mx-auto min-h-screen"
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Donations</h1>

      {/* Show loading message */}
      {isLoading && <p className="text-center text-gray-500">Loading donations...</p>}

      {/* Show error message if API call fails */}
      {error && <p className="text-center text-red-500">Error loading donations.</p>}

      {/* Show table only when data is available */}
      {!isLoading && !error && donations.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <Table 
            columns={columns} 
            dataSource={donations} 
            rowKey="id" 
            pagination={false} 
            className="shadow-lg"
          />
        </motion.div>
      ) : (
        !isLoading && <p className="text-center text-gray-500">No donations yet.</p>
      )}
    </motion.div>
  );
};

export default Donations;
