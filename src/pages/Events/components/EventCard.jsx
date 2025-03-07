import React, { useState } from "react";
import { motion } from "framer-motion";
import EventDetailsModal from "../../../components/Modals/EventDetailsModal"
import EventsDetails from "./EventsDetails";
import { useDeleteEventMutation } from "../apis";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  const [isEventDetailsOpen, setEventDetailsOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }} // Start smaller and hidden
      whileInView={{ opacity: 1, scale: 1 }} // Grow to full size
      transition={{ duration: 1.2, ease: "easeOut" }} // Smooth effect
      viewport={{ once: true }}
      className="bg-white shadow-lg rounded-lg p-4 w-80 transform transition-transform hover:scale-105"
    >
      {/* Event Image */}
      <img
        src={`${import.meta.env.VITE_BASE_URL}/${event.image_urls[0]}`}
        alt={event.name}
        className="w-full h-40 object-cover rounded-md"
      />

      {/* Event Info */}
      <h2 className="text-xl font-bold mt-2">{event.name}</h2>
      <p className="text-gray-600 text-sm">{event.date}</p>
      <p className="text-gray-500 text-sm mt-2">
        Organized by {event.user.first_name} {event.user.last_name}
      </p>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setEventDetailsOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          View Details
        </button>
      </div>

      {/* Event Details Modal */}
      <EventDetailsModal isOpen={isEventDetailsOpen} onClose={() => setEventDetailsOpen(false)}>
        <EventsDetails onClose={() => setEventDetailsOpen(false)} event={event} />
      </EventDetailsModal>
    </motion.div>
  );
};

export default EventCard;
