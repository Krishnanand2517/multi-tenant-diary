"use client";

import { useState } from "react";
import { useOrganization } from "@clerk/nextjs";
import { toast } from "sonner";

import { createEntry } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function OrgLandingPage() {
  const [entryTitle, setEntryTitle] = useState("");
  const [entryContent, setEntryContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const selectedOrg = useOrganization();

  const handleCreateEntry = async () => {
    if (!selectedOrg.organization?.id) return;
    setIsLoading(true);

    try {
      await createEntry({
        title: entryTitle.trim(),
        body: entryContent.trim(),
        orgId: selectedOrg.organization.id
      });

      setEntryTitle("");
      setEntryContent("");

      toast.success("Entry saved.");
    } catch (error) {
      console.error("Error creating entry:", error);
      toast.error("Could not create an entry. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-6 flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-widest text-stone-500">
          New Entry
        </p>
        <h2 className="text-3xl font-serif italic text-stone-700">
          What's on your mind?
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        <Input
          value={entryTitle}
          onChange={(e) => setEntryTitle(e.target.value)}
          placeholder="Give this entry a title…"
          className="bg-transparent border-0 border-b border-stone-300 rounded-none px-0 text-lg font-serif text-stone-800 placeholder:text-stone-400 focus-visible:ring-0 focus-visible:border-stone-500 transition-colors"
        />
        <Textarea
          value={entryContent}
          onChange={(e) => setEntryContent(e.target.value)}
          placeholder="Begin writing…"
          rows={10}
          className="bg-transparent border border-stone-200 rounded-none resize-none font-serif text-stone-700 placeholder:text-stone-400 focus-visible:ring-0 focus-visible:border-stone-400 transition-colors leading-relaxed p-4"
        />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleCreateEntry}
          disabled={!entryTitle.trim() || !entryContent.trim() || isLoading}
          className="cursor-pointer rounded-none bg-stone-800 hover:bg-stone-700 text-stone-100 text-xs uppercase tracking-widest px-8 py-5 font-sans transition-colors disabled:opacity-30"
        >
          Save Entry
        </Button>
      </div>
    </div>
  );
}
