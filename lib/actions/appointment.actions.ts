"use server"

import { ID, Query } from "node-appwrite"
import {
  database,
  NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_DATABASE_ID,
} from "../appwrite.config"
import { parseStringify } from "../utils"
import { Appointment } from "@/type/appwite.type"
import { CreateAppointmentParams, UpdateAppointmentParams } from "@/type"
import { revalidatePath } from "next/cache"

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
        switch (appointment.status) {
          case "scheduled":
            acc.scheduleCount++
            break
          case "created":
            acc.pendingCount++
            break
          case "canceled":
            acc.canceledCount++
            break
          default:
            console.warn("Unknown status:", appointment.status)
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

export const updateAppointment = async ({
  userId,
  appointmentId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await database.updateDocument(
      NEXT_PUBLIC_DATABASE_ID!,
      NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    )
    if (!updatedAppointment) {
      throw new Error("Failed to update appointment")
    }

    revalidatePath("/admin")
    return parseStringify(updatedAppointment)
  } catch (error) {
    console.log(error)
  }
}
