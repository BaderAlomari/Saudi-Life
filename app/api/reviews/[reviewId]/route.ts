import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

interface IParams{
    reviewId?: string;
}

export async function DELETE(request: Request,
    {params}: {params: IParams}) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return new Response(JSON.stringify({ error: 'Not authorized' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const { reviewId } = params;
    if (!reviewId) {
        return new Response(JSON.stringify({ error: 'Invalid ID' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        await prisma.review.delete({
            where: {
                id: reviewId,
            },
        });

        return NextResponse.json({ message: 'Review deleted successfully' });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Unable to delete review' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
