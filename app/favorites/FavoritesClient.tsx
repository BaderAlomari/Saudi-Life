//*this component contains two functions for handling POST 
//*and DELETE requests related to user favorite activities.
"use client"
import Container from "@/components/Container";
import { SafeActivities, SafeUser } from "../types";
import Heading from "@/components/Heading";
import ActivityCard from "@/components/activities/ActivityCard";

interface FavoritesClientProps{
    currentUser?: SafeUser | null;
    activities: SafeActivities[];
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
    currentUser,
    activities
}) => {
  return (
    <Container>
        <Heading
        title="Favorites"
        subtitle="List of your favorite activities"
        />
        <div className="
        mt-10
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
        ">
            
            {activities.map((activity) => (
                //display list of favorite activity as an ActivityCard
                <ActivityCard
                currentUser={currentUser}
                key={activity.id}
                data={activity}
                />

            ))}
        </div>
    </Container>
  )
}

export default FavoritesClient