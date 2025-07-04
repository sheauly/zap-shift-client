import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import { useQuery } from '@tanstack/react-query';
import useAxioSecure from './useAxioSecure';
import Swal from 'sweetalert2';

const PayMentFrom = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams();
    const axiosSecure = useAxioSecure();
    const { user } = useAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    // const [clientSecret, setClientSecret] = useState('');

    // Step-1: fetch parcel info
    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    });

    if (isPending) return '...loading';

    const amount = parcelInfo.cost;
    const amountInCents = amount * 100;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        // step-1
        const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (methodError) {
            setError(methodError.message);
            console.log('Error:', methodError);
            return;
        }

        else {
            setError('');
            console.log('Payment Method:', paymentMethod);

            // step-2
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents,
                parcelId
            })


            const clientSecret = res.data.clientSecret;
            // setClientSecret(res.data)


            // step-3: confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            });
            console.log(result);
            if (result.error) {
                setError(result.error.message);
            }
            else {
                setError('');
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('payment succeeded!');
                    const transactionID = result.paymentIntent.id;
                    // console.log(result);

                    //step-4 mark parcel paid also create payment history 
                    const paymentData = {
                        parcelId,
                        email: user.email,
                        amount,
                        transactionId: transactionID,
                        paymentMethod: result.paymentIntent.payment_method_types
                    }
                    console.log(paymentData);

                    const paymentRes = await axiosSecure.post('/payments', paymentData)
                    if (paymentRes.data.insertedId) {
                        await Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            html: `<strong>Transaction ID:</strong><code>${transactionID}</code>`,

                            confirmButtonText: 'Go to My Parcels',

                        }).then((result) => {
                            if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                                navigate('/dashboard/myParcels');
                            }
                        });
                    };
                }
            }
        }

        // console.log('res from intent', res)


    };
    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto'>
                <CardElement className='p-2' />
                <button
                    type='submit'
                    className='btn btn-primary text-black w-full'
                    disabled={!stripe}>
                    Pay ${amount}
                </button>
                {error && <p className='text-red-500'>{error}</p>}
            </form>
        </div>
    )
}


export default PayMentFrom;
