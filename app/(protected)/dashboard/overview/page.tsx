import { AppointmentFilterList } from "@/components/Admin/Display/AppointmentFilterList"
import NavigatePurple from "@/components/Button/NavigatePurple"
import { queryByState } from "@/lib/query/appointments/queryByState"
import { queryCompany } from "@/lib/query/queryCompany"

export default async function Page() {
  const company = await queryCompany()

  if (!company) {
    return null
  }

  const { pagedAppointments, nextCursor, hasMore } = await queryByState({
      companyId: company.id,
      pageSize: 3,
      // status intentionally omitted → "all"
      cursor: undefined,
    })

  return (
    <>

      <header className="p-6">
        <NavigatePurple href="/dashboard"/>
      </header>
    
      <main>
        <h1 className="text-2xl md:text-4xl text-white mt-20 text-center font-bold">
          Here you can check out your appointments
        </h1>

        <AppointmentFilterList
          initialAppointments={pagedAppointments}
          initialCursor={nextCursor}
          initialHasMore={hasMore}
        />
      </main>

    </>
  )
}
