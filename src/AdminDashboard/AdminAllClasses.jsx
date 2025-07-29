import { useQuery } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import { FaSpinner } from 'react-icons/fa';
import useAxiosSecure from '../hooks/UseAxoisSecure';
import Loading from '../pages/shared/Loading/Loading';
import { useNavigate } from 'react-router';

const AdminAllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const navigate=useNavigate()

  const { data: classes = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-classes'],
    queryFn: async () => {
      const res = await axiosSecure.get('admin/classes');
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/admin/classes/approve/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire('Success!', 'Class approved successfully.', 'success');
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', 'Failed to approve the class.', 'error');
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/admin/classes/reject/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire('Rejected!', 'Class rejected successfully.', 'info');
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', 'Failed to reject the class.', 'error');
    }
  };

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">All Classes</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Image</th>
              <th>Email</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls, idx) => (
              <tr key={cls._id}>
                <td>{idx + 1}</td>
                <td className="font-semibold">{cls.title}</td>
                <td>
                  <img
                    src={cls.image}
                    alt={cls.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{cls.email}</td>
                <td>{cls.description?.slice(0, 50)}...</td>
                <td>
                  <span
                    className={`badge ${
                      cls.status === 'approved'
                        ? 'badge-success'
                        : cls.status === 'rejected'
                        ? 'badge-error'
                        : 'badge-warning'
                    }`}
                  >
                    {cls.status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    className="btn btn-xs btn-success"
                    disabled={cls.status === 'approved'}
                    onClick={() => handleApprove(cls._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    disabled={cls.status === 'rejected'}
                    onClick={() => handleReject(cls._id)}
                  >
                    Reject
                  </button>
                </td>
                <td>
                 <td>
  <button
    className="btn btn-xs btn-info"
    disabled={cls.status !== 'approved'}
    onClick={() => navigate(`/dashboard/process/${cls._id}`)}
  >
    Progress
  </button>
</td>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllClasses;
