import { Button } from "@/components/ui/button";
import { Doctor } from "@prisma/client";
import Image from "next/image";

interface DoctorListItemProps {
  doctor: Doctor;
}

export const DoctorsListItem = ({ doctor }: DoctorListItemProps) => {
  console.log(doctor);
  return (
    <>
      <div className="flex items-center">
        <Image
          src={doctor.imageUrl}
          alt={doctor.name}
          width={150}
          height={150}
        />
        <div className="flex flex-col ml-8 self-start">
          <p className="text-2xl font-semibold">{doctor.name}</p>
          <p className="text-lg">
            Degree: <span>{doctor.degree}</span>
          </p>
          <p className="text-lg">
            Specialization in: <span>{doctor.specialization}</span>
          </p>
          <Button
            className="text-white w-fit bg-cyan-400 hover:bg-cyan-300"
            variant="outline"
            size="default"
          >
            Reviews
          </Button>
        </div>
      </div>
      <Button className="absolute right-2 bottom-2">Proceed to payment</Button>
    </>
  );
};
