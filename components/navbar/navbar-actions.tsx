"use client";

import { redirect, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { User } from "@prisma/client";

export const NavbarActions = ({
  children,
  user,
  isPatient,
}: {
  children: React.ReactNode;
  user: User | null;
  isPatient: boolean;
}) => {
  const router = useRouter();

  const onPatientClick = () => {
    router.push(`/customer/${user?.userId}`);
  };

  const onDoctorClick = () => {
    router.push(`/doctor/${user?.userId}`);
  };

  const onUpcomingAppointmentsClick = () => {
    if (!user) {
      window.alert("Authenticate your profile to access this section.");
      return;
    }
    if (!isPatient) {
      window.alert("You must fill a patient form to access this section");
      return;
    }
    router.push(`/patient/upcoming-appointments`);
    return;
  };

  return (
    <div className="flex items-center gap-x-4">
      <Button variant="customGhost" onClick={onPatientClick}>
        Patient
      </Button>
      <Button variant="customGhost" onClick={onDoctorClick}>
        Doctor
      </Button>
      <Button
        variant="customGhost"
        className="w-fit"
        onClick={onUpcomingAppointmentsClick}
      >
        Upcoming Appointments
      </Button>
      {children}
    </div>
  );
};
