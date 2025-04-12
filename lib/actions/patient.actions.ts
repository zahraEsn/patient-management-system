"use server"

import { ID, Query } from "node-appwrite"
import {
  BUCKET_ID,
  database,
  NEXT_PUBLIC_DATABASE_ID,
  NEXT_PUBLIC_ENDPOINT,
  NEXT_PUBLIC_PROJECT_ID,
  NEXT_PUBLIC_PATIENT_COLLECTION_ID,
  storage,
  users,
} from "../appwrite.config"
import { parseStringify } from "../utils"
import { InputFile } from "node-appwrite/file"

export const createUser = async (user: createUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    )
    return newUser
  } catch (error: any) {
    if (error && error?.code === 409) {
      const document = await users.list([Query.equal("email", [user.email])])
      console.log("error: ", error)
      return document?.users[0]
    }
    console.error("An error occurred while creating a new user:", error)
  }
}

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId)
    return parseStringify(user)
  } catch (error) {
    console.log("An error occurred while retrieving the user details:", error)
  }
}

export const getPatient = async (userId: string) => {
  try {
    const patients = await database.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    )
    return parseStringify(patients.documents[0])
  } catch (error) {
    console.log(
      "An error occurred while retrieving the patient details: ",
      error
    )
  }
}

export const registerPatient = async ({
  identificationDocument,
  userId,
  ...patient
}: RegisterUserParams) => {
  try {
    let file

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      )

      file = await storage.createFile(
        process.env.BUCKET_ID!,
        ID.unique(),
        inputFile
      )
    }

    const newPatient = await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.BUCKET_ID}/files/${file?.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`,
        ...patient,
      }
    )
    return newPatient
  } catch (error) {
    console.log(error)
  }
}
