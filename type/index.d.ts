declare type SearchParamsProps = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

declare type Gender = "Male" | "Female" | "Other"
declare type Status = "pending" | "scheduled" | "canceled"

declare interface createUserParams {
  name: string
  email: string
  phone: string
}

declare interface User extends createUserParams {
  $id: string
}

