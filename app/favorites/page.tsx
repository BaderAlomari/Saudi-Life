import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getFavorites from "../actions/getFavorites";
import FavoritesClient from "./FavoritesClient";


const favoritesPage = async () => {
    const currentUser = await getCurrentUser();
    const favoriteListings = await getFavorites();
    if(favoriteListings.length === 0) {
    return(
        <ClientOnly>
            <EmptyState
            title="No favorites yet"
            subtitle="You don't have any favorites yet."
            />
        </ClientOnly>
    )}

    return(
        <ClientOnly>
            <FavoritesClient
            currentUser={currentUser}
            activities={favoriteListings}
            />
        </ClientOnly>
    )
}
export default favoritesPage;