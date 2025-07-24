import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import CreateAssignmentModal from "./CreateAssignmentModal";
import useAxiosSecure from "../hooks/UseAxoisSecure";

const MyClassDetails = () => {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const axiosSecure = useAxiosSecure();



  const { data: totalEnrolled = 0 } = useQuery({
    queryKey: ["enrolled-count", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${id}`);
      return res.data.totalEnrolled;
    },
  });

const { data: assignments = [] } = useQuery({
  queryKey: ["assignments", id],
  queryFn: async () => {
    const res = await axiosSecure.get(`/assignments?classId=${id}`);
    return res.data;
  },
});
const totalAssignments = assignments.length;
  const { data: submissionCount = 0 } = useQuery({
    queryKey: ["submission-count", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments?classId${id}`);
      return res.data;
    },
  });

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold"> - Progress Overview</h2>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-xl">
          <p>Total Enrolled</p>
          <h1 className="text-xl font-bold">{totalEnrolled}</h1>
        </div>
        <div className="bg-green-100 p-4 rounded-xl">
          <p>Total Assignments</p>
          <h1 className="text-xl font-bold">{totalAssignments}</h1>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl">
          <p>Total Submissions</p>
          <h1 className="text-xl font-bold">{submissionCount}</h1>
        </div>
      </div>

      {/* Create Assignment */}
      <div className="mt-6">
        <button
          onClick={() => setOpenModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-xl"
        >
          Create Assignment
        </button>
      </div>

      {openModal && (
        <CreateAssignmentModal
          classId={id}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default MyClassDetails;
