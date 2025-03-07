import React, { useEffect, useState } from 'react';
import DonateForm from '../../components/forms/DonateForm';
import Modal from '../../components/Modals/Model';
import { useGetEventsQuery } from '../Events/apis';
import EventCard from '../Events/components/EventCard';
import { motion } from 'framer-motion';

export default function Home() {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [recentEvents, setRecentEvents] = useState([]);
  const { data, isLoading, error } = useGetEventsQuery();

  useEffect(() => {
    if (data) {
      setRecentEvents(data.slice(-3));    }
  },[data]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <motion.aside 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative text-white rounded-lg overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://source.unsplash.com/1600x900/?charity,help"
            alt="Donation Banner"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 py-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl font-bold leading-tight sm:text-6xl"
          >
            Donate Now
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl mt-4"
          >
            Make a contribution and help make a difference.
          </motion.p>
          <motion.button
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            className="mt-6 px-8 py-3 text-lg font-semibold bg-orange-600 hover:bg-orange-700 rounded-lg shadow-lg"
            onClick={() => setIsDonateOpen(true)}
          >
            Donate Now
          </motion.button>
        </div>
      </motion.aside>

      {/* Recent Events Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto px-4 py-12"
      >
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Our Recent Events</h1>
        {isLoading && <p className="text-center text-gray-600">Loading events...</p>}
        {error && <p className="text-center text-red-500">Failed to load events.</p>}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {recentEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Donate Modal */}
      <Modal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)}>
        <DonateForm onClose={() => setIsDonateOpen(false)} event={recentEvents[0]}/>
      </Modal>
    </div>
  );
}
