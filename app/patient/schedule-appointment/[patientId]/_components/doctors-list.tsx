"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Doctor } from "@prisma/client";
import { DoctorsListItem } from "./doctors-list-item";
import { useEffect, useState } from "react";

interface DoctorListProps {
  doctors: Doctor[];
  userId: string | undefined;
}

export const DoctorsList = ({ doctors, userId }: DoctorListProps) => {
  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ScrollArea className="w-full h-full">
      {doctors.map((doctor) => (
        <div className="bg-[#f3f4f5] rounded-md w-full px-2 py-2 relative">
          <DoctorsListItem doctor={doctor} userId={userId} />
        </div>
      ))}
    </ScrollArea>
  );
};
