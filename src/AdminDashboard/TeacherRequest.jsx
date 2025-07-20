import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/UseAxoisSecure';

const TeacherRequest = () => {
  const [requests, setRequests] = useState([]);
  const axiosSecure = useAxiosSecure();

  // ✅ Load all requests on mount
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data } = await axiosSecure.get('/teacher-requests');
      setRequests(data);
    } catch (error) {
      console.error('Failed to load teacher requests:', error);
    }
  };

  // ✅ Approve request
  const handleApprove = async (email) => {
    try {
      await axiosSecure.patch(`/teacher-request/approve/${email}`);
      Swal.fire('Success', 'Teacher request approved.', 'success');
      fetchRequests();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to approve request.', 'error');
    }
  };

  // ✅ Reject request
  const handleReject = async (email) => {
    try {
      await axiosSecure.patch(`/teacher-request/reject/${email}`);
      Swal.fire('Rejected', 'Request has been rejected.', 'info');
      fetchRequests();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to reject request.', 'error');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">📋 Teacher Requests</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Experience</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No teacher requests found.
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={req.image}
                      alt={req.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-3">{req.name}</td>
                  <td className="p-3">{req.experience}</td>
                  <td className="p-3">{req.title}</td>
                  <td className="p-3">{req.category}</td>
                  <td className="p-3 capitalize font-medium">{req.status}</td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      onClick={() => handleApprove(req.email)}
                      disabled={req.status === 'approved' || req.status === 'rejected'}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(req.email)}
                      disabled={req.status === 'rejected'}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherRequest;
