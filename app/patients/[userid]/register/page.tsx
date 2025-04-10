import RegisterForm from "@/components/forms/RegisterForm"
import { getUser } from "@/lib/actions/patient.actions"
import Image from "next/image"

const Register = async ({ params }: SearchParamsProps) => {
  const { userId } = await params
  if (!userId) throw new Error("Missing userId")
  const user = await getUser(userId)

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[900px]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user={user} />

          <p className="copyright mt-10 py-12">© carepulse copyright</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  )
}
export default Register
