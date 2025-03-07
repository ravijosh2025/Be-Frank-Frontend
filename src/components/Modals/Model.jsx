import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, children }) => {
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
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
                onClick={onClose}
              >
                ✖
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

export default Modal;
