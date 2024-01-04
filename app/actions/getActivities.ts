import prisma from "@/libs/prismadb";

export interface IActivityParams{
    userId?: string;
    guestCount?: number;    
    locationValue?: string;
    category?: string;
    activityDate?: string;
}
//fetches a single activity from the database 
export default async function getActivities( 
    params: IActivityParams
) {
try{
    const {userId, guestCount, locationValue, category, activityDate} = params

    let query: any = {}

    if(userId){
        query.userId = userId
    }
    if(category){
        query.category = category
    }
    if(locationValue){
        query.locationValue = locationValue
    }
    if(activityDate){
        query.activityDate = activityDate
    }
    if(guestCount){
        query.guestCount = {
            gte: +guestCount //transform from string to number
        }
    }

    

    const activities = await prisma.listings.findMany({
        where: query,
        //sorting result by creation date in descending order
        orderBy: {
            createdAt: "desc"
        }
    })
    //map the activities in safe activities
    const safeActivities = activities.map((activity) => ({
        ...activity,
        createdAt: activity.createdAt.toISOString(),
        activityDate: activity.activityDate ? activity.activityDate.toISOString() : 'Default Date',
        
    }))
    return safeActivities

} catch (error: any){
    throw new Error(error)
}
}