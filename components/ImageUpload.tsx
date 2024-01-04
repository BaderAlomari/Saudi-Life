"use client"
import React from 'react'
import{CldUploadWidget} from 'next-cloudinary'
import {useCallback} from 'react'
import {MdOutlineAddPhotoAlternate} from 'react-icons/md'
import Image from 'next/image'
import { SafeUser } from '@/app/types'

declare global{
    var cloudinary: any
}

interface ImageUploadProps{
    onChange: (value: string) => void;
    value: string
    
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    value,
    onChange,
    
}
) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url)
    }, [onChange])
  return (
    <CldUploadWidget
    onUpload={handleUpload}
    uploadPreset="zlalvxhl"
    options={{
        maxFiles: 1,
        resourceType: "image",
        folder: `ActivityImages/`
    }}
    >
        {({open}) =>{
            return(
                <div
                onClick={() => open?.()}
                className="
                relative
                cursor-pointer
                hover:opacity-70
                transition
                border-dashed
                border-2
                p-20
                flex
                flex-col
                items-center
                justify-center
                gap-4
                border-neutral-300
                text-neutral-600
                "
                >
                    <MdOutlineAddPhotoAlternate size={55}/>
                    <div className="font-semibold text-lg">
                        Click here to upload
                    </div>
                    {value && (
                        <div
                        className="absolute inset-0 w-full h-full"
                        >
                            <Image
                            alt="Upload Image"
                            fill
                            style={{objectFit: 'cover'}}
                            src={value}
                            />
                         </div>
                    )}
                    

                </div>
            )
        }}

    </CldUploadWidget>
  )
}

export default ImageUpload