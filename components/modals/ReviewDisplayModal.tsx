"use client";
import React from "react";
import Modal from "./Modal";
import useDisplayReviewsModal from "@/app/hooks/useDisplayReviewsModal";
import { SafeReviews, SafeUser } from "@/app/types";
import Avatar from "../Avatar";
import Container from "../Container";
import Heading from "../Heading";
import { FaRegTrashAlt } from "react-icons/fa";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

interface ReviewDisplayModalProps {
  reviews: SafeReviews[];
  currentUser: SafeUser | null;
}

const ReviewDisplayModal: React.FC<ReviewDisplayModalProps> = ({
  reviews,
  currentUser,
}) => {
  const router = useRouter();

  const useReviewModal = useDisplayReviewsModal();
  const onSubmit = () => {
    useReviewModal.onClose();
  };
  const handleDeleteReview = async (reviewId: string) => {
    try {
      await axios.delete(`/api/reviews/${reviewId}`);
      toast.success('Review deleted successfully');
      router.refresh();

    } catch (error) {
        console.log(error)
      toast.error('Failed to delete review');
    }
  };

  let bodyContent = (
    <Container>
      <div className="flex flex-col gap-4">
        <Heading
          title="Reviews"
          subtitle="This is where you can see all the reviews for this user"
        />
      </div>
      <div className="p-2 max-h-96 overflow-y-auto rounded-xl">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="relative p-2 mt-1 bg-white rounded-md shadow-md"
          >
            {currentUser && currentUser.id === review.author.id && (
              <div
                onClick={() => handleDeleteReview(review.id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <FaRegTrashAlt />
              </div>
            )}
            <div className="flex items-start">
              <Avatar src={review.author.image} />
              <div className="text-left p-1 flex-1">
                <div
                  className="text-sm cursor-pointer"
                  onClick={() => {
                    useReviewModal.onClose();
                    router.push(`/User/${review.author.id}`);
                  }}
                >
                  by: {review.author.name}
                </div>
                <div className="mt-1 font-light text-neutral-500">
                  {review.content}
                </div>
                <div className="mt-1 text-xs font-light text-neutral-400">
                  Created At{" "}
                  {format(parseISO(review.createdAt), "yyyy-MM-dd h:mma")}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );

  return (
    <Modal
      isOpen={useReviewModal.isOpen}
      onClose={useReviewModal.onClose}
      onSubmit={onSubmit}
      actionLabel="Close"
      title="Reviews"
      body={bodyContent}
    />
  );
};

export default ReviewDisplayModal;
