import getActivityByid from "@/app/actions/getActivityByid"
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/components/ClientOnly"
import EmptyState from "@/components/EmptyState"
import ActivityClient from "./ActivityClient";
import getBookings from "@/app/actions/getBookings";
import { parseISO, isPast } from 'date-fns';

interface IParams {
  activityId?: string;
}
const ActivityPage = async ({ params }: { params: IParams}) => {
  const activity = await getActivityByid(params)
  const currentUser = await getCurrentUser();
  const bookings = await getBookings(params);

  

  if(!activity){
    
    return(
      <ClientOnly>
      <EmptyState 
      title="Activity not found"
      subtitle="This activity doesn't exist or has been removed."
      />
    </ClientOnly>
  )
  }
  let activityDateTime;
  if (activity.activityDate && activity.activityTime) {
    //extract just the date part from the ISO string
    const datePart = activity.activityDate.toISOString().split('T')[0];
    //combine date part with activity time
    const combinedDateTime = `${datePart}T${activity.activityTime}`;
    activityDateTime = parseISO(combinedDateTime);
  }

  //check if the activity date and time are in the past
  const isActivityPast = activityDateTime ? isPast(activityDateTime) : false;
  if (isActivityPast) {
    return (
      <ClientOnly>
        <EmptyState 
          title="Activity has expired"
          subtitle="This activity has been expired."
        />
      </ClientOnly>
    );
  }
  return (
   <div>
      <ActivityClient
      activity={activity}
      currentUser={currentUser}
      bookings={bookings}
      />
   </div>
  )
}

export default ActivityPage