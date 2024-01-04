import EmptyState from "@/components/EmptyState"
import ClientOnly from "@/components/ClientOnly"
import getBookings from "../actions/getBookings"
import getCurrentUser from "../actions/getCurrentUser"
import BookingClient from "./BookingClient"


const BookingPage = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
  return (
    <ClientOnly>
        <EmptyState
        title="Unauthorized"
        subtitle="Please Login to view this page"
        />
    </ClientOnly>
  )
    }



const bookings = await getBookings({
    userId: currentUser.id})

    if(bookings.length === 0){
        return (
            <ClientOnly>
                <EmptyState
                title="No Bookings found"
                subtitle="You have not made any bookings"
                />
            </ClientOnly>
          )
    }

    return(
        <ClientOnly>
            <BookingClient
            currentUser={currentUser}
            bookings={bookings}
            />
        </ClientOnly>
    )

}   
export default BookingPage
