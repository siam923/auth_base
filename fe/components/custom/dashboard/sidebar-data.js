import { Receipt } from "lucide-react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  ListIcon,
  Send,
  Settings2,
  SquareTerminal,
  NetworkIcon,
  GalleryVerticalIcon,
  File,
  FileLock,
  FileInput,
  SpellCheck,
  Users,
  FileText,
  Coins,
  Building2,
  UserCircle,
  Wallet,
  BookA,
  BookUp2,
} from "lucide-react";
export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  adminMain: [
    {
      title: "Dashboard",
      url: "/private21",
      icon: SquareTerminal,
      isActive: true,
      items: [],
    },
    {
      title: "Categories",
      url: "/private21/categories",
      icon: ListIcon,
    },
    {
      title: "Schemas",
      url: "/private21/schemas",
      icon: SpellCheck,
    },
  ],
  navMain: [
    {
      title: "Platform",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: SquareTerminal,
          isActive: true,
          items: [],
        },
       
      ],
    },
  ],
  navSecondary: [
    {
      title: "My Profile",
      url: "/dashboard/user",
      icon: GalleryVerticalIcon,
    },
   
  ],
};
