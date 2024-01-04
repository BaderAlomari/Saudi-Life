"use client"
import { on } from 'events'
import React, { useCallback } from 'react'
import { AiOutlineMinusCircle } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";

interface TotalPriceCounterProps{
    title: string
    subtitle: string
    value: number
    maxGuests: number
    onChange: (value: number) => void
}

const TotalPriceCounter: React.FC<TotalPriceCounterProps> = (
    {title, 
    subtitle,
    value,
    maxGuests,
    onChange}
) => {
    const onAdd=useCallback(() => {
        if (value < maxGuests) {
            onChange(value + 1);
        }
    }, [onChange, value, maxGuests]);

    const onSubtract=useCallback(() => {
        if(value === 1 ) return

        onChange(value - 1)
    }, [onChange, value])
  return (
    <div className="
    flex
    flex-row
    items-center
    justify-between
    ">
        <div className="
        flex
        flex-col
        ">
            <div className="font-med">
                {title}

            </div>
            <div className="
            font-light
            text-gray-600
            ">
                {subtitle}
            </div>
        </div>
        <div className="
        flex
        flex-row
        items-center
        gap-4
        ">
            <div
            onClick={onSubtract}
            className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-nuetral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
            "
            >
                <AiOutlineMinusCircle />


            </div>
            <div className="
            font-light
            text-xl
            text-nuetral-600
            ">
                {value}

            </div>
            <div
            onClick={onAdd}
            className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-nuetral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
            "
            >
<GrAddCircle />


            </div>

        </div>
    </div>
  )
}

export default TotalPriceCounter