import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/UseAxoisSecure";
import Swal from "sweetalert2";

const CreateAssignmentModal = ({ classId, onClose }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // classId স্ট্রিং ফরম্যাটে এখানে থাকবে (যেমন "688124dfbb05314bd94d2511")
      const assignmentData = {
        ...data,
        classId,
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/assignments", assignmentData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Assignment added!",
          text: "Your assignment was added successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        queryClient.invalidateQueries(["assignments", classId]);
        reset();
        onClose();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add assignment. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error adding assignment:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Modal বন্ধ করার জন্য background ক্লিক হ্যান্ডলার
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Create Assignment</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Assignment Title"
              {...register("title", { required: "Title is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <input
              type="date"
              {...register("deadline", {
                required: "Deadline is required",
                validate: value =>
                  value >= today || "Deadline cannot be in the past",
              })}
              className="w-full border p-2 rounded"
            />
            {errors.deadline && (
              <p className="text-red-600 text-sm mt-1">{errors.deadline.message}</p>
            )}
          </div>

          <div>
            <textarea
              placeholder="Assignment Description"
              {...register("description", { required: "Description is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignmentModal;
