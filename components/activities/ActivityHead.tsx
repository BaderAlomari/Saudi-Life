import { SafeUser } from "@/app/types"
import useSaudiStates from "@/app/hooks/useLocation";
import Heading from "../Heading";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";
interface ActivityHeadProps {
    title: string
    imageSrc: string
    locationValue: string
    id: string
    currentUser?: SafeUser | null
}

const ActivityHead: React.FC<ActivityHeadProps> = ({
    title,
    imageSrc,
    locationValue,
    id,
    currentUser
}) => {
    const {getByValue} = useSaudiStates()
    const location = getByValue(locationValue)
  return (
    <>
    <Heading
    title={title}
    subtitle={`${location?.label}, Saudi Arabia`}
    />
    <div className="
    w-full
    h-[60vh]
    overflow-hidden
    rounded-xl
    relative">
        <Image
        alt="Image"
        src={imageSrc}
        fill
        className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
            <FavoriteButton
            activityID={id}
            currentUser={currentUser}
            />

        </div>
    </div>
    </>
  )
}

export default ActivityHead