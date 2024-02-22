import { currentUser } from "./current-user";
import { db } from "./db";

export const currentPatientDoctorIdExists = async () => {
  const currentuser = await currentUser();
  if (!currentuser) {
    return false;
  }

  const currentUserId = currentuser.userId;
  const currentPatient = await db.patient.findUnique({
    where: {
      userId: currentUserId,
    },
  });
  if (!currentPatient) {
    return false;
  }
  const doctorId = currentPatient.doctorId;

  if (doctorId.length == 0) {
    return false;
  }

  return true;
};
