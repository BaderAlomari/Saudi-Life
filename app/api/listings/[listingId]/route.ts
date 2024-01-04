import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

interface IParams{
    listingId?: string;
}

export async function DELETE(
    request: Request,
    {params}: {params: IParams})
    {
        const currentUser = await getCurrentUser();

        if(!currentUser){
            return NextResponse.error();
        }

        const {listingId} = params;
        if(!listingId || typeof listingId !== "string"){
            throw new Error("invalid Id")
        }
        const listing = await prisma.listings.deleteMany({
            where: {
                id: listingId,
                userId: currentUser.id
            }
        })
        return NextResponse.json(listing)
    }
