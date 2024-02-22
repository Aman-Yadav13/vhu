import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const currentuser = await currentUser();
    if (!email || !currentuser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingDoctor = await db.doctor.findUnique({
      where: {
        userId: currentuser.userId,
      },
    });

    if (!existingDoctor) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    if (existingDoctor.email !== currentuser.email) {
      return new NextResponse("Emails mismatch", { status: 401 });
    }

    return NextResponse.json(existingDoctor);
  } catch (error) {
    console.log("[DOCTOR_SIGN_IN]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
