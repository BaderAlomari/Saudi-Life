
"use client"
import Container from "@/components/Container"
import { SafeBookings, SafeUser} from "../types"
import Heading from "@/components/Heading"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import ActivityCard from "@/components/activities/ActivityCard"

interface BookingClientProps {
    bookings: SafeBookings[]
    currentUser?: SafeUser | null



}
const BookingClient: React.FC<BookingClientProps> = ({
    bookings,
    currentUser
}) => {
    const router = useRouter()
    const[deletingId, setDeletingId] = useState('')
    //handle cancellation of a booking
    const onCancel = useCallback((id: string) => {
        setDeletingId(id)
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success('Booking cancelled successfully')
            router.refresh()
        })
        .catch((error) =>{
            toast.error(error?.response?.data?.error)
        })
        .finally(() =>{
            //clear the deletingId
            setDeletingId('')
        })
    },[router])

  return (
    <Container>
        <Heading
        title="Booked Activities"
        subtitle="You have booked the following activities"
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
            {bookings.map((booking) =>(
                //display list of booked activities as an ActivityCard
                <ActivityCard
                key={booking.id}
                data={booking.listing}
                booking={booking}
                actionID={booking.id}
                onAction={onCancel}
                disabled={deletingId === booking.id}
                actionLabel="Cancel Booking"
                currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default BookingClient