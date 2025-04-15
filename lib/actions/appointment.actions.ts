import { ID, Query } from "node-appwrite"
import {
  database,
  NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_DATABASE_ID,
} from "../appwrite.config"
import { parseStringify } from "../utils"
import { Appointment } from "@/type/appwite.type"

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    )
    return parseStringify(newAppointment)
  } catch (error) {
    console.log("An error occurred while creating a new appointment: ", error)
  }
}

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await database.getDocument(
      NEXT_PUBLIC_DATABASE_ID!,
      NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
      appointmentId
    )
    return parseStringify(appointment)
  } catch (error) {
    console.log(error)
  }
}

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await database.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    )

    const initialCount = {
      scheduleCount: 0,
      pendingCount: 0,
      canceledCount: 0,
    }

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === "scheduled") {
          acc.scheduleCount += 1
        } else if (appointment.status === "pending") {
          acc.pendingCount += 1
        } else if (appointment.status === "canceled") {
          acc.canceledCount += 1
        }
        return acc
      },
      initialCount
    )

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    }

    return parseStringify(data)
  } catch (error) {
    console.log(error)
  }
}
