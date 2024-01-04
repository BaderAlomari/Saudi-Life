import {z} from "zod";
export const resetPasswordSchema = z.object({
    oldPassword: z.string().min(5).max(15).trim(),
    newPassword: z.string().min(5).max(15).trim(),
})
