"use client";

import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { User } from "@prisma/client";

export const NavbarAuth = ({ user }: { user: User | null }) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/sign-in");
  };

  return (
    <>
      {!user ? (
        <Button variant="customGhost" onClick={onClick}>
          <p className="capitalize">Sign in</p>
        </Button>
      ) : (
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[30px] w-[30px]",
            },
          }}
        />
      )}
    </>
  );
};
