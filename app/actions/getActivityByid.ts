import prisma from "@/libs/prismadb";

interface IParams {
    activityId?: string;
}
//fetches a list of activities
export default async function getActivityByid(params: IParams)
{
    
    try{
        const { activityId } = params;
       
        //fetching the activity from database using the activityId.
        const activity = await prisma.listings.findUnique({
            where:{
                id: activityId,
            },
            include:{
                user: true
            }
        })

        if(!activity){
            return null
        }
        return {
            ...activity,
            createdAt: activity.createdAt.toISOString(),
            user:{
                ...activity.user,
                createdAt: activity.user.createdAt.toISOString(),
                updatedAt: activity.user.updatedAt.toISOString(),
                emailVerified: activity.user.emailVerified?.toISOString() || null,
            }
        }
    }
    catch(error: any){
        throw new Error(error)
    }
}