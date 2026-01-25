import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import  {ZodSchema}  from "@/lib/ZodSchema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Zod validation
    const parsed = ZodSchema.safeParse(body);

   if (!parsed.success) {
    return NextResponse.json({
        error: parsed.error.flatten().fieldErrors,
    });
    }
    const {name, email, password } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
