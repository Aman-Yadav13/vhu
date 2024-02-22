"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export const onAppointment = async (
  doctorId: string,
  userId: string | undefined
) => {
  try {
    if (!doctorId) {
      return new Error("Unauthorized");
    }
    const patient = await db.patient.update({
      where: { userId },
      data: {
        doctorId: doctorId,
      },
    });

    if (!patient) {
      throw new Error("Something went wrong");
    }

    revalidatePath(`/patient/upcoming-appointments/${userId}`);
    revalidatePath(`/patient/schedule-appointments`);
    revalidatePath(`/`);
    return patient;
  } catch {
    throw new Error("Internal Error");
  }
};
