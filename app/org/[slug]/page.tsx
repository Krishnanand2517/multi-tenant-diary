"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function OrgLandingPage() {
  const [entryTitle, setEntryTitle] = useState("");
  const [entryContent, setEntryContent] = useState("");

  const handleSubmit = () => {
    console.log(entryTitle, entryContent);
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
      <Button onClick={handleSubmit} className="cursor-pointer">
        Create Entry
      </Button>
    </main>
  );
}
