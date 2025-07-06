import React from 'react';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';
import useAxioSecure from '../pages/useAxioSecure';
import { FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const MyParcels = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxioSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            return res.data;
        },
        enabled: !!user?.email
    });

    const handleView = (id) => {
        console.log("view parcel", id);
    }
    const handlePay = (id) => {
        console.log("prceseed to payment", id);
        navigate(`/dashboard/payment/${id}`)
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'Your parcel has been deleted.', 'success');
                            refetch();
                        }
                    })
                    .catch(error => {
                        Swal.fire('Error!', 'Failed to delete parcel.', 'error');
                        console.error(error);
                    });
            }
        });
    };


    if (!user?.email) {
        return <p className="text-center mt-10 text-gray-500">Loading user info...</p>;
    }

    return (
        <div className="overflow-x-auto w-11/12 mx-auto mt-10">
            <table className="table table-zebra w-full">
                <thead className="bg-gray-200 text-gray-800">
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Cost</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels?.map((parcel, index) => (
                        <tr key={parcel._id}>
                            <td>{index + 1}</td>
                            <td>{parcel.title}</td>
                            <td>৳{parcel.cost}</td>
                            <td>
                                <span className={`badge px-3 text-white ${parcel.payment_status === "paid" ? "bg-green-500" : "bg-red-500"}`}>
                                    {parcel.payment_status}
                                </span>
                            </td>
                            <td className="space-x-2">
                                <button className="btn btn-sm btn-info btn-outline">View</button>
                                <button disabled={parcel.payment_status === 'paid'} onClick={() => handlePay(parcel._id)} className={`btn btn-sm btn-success btn-outline ${parcel.payment_status === "paid" ? "cursor-not-allowed" : ""}`}>Pay</button>
                                <button
                                    className="btn btn-sm btn-error btn-outline"
                                    onClick={() => handleDelete(parcel._id)}
                                >
                                    delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;
