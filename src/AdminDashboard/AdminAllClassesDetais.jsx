import React from 'react';
import useAxiosSecure from '../hooks/UseAxoisSecure';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

const AdminAllClassesDetais = () => {
      const { id } = useParams();

     // Total Enrolled Query
  const { data: totalEnrolled = 0 } = useQuery({
    queryKey: ["enrolled-count", id],
    queryFn: async () => {
      const res = await useAxiosSecure.get(`/classes/${id}`);
      return res.data.totalEnrolled;
    },
  });

  // Assignments Query
  const { data: assignments = [] } = useQuery({
    queryKey: ["assignments", id],
    queryFn: async () => {
      const res = await useAxiosSecure.get(`/assignments?classId=${id}`);
      return res.data;
    },
  });

  const totalAssignments = assignments.length;

  // 🔥 Total Submission Count (reduce করে হিসাব করছি)
  const totalSubmissions = assignments.reduce(
    (acc, assignment) => acc + (assignment.submissionCount || 0),
    0
  );
    return (
        <div>
           
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
          <h1 className="text-xl font-bold">{totalSubmissions}</h1>
        </div>
      </div>

     
    </div>
  
        </div>
    );
};

export default AdminAllClassesDetais;