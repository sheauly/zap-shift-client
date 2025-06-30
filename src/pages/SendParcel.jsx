import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../hooks/useAuth";
import useAxioSecure from "./useAxioSecure";
import axios from "axios";
import { LuCircleGauge } from "react-icons/lu";

const SendParcel = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { user } = useAuth();
    const axiosSecure = useAxioSecure();

    const [type, setType] = useState("Document");
    const [warehouses, setWarehouses] = useState([]);
    const [senderDistrict, setSenderDistrict] = useState("");
    const [receiverDistrict, setReceiverDistrict] = useState("");

    useEffect(() => {
        fetch("/data/warehouses.json")
            .then((res) => res.json())
            .then((data) => setWarehouses(data))
            .catch((err) => console.error("Failed to load warehouses data:", err));
    }, []);

    const isDistricty = (district) => {
        if (!district) return false;
        return district.toLowerCase().includes("districty");
    };

    const getCoveredAreasByDistrict = (district) => {
        const found = warehouses.find((w) => w.district === district);
        return found ? found.covered_area : [];
    };

    const onSubmit = (data) => {
        const districtType = isDistricty(data.receiverDistrict) ? "Districty" : "District";
        const weight = parseFloat(data.weight) || 1;

        // Cost calculation
        let cost = 0;
        if (type === "Document") {
            cost = districtType === "District" ? 60 : 80;
        } else {
            cost = weight <= 3
                ? (districtType === "District" ? 110 : 115)
                : (districtType === "District"
                    ? 110 + (weight - 3) * 20
                    : 115 + (weight - 3) * 20);
        }

        const basePrice = type === "Document"
            ? (districtType === "District" ? 60 : 80)
            : (districtType === "District" ? 110 : 115);

        const extraWeight = weight > 3 ? weight - 3 : 0;
        const extraCharge = extraWeight * 20;

        Swal.fire({
            title: "Confirm Your Parcel",
            html: `
                <div style="text-align: left; font-size: 16px;">
                  <p><strong>Parcel Type:</strong> ${type}</p>
                  <p><strong>Destination Type:</strong> ${districtType}</p>
                  <p><strong>Weight:</strong> ${weight} kg</p>
                  <hr />
                  <p>Base Price: <strong>৳${basePrice.toFixed(2)}</strong></p>
                  <p>Extra Weight Charge (${extraWeight.toFixed(2)} kg × ৳20): <strong>৳${extraCharge.toFixed(2)}</strong></p>
                  <hr />
                  <p style="font-size: 18px; font-weight: bold;">Total Price: ৳${cost.toFixed(2)}</p>
                </div>
              `,
            showCancelButton: true,
            confirmButtonText: "Proceed to Payment",
            cancelButtonText: "Go Back to Editing",
        }).then((result) => {
            if (result.isConfirmed) {
                const parcelData = {
                    ...data,
                    type,
                    cost,
                    created_by: user?.email,
                    payment_status: 'unpaid',
                    delivery_status: 'not_collected',
                    created_date: new Date().toISOString(),
                };

                console.log("Saved Parcel:", parcelData);

                axiosSecure.post('/parcels', parcelData)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            // Here you could redirected to a payment page or trigger a payment modal
                            Swal.fire({
                                title: "Redirecting...",
                                text: "Proceeding to paymnt gateway.",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton:false,
                            })
                        }
                    })

                // Swal.fire("Redirecting to payment...", "", "info");

            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <ToastContainer />
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Add Parcel</h1>
            <p className="text-gray-600 mb-6">Enter your parcel details</p>

            {/* Parcel Type Selection */}
            <div className="flex items-center gap-4 mb-6">
                {["Document", "Not-Document"].map((val) => (
                    <label key={val} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            value={val}
                            checked={type === val}
                            onChange={() => setType(val)}
                            className="accent-green-500"
                        />
                        <span>{val}</span>
                    </label>
                ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
                {/* Parcel Title + Weight */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-medium mb-1">Parcel Title</label>
                        <input
                            {...register("title", { required: "Parcel title is required" })}
                            className="input input-bordered w-full"
                            placeholder="Enter Title"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Parcel Weight (kg)</label>
                        <input
                            {...register("weight", {
                                required: "Weight is required",
                                valueAsNumber: true,
                                min: { value: 0.1, message: "Must be at least 0.1kg" },
                            })}
                            className="input input-bordered w-full"
                            placeholder="Ex: 2"
                            type="number"
                            step="0.1"
                        />
                        {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}

                        {/* Estimated Cost */}
                        <p className="text-sm text-blue-600 mt-1">
                            Estimated Cost: Tk{" "}
                            {(() => {
                                const districtType = isDistricty(receiverDistrict) ? "Districty" : "District";
                                const weightVal = parseFloat(watch("weight")) || 1;
                                if (type === "Document") return districtType === "District" ? 60 : 80;
                                return weightVal <= 3
                                    ? (districtType === "District" ? 110 : 115)
                                    : (districtType === "District"
                                        ? 110 + (weightVal - 3) * 20
                                        : 115 + (weightVal - 3) * 20);
                            })()}
                        </p>
                    </div>
                </div>

                {/* Sender + Receiver Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Sender */}
                    <div className="grid gap-6">
                        <h2 className="font-bold text-lg">Sender Details</h2>
                        <input {...register("senderName", { required: true })} placeholder="Name" className="input input-bordered w-full" />
                        <input {...register("senderContact", { required: true })} placeholder="Contact" className="input input-bordered w-full" />
                        <select {...register("senderDistrict", { required: true })} value={senderDistrict} onChange={(e) => setSenderDistrict(e.target.value)} className="select select-bordered w-full">
                            <option value="">Select District</option>
                            {warehouses.map(w => <option key={w.district} value={w.district}>{w.district}</option>)}
                        </select>
                        <select {...register("senderArea", { required: true })} className="select select-bordered w-full" disabled={!senderDistrict}>
                            <option value="">{senderDistrict ? "Select Area" : "Select District First"}</option>
                            {getCoveredAreasByDistrict(senderDistrict).map(area => <option key={area} value={area}>{area}</option>)}
                        </select>
                        <input {...register("senderAddress", { required: true })} placeholder="Full Address" className="input input-bordered w-full" />
                        <textarea {...register("pickupInstruction", { required: true })} placeholder="Pickup Instruction" className="textarea textarea-bordered w-full" />
                    </div>

                    {/* Receiver */}
                    <div className="grid gap-6">
                        <h2 className="font-bold text-lg">Receiver Details</h2>
                        <input {...register("receiverName", { required: true })} placeholder="Name" className="input input-bordered w-full" />
                        <input {...register("receiverContact", { required: true })} placeholder="Contact" className="input input-bordered w-full" />
                        <select {...register("receiverDistrict", { required: true })} value={receiverDistrict} onChange={(e) => setReceiverDistrict(e.target.value)} className="select select-bordered w-full">
                            <option value="">Select District</option>
                            {warehouses.map(w => <option key={w.district} value={w.district}>{w.district}</option>)}
                        </select>
                        <select {...register("receiverArea", { required: true })} className="select select-bordered w-full" disabled={!receiverDistrict}>
                            <option value="">{receiverDistrict ? "Select Area" : "Select District First"}</option>
                            {getCoveredAreasByDistrict(receiverDistrict).map(area => <option key={area} value={area}>{area}</option>)}
                        </select>
                        <input {...register("receiverAddress", { required: true })} placeholder="Full Address" className="input input-bordered w-full" />
                        <textarea {...register("deliveryInstruction", { required: true })} placeholder="Delivery Instruction" className="textarea textarea-bordered w-full" />
                    </div>
                </div>

                <p className="text-sm text-gray-600 mt-4">* PickUp Time: 4pm–7pm Approx.</p>

                <button type="submit" className="btn bg-lime-500 hover:bg-lime-600 text-white w-32 mx-auto mt-4">
                    Continue
                </button>
            </form>
        </div>
    );
};

export default SendParcel;
