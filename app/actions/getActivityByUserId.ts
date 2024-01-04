import prisma from "@/libs/prismadb";

interface IParams {
    userId?: string;
}

export default async function getActivitiesByUserId(params: IParams) {
    try {
        const { userId } = params;

        const activities = await prisma.listings.findMany({
            where: {
                userId: userId,
            },
            include: {
                user: true, 
            },
        });

        if (!activities) {
            return [];
        }

        return activities.map(activity => ({
            ...activity,
            createdAt: activity.createdAt.toISOString(),
            user: {
                ...activity.user,
                createdAt: activity.user.createdAt.toISOString(),
                updatedAt: activity.user.updatedAt.toISOString(),
                emailVerified: activity.user.emailVerified?.toISOString() || null,
            }
        }));
    } catch (error: any) {
        throw new Error(error.message);
    }
}
