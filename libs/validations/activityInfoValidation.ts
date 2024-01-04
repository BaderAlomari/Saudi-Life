import {z} from 'zod';

export const activityInfoValidation = z.object({
    category: z.string().nonempty("Category is required"),
    guestCount: z.number().min(1, "At least one guest is required"),
    imageSrc: z.string().url("Valid URL is required for the image"),
    title: z.string().min(5, "Title must be at least 5 characters long").max(30, "Title must be no more than 30 characters long").trim(),
    description: z.string().min(15, "Description must be at least 20 characters long").max(250, "Description must be no more than 250 characters long").trim(),
    price: z.number().min(0, "Price cannot be negative"),
    activityDate: z.string().nonempty("Activity date is required").refine((val) => new Date(val).toString() !== 'Invalid Date' && new Date(val) > new Date(), "Invalid or past activity date"),
    activityTime: z.string().nonempty("Activity time is required")
});

