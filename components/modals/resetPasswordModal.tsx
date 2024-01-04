"use client"
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Modal from './Modal';
import Input from '@/components/Input';
import toast from 'react-hot-toast';
import axios from 'axios';
import useResetPasswordModal from '@/app/hooks/usResetPasswordModal';
import { SafeUser } from '@/app/types';
import { FieldValues } from 'react-hook-form';
import { resetPasswordSchema } from '@/libs/validations/resetPasswordValidation';


interface ResetPasswordModalProps {
    currentUser?: SafeUser | null;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
    currentUser
}) => {
    const resetPasswordModal = useResetPasswordModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>()
    
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (data.oldPassword.trim().length < 5 || data.oldPassword.trim().length > 15) {
            toast.error("Old Password must be between 5 and 15 characters");
            return;
        }
        if (data.newPassword.trim().length < 5 || data.newPassword.trim().length > 15) {
            toast.error("New Password must be between 5 and 15 characters");
            return;
        }
        const validateData = resetPasswordSchema.parse(data)
        setIsLoading(true);
        try {
            await axios.post('/api/resetPassword', validateData);
            toast.success("Password reset successfully!");
            resetPasswordModal.onClose();
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

 

    const bodyContent = (
        <div className="
        flex
        flex-col
        gap-4">

        
            <Input
                id="oldPassword"
                label="Old Password"
                type="password"
                register={register}
                errors={errors}
            />
            <Input
                id="newPassword"
                label="New Password"
                type="password"
                register={register}
                errors={errors}
            />
           </div>
      
    
        
    )

    return (
        <Modal
            isOpen={resetPasswordModal.isOpen}
            onClose={resetPasswordModal.onClose}
            title="Reset Password"
            actionLabel="Reset Password"
            disabled={isLoading}
            body={bodyContent}
            onSubmit={handleSubmit(onSubmit)}
        />
    );
};

export default ResetPasswordModal;
