"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface AvatarProps{
    src: string | null | undefined
    
}
const Avatar: React.FC<AvatarProps> = ({
    src}
) => {
  return (
    <Image
    className="rounded-full"
    height="30"
    width="30"
    alt="Avatar"
    src={src || "/placeholder.png"}
    
    />
  )
}

export default Avatar