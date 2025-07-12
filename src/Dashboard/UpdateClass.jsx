import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";

import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/UseAxoisSecure";
import React from "react";
import Loading from "../pages/shared/Loading/Loading";

const UpdateClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  // Load single class info
  const { data: classData = {}, isLoading } = useQuery({
    queryKey: ['class', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${id}`);
      return res.data;
    },
    enabled: !!id
  });

  // Fill the form when data comes
  React.useEffect(() => {
    if (classData) {
      reset(classData);
    }
  }, [classData, reset]);

  const onSubmit = async (updatedData) => {
    try {
      const res = await axiosSecure.patch(`/classes/${id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Class info has been updated.", "success");
        navigate('/dashboard/myClasses');
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update!", "error");
    }
  };

  if (isLoading) return <Loading></Loading>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Update Class</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-5 rounded shadow">

        <div>
          <label>Class Title</label>
          <input {...register("title", { required: true })} className="w-full border px-4 py-2 rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Instructor Name</label>
            <input defaultValue={classData.instructorName} readOnly className="w-full bg-gray-100 border px-4 py-2 rounded" />
          </div>
          <div>
            <label>Email</label>
            <input defaultValue={classData.email} readOnly className="w-full bg-gray-100 border px-4 py-2 rounded" />
          </div>
        </div>

        <div>
          <label>Price</label>
          <input {...register("price", { required: true })} type="number" step="0.01" className="w-full border px-4 py-2 rounded" />
        </div>

        <div>
          <label>Image URL</label>
          <input {...register("image", { required: true })} className="w-full border px-4 py-2 rounded" />
        </div>

        <div>
          <label>Description</label>
          <textarea {...register("description", { required: true })} className="w-full border px-4 py-2 rounded" />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Update</button>
      </form>
    </div>
  );
};

export default UpdateClass;
