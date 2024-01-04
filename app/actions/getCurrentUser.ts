//Retrieves the current user details
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);

}

export default async function getCurrentUser(){
    try{
        const session = await getSession();
        //Checks if the session has a user with an email
        if(!session?.user?.email){
            return null;
        }
        const currentUser = await prisma.user.findUnique({
            where : {email : session.user.email as string}
        })
        if(!currentUser){
            return null;
        }
        //Returns the user's information
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
        }
    }
    catch(error: any){
        return null;
    }

}
