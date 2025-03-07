import React from "react";
import { motion } from "framer-motion";
import EventPage from "./Components/EventPage";
import User from "./Components/UserPage";
import SchoolPage from "./Components/SchoolPage";
import { useState } from "react";


const Admin = () => {
    const[panaleSelected, setPanal] = useState("user");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-blue-900 text-white p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="hover:bg-blue-700 p-2 rounded-lg cursor-pointer" onClick={()=>setPanal("user")}>📊 User</li>
          <li className="hover:bg-blue-700 p-2 rounded-lg cursor-pointer" onClick={()=>setPanal("events")}>📅 Events</li>
          <li className="hover:bg-blue-700 p-2 rounded-lg cursor-pointer" onClick={()=>setPanal("school")}>🏫 Schools</li>
        </ul>
      </motion.div>
      {panaleSelected==="user"  && <User/>}
      {panaleSelected==="events" && <EventPage />}
      {panaleSelected==="school" && <SchoolPage/>}
    </div>
  );
};

export default Admin;
