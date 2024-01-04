//* This is the page where the user can see all the activities that they have created. 
//*They can also cancel the activity from this page.

"use client"
import Container from "@/components/Container"
import { SafeActivities, SafeUser} from "../types"
import Heading from "@/components/Heading"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import ActivityCard from "@/components/activities/ActivityCard"
import { parseISO, isPast } from "date-fns"

interface MyActivityesClientProps {
    activities: SafeActivities[]
    currentUser?: SafeUser | null



}
const MyActivityesClient: React.FC<MyActivityesClientProps> = ({
    activities,
    currentUser
}) => {
    
    
    const router = useRouter()
    const[deletingId, setDeletingId] = useState('')
    const onCancel = useCallback((id: string) => {
        setDeletingId(id)
        axios.delete(`/api/listings/${id}`)
        .then(()=>{
            toast.success('Listing deleted successfully')
            router.refresh()
        })
        .catch((error) =>{
            toast.error(error?.response?.data?.error)
        })
        .finally(() =>{
            setDeletingId('')
        })
    },[router])

  return (
    <Container>
        <Heading
        title="Your Activities"
        subtitle="List of your activities."
        />
        <div className="mt-10
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
        ">
            
            {activities.map((activity) => {
                //filter out expired activities
                    let activityDateTime;
                    if (activity.activityDate && activity.activityTime) {
                         //combine date and time into a datetime object
                        const datePart = typeof activity.activityDate === 'string' 
                            ? parseISO(activity.activityDate).toISOString().split('T')[0] 
                            : activity.activityDate.toISOString().split('T')[0];
                        const combinedDateTime = `${datePart}T${activity.activityTime}`;
                        activityDateTime = parseISO(combinedDateTime);
                    }
                    //expired initially set to false, check if ispast and change it into true
                    const expired = activityDateTime ? isPast(activityDateTime) : false;

                    return (
                        <ActivityCard
                            key={activity.id}
                            data={activity}
                            actionID={activity.id}
                            onAction={onCancel}
                            disabled={deletingId === activity.id || expired}
                            actionLabel={!expired ? "Cancel activity" : undefined}
                            currentUser={currentUser}
                            expired={!expired ? undefined : "Expired"}
                        />
                    );
                })}
            </div>
        </Container>
  )
}

export default MyActivityesClient