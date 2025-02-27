"use client";

import * as React from "react";
import { ReceiptText } from "lucide-react";

import { NavMain } from "@/components/custom/dashboard/nav-main";
import { NavSecondary } from "@/components/custom/dashboard/nav-secondary";
import { NavUser } from "@/components/custom/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { data } from "./sidebar-data";
import { SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "../visually-hidden";

export function AppSidebar({ admin, user, ...props }) {
  const { isMobile } = useSidebar();
  return (
    <Sidebar variant="inset" {...props}>
      {isMobile &&
      <>
      <SheetTitle className="sr-only">Menu</SheetTitle>
      <VisuallyHidden>
        <SheetDescription>Menu Description</SheetDescription>
      </VisuallyHidden>
      </>
      }
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <ReceiptText className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Fajr Capital</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {admin ? (<NavMain items={data.adminMain} />) : (
          <>
            <NavMain items={data.navMain} />
            <NavSecondary items={data.navSecondary} className="mt-auto" />
          </>
        )}
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
