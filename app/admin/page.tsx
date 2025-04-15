import { DataTable } from "@/components/table/DataTable"
import StatCard from "@/components/StatCard"
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions"
import Image from "next/image"
import Link from "next/link"
import { columns, Payment } from "@/components/table/columns"

const Admin = async () => {
  const appointments = await getRecentAppointmentList()
	
  return (
    <div className="flex flex-col space-y-14 mx-auto max-w-7xl">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={162}
            height={32}
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome, Admin</h1>
          <p className="text-dark-700">
            Start day with managing new appointments
          </p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduleCount}
            label="schedule appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="canceled"
            count={appointments.canceledCount}
            label="canceled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  )
}

export default Admin
