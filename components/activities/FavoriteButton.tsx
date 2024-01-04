"use client"
import useFavorite from '@/app/hooks/useFavorite'
import { SafeUser } from '@/app/types'
import ClientOnly from '@/components/ClientOnly'

interface FavoriteButtonProps {
    activityID: string
    currentUser?: SafeUser | null

}
import React from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    activityID,
    currentUser
}) => {
    const{ isFavorite, toggleFavorite} = useFavorite({
        activityID,
        currentUser
    })
 
  return (
    <div className="
    relative
    hover:opacity-80
    transition
    cursor-pointer
    "
    onClick={toggleFavorite}>
        <AiOutlineHeart
        size={28}
        className="fill-white
        absolute
        -top-[2px]
        -right-[2px]"
        />
        <AiFillHeart
        size={24}
        className={
            isFavorite ? 'fill-rose-400' : 'fill-neutral-500'
        }
        />
    </div>
  )
}

export default FavoriteButton