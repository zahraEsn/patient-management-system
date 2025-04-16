import { PatientFormValidation } from "@/lib/validation"
import { Gender } from "@/type"
import { z } from "zod"

export const GenderOptions = ["male", "female", "other"]

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
]

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
]

export const PatientFormDefaultValues: z.infer<typeof PatientFormValidation> = {
  name: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: undefined,
  currentMedication: undefined,
  familyMedicalHistory: undefined,
  pastMedicalHistory: undefined,
  identificationType: "Birth Certificate",
  identificationNumber: undefined,
  identificationDocument: undefined,
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
}

export const StatusIcon = {
	scheduled: "/assets/icons/check.svg",
	created: "/assets/icons/pending.svg",
	canceled: "/assets/icons/cancelled.svg",
}