import React from "react";
import { AuthGuard } from "@/modules/auth/ui/components/auth-guard";
import { OrganizationGuard } from "@/modules/auth/ui/components/organisation-guard";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { cookies } from "next/headers";
import { DashboardSidebar } from "../components/dashboard-sidebar";

export async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesStore = await cookies();
  const defaultOpen = cookiesStore.get("sidebar_state")?.value === "true";
  return (
    <AuthGuard>
      <OrganizationGuard>
        <SidebarProvider defaultOpen={defaultOpen}>
          <DashboardSidebar />
          <main className="flex flex-1 flex-col">{children}</main>
        </SidebarProvider>
      </OrganizationGuard>
    </AuthGuard>
  );
}
