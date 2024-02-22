import { db } from "@/lib/db";
import { DoctorsList } from "./_components/doctors-list";
import { currentUser } from "@/lib/current-user";

const ScheduleAppointmentPage = async () => {
  const doctors = await db.doctor.findMany();
  const currentuser = await currentUser();
  const userId = currentuser?.userId;

  return (
    <div className="h-full w-full px-8 py-2">
      <p className="font-semibold text-3xl text-zinc-800">
        <DoctorsList doctors={doctors} userId={userId} />
      </p>
    </div>
  );
};

export default ScheduleAppointmentPage;
