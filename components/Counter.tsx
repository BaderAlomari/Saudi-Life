"use client"
import { on } from 'events'
import React, { useCallback } from 'react'
import { BiUserMinus, BiUserPlus } from 'react-icons/bi'

interface CounterProps{
    title: string
    subtitle: string
    value: number
    onChange: (value: number) => void
}

const Counter: React.FC<CounterProps> = (
    {title, 
    subtitle,
    value,
    onChange}
) => {
    const onAdd=useCallback(() => {
        onChange(value + 1)
    }, [onChange, value])

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
                <BiUserMinus/>

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
                <BiUserPlus/>

            </div>

        </div>
    </div>
  )
}

export default Counter