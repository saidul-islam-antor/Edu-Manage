import React from 'react';
import { Link } from 'react-router';
import bannerImg from '../../../assets/banner.jpg'; // এখানে তোমার নিজের ব্যানার ছবি ব্যবহার করো

const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-sky-100 to-blue-50 py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
            Unlock Your Potential with <span className="text-blue-600">EduManage</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Join thousands of learners and teachers. Learn new skills, teach others, and manage your classes — all in one place.
          </p>
          <Link to="/all-classes">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition duration-300">
              Explore Classes
            </button>
          </Link>
        </div>

        {/* Image */}
        <div className="flex-1">
          <img
            src={bannerImg}
            alt="EduManage Banner"
            className="w-full max-h-[400px] object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
