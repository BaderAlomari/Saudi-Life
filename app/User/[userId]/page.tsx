import React from 'react';
import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';
import UserPage from './UserPageClient';
import getUserById from '@/app/actions/getUserById';
import getActivitiesByUserId from '@/app/actions/getActivityByUserId';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getUserReviews from '@/app/actions/getUserReviews';
interface IParams {
    userId?: string;

}

const UserProfilePage= async ({ params }: { params: IParams}) => {
    const {userId} = params;
    if(!userId ) {
        return null
    }
    const user = await getUserById(userId);
    if (!user) {
        return null;
      }
    const userActivities = await getActivitiesByUserId({ userId: user.id });

    const currentUser = await getCurrentUser();
    const userReviews = await getUserReviews({ userId: user.id });
  

    return (
        <div>
            <UserPage 
            user={user}
            activities={userActivities} 
            loggedInUser={currentUser}
            reviews={userReviews}
            />
            
        </div>
    );
};

export default UserProfilePage;