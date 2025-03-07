import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative flex items-top justify-center min-h-[700px] bg-gray-100 sm:items-center sm:pt-0"
    >
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div className="mt-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Contact Info Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="p-6 mr-2 bg-gray-100 sm:rounded-lg"
            >
              <h1 className="text-3xl sm:text-4xl text-gray-800 font-extrabold tracking-tight">
                Get in touch:
              </h1>
              <p className="text-lg sm:text-xl font-medium text-gray-600 mt-2">
                Fill in the form to start a conversation
              </p>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="flex items-center mt-8 text-gray-600"
              >
                📍 <span className="ml-4 font-semibold">Acme Inc, Street, State</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="flex items-center mt-4 text-gray-600"
              >
                📞 <span className="ml-4 font-semibold">+44 1234567890</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="flex items-center mt-2 text-gray-600"
              >
                ✉️ <span className="ml-4 font-semibold">info@acme.org</span>
              </motion.div>
            </motion.div>

            {/* Contact Form Section */}
            <motion.form
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="p-6 flex flex-col justify-center"
            >
              {["Full Name", "Email", "Telephone Number"].map((placeholder, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.8 }}
                  className="flex flex-col mt-2"
                >
                  <input
                    type={placeholder === "Email" ? "email" : "text"}
                    placeholder={placeholder}
                    className="w-full mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                  />
                </motion.div>
              ))}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                type="submit"
                className="md:w-32 bg-orange-700 text-white font-bold py-3 px-6 rounded-lg mt-4 hover:bg-orange-600 transition duration-300"
              >
                Submit
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
