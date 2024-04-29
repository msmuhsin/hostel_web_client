"use client";

import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "../context/AuthContext";

import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Bed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { AllotmentProvider } from "../context/AllotmentContext.js";
import { useAuthContext } from "../context/AuthContext";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";


function SideBar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Hostel App</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/dashboard"
              className={
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary" +
                (pathname === "/dashboard"
                  ? " bg-muted text-primary"
                  : " text-muted-foreground")
              }
            >
              <Home className="h-4 w-4" />
             Home
            </Link>
            <Link
              href="/dashboard/allotment"
              className={
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary" +
                (pathname === "/dashboard/allotment"
                  ? " bg-muted text-primary"
                  : " text-muted-foreground")
              }
            >
              <Package className="h-4 w-4" />
              Allotment
            </Link>
            <Link
              href="/dashboard/room-allocation"
              className={
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary" +
                (pathname === "/dashboard/room-allocation"
                  ? " bg-muted text-primary"
                  : " text-muted-foreground")
              }
            >
              <Bed className="h-4 w-4" />
              Room Allocation{" "}
            </Link>
            <Link
              href="/dashboard/report-generation"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LineChart className="h-4 w-4" />
              Report Generation
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  const { logout } = useAuthContext();
  const { setTheme } = useTheme();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <ProtectedRoute>
        <AllotmentProvider>
          <SideBar />
          <div className="flex flex-col">
            <header className="flex justify-between h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                  <nav className="grid gap-2 text-lg font-medium">
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      <Package2 className="h-6 w-6" />
                      <span className="sr-only">Acme Inc</span>
                    </Link>
                    <Link
                      href="/dashboard"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      <Home className="h-5 w-5" />
                      Home
                    </Link>
                    <Link
                      href="/dashboard/allotment"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      <Package className="h-5 w-5" />
                      Allotment
                    </Link>
                    <Link
                      href="/dashboard/room-allocation"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      <Bed className="h-5 w-5" />
                      Room Allocation
                    </Link>
                    <Link
                      href="/dashboard/report-generation"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      <LineChart className="h-5 w-5" />
                      Report Generation
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
              <div className="ml-auto flex gap-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="ml-auto">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full"
                    >
                      <CircleUser className="h-5 w-5" />
                      <span className="sr-only">Toggle user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        logout();
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 w-full ">
              <Toaster />
              <div className="flex items-center w-full">{children}</div>
            </main>
          </div>
        </AllotmentProvider>
      </ProtectedRoute>
    </div>
  );
}
