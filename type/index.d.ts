declare type SearchParamsProps = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

declare type Gender = "male" | "female" | "other"
declare type Status = "pending" | "scheduled" | "canceled"

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
  allergies: string | undefined
  currentMedication: string | undefined
  familyMedicalHistory: string | undefined
  pastMedicalHistory: string | undefined
  identificationType: string | undefined
  identificationNumber: string | undefined
  identificationDocument: FormData | undefined
  privacyConsent: boolean
}
