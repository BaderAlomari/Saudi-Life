import {NextResponse} from "next/server"
import prisma from "@/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"
import { activityInfoValidation } from "@/libs/validations/activityInfoValidation"




export async function POST(
    request: Request
){
    const currentUser = await getCurrentUser()

    if(!currentUser || currentUser.role !== "Local Citizen"){
        return NextResponse.error()
    }

    const body = await request.json()
    
    const {
        category,
        location,
        guestCount,
        imageSrc,
        price,
        title,
        description,
        activityDate,
        activityTime
    } = body;

    const validateData = activityInfoValidation.parse({category, guestCount, imageSrc, title, description, price: Number(price), activityDate: body.activityDate, activityTime: body.activityTime})
    const listings = await prisma.listings.create({
        
            data: {
                category: validateData.category,
                locationValue: location.value,
                guestCount: validateData.guestCount,
                imageSrc: validateData.imageSrc,
                price: validateData.price,
                title: validateData.title,
                description: validateData.description,
                userId: currentUser.id,
                activityDate: new Date(validateData.activityDate),
                activityTime: validateData.activityTime
        }
             })
    if(listings){
        return NextResponse.json(listings);
        }
        else {
        return NextResponse.error();
        }
}