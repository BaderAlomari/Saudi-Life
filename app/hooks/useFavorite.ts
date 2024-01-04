import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import {toast} from 'react-hot-toast';
import{SafeUser} from "../types";
import useLoginModal from './useLoginModal';

interface IUseFavorite{
    activityID: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({activityID, currentUser}: IUseFavorite) => {
    const router = useRouter()
    const loginModal = useLoginModal();

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(activityID)
    }, [currentUser, activityID])

    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation()

        if(!currentUser){
            return loginModal.onOpen();
           
        }

        try{
            let request

            if(isFavorite){
                request = () => axios.delete(`/api/favorites/${activityID}`)
            } else{
                request = () => axios.post(`/api/favorites/${activityID}`)
            }

            await request();
            router.refresh()
            toast.success("Success!")
        } catch(error){
            toast.error("Error!")
        }
        
    },[ activityID, currentUser, isFavorite, loginModal, router])

    return {
        isFavorite,
        toggleFavorite
    }
}

export default useFavorite;