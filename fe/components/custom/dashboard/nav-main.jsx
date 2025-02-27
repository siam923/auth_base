"use client"

import { ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"

export function NavMain({ items }) {
  const pathname = usePathname()

  const isActiveExact = (url) => pathname === url
  const isActivePartial = (url) => {
    if (url === "/dashboard") {
      return pathname === url
    }
    return pathname === url || pathname.startsWith(`${url}/`)
  }

  return (
    <>
      {items.map((groupItem) => (
        <SidebarGroup key={groupItem.title}>
          <SidebarGroupLabel>{groupItem.title}</SidebarGroupLabel>
          <SidebarMenu>
            {groupItem.items.map((item) => {
              const isItemActive = isActivePartial(item.url)

              return (
                <Collapsible key={item.title} asChild defaultOpen={isItemActive}>
                  <SidebarMenuItem className="relative">
                    <div className="flex items-center justify-between">
                      {/* Main link */}
                      <SidebarMenuButton asChild tooltip={item.title} isActive={isActiveExact(item.url)}>
                        <Link href={item.url} className="flex items-center">
                          {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>

                      {/* Collapsible trigger for submenu */}
                      {item.items && item.items.length > 0 && (
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="ml-2 transition-transform duration-200 data-[state=open]:rotate-90">
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Toggle {item.title} submenu</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                      )}
                    </div>

                    {/* Submenu rendered as overlay on larger screens */}
                    {item.items && item.items.length > 0 && (
                      <CollapsibleContent
                        className={`
                          sm:static absolute left-0 top-full mt-1 w-full 
                          sm:bg-transparent shadow-md sm:shadow-none rounded-md
                          z-10
                        `}
                      >
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild isActive={isActiveExact(subItem.url)}>
                                <Link
                                  href={subItem.url}
                                  className="flex items-center px-4 py-1.5  transition-colors"
                                >
                                  
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}
