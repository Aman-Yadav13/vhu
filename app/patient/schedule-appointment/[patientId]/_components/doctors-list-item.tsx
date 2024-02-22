import CheckoutButton from "@/components/stripe/checkout-button";
import { Button } from "@/components/ui/button";
import { Doctor } from "@prisma/client";
import Image from "next/image";

interface DoctorListItemProps {
  doctor: Doctor;
  userId: string | undefined;
}

export const DoctorsListItem = ({ doctor, userId }: DoctorListItemProps) => {
  return (
    <>
      <div className="flex items-center">
        <Image
          src={doctor.imageUrl}
          alt={doctor.name}
          width={200}
          height={200}
          className="aspect-square rounded"
        />
        <div className="flex flex-col ml-8 self-start">
          <p className="text-2xl font-semibold">{doctor.name}</p>
          <p className="text-md">
            Degree: <span>{doctor.degree}</span>
          </p>
          <p className="text-md">
            Specialization in: <span>{doctor.specialization}</span>
          </p>
          <p className="text-md">Experience: {doctor.experience} years</p>
        </div>
      </div>
      <div className="absolute right-2 bottom-2 flex items-center gap-x-2">
        <Button className="" variant="default" size="lg">
          <p className="text-lg">Reviews</p>
        </Button>
        <CheckoutButton doctorData={{ ...doctor }} userId={userId} />
      </div>
    </>
  );
};
