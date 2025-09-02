"use client";
import React from "react";
import { OrganizationList, useOrganization } from "@clerk/clerk-react";
import { AuthLayout } from "../layouts/auth-layout";
import OrgSelectView from "../views/org-select-view";

export function OrganizationGuard({ children }: { children: React.ReactNode }) {
  const { organization } = useOrganization();
  if (!organization) {
    return (
      <div>
        <OrgSelectView />
      </div>
    );
  }
  return <>{children}</>;
}
