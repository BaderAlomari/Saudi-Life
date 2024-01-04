"use client"

import React from 'react'
interface BurgerMenuProps {
    onClick: () => void;
    label: string;

}

const BurgerMenu: React.FC<BurgerMenuProps> = ({onClick,label}) => {
  return (
    <div 
    onClick={onClick}
    className="px-4
    py-3
    hover:bg-neutral-100
    transition
    font-semibold">
        {label}

    </div>
  )
}

export default BurgerMenu