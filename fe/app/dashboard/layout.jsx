import { cookies } from "next/headers";

import { AppSidebar } from "@/components/custom/dashboard/app-sidebar";


import { auth } from "../(auth)/auth";
import { redirect } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function Layout({ children }) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);

  return (
    <SidebarProvider>
      <AppSidebar user={session?.user} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

