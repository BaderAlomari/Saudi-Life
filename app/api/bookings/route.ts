import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

export async function POST(
    request: Request
){
    
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }
    const body = await request.json();
    const{
        activityId,
        totalPrice,
        numberOfGuests
    } = body

    if(!activityId || !totalPrice || !numberOfGuests){
        return NextResponse.error();
    }

    const activityBooking = await prisma.listings.update({
        where:{
            id: activityId
        },
        data:{
            bookings:{
                create:{
                    userId: currentUser.id,
                    totalPrice,
                    numberOfGuests
                }
            }
        }
        }
    )
    return NextResponse.json(activityBooking)
}
