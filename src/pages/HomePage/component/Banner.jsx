import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import bannerImg from "../../../assets/banner.jpg"; // নিজের ছবি লাগবে

const Banner = () => {
  return (
    <section
      className="bg-gradient-to-r from-sky-100 to-blue-50 py-10 md:py-20"
      data-aos="fade-up"
      data-aos-duration="1500"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Unlock Your Potential with{" "}
            <span className="text-blue-600">EduManage</span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Join thousands of learners and teachers. Learn new skills, teach
            others, and manage your classes — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <Link to="/allClasses">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }} // blue-700
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg transition-colors duration-300"
              >
                Explore Classes
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          <img
            src={bannerImg}
            alt="EduManage Banner"
            className="w-full max-h-[400px] object-cover rounded-2xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
