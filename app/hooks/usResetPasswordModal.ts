import {create} from 'zustand';

interface ResetPasswordModalProps
 {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useResetPasswordModal = create<ResetPasswordModalProps
>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useResetPasswordModal;