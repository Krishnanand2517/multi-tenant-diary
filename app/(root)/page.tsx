import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { orgSlug } = await auth();

  if (orgSlug) {
    redirect(`/org/${orgSlug}`);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-6">
      <p className="text-xs uppercase tracking-widest text-stone-500 font-sans">
        Welcome to Diarist
      </p>
      <h1 className="text-4xl text-stone-700 font-serif italic">
        Choose an organization to begin.
      </h1>
      <p className="text-stone-500 text-sm max-w-sm">
        Select or create an organization from the menu above to start writing your diary.
      </p>

      <SignedOut>
        <div className="flex items-center gap-4 mt-2">
          <SignInButton mode="modal">
            <button className="text-sm font-sans text-stone-500 hover:text-stone-800 transition-colors cursor-pointer">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="text-sm font-sans text-stone-100 bg-stone-800 hover:bg-stone-700 transition-colors cursor-pointer px-5 py-2 uppercase tracking-widest">
              Start Writing
            </button>
          </SignUpButton>
        </div>
      </SignedOut>
    </div>
  );
}
