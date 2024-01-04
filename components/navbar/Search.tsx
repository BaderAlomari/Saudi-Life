"use client"
import useSearchModal from '@/app/hooks/useSearchModal'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import {BiSearch} from 'react-icons/bi'
import useSaudiStates from '@/app/hooks/useLocation'
import { useMemo } from 'react'
const Search = () => {
    const SearchModal = useSearchModal()
    const params = useSearchParams()
    const {getByValue} = useSaudiStates()
    const locationValue = params?.get('locationValue')
    const guestCount = params?.get('guestCount')
    const locationLabel = useMemo(() => {
        if(locationValue){
            return getByValue(locationValue as string)?.label
        }
        return "Where"
    }, [locationValue, locationValue])

    const guestLabel = useMemo(() =>{
        if(guestCount){
            return `${guestCount} Guests`
        }
        return "Add Guests"
    }, [guestCount])
  return (
    <div 
    onClick={SearchModal.onOpen}
    className="
    border-[1px]
    w-full
    md:w-auto
    py-2
    rounded-full
    shadow-sm
    hover:shadow-md
    transition
    cursor-pointer
    "
    >

        <div className="
        flex
        flex-row
        items-center
        justify-between
        ">
            <div className="
            text-sm
            font-semibold
            px-6
            ">
             {locationLabel}
            </div>
            <div className="
            hidden
            sm:block
            text-sm
            font-semibold
            px-6
            border-x-[1px]
            flex-1
            text-center">
                {guestLabel}

            </div>
            <div className="
            text-sm
            pl-6
            pr-2
            text-gray-600
            flex
            flex-row
            items-center
            gap-3

            ">
                <div className="p-2
                bg-custom-green
                rounded-full
                text-white">
                    <BiSearch size={18}/>

                </div>

            </div>
        </div>
    </div>
  )
}

export default Search