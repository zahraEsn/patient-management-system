"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"
import SubmitButton from "../SubmitButton"

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true)

    try {
      const userData = { name, email, phone }
      const user = await createUser(userData)
      if (user) {
        router.push(`/patients/${user.$id}/register`)
      }
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself</p>
        </section>
        <section className="space-y-6">
          <h2 className="sub-header">Personal Information</h2>
        </section>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          label="Full name"
          name="name"
          placeholder="Adrian Hajdin"
          iconSrc="/assets/icons/user.svg"
          iconAlt="name"
        />
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            label="Email address"
            name="email"
            placeholder="adrian@jsmastery.pr"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            label="Phone number"
            name="phone"
            placeholder="+00 0342 0453 34"
            iconAlt="phone"
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            label="Date of birth"
            name="birthDate"
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            label="Gender"
            name="gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex flex-col gap-6 sm:flex-row xl:justify-between"
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <label htmlFor={option} className="cursor-pointer">
                        {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            label="Address"
            name="address"
            placeholder="14 street, New York, NY - 5101"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            label="Occupation"
            name="occupation"
            placeholder="Software Engineer"
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            label="Emergency contact name"
            name="emergencyContactName"
            placeholder="Guardian’s name"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            label="Emergency contact number"
            name="emergencyContactNumber"
            placeholder="+1 (868) 579-9831"
          />
        </div>
        <section className="space-y-6">
          <h2 className="sub-header">Medical Information</h2>
        </section>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          label="Primary Physician"
          name="primaryPhysician"
          placeholder="Select a physician"
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
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            label="Insurance provider"
            name="insuranceProvider"
            placeholder="BlueCross"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            label="Insurance policy number"
            name="insurancePolicyNumber"
            placeholder="ABC1234567"
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            label="Allergies (if any)"
            name="allergies"
            placeholder="Peanuts, Penicillin, Pollen"
          />
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            label="Current medication"
            name="currentMedication"
            placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            label="Family medical history (if relevant)"
            name="familyMedicalHistory"
            placeholder="Mother had breast cancer"
          />
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            label="Past medical history"
            name="pastMedicalHistory"
            placeholder="Asthma diagnosis in childhood"
          />
        </div>
        <section className="space-y-6">
          <h2 className="sub-header">Identification and Verification</h2>
        </section>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          label="Identification type"
          name="identificationType"
          placeholder="Birth Certificate"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          label="Identification number"
          name="identificationNumber"
          placeholder="1234567"
        />
        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          label="Scanned Copy of Identification Document"
          name="identificationDocument"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />
        <section className="space-y-6">
          <h2 className="sub-header">Consent and Privacy</h2>
        </section>
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          label="I consent to receive treatment for my health condition."
          name="treatmentConsent"
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          label="I consent to the use and disclosure of my health information for treatment purposes.."
          name="disclosureConsent"
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          label="I acknowledge that I have reviewed and agree to the privacy policy."
          name="privacyConsent"
        />
        <SubmitButton isLoading={isLoading}>Submit and continue</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm
