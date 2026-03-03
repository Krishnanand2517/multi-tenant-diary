import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AuthLanding from "./AuthLanding";

export default async function Home() {
  const { orgSlug } = await auth();

  if (orgSlug) {
    redirect(`/org/${orgSlug}`);
  }

  return <AuthLanding />
}
