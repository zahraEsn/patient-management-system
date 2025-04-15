import { Button } from "@/components/ui/button"
import { Doctors } from "@/constants"
import { getAppointment } from "@/lib/actions/appointment.actions"
import { formatDateTime } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

const Success = async ({
  searchParams,
  params: { userId },
}: SearchParamsProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || ""
  const appointment = await getAppointment(appointmentId)
  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  )

  return (
    <div className="flex justify-center items-center h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="h-10"
          />
        </Link>
        <section className="flex flex-col items-center gap-5">
          <Image
            src="/assets/gifs/success.gif"
            alt="success"
            width={280}
            height={300}
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We'll be in touch shortly to confirm.</p>
          <section className="request-details">
            <p>Requested appointment details:</p>
            <div className="flex item-center gap-3">
              <Image
                src={doctor?.image!}
                alt="doctor"
                width={100}
                height={100}
                className="size-6"
              />
              <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
            </div>
            <div className="flex gap-2">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calender"
                width={24}
                height={24}
              />
              <p>{formatDateTime(appointment.schedule).dateTime}</p>
            </div>
          </section>
          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/patients/${userId}/new-appointment`}>
              New Appointment
            </Link>
          </Button>
        </section>
      </div>
    </div>
  )
}
export default Success
