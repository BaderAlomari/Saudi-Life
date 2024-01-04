//Retrieves bookings based on specified parameters
import prisma from "@/libs/prismadb";

interface IParams{
    activityId?: string;
    userId?: string
    authorId?: string;
}

export default async function getBookings(
    params: IParams
){
    try{
    const {activityId, userId, authorId} = params;
    const query: any = {}

    if(activityId){
        query.activityID = activityId;
    }
    if(userId){
        query.userId = userId;
    }
    if(authorId){
        query.listing = {userId: authorId};
    }

    const booking = await prisma.bookings.findMany({
        where: query,
        include:{
            listing: true,
            user:true

        },
        //Sorting the result by creation date in descending order
        orderBy:{
            createdAt: "desc"
        }
    })
    const safeBookings = booking.map((bookings) =>({
        ...bookings,
        createdAt: bookings.createdAt.toISOString(),
        listing:{
            ...bookings.listing,
            createdAt: bookings.listing.createdAt.toISOString()
        },
        userName: bookings.user.name || '',
    }))
    return safeBookings;
}
catch(err: any){
    throw new Error(err);
}
}
