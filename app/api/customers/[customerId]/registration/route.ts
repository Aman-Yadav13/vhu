import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { customerId: string } }
) {
  try {
    const currentuser = await currentUser();
    const {
      name,
      fathername,
      gender,
      medicalsymptoms,
      medicalreport,
      address,
      doctorId,
      userId,
    } = await req.json();

    if (!currentuser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (userId !== currentuser.userId) {
      return new NextResponse("Params and userId mismatch", { status: 401 });
    }

    if (
      !name ||
      !fathername ||
      !gender ||
      !address ||
      !medicalreport ||
      !medicalsymptoms
    ) {
      return new NextResponse("One or more fields missing", { status: 400 });
    }

    const existingPatient = await db.patient.findUnique({
      where: {
        userId: currentuser.userId,
      },
    });

    if (existingPatient) {
      return NextResponse.json(existingPatient);
    }

    const patient = await db.patient.create({
      data: {
        name,
        fathername,
        medicalreport,
        medicalsymptoms,
        address,
        gender,
        userId,
        doctorId,
      },
    });

    return NextResponse.json(patient);
  } catch (error) {
    console.log("[PATIENT_REG_POST]:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
