"use client"
import { IconType } from "react-icons"
interface CustomButtonProps{
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;  
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;

}
const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon

}) => {
  return (
    <button
  
    className={`
    relative
    disabled:opacity-70disabled:cursor-not-allowed
    rounded-lg
    hover:opacity-80
    transition
    w-full
    ${outline ? 'bg-white' : 'bg-custom-green'}
    ${outline ? 'border-black' : 'bg-custom-green'}
    ${outline ? 'test-black' : 'text-white'}
    ${small ? 'py-1' : 'py-3'}
    ${small ? 'text-sm' : 'text-md'}
    ${small ? 'border-[1px]' : 'border-2'}
    ${small ? 'font-light' : 'font-semibold'}
    
    `}
    onClick={onClick}
    disabled={disabled}
    
    >
      {Icon && (
        <Icon
        size={24}
        className="
        absolute
        left-4
        top-3"
        />
      )}
      {label}
    </button>
    
  )
}

export default CustomButton