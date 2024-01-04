import {z} from "zod";

export const settingsSchema = z.object({
    email: z.string().email().optional(),
    name: z.string().min(3).max(20).optional(),
    phoneNumber: z.string().nonempty().min(7).max(16).optional(),
    description: z.string().min(10, "Description must be at least 10 characters long").max(200, "Description must be no more than 200 characters long").optional(),
    image: z.string().optional()
})
