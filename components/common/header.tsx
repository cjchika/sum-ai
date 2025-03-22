// import { useState } from "react";
import { NavLink } from "./nav-link";
import { FileStack } from "lucide-react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import PlanBadge from "./PlanBadge";

export const Header = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  let isLoggedIn = false;

  return (
    <nav className="container flex items-center justify-between py-4 px-2 lg:px-8 mx-auto">
      <div className="flex lg:flex-1">
        <NavLink
          href={"/"}
          className="flex items-center gap-1 lg:gap-2 shrink-0"
        >
          {" "}
          <FileStack className="w-5 h-5 lg:w-6 lg:h-6 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-bold lg:text-xl text-gray-900"> SUM-AI</span>
        </NavLink>
      </div>

      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href={"/#pricing"}>Pricing</NavLink>
        <SignedIn>
          <NavLink href={"/dashboard"}>Your Summaries</NavLink>
        </SignedIn>
      </div>

      <div className="flex lg:justify-end lg:flex-1">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <NavLink href={"/upload"}>Upload PDF</NavLink>
            <PlanBadge />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>

        <SignedOut>
          <NavLink href={"/sign-in"}>Sign In</NavLink>
        </SignedOut>
      </div>
    </nav>
  );
};
