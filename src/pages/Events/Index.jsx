import React, { useState } from "react";
import { motion } from "framer-motion";
import EventCard from "./components/EventCard";
import { useGetEventsQuery } from "./apis";
import { Spin, Alert, Input, Pagination } from "antd";

function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10; // Number of events per page
    
  const { data: events, isLoading, error } = useGetEventsQuery();
  const { Search } = Input;

  // Filtered events based on search
  const filteredEvents =
    events?.filter((event) => event.name.toLowerCase().includes(searchTerm.toLowerCase())) || [];

  // Paginate events
  const startIndex = (currentPage - 1) * eventsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin tip="Loading...">
          <Alert message="Fetching Events..." type="info" />
        </Spin>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert message="Failed to load events" type="error" showIcon />
      </div>
    );

  return (
    <>
      <div className="p-10 bg-gray-100 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="flex flex-col items-center mb-6"
        >
          <h1 className="text-3xl font-bold text-center mb-4">Events</h1>
          <Search
            placeholder="Search events"
            size="large"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-96"
          />
        </motion.div>
        
        {/* Event List with Smooth Stagger Effect */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 50 },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { staggerChildren: 0.2, duration: 1.2, ease: "easeOut" },
            },
          }}
          className="flex flex-wrap gap-6 justify-center"
        >
          {paginatedEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <Pagination
            current={currentPage}
            total={filteredEvents.length}
            pageSize={eventsPerPage}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </div>
    </>
  );
}

export default Events;
