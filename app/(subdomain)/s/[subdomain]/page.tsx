import { clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { entriesTable } from "@/db/schema";

interface Params {
  subdomain: string;
}

export default async function SubdomainPage({ params }:{ params: Promise<Params> }) {
  const { subdomain } = await params;
  const client = await clerkClient();

  const org = await client.organizations.getOrganization({ slug: subdomain });
  const orgId = org.id;
  const orgName = org.name;

  const entries = await db.select()
    .from(entriesTable)
    .where(eq(entriesTable.orgId, orgId));

  return (
    <div className="px-4 md:px-32 py-4 md:py-20">
      <h1 className="text-2xl font-bold">{orgName}</h1>

      <div className="space-y-4 md:space-y-8 mt-4 md:mt-8">
        {entries.map((entry) => (
          <div key={entry.id} className="p-4 border border-zinc-900 rounded-md">
            <h3 className="text-lg font-semibold">{entry.title}</h3>
            <p>{entry.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}