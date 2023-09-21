import { redirect } from "next/navigation";
import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";

const SetupPage = async () => {
  const profile = await initialProfile();

  if (profile) {
    const server = await db.server.findFirst({
      where: {
        members: {
          some: {
            profileId: profile.id
          }
        }
      }
    });

    if (server) {
      return redirect(`/server/${server.id}`);
    }
  }


  return (
    <div>
      Create a Server
    </div>
  );
}

export default SetupPage;