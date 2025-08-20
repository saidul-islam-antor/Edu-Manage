import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const HomeSections = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24">
      {/* Section 1 */}
      <section
        data-aos="fade-up"
        className="bg-base-100  rounded-lg p-10 shadow-lg flex flex-col md:flex-row items-center gap-10"
      >
        <div className="md:w-1/2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
            alt="Teacher Collaboration"
            className="w-full max-w-sm mx-auto"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-4xl font-extrabold text-indigo-700 mb-4">
            Join EduManage as a Teacher
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Inspire students and share your knowledge on EduManage.
            Our platform helps you connect with eager learners worldwide
            and grow your teaching career with flexible schedules.
          </p>
         
        </div>
      </section>

      {/* Section 2 */}
      <section
        data-aos="fade-left"
        className="bg-base-100 rounded-lg p-10 shadow-lg flex flex-col md:flex-row items-center gap-10"
      >
        <div className="md:w-1/2 order-2 md:order-1">
          <h2 className="text-4xl font-extrabold text-primary mb-4">
            Why Choose EduManage?
          </h2>
          <ul className="list-disc list-inside space-y-3 text-base-content text-lg">
            <li>Easy-to-use teaching tools and dashboard</li>
            <li>Supportive community of educators and students</li>
            <li>Secure payment system and transparent earnings</li>
            <li>Flexible schedules tailored to your needs</li>
          </ul>
        </div>
        <div className="md:w-1/2 order-1 md:order-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3595/3595457.png"
            alt="EduManage Benefits"
            className="w-full max-w-sm mx-auto"
          />
        </div>
      </section>
    </div>
  );
};

export default HomeSections;
