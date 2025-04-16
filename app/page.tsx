import PatientForm from "@/components/forms/PatientForm"
import PasskeyModal from "@/components/PasskeyModal"
import { SearchParamsProps } from "@/type"
import Image from "next/image"
import Link from "next/link"

const Home = async ({ params, searchParams }: SearchParamsProps) => {
  const { admin } = await searchParams
  const isAdmin = admin === "true"

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />

          <PatientForm />

          <div className="flex justify-between mt-20 text-14-regular">
            <p className="copyright">© carepulse copyright</p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        alt="patients"
        width={1000}
        height={1000}
        className="side-img max-w-[50%]"
      />
    </div>
  )
}

export default Home
