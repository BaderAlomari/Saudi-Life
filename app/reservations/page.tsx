import EmptyState from "@/components/EmptyState"
import ClientOnly from "@/components/ClientOnly"
import getCurrentUser from "../actions/getCurrentUser"
import getBookings from "../actions/getBookings"
import ReservationClient from "./ReservationClient"
const ReservationsPage = async() => {
    const currentUser = await getCurrentUser()

    if(!currentUser || currentUser.role !== 'Local Citizen'){
        return(
            <ClientOnly>
                <EmptyState
                title="Unauthorized"
                subtitle="you are unauthorized to view this page"
                />
            </ClientOnly>
        )
        
    }

    //fetch bookings of activity created by the current user
    const bookings = await getBookings({
        authorId: currentUser.id
    })

    if(bookings.length === 0){
        return(
            <ClientOnly>
                <EmptyState
                title="No Bookings found"
                subtitle="No one booked as of now."
                />
            </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <ReservationClient
        bookings={bookings}
        currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default ReservationsPage