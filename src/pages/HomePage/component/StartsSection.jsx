import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/UseAxoisSecure";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../../shared/Loading/Loading";

const StatsSection = () => {
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/stats");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>

  if (error)
    return (
      <p className="text-center p-6 text-red-600">
        Error loading stats: {error.message}
      </p>
    );

  return (
    <div
      className="flex flex-col md:flex-row items-center p-6 gap-8 bg-base-100 rounded-lg my-20 shadow-xl"
      data-aos="fade-up"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 shadow-xl">
        <div
          className="bg-base-100 p-6 rounded-lg shadow text-center"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <p className="text-base-content">Total Users</p>
          <h2 className="text-3xl font-bold">{data?.totalUsers ?? 0}</h2>
        </div>

        <div
          className="bg-base-100 p-6 rounded-lg shadow text-center"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          <p className="text-base-content">Total Classes</p>
          <h2 className="text-3xl font-bold">{data?.totalClasses ?? 0}</h2>
        </div>

        <div
          className="bg-base-100 p-6 rounded-lg shadow text-center"
          data-aos="zoom-in"
          data-aos-delay="500"
        >
          <p className="text-base-content">Total Enrollments</p>
          <h2 className="text-3xl font-bold">{data?.totalEnrolled ?? 0}</h2>
        </div>
      </div>

      {/* Right Side Image */}
      <div
        className="flex-1"
        data-aos="fade-left"
        data-aos-delay="700"
      >
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
