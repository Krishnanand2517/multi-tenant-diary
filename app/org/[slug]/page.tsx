"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function OrgLandingPage() {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const handleSubmit = () => {
    console.log(blogTitle, blogContent);
  };

  return (
    <main className="p-6 space-y-2">
      <Input
        value={blogTitle}
        onChange={(e) => setBlogTitle(e.target.value)}
        placeholder="Blog Title"
      />
      <Textarea
        value={blogContent}
        onChange={(e) => setBlogContent(e.target.value)}
        placeholder="Write your blog content here."
      />
      <Button onClick={handleSubmit} className="cursor-pointer">
        Create Article
      </Button>
    </main>
  );
}
