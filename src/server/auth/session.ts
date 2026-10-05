import { auth } from "@/auth";

export async function getRequiredSession() {
  const session = await auth();
  if (!session?.user?.accessToken) {
    return null;
  }
  return session;
}
