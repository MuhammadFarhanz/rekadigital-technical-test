import {
  type LucideIcon,
  LayoutDashboard,
  Package,
  Users,
  Store,
  PenBox,
  FileText,
  Settings,
  Box,
  ShoppingCart,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  variant?: "default" | "ghost";
  badge?: number;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: 4,
  },
  {
    title: "Stock",
    href: "/stock",
    icon: Package,
  },
  {
    title: "Customer",
    href: "/customer",
    icon: Users,
    variant: "ghost",
  },
  {
    title: "Restaurant",
    href: "/restaurant",
    icon: Store,
  },
  {
    title: "Design",
    href: "/design",
    icon: PenBox,
  },
  {
    title: "Report",
    href: "/report",
    icon: FileText,
  },
  {
    title: "Role & Admin",
    href: "/admin",
    icon: Settings,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const integrationItems: NavItem[] = [
  {
    title: "Stock",
    href: "/integration/stock",
    icon: Box,
  },
  {
    title: "Supply",
    href: "/integration/supply",
    icon: ShoppingCart,
  },
];

export function Sidebar() {
  return (
    <div className="w-64 border-r bg-white flex flex-col">
      <div className="p-6">
        <img src="/logo.png" alt="Logo" className="h-8" />
      </div>
      <div className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 text-semibold rounded-lg px-3 py-3 text-gray-500 transition-colors hover:text-gray-900",
                item.variant === "ghost" ? "bg-gray-100 text-gray-900" : "",
                item.title === "Customer" ? "text-[#6366F1]" : ""
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
              {item.badge && (
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #EEA849 0%, #F46B45 100%)",
                  }}
                  className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs  text-white"
                >
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
        <div className="my-6">
          <h4 className="px-3 text-sm font-medium text-gray-400">
            Integration
          </h4>
          <div className="mt-3 space-y-1">
            {integrationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-500 transition-colors hover:text-gray-900"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <Avatar>
            <AvatarImage src="/profile.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <div className="font-medium">Savannah N</div>
            <div className="text-xs text-gray-500">Food Quality Manager</div>
          </div>
        </div>
        <button
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-red-600 transition-colors hover:bg-red-150 bg-red-50
"
        >
          <div className="flex flex-row items-center gap-3">
            <LogOut className="h-4 w-4" />
            <p> Logout</p>
          </div>
        </button>
      </div>
    </div>
  );
}
