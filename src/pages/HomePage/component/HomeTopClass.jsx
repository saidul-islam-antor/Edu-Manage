import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/UseAxoisPublic";
import Loading from "../../shared/Loading/Loading";
import { Link } from "react-router";

const HomeTopClasses = () => {
  const axiosSecure = useAxiosPublic();

  const { data: topClasses = [], isLoading, error } = useQuery({
    queryKey: ["topClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes/top-enrolled");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (error)
    return (
      <p className="text-center text-red-600 font-semibold mt-6">
        Error loading classes.
      </p>
    );

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-10 py-12">
      <h2
        className="text-4xl font-extrabold text-primary text-center mb-12 "
       
      >
        Top Classes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {topClasses.map((singleClass, index) => (
          <div
            key={singleClass._id}
            className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            data-aos="fade-up"
            data-aos-delay={index * 100} // stagger animation by index
          >
            <div className="overflow-hidden h-48 relative rounded-t-xl">
              <img
                src={singleClass.image}
                alt={singleClass.title}
                className="w-full h-full object-cover rounded-t-xl transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute top-2 right-2 bg-indigo-600 text-white text-sm px-3 py-1 rounded-lg shadow-lg font-semibold">
                ${singleClass.price}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                {singleClass.title}
              </h3>
              <p className="text-gray-600 mb-1">
                Instructor:{" "}
                <span className="font-medium">{singleClass.instructorName}</span>
              </p>
              <p className="text-gray-500 text-sm mb-3 line-clamp-3">
                {singleClass.description || "No description available."}
              </p>
              <p className="text-gray-700 font-semibold mb-4">
                Total Enrolled: {singleClass.totalEnrolled || 0}
              </p>

              <Link to={`/classDetails/${singleClass._id}`}>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition duration-300">
                  Enroll Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeTopClasses;
