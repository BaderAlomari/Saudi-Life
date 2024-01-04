export const dynamic = "force-dynamic"
import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import getActivities, { IActivityParams } from "./actions/getActivities";
import ActivityCard from "@/components/activities/ActivityCard";
import getCurrentUser from "./actions/getCurrentUser";
import { parseISO, isPast } from 'date-fns';
import { GetServerSideProps } from "next";

interface HomeProps{
  searchParams: IActivityParams
}
const Home = async ( {searchParams}: HomeProps) => {
  const activities = await getActivities(searchParams);
  const currentUser = await getCurrentUser()

  if(activities.length === 0){
    return(
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  const filteredActivities = activities.filter((activity) => {
    let activityDateTime;
    if (activity.activityDate && activity.activityTime) {
      const datePart = activity.activityDate.split('T')[0];
      const combinedDateTime = `${datePart}T${activity.activityTime}`;
      activityDateTime = parseISO(combinedDateTime);
    }
    //check if activity is not past
    return activityDateTime ? !isPast(activityDateTime) : true;
  });
  return (
    <ClientOnly>
      <Container>
     <div className="
     pt-24
     grid
     grid-cols-1
     sm:grid-cols-2
     md:grid-cols-3
     lg:grid-cols-4
     xl:grid-cols-5
     2xl:grid-cols-6
     gap-8">
        {filteredActivities.map((listings) => {
          return(
           <ActivityCard
           currentUser={currentUser}
           key={listings.id}
           // @ts-ignore
           data={listings}
           />
          )
        })}
      
     </div>
      </Container>
    </ClientOnly>
  )
}

export default Home