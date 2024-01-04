"use client"
import { SafeUser } from "@/app/types"
import { IconType } from "react-icons"
import useSaudiStates from "@/app/hooks/useLocation"
import Avatar from "../Avatar"
import ActivityCategory from "./ActivityCategory"
import Map from "../Map"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {parse, format, parseISO, isPast} from 'date-fns'
import EmptyState from "../EmptyState"



interface ActivityInfoProps {
    user: SafeUser
    description: string
    guestCount: number
    locationValue: string
    category: {
        icon: IconType
        label: string
        description: string
    } | undefined
    activityDate: string
    activityId: string
    activityTime: string
    numberOfBookings: string
    
    
    
    
}


const ActivityInfo: React.FC<ActivityInfoProps> = ({
    user,
    description,
    guestCount,
    locationValue,
    category,
    activityDate,
    activityTime,
    activityId,
    numberOfBookings,

    
    
    
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {getByValue} = useSaudiStates()
    const coordinateslat = getByValue(locationValue)?.latitude
    const coordinateslng = getByValue(locationValue)?.longitude
    let formattedTime = '';
    const guestInfo = `${numberOfBookings}/${guestCount}`;


    try {
        if (activityTime) {
            const parsedTime = parse(activityTime, 'HH:mm', new Date());
            formattedTime = format(parsedTime, 'h:mma');
        } else {
            formattedTime = 'Time not available'; //default message if time is null orundefined
        }
    } catch (error) {
        console.error('Error parsing time:', error);
        formattedTime = 'Invalid Time'; //set to a default message if parsing fails
    }

    const router = useRouter()
    const handleModalClose = () => {
        setIsModalOpen(false);
       
    };
    
  return (
    <div className="col-span-4 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
            <div className="text-xl font-semibold flex flex-row items-center gap-2 cursor-pointer">
                <div  onClick={() => router.push(`/User/${user.id}`)} >
                    Hosted By {user?.name}
                    </div>
                    <Avatar src={user?.image}/>
            </div>
            
            <div className="
            flex
            flex-row
            items-center
            gap-4
            font-light
            text-neutral-500
            ">
                <div>
                    {guestInfo} guests
                </div>
                <div
                className="font-light text-neutral-500 cursor-pointer hover:text-neutral-700 underline"
                 onClick={() => {
                    if (user?.phoneNumber) {
                        const phoneNumber = user.phoneNumber.replace(/[^0-9]/g, '');
                        window.open(`https://wa.me/${phoneNumber}`, '_blank');
                    }
                }}
                >
                {user?.phoneNumber && <span>  {user.phoneNumber}</span>}
                </div>
            </div>
        </div>
        <hr/>
        {category && (
            <ActivityCategory
            icon={category.icon}
            label={category.label}
            description={category.description}
            />
        )}
        <hr/>
        <div className=" text-lg font-light text-neutral-500">
            {description}
           

        </div>
        <div className=" text-lg font-light text-neutral-500">
        {activityDate} {formattedTime}
           

        </div>
        
        <hr/>
        {coordinateslat && coordinateslng && (
  <Map
    center={[parseFloat(coordinateslat), parseFloat(coordinateslng)] }
  />
)}
<hr/>
    
    
    
    </div>
    
  )
}

export default ActivityInfo