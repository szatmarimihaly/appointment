"use client";

import React from "react";

type Status = "pending" | "booked" | "completed" | "cancelled";

interface AppointmentStatusProps {
  status: Status;
}

const statusStyles: Record<Status, { dot: string; text: string; background: string }> = {
  pending: { dot: "bg-gray-300", text: "text-gray-400", background: "bg-gray-400/30" },
  booked: { dot: "bg-blue-500", text: "text-blue-500", background: "bg-blue-500/30" },
  completed: { dot: "bg-green-500", text: "text-green-500", background: "bg-green-500/30" },
  cancelled: { dot: "bg-red-500", text: "text-red-500", background: "bg-red-500/30" },
};

export default function AppointmentStatus({ status }: AppointmentStatusProps) {
  const styles = statusStyles[status];

  return (
    <div className={`flex items-center gap-2 ${styles.background} px-4 py-2 rounded-full`}>
      <span className={`w-2 h-2 rounded-full ${styles.dot}`}></span>
      <span className={`text-sm font-medium ${styles.text} capitalize`}>{status}</span>
    </div>
  );
}