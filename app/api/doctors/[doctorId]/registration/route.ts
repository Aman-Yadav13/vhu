import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { NEVER } from "zod";

export async function POST(
  req: Request,
  { params }: { params: { doctorId: string } }
) {
  try {
    const currentuser = await currentUser();
    const {
      name,
      userId,
      experience,
      imageUrl,
      biography,
      contact,
      address,
      degree,
      specialization,
      license,
      email,
    } = await req.json();

    if (!currentuser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (params?.doctorId !== userId) {
      return new NextResponse("Params and userId mismatch", { status: 401 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !experience ||
      !imageUrl ||
      !contact ||
      !address ||
      !degree ||
      !specialization ||
      !email ||
      !license ||
      !name ||
      !biography
    ) {
      return new NextResponse("One or more fields missing", { status: 400 });
    }

    if (currentuser.email !== email) {
      return new NextResponse("Emails mismatch", { status: 401 });
    }

    const existingDoctor = await db.doctor.findUnique({
      where: {
        userId: userId,
      },
    });

    if (existingDoctor) {
      return NextResponse.json(existingDoctor);
    }

    const doctor = await db.doctor.create({
      data: {
        name,
        userId,
        experience,
        imageUrl,
        biography,
        contact,
        address,
        degree,
        specialization,
        license,
        email,
      },
    });

    return NextResponse.json(doctor);
  } catch (error) {
    console.log("[DOCTOR_REG_POST]:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
