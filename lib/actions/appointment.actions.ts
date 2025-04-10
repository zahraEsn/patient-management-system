import { ID } from "node-appwrite"
import { database } from "../appwrite.config"
import { parseStringify } from "../utils"

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
