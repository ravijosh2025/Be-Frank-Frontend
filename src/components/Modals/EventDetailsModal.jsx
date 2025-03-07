import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

const EventDetailsModal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />

          {/* Modal Content Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full">
              {/* Close Button */}
                 <button
                    className="absolute top-10 right-10 text-white bg-gray-800 hover:bg-gray-600 rounded-full p-2"
                    onClick={onClose}
                    >
                  <AiOutlineClose size={24} />
                </button>

              {/* Modal Content */}
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EventDetailsModal;
