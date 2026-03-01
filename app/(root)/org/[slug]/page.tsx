"use client";

import { useState } from "react";
import { useOrganization } from "@clerk/nextjs";

import { createEntry } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function OrgLandingPage() {
  const [entryTitle, setEntryTitle] = useState("");
  const [entryContent, setEntryContent] = useState("");

  const selectedOrg = useOrganization();

  const handleCreateEntry = async () => {
    if (!selectedOrg.organization?.id) return;

    const res = await createEntry({
      title: entryTitle.trim(),
      body: entryContent.trim(),
      orgId: selectedOrg.organization.id
    });

    setEntryTitle("");
    setEntryContent("");
  };

  return (
    <main className="p-6 space-y-2">
      <Input
        value={entryTitle}
        onChange={(e) => setEntryTitle(e.target.value)}
        placeholder="Diary Entry Title"
      />
      <Textarea
        value={entryContent}
        onChange={(e) => setEntryContent(e.target.value)}
        placeholder="Write your diary entry here."
      />
      <Button onClick={handleCreateEntry} className="cursor-pointer">
        Create Entry
      </Button>
    </main>
  );
}
