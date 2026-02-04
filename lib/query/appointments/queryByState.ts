import { db } from "@/db";
import { eq, desc, and, or, lt } from "drizzle-orm";
import { appointments } from "@/db/schema";
import { AppointmentStatus } from "@/constants/appointmentTypes";
import { AppointmentCursor } from "@/constants/appointmentTypes";


type QueryByStateParams = {
  companyId: string
  status?: AppointmentStatus
  cursor?: AppointmentCursor
  pageSize?: number
}

export async function queryByState({
  companyId,
  status,
  cursor,
  pageSize = 3,
}: QueryByStateParams) {

  // 1️⃣ Base conditions
  const conditions = [
    eq(appointments.companyId, companyId),
  ]

  if (status) {
    conditions.push(eq(appointments.status, status))
  }

  // 2️⃣ Cursor condition (only if cursor exists)
  if (cursor) {
    const cursorCondition = or(
      lt(appointments.date, cursor.date),
      and(
        eq(appointments.date, cursor.date),
        lt(appointments.startSlot, cursor.startSlot),
      ),
      and(
        eq(appointments.date, cursor.date),
        eq(appointments.startSlot, cursor.startSlot),
        lt(appointments.id, cursor.id),
      )
    )

    if (cursorCondition) {
      conditions.push(cursorCondition)
    }
  }

  // 3️⃣ Query
  const results = await db.query.appointments.findMany({
    where: and(...conditions),
    orderBy: [
      desc(appointments.date),
      desc(appointments.startSlot),
      desc(appointments.id),
    ],
    limit: pageSize + 1, // ← lookahead
    with: {
      service: true,
      company: true,
    },
  })

  // 4️⃣ Pagination math
  const hasMore = results.length > pageSize
  const pagedAppointments = hasMore
    ? results.slice(0, pageSize)
    : results

  const last = pagedAppointments[pagedAppointments.length - 1]

  const nextCursor = hasMore && last
    ? {
        date: last.date,
        startSlot: last.startSlot,
        id: last.id,
      }
    : null

  return {
    pagedAppointments,
    nextCursor,
    hasMore,
  }
}