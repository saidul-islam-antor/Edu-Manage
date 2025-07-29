import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/UseAxoisSecure";


const StatsSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/stats");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center p-6">Loading...</p>;

  if (error)
    return (
      <p className="text-center p-6 text-red-600">
        Error loading stats: {error.message}
      </p>
    );

  return (
    <div className="flex flex-col md:flex-row items-center p-6 gap-8 bg-gray-100 rounded-lg">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">Total Users</p>
          <h2 className="text-3xl font-bold">{data?.totalUsers ?? 0}</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">Total Classes</p>
          <h2 className="text-3xl font-bold">{data?.totalClasses ?? 0}</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">Total Enrollments</p>
          <h2 className="text-3xl font-bold">{data?.totalEnrolled ?? 0}</h2>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="flex-1">
        <img
          src="https://i.ibb.co/F4q7rt5W/back-school-facebook-cover-banner-template-106176-1191.jpg"
          alt="Education Illustration"
          className="rounded-lg shadow-lg max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default StatsSection;
