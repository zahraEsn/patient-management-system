"use server"

import { ID, Query } from "node-appwrite"
import {
  BUCKET_ID,
  database,
  DATABASE_ID,
  NEXT_PUBLIC_ENDPOINT,
  NEXT_PUBLIC_PROJECT_ID,
  PATIENT_COLLECTION_ID,
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

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      )

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
    }

    const newPatient = await database.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${NEXT_PUBLIC_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${NEXT_PUBLIC_PROJECT_ID}`,
        ...patient,
      }
    )
  } catch (error) {
    console.log(error)
  }
}
