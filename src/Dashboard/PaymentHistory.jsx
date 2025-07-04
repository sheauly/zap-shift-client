import React from 'react';
import useAuth from '../hooks/useAuth';
import useAxioSecure from '../pages/useAxioSecure';
import { useQuery } from '@tanstack/react-query';

const formateDate = (iso) => new Date(iso).toLocaleString();

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxioSecure();

    const { isPending, data: payments = [] } = useQuery({
        queryKey: ['payment ', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });

    if (isPending) {
        return '...loading'
    }
    return (
        <div className="overflow-x-auto shadow-md rounded-xl">
            <table className="table table-zebra w-full">
                <thead className="bg-base-200 text-base font-semibold">
                    <tr>
                        <th>#</th>
                        <th>Parcel ID</th>

                        <th>Amount</th>

                        <th>Transaction ID</th>
                        <th>Paid At</th>
                    </tr>
                </thead>
                <tbody>
                    {payments?.map((payment, index) => (
                        <tr key={payment.transactionId}>
                            <td>{index + 1}</td>
                            <td>{payment.parcelId}</td>

                            <td>${payment.amount}</td>

                            <td className="text-sm break-all">{payment.transactionId}</td>
                            <td>{new Date(payment.paid_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

};

export default PaymentHistory;