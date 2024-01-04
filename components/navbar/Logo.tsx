"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";


const Logo = () => {
    const router = useRouter();
  return (
    <Image
    onClick={() => router.push('/')}
    alt="Logo"
    className="hidden md:block cursor-pointer"
    height="50"
    width="50"
    src="/Page-logo.png"
    />
  )
}

export default Logo