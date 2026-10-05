import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth/options";

export async function getRequiredSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.accessToken) {
    return null;
  }
  return session;
}
