"use client"
import React from 'react'
import{CldUploadWidget} from 'next-cloudinary'
import {useCallback} from 'react'
import Image from 'next/image'
import {MdOutlineAddPhotoAlternate} from 'react-icons/md'
import Avatar from './Avatar'
import { RiEdit2Line } from "react-icons/ri";

declare global{
    var cloudinary: any
}

interface UserImageUploadProps{
    onChange: (value: string) => void;
    value: string
    userId: string
    isEditable?: boolean
}

const UserImageUpload: React.FC<UserImageUploadProps> = ({
    value,
    onChange,
    userId,
    isEditable
}
) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url)
    }, [onChange])
    
    const uploadOptions = {
         
        maxFiles: 1,
        resourceType: "image",
        folder: `${userId}/UserImage/`,
        cropping: true,              
        croppingAspectRatio: 1,       
        croppingShowDimensions: true, 
        croppingShape: "circle",      
        multiple: false, 
        transformation: [{ crop: "fill", radius: "max"}],
        secure: true,
        
    };
    const imageSrc = value || "/placeholder.png";
  return (
    <CldUploadWidget
    onUpload={handleUpload}
    uploadPreset="zlalvxhl"
    options={
        
        uploadOptions
    }
    >
        {({open}) =>{
            return(
                <div
                onClick={() => isEditable && open?.()}
                className="
                relative
                p-5
                flex
                flex-col
                
                text-neutral-600
                "
                >
                    
                    {imageSrc && (
                         <div
                         className="absolute "
                         >
                             <Image
                             className="rounded-full"
                             alt="Upload Image"
                             width="60"
                             height="60"
                             style={{}}
                             src={imageSrc}
                             />
                              {isEditable && (
            <div className="absolute bottom-0 right-0 p-2">
              <RiEdit2Line size={16} className="text-white bg-gray-700 rounded-full" />
            </div>
          )}
                          </div>
                          
                            
                        
                    )}
                    

                </div>
            )
        }}

    </CldUploadWidget>
  )
}

export default UserImageUpload