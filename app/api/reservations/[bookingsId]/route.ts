import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

interface IParams{
    bookingsId?: string;
}

export async function DELETE(
    request: Request,
    {params}: {params: IParams}
){
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }

    const {bookingsId} = params;

    if(!bookingsId || typeof bookingsId !== "string"){
        throw new Error("Invalid bookingsId");
    }
    const bookings = await prisma.bookings.deleteMany({
            where:{
                id: bookingsId,
                OR: [
                    {userId: currentUser.id},//cancel creater of booking
                    {listing: {userId: currentUser.id}}//cancel creator of activity
                ]
            }
    })

    return NextResponse.json(bookings)

}