import {create} from 'zustand';

interface useDisplayReviewsModalProps
 {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useDisplayReviewsModal = create<useDisplayReviewsModalProps
>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useDisplayReviewsModal;