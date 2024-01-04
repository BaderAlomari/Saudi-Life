import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { resetPasswordSchema } from "@/libs/validations/resetPasswordValidation";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { oldPassword, newPassword } = body;
    const validateData = resetPasswordSchema.parse({ oldPassword, newPassword });

    try {
        const user = await prisma.user.findUnique({ where: { id: currentUser.id } });
        if (!user || !user.hashedPassword) {
            // If user is not found or hashedPassword is null
            return NextResponse.error();
        }

        // Compare old password
        const isMatch = await bcrypt.compare(validateData.oldPassword, user.hashedPassword);
        if (!isMatch) {
            return NextResponse.error();
        }

        // Hash new password and update user
        const hashedNewPassword = await bcrypt.hash(validateData.newPassword, 10);
        await prisma.user.update({
            where: { id: currentUser.id },
            data: { hashedPassword: hashedNewPassword },
        });

        return NextResponse.json({ message: 'Password updated successfully' });
    } catch (error) {
        return NextResponse.error();
    }
}
