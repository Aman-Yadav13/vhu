import { currentPatientExists } from "@/lib/current-patient-exists";
import { NavbarActions } from "./navbar-actions";
import { NavbarAuth } from "./navbar-auth";
import { NavbarHeader } from "./navbar-header";
import { initialProfile } from "@/lib/initial-profile";

export const Navbar = async () => {
  const user = await initialProfile();
  const isPatient = await currentPatientExists();

  return (
    <div className="flex items-center justify-between z-20">
      <NavbarHeader />
      <NavbarActions user={user} isPatient={isPatient}>
        <NavbarAuth user={user} />
      </NavbarActions>
    </div>
  );
};
