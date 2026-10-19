"use client";

import {
  Bell,
  Menu,
  UserCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  onMenu: () => void;
}

export default function Header({
  onMenu,
}: Props) {
  const router = useRouter();
  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
  }
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-8">
      <button
        onClick={onMenu}
        className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
      >
        <Menu size={22} />
      </button>

      <div className="hidden lg:block">
        <p className="text-sm font-medium text-slate-500">
          AutoAssist Workshop
        </p>

        <p className="text-xs text-slate-400">
          Master Data Management
        </p>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <Bell size={19} className="text-slate-400" />

        <div className="hidden items-center gap-2 sm:flex">
          <UserCircle
            size={34}
            className="text-slate-400"
          />

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Administrator
            </p>

            <p className="text-xs text-slate-400">
              Admin
            </p>
          </div>
        </div>
        <button onClick={signOut} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">Sign out</button>
      </div>
    </header>
  );
}
