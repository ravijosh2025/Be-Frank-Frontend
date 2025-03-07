import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1 }}
        className="relative bg-cover bg-center h-96 flex items-center justify-center text-white"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?children,education')" }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-2 text-lg">Empowering young minds through meaningful events</p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto p-6 md:p-12 text-gray-700">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold text-gray-900">Our Mission</h2>
            <p className="mt-4 text-lg leading-relaxed">
              We believe in the power of events to bring change. Our initiative is dedicated to organizing events that nurture and uplift children in rural areas, providing them with learning, joy, and new opportunities.
            </p>
          </motion.div>
          <motion.img 
            src="src/assets/education-indian-girl-child-poor-villager-closeup-writing-paper-pencil-learning-school-to-read-write-50691441.webp" 
            alt="Children Learning" 
            className="rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />
        </div>
      </section>

      {/* What We Do Section */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <motion.h2 
            className="text-3xl font-semibold text-gray-900"
            initial={{ opacity: 0, y: -30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            What We Do
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            We organize educational, cultural, and charity-driven events for children below 10th standard, ensuring every child gets an opportunity to grow, learn, and enjoy.
          </motion.p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { title: "Educational Camps", desc: "Workshops, mentorship programs, and learning sessions to empower young minds." },
              { title: "Cultural Events", desc: "Bringing arts, music, and traditions closer to the children through fun-filled events." },
              { title: "Charity Drives", desc: "Providing essentials, scholarships, and support to underprivileged children." }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="p-6 bg-white rounded-lg shadow-md"
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-12 text-center">
        <motion.h2 
          className="text-3xl font-semibold text-gray-900"
          initial={{ opacity: 0, scale: 0.8 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Join Us in Making a Difference
        </motion.h2>
        <motion.p 
          className="mt-4 text-lg max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Whether you're a volunteer, donor, or supporter, every effort counts in creating brighter futures for children in rural areas.
        </motion.p>
        <Link 
          to="/contact" 
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Get Involved
        </Link>
      </section>
    </div>
  );
}
