"use client";
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import Modal from '../modals/Modal';
import CustomButton from '../CustomButton';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeReviews } from '@/app/types';
import { useRouter } from "next/navigation"
import { reviewSchema } from '@/libs/validations/reviewValidation';


interface ReviewModalProps {
    authorId: string;
    reviewedUserId: string;
    existingReviews: SafeReviews[];
}


const ReviewModal: React.FC<ReviewModalProps> = ({
    authorId,
    reviewedUserId,
    existingReviews
    }
    ) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const hasReviewed = existingReviews.some(review => review.author.id === authorId);

    const { register, 
        handleSubmit, 
        formState: { errors }, 
        reset } = 
        useForm({
        
    });

    const handleAddReviewClick = () => {
        if (hasReviewed) {
            toast.error('You have already left a review for this user.');
        } else {
            setIsModalOpen(true);
        }
        
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const router = useRouter()

    const handleReviewSubmit =  async (data: any) => {
        const content = data.reviewContent.trim()
        if (content.length < 10) {
            return toast.error("Review must be at least 10 characters long");
            
        }
    
        if (content.length > 90) {
            toast.error("Review must be no more than 90 characters long");
            return;
        }
        
        try {
             await axios.post('/api/reviews', {
                content: data.reviewContent,
                authorId: authorId,
                reviewedUserId: reviewedUserId,
            });

            toast.success('Review submitted successfully');
            reset();
            router.refresh()
            setIsModalOpen(false);
        } catch (error) {
            toast.error('Failed to submit review');
        }
    };
   

    return (
        <>
           
                <CustomButton
                    onClick={handleAddReviewClick}
                    label="Add Review"
                />
            
            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleSubmit(handleReviewSubmit)}
                title="Add a Review"
                actionLabel="Submit Review"
                body={(
                    <textarea
                        {...register("reviewContent")}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Write your review here..."
                    />
                )}
            />
           
        </>
    );
};

export default ReviewModal;
