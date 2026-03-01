"use client";

import {
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center border-b border-stone-200 bg-stone-100">
      <p className="text-xs uppercase tracking-widest text-stone-500 font-sans">
        Diarist
      </p>

      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-sm font-sans text-stone-500 hover:text-stone-800 transition-colors cursor-pointer">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="text-sm font-sans text-stone-100 bg-stone-800 hover:bg-stone-700 transition-colors cursor-pointer px-5 py-2 uppercase tracking-widest rounded-none">
              Start Writing
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <OrganizationSwitcher
            afterSelectOrganizationUrl="/org/:slug"
            afterCreateOrganizationUrl="/org/:slug"
            afterSelectPersonalUrl="/"
          />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
