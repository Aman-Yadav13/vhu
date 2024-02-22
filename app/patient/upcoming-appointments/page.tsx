import { currentPatientDoctorIdExists } from "@/lib/current-patient-doctorId-exists";
import { currentPatientExists } from "@/lib/current-patient-exists";
import { redirect } from "next/navigation";

const UpcomingAppointmentsPage = async () => {
  const isPatient = await currentPatientExists();
  const isDoctorAffiliated = await currentPatientDoctorIdExists();

  if (!isPatient) {
    redirect("/");
  }

  if (!isDoctorAffiliated) {
    return (
      <div className="flex justify-center">
        <p className="text-3xl">No appointments scheduled</p>
      </div>
    );
  }

  return <div>Upcoming appointments</div>;
};

export default UpcomingAppointmentsPage;
