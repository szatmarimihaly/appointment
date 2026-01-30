"use client";

import { useState } from "react";
import SpinnerWhite from "../ui/SpinnerWhite";
import { timeToSlot, slotToTime, getTomorrowDate, formatDate } from "@/utils/timeConversion";
import { useRouter } from "next/navigation";

export default function CreateAppointment() {

    const [creating, setCreating] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [selectedDate, setSelectedDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const router = useRouter();
    const minDate = getTomorrowDate();

    const getDuration = () => {
        if(!startTime || !endTime) return 0;
        const startSlot = timeToSlot(startTime);
        const endSlot = timeToSlot(endTime);
        return (endSlot - startSlot) * 10;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const date = formData.get("date") as string;
        const start = formData.get("start") as string;
        const end = formData.get("end") as string;

        if(!date || !start || !end) {
            setError("All fields are required.");
            setLoading(false);
            return;
        }

        const selectedDate = new Date(date);
        const tomorrow = new Date(minDate);

        if(selectedDate < tomorrow) {
            setError("Appointment date must be at least tomrrow.")
            setLoading(false);
            return;
        }

        if(start >= end) {
            setError("Start time must be before end time.");
            setLoading(false);
            return;
        }

        const startSlot = timeToSlot(start);
        const endSlot = timeToSlot(end);

        if(endSlot - startSlot < 1) {
            setError("Appointment must be at least 10 minutes long");
            setLoading(true);
            return;
        }

        try{
            const response = await fetch("/api/company/create-appointment", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    date, startSlot, endSlot
                })
            })

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.error || "Failed to create appointment.")
            }

            setSuccess(true);
            setCreating(false);

            setSelectedDate("");
            setStartTime("");
            setEndTime("");

            router.refresh();

        }catch(error : any){
            setError(error.message || "Failed to create appointment.")
        }finally{
            setLoading(false);
        }


    }

    const handleCancel = () => {
        setCreating(false);
        setError("");
        setSelectedDate("");
        setStartTime("");
        setEndTime("");
    }

    return(
        <div className="px-4 sm:px-6 lg:px-8 w-full max-w-xl mx-auto mt-10 flex flex-col items-center">

            {success && (
                <div className="w-full mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    Appointment created successfully!
                </div>
            )}

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            {!creating ? (
                <button
                    className="bg-foreground px-4 py-2 rounded text-white"
                    onClick={() => setCreating(true)}
                >Create
                </button>
            ) : (
                <form 
                    className="w-full max-w-xl mx-auto flex flex-col gap-4 mb-20"
                    onSubmit={handleSubmit}
                >
                    <label className="text-white">Choose a date here: </label>
                    <input 
                        type="date" 
                        name="date"
                        id="date"
                        min={minDate}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                        placeholder="14.02.2026"
                        className="border border-inputcolor px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray"
                    />

                    {selectedDate && (
                        <p className="text-sm mt-1 text-textgray">
                            {formatDate(selectedDate)}
                        </p>
                    )}

                    <label className="text-white mx-2">Start Time: </label>
                    <input 
                        type="time"
                        name="start"
                        id="start"
                        required
                        step="600"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="border border-inputcolor px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray"
                    />

                    <label className="text-white mx-2">End: </label>
                    <input 
                        type="time"
                        name="end"
                        id="end"
                        required
                        step="600"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="border border-inputcolor px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray"
                    />
                    
                    {startTime && endTime && (
                        <div className="bg-clientcard rounded p-6">
                            <h3 className="text-white text-center text-xl">Preview</h3>
                            <p className="text-white">Time: <span className="text-textgray">{startTime} - {endTime}</span></p>
                            <p className="text-white">Duration: <span className="text-textgray">{getDuration()} minutes</span></p>
                            {startTime >= endTime && (
                                <p className="text-red-500 text-sm mt-2">
                                    ⚠️ End time must be after start time
                                </p>
                            )}
                        </div>
                    )}

                    <div className="p-3 border rounded">
                        <p className="text-sm">
                            💡 <span className="font-semibold">Note:</span> This creates an available time slot. 
                            Customers will be able to book this slot with services that fit within the duration.
                        </p>
                    </div>

                    <div className="flex gap-4 justify-end">
                        <button
                            disabled={loading}
                            onClick={handleCancel}
                            className="border-2 border-foreground px-4 py-2 rounded font-bold text-white"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="text-white px-4 py-2 rounded font-bold bg-foreground"
                            disabled={loading}
                        >
                            {loading ? <SpinnerWhite/> : "Create appointment"}
                        </button>
                    </div>

                </form>
            )}
        </div>
    )
}