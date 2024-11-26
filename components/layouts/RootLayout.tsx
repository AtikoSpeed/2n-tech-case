import { Calendar, Home, Inbox, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import Link from "next/link";
import RootContextProvider from "@/contexts/RootContext/provider";

const items = [
  {
    title: "Anasayfa",
    url: "/",
    icon: Home,
  },
  {
    title: "Gelirler",
    url: "/gelirler",
    icon: Inbox,
  },
  {
    title: "Giderler",
    url: "/giderler",
    icon: Calendar,
  },
  {
    title: "Gelir Kategorileri",
    url: "/gelirkategorileri",
    icon: Settings,
  },
  {
    title: "Gider Kategorileri & Bütçe",
    url: "/giderkategorilervebutce",
    icon: Settings,
  },
];

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <RootContextProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Atakan Muhasebe</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="px-4 w-full">{children}</main>
      </SidebarProvider>
    </RootContextProvider>
  );
};

export default RootLayout;
