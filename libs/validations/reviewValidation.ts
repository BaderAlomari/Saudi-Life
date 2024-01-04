import {z} from "zod";

export const reviewSchema = z.object({
    content: z.string()
      .trim()
      .min(10, { message: "Review must be at least 10 characters long" })
      .max(90, { message: "Review must be no more than 90 characters long" })
})