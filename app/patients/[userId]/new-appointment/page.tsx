import AppointmentForm from "@/components/forms/AppointmentForm"
import { getPatient } from "@/lib/actions/patient.actions"
import { SearchParamsProps } from "@/type"
import Image from "next/image"

export default async function NewAppointment({ params }: SearchParamsProps) {
  const { userId } = await params
  if (!userId) throw new Error("Missing userId")
  const patient = await getPatient(userId)
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[900px]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          <p className="copyright mt-10 py-12">© carepulse copyright</p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        alt="appointment"
        width={1000}
        height={1000}
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  )
}
