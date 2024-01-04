import EmptyState from "@/components/EmptyState"
import ClientOnly from "@/components/ClientOnly"
import getCurrentUser from "../actions/getCurrentUser"
import getActivities from "../actions/getActivities"
import MyActivitiesClient from "./MyActivitiesClient"


const MyActivitiesPage = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser || currentUser.role !== 'Local Citizen'){
  return (
    <ClientOnly>
        <EmptyState
        title="Unauthorized"
        subtitle="you are unauthorized to view this page"
        />
    </ClientOnly>
  )
    }



const activities = await getActivities({
    userId: currentUser.id})

    if(activities.length === 0){
        return (
            <ClientOnly>
                <EmptyState
                title="No activities found"
                subtitle="You have not made any activities yet."
                />
            </ClientOnly>
          )
    }

    return(
        <ClientOnly>
            <MyActivitiesClient
            currentUser={currentUser}
            // @ts-ignore
            activities={activities}
            />
        </ClientOnly>
    )

}   
export default MyActivitiesPage
