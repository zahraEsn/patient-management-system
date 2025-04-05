declare type Gender = "Male" | "Female" | "Other"
declare type Status = "pending" | "scheduled" | "canceled"

declare interface createUserParams {
  name: string
  email: string
  phone: string
}
