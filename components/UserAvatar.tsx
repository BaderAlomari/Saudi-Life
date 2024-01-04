"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface UserAvatarProps{
    src: string | null | undefined
    
}
const UserAvatar: React.FC<UserAvatarProps> = ({
    src}
) => {
  return (
    <Image
    className="rounded-full"
    height={100}
    width={100}
    alt="UserAvatar"
    src={src || "/placeholder.png"}
    
    />
  )
}

export default UserAvatar