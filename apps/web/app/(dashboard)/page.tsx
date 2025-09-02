"use client";

import { OrganizationSwitcher, SignInButton, UserButton } from "@clerk/nextjs";

import { useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

export default function Page() {
  const users = useQuery(api.users.getMany);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-svh">
        <div>app/web</div>
        <UserButton />
        {/* <OrganizationSwitcher hidePersonal /> */}
        <OrganizationSwitcher/>
        <div className="mx-auto text-balance">
          {JSON.stringify(users, null, 2)}
        </div>
      </div>
    </>
  );
}
