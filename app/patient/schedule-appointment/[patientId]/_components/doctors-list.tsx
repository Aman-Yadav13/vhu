"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Doctor } from "@prisma/client";
import { DoctorsListItem } from "./doctors-list-item";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

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
    <div className="h-full w-full border-black border-[5px]">
      <div className="py-4 w-full bg-[#f3f3f3]">
        <p className="text-4xl font-semibold text-center">Our Doctors</p>
        <Separator className="h-[2px] w-full mt-4" />
      </div>
      <ScrollArea className="w-full h-full shadow-md">
        {doctors.map((doctor) => (
          <>
            <div className="bg-[#f3f3f3] rounded-md w-full px-2  relative">
              <DoctorsListItem doctor={doctor} userId={userId} />
            </div>
            <Separator className="h-[2px] w-full " />
          </>
        ))}
      </ScrollArea>
    </div>
  );
};
