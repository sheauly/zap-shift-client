
import React from 'react';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';
import useAxioSecure from '../pages/useAxioSecure';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxioSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });

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
                    {parcels.map((parcel, index) => (
                        <tr key={parcel._id}>
                            <td>{index + 1}</td>
                            <td>{parcel.title}</td>
                            <td>৳{parcel.cost}</td>
                            <td>
                                <span className={`badge px-3 text-white ${parcel.payment_status === "paid" ? "bg-green-500" : "bg-red-500"}`}>
                                    {parcel.payment_status}
                                </span>
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-error btn-outline"
                                    onClick={() => handleDelete(parcel._id)}
                                >
                                    <FaTrashAlt />
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
