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
    <div className="max-w-2xl mx-auto py-16 px-6 flex flex-col gap-10">
      <div className="flex flex-col gap-1 border-b border-stone-200 pb-8">
        <p className="text-xs uppercase tracking-widest text-stone-500 font-sans">
          Diary
        </p>
        <h1 className="text-3xl font-serif italic text-stone-700">
          {orgName}
        </h1>
      </div>

      {entries.length === 0 ? (
        <p className="text-stone-400 font-serif italic text-center py-16">
          No entries yet.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {entries.map((entry) => (
            <article key={entry.id} className="flex flex-col gap-2 border-b border-stone-100 pb-8 last:border-0">
              <h3 className="text-lg font-serif text-stone-800">
                {entry.title}
              </h3>
              <p className="text-stone-600 font-serif leading-relaxed">
                {entry.body}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}