import { Appointment } from "./appwite.type"

declare type SearchParamsProps = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

declare type Gender = "male" | "female" | "other"
declare type Status = "created" | "scheduled" | "canceled"

declare interface createUserParams {
  name: string
  email: string
  phone: string
}

declare interface User extends createUserParams {
  $id: string
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string
  birthDate: Date
  gender: Gender
  address: string
  occupation: string
  emergencyContactName: string
  emergencyContactNumber: string
  primaryPhysician: string
  insuranceProvider: string
  insurancePolicyNumber: string
  allergies?: string
  currentMedication?: string
  familyMedicalHistory?: string
  pastMedicalHistory?: string
  identificationType?: string
  identificationNumber?: string
  identificationDocument?: File[]
  treatmentConsent: boolean
  disclosureConsent: boolean
  privacyConsent: boolean
}

declare type CreateAppointmentParams = {
  userId: string
  patient: string
  primaryPhysician: string
  reason: string | undefined
  schedule: Date
  status: Status
  note: string | undefined
}

declare type UpdateAppointmentParams = {
  userId: string
  appointmentId: string
  // timeZone: string
  appointment: Appointment
  type: string
}
