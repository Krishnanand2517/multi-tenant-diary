import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { orgSlug } = await auth();

  if (orgSlug) {
    redirect(`/org/${orgSlug}`);
  }

  return (
    <main className="p-6">
      <h1 className="text-lg font-bold">Select an organization to begin.</h1>
    </main>
  );
}
