import { Link } from 'react-router';
import { motion } from 'framer-motion';

const InspireTeachersSection = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 py-16 px-4 sm:px-8 lg:px-24 text-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Text Section with animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 text-indigo-600">Inspire. Educate. Empower.</h2>
          <p className="text-lg mb-6">
            Join EduManage as a teacher and share your expertise with eager learners across the globe. Whether you're a seasoned educator or a passionate professional, this is your opportunity to make a real impact.
          </p>
          <ul className="list-disc ml-5 space-y-2 text-base text-gray-700">
            <li>Teach your favorite subjects</li>
            <li>Flexible class management</li>
            <li>Reach thousands of students</li>
            <li>Earn while doing what you love</li>
          </ul>
          <Link
            to="/teachForm"
            className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition"
          >
            Apply as a Teacher
          </Link>
        </motion.div>

        {/* Image Section with animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Inspiring Teacher"
            className="w-3/4 md:w-full drop-shadow-xl rounded-lg"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default InspireTeachersSection;
