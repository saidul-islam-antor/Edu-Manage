import React, { useEffect } from "react";
import { Link } from "react-router";  // Note: react-router-dom, not react-router
import AOS from "aos";
import "aos/dist/aos.css";

const InspireTeachersSection = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <section className="bg-base-100 shadow-xl py-16 px-4 sm:px-8 lg:px-24 text-base-content">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Text Section with AOS */}
        <div data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000" className="">
          <h2 className="text-4xl font-bold mb-4 text-indigo-600">Inspire. Educate. Empower.</h2>
          <p className="text-lg mb-6">
            Join EduManage as a teacher and share your expertise with eager learners across the globe. Whether you're a seasoned educator or a passionate professional, this is your opportunity to make a real impact.
          </p>
          <ul className="list-disc ml-5 space-y-2  text-base-content">
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
        </div>

        {/* Image Section with AOS */}
        <div
          data-aos="fade-left"
          data-aos-delay="300"
          data-aos-duration="1000"
          className="flex justify-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Inspiring Teacher"
            className="w-3/4 md:w-full drop-shadow-xl rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default InspireTeachersSection;
