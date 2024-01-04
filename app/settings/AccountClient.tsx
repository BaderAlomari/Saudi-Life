"use client"
import { FieldValues } from 'react-hook-form';
import React from 'react';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import { SafeUser } from '../types';
import Input from '@/components/Input';
import { useForm } from 'react-hook-form';
import CustomButton from '@/components/CustomButton';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import useResetPasswordModal from '../hooks/usResetPasswordModal';
import ResetPasswordModal from '@/components/modals/resetPasswordModal';
import UserImageUpload from '@/components/UserImageUpload';
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { settingsSchema } from '@/libs/validations/settingsValidation';






interface AccountClientProps {
    currentUser?: SafeUser | null;
}



const AccountClient: React.FC<AccountClientProps> = ({ currentUser }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name || '',
            email: currentUser?.email || '',
            phoneNumber: currentUser?.phoneNumber || '',
            image: currentUser?.image || '',
            description: currentUser?.description || ''
            
        }
    });

    const [editable, setEditable] = useState(false);
    const resetPasswordModal = useResetPasswordModal();
    const [isLoading, setIsLoading] = useState(false);
    const watchImage = watch('image');
    //function to handle phoneNumber input. Makes local citizens unable to change country code (+966)
    const handlePhoneNumberChange = (event: any) => {
        const inputValue = event.target.value;
        const countryCode = "+966";

        if (currentUser?.role === "Local Citizen") {
            if (!inputValue.startsWith(countryCode)) {
                setValue('phoneNumber', countryCode + inputValue.slice(countryCode.length));
            } else {
                setValue('phoneNumber', inputValue);
            }
        }
    }

    const onSubmit = async (data: FieldValues) => {
        //validation
        if (!currentUser) {
            toast.error("Please log in to update your account.");
            return;
        }
        if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
            toast.error("Invalid email format");
            return;
        }
        if (data.name && (data.name.length < 3 || data.name.length > 20)) {
            toast.error("Name must be between 3 and 20 characters");
            return;
        }
        if (data.phoneNumber && (data.phoneNumber.length < 7 || data.phoneNumber.length > 16)) {
            toast.error("Phone number must be between 7 and 16 digits");
            return;
        }
        if (currentUser.role === "Local Citizen" && data.description && (data.description.length < 10 || data.description.length > 200)) {
            toast.error("Description must be between 10 and 200 characters");
            return;
        }
        let schema = settingsSchema.omit({ description: true });
    if (currentUser.role === "Local Citizen") {
        schema = schema.extend({
            description: z.string().min(10, "Description must be at least 10 characters long").max(200, "Description must be no more than 200 characters long"),
        });
    }
       
        setIsLoading(true);
        const validateData = schema.parse(data)//parse data to validate it (but using a library.)
        axios.post('/api/user', validateData)
            .then(() => {
                toast.success('Account updated successfully');
                setEditable(false);
                
            })
            .catch(() => {
                
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    

    //set form values when currentUser information changes
    React.useEffect(() => {
        if (currentUser) {
            setValue('name', currentUser.name || '');
            setValue('email', currentUser.email || '');
            setValue('phoneNumber', currentUser.phoneNumber || '');
            setValue('image', currentUser.image || '');
            setValue('description', currentUser.description || '');
        }
    }, [currentUser, setValue]);
    

    const toggleEdit = () => {
        
        setEditable(!editable);
    };

    const handleImageChange = (imageUrl: string) => {
        setValue('image', imageUrl,{
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
    }

    

 
    return (
        <Container>
            <div className="pl-2">
            <Heading
                title="Account Settings"
                subtitle="Manage your account settings here."
            />
            </div>
            
            <div  className="mt-4 p-4 border rounded-lg shadow-md">
                <div className="flex flex-col gap-4">
                <div className="pt-2 pl-3" >
                
              <UserImageUpload
              value={watchImage}
              onChange={handleImageChange}
              userId={currentUser?.id || 'samples'}
              isEditable={editable}
              />
                </div>
                <br/>
                <Input
                    id="name"
                    label="Name"
                    type="text"
                    disabled={!editable}
                    register={register}
                    errors={errors}
                />
                <Input
                    id="email"
                    label="Email"
                    type="email"
                    disabled={!editable}
                    register={register}
                    errors={errors}
                />
                
                <Input
                    id="phoneNumber"
                    label="Phone Number"
                    type="tel"
                    disabled={!editable}
                    register={register}
                    errors={errors}
                    onChange={handlePhoneNumberChange}
                />
                
                {currentUser?.role === "Local Citizen" && (
                 <Input
                    id="description"
                    label="Description"
                    type="textarea"
                    disabled={!editable}
                    register={register}
                    errors={errors}
                />)}

               
                </div>
                {currentUser?.role === "Tourist" && (
                    <div
                    className="
                    font-light 
                    text-neutral-500
                    pl-2
                    text-sm
                    "
                    >
                        Please include country code.
                    </div>
                )}
                <div className="p-4">
                <CustomButton
                label="Edit Account Information"
                onClick={toggleEdit}
                disabled={editable}
                outline={true}
                />
                <div className="pt-2">
                <CustomButton
                label="Submit Changes"
                onClick={handleSubmit(onSubmit)}
                disabled={!editable}
                />
                </div>
                </div>
                <div className="
            text-center
            mt-4
            font-light 
            ">
               
                <div className="
                text-neutral-800
                cursor-pointer
                hover:underline"
                onClick={resetPasswordModal.onOpen}
                >
                    Change Password
                </div>
                

            </div>
            <ResetPasswordModal
                currentUser={currentUser}
                />
                
            </div>
        </Container>
    );
};

export default AccountClient;