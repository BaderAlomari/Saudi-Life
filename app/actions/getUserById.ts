//Retrieves user details based on userId
import prisma from "@/libs/prismadb";

export default async function getUserById(userId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return null;
        }
        //Returns the user's details
        return {
            ...user,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            emailVerified: user.emailVerified?.toISOString() || null,
        };
    } catch (error: any) {
        console.error('Error fetching user by ID:', error);
        return null;
    }
}