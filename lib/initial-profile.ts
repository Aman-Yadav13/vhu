import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const dbuser = await db.user.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (dbuser) {
    return dbuser;
  }

  const newUser = await db.user.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,

      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newUser;
};
