"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { getAppointmentSchema } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { FormFieldType } from "./PatientForm"
import { Doctors } from "@/constants"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions"
import { Appointment } from "@/type/appwite.type"
import { Status } from "@/type"

const AppointmentForm = ({
  type,
  userId,
  patientId,
  appointment,
  setOpen,
}: {
  type: "create" | "cancel" | "schedule"
  userId: string
  patientId: string
  appointment?: Appointment
  setOpen?: (open: boolean) => void
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const AppointmentFormValidation = getAppointmentSchema(type)

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : "",
      schedule: appointment
        ? new Date(appointment.schedule)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment ? appointment.note : "",
      cancellationReason: appointment?.cancellationReason ?? "",
    },
  })

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true)

    let status
    switch (type) {
      case "cancel":
        status = "canceled"
        break
      case "schedule":
        status = "scheduled"
        break
      case "create":
        status = "created"
      default:
        status = "created"
    }

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason,
          note: values.note,
          status: status as Status,
        }
        const appointment = await createAppointment(appointmentData)

        if (appointment) {
          form.reset()
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          )
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: values?.primaryPhysician,
            schedule: new Date(values?.schedule),
            status: status as Status,
            cancellationReason: values?.cancellationReason,
          },
          type,
        }
        // @ts-ignore
        const updatedAppointment = await updateAppointment(appointmentToUpdate)
        if (updatedAppointment) {
          setOpen && setOpen(false)
          form.reset()
        }
      }
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false)
  }

  // function onSubmit() {
  // 	console.log("first...........")
  // }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.log("Validation errors:", errors)
        })}
        className="space-y-6 flex-1"
      >
        {type === "create" && (
          <section className="space-y-4 mb-12">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds
            </p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              label="Doctor"
              name="primaryPhysician"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex items-center cursor-pointer gap-2">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={32}
                      height={32}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expecting appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />
            <div className="flex flex-row gap-4">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason for appointment"
                placeholder="Annual montly check-up"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Additional comments/notes"
                placeholder="Prefer afternoon appointments, if possible"
              />
            </div>
          </>
        )}
        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Something came up with work"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full cursor-pointer`}
        >
          {type === "cancel"
            ? "Cancel Appointment"
            : type === "create"
            ? "Create Appointment"
            : "Schedule Appointment"}
        </SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm
