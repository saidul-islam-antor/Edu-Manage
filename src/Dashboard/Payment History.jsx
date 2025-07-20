import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/UseAxoisSecure';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Loading from '../pages/shared/Loading/Loading';




const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['PaymentHistory', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history?email=${user?.email}`);
      return res.data;
    }
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">💳 Payment History</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th>Number</th>
              <th>Class</th>
              <th>Instructor</th>
              <th>Price</th>
              <th>Transaction ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.title}</td>
                <td>{payment.userName|| 'no name'}</td>
                <td>${payment.price}</td>
                <td>{payment.transactionId}</td>
                <td>{new Date(payment.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
