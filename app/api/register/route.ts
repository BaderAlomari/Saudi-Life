import bcrypt from "bcrypt"
import prisma from "@/libs/prismadb"
import {NextResponse} from "next/server"
import { registerSchema } from "@/libs/validations/registerValidation";

export async function POST(
    request: Request
){
    const body = await request.json();
    const{
        email, 
        name,
        password,
        role,
        phoneNumber}
        =body;
        const validateData = registerSchema.parse({email, name, password, phoneNumber, role})
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data:{
               name: validateData.name,
               email: validateData.email,
               hashedPassword,
               role: validateData.role,
               phoneNumber: validateData.phoneNumber
            }


        })
        return NextResponse.json(user)
    }