import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/UseAxoisSecure';
import Loading from '../../shared/Loading/Loading';
import { AuthContext } from '../../../context/AuthContext';
import Swal from 'sweetalert2';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { paymentId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const { data: paymentInfo = {}, isPending } = useQuery({
    queryKey: ['classDetails', paymentId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${paymentId}`);
      return res.data;
    },
  });

  if (isPending) return <Loading />;

  const price = Number(paymentInfo.price);
  const amountInCents = Math.round(price * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    const { error: createError } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (createError) {
      setError(createError.message);
      setLoading(false);
      return;
    }

    // Get payment intent
    const { data } = await axiosSecure.post('/create-payment-intent', {
      price: amountInCents,
      paymentId,
    });

    const clientSecret = data.clientSecret;

    // Confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName || 'Anonymous',
          email: user?.email || 'No email',
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else if (result.paymentIntent.status === 'succeeded') {
      // Prepare payment data
      const paymentData = {
        userName: user?.displayName,
        userEmail: user?.email,
        classId: paymentInfo._id,
        title: paymentInfo.title,
        image: paymentInfo.image,
        transactionId: result.paymentIntent.id,
        price: paymentInfo.price,
        date: new Date(),
      };

      try {
        const res = await axiosSecure.post('/payments', paymentData);

        // Handle if user already enrolled
        if (res.data?.alreadyEnrolled) {
           
          Swal.fire({
            icon: 'warning',
            title: 'Already Enrolled',
            text: 'You have already enrolled in this class!',
          });
          setLoading(false);
          return;
        }

        if (res.data.insertResult?.insertedId || res.data.insertedId) {
          Swal.fire({
            icon: 'success',
            title: 'Payment Successful!',
            text: `Transaction ID: ${result.paymentIntent.id}`,
            confirmButtonText: 'Go to My Enroll Page',
          }).then(() => {
            navigate('/dashboard/my-enroll-class');
          });
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.response?.data?.message || 'Something went wrong!',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md  mx-auto">
      <CardElement className="border p-4 rounded mb-4" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-600 w-full text-base-content px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
      >
        {loading ? 'Processing...' : `Pay ৳${price}`}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

export default CheckoutForm;
