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
    <nav className="p-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold">Diarist</h1>
      </div>

      <div className="flex justify-between gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-sm sm:text-base px-4 sm:px-5 py-2 sm:py-3 cursor-pointer">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-zinc-900 hover:bg-zinc-700 text-white rounded-full font-medium text-sm sm:text-base px-4 sm:px-5 py-2 sm:py-3 cursor-pointer transition-colors">
              Create Account
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <OrganizationSwitcher afterSelectOrganizationUrl="/org/:slug" />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
