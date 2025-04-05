"use client"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { any } from "zod"
import { FormFieldType } from "./forms/PatientForm"
import React, { useState } from "react"
import Image from "next/image"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"

interface CustomProps {
  control: Control<any>
  fieldType: FormFieldType
  name: string
  label?: string
  placeholder?: string
  iconSrc?: string
  iconAlt?: string
  disabled?: boolean
  dateFormat?: string
  showTimeSelect?: boolean
  children?: React.ReactNode
  renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, placeholder, iconSrc, iconAlt } = props
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input"
            />
          </FormControl>
        </div>
      )
    case FormFieldType.TEXTAREA:
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            value={field.value}
            onChange={field.onChange}
            className="input-phone"
            international
            withCountryCallingCode
          />
        </FormControl>
      )
    case FormFieldType.CHECKBOX:
    case FormFieldType.DATE_PICKER:
    case FormFieldType.SELECT:
    case FormFieldType.SKELETON:
    default:
      break
  }
}

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="!text-red-400" />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
