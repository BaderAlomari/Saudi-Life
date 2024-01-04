import {z} from "zod";

export const registerSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3).max(20),
    password: z.string().min(5).max(15).trim(),
    phoneNumber: z.string().nonempty().min(7).max(16).trim(),
    role: z.enum(['Local Citizen', 'Tourist'])
})
