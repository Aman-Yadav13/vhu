"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { User } from "@prisma/client";

export const NavbarActions = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) => {
  const router = useRouter();

  const onPatientClick = () => {
    router.push(`/customer/${user?.userId}`);
  };

  const onDoctorClick = () => {
    router.push(`/doctor/${user?.userId}`);
  };

  return (
    <div className="flex items-center gap-x-4">
      <Button variant="customGhost" onClick={onPatientClick}>
        Patient
      </Button>
      <Button variant="customGhost" onClick={onDoctorClick}>
        Doctor
      </Button>
      {children}
    </div>
  );
};
