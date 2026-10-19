"use client";

import Link from "next/link";

import {
  usePathname,
} from "next/navigation";

import {
  CarFront,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Users,
  RefreshCw,
  X,
} from "lucide-react";

const navigation = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    href: "/vehicles",
    label: "Vehicle Master",
    icon: CarFront,
  },

  {
    href: "/users",
    label: "Users",
    icon: Users,
  },

  {
    href: "/sync",
    label: "Sync Status",
    icon: RefreshCw,
  },

  {
    href: "/logs",
    label: "Update Logs",
    icon: ClipboardList,
  },

  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

interface Props {
  mobileOpen: boolean;

  onClose: () => void;
}

export default function Sidebar({
  mobileOpen,
  onClose,
}: Props) {
  const pathname =
    usePathname();

  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white">
              <CarFront size={21} />
            </div>

            <div>
              <p className="text-lg font-bold text-slate-900">
                AutoAssist
              </p>

              <p className="text-[11px] font-medium text-slate-400">
                Admin Console
              </p>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          <p className="px-3 pb-2 pt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Management
          </p>

          {navigation.map(
            (item) => {
              const Icon =
                item.icon;

              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(
                      item.href
                    );

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon size={19} />

                  {item.label}
                </Link>
              );
            }
          )}
        </nav>

        <div className="m-4 rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-700">
            Database
          </p>

          <div className="mt-2 flex items-center gap-2 text-xs text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            Connected
          </div>
        </div>
      </aside>
    </>
  );
}