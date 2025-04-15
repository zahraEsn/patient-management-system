import { StatusIcon } from "@/constants"
import clsx from "clsx"
import Image from "next/image"

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-[#0D2A1F]": status === "scheduled",
        "bg-[#152432]": status === "created",
        "bg-[#3E1716]": status === "canceled",
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt={status}
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p className={clsx("text-12-semibold capitalize", {
				"text-[#24AE7C]": status === "scheduled",
        "text-[#79B5EC]": status === "created",
        "text-[#F37877]": status === "canceled",
			})}>
				{status === "created" ? "pending" : status}
			</p>
    </div>
  )
}
export default StatusBadge
