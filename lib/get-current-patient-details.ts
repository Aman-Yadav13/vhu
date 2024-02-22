import { currentUser } from "./current-user";
import { db } from "./db";

export const currentPatientDetails = async () => {
  const currentuser = await currentUser();
  if (!currentuser) {
    return null;
  }

  const currentUserId = currentuser.userId;
  const currentPatient = await db.patient.findUnique({
    where: {
      userId: currentUserId,
    },
  });
  if (!currentPatient) {
    return null;
  }

  return currentPatient;
};
