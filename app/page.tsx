"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  CarFront,
  Layers3,
  Boxes,
  RefreshCw,
  ArrowRight,
  Plus,
} from "lucide-react";

import AppLayout from "@/components/layout/AppLayout";

import PageHeader from "@/components/common/PageHeader";

interface DashboardData {
  totalVehicles: number;

  totalBrands: number;

  totalModels: number;

  todayUpdates: number;

  recentAdded: any[];

  recentUpdated: any[];
}

const cards = [
  {
    key: "totalVehicles",
    label: "Total Vehicles",
    icon: CarFront,
  },

  {
    key: "totalBrands",
    label: "Total Brands",
    icon: Layers3,
  },

  {
    key: "totalModels",
    label: "Total Models",
    icon: Boxes,
  },

  {
    key: "todayUpdates",
    label: "Today's Updates",
    icon: RefreshCw,
  },
] as const;

export default function Dashboard() {
  const [
    data,
    setData,
  ] =
    useState<DashboardData | null>(
      null
    );

  useEffect(() => {
    fetch("/api/dashboard")
      .then((response) =>
        response.json()
      )
      .then((result) =>
        setData(result.data)
      )
      .catch(console.error);
  }, []);

  return (
    <AppLayout>
      <PageHeader
        title="Dashboard"
        description="Overview of AutoAssist master data."
        action={
          <Link
            href="/vehicles"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Plus size={18} />

            Add Vehicle
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(
          ({
            key,
            label,
            icon: Icon,
          }) => (
            <div
              key={key}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={21} />
                </div>

                <span className="text-xs font-medium text-emerald-600">
                  Live
                </span>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                {label}
              </p>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                {data
                  ? data[key]
                  : "—"}
              </p>
            </div>
          )
        )}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <RecentVehicles
          title="Recently Added Vehicles"
          vehicles={
            data?.recentAdded ||
            []
          }
        />

        <RecentVehicles
          title="Recently Updated Vehicles"
          vehicles={
            data?.recentUpdated ||
            []
          }
        />
      </div>
    </AppLayout>
  );
}

function RecentVehicles({
  title,
  vehicles,
}: {
  title: string;

  vehicles: any[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <h2 className="font-bold text-slate-900">
          {title}
        </h2>

        <Link
          href="/vehicles"
          className="text-xs font-semibold text-blue-600"
        >
          View all
        </Link>
      </div>

      <div className="divide-y divide-slate-100">
        {vehicles.length ===
        0 ? (
          <p className="p-8 text-center text-sm text-slate-400">
            No vehicles yet.
          </p>
        ) : (
          vehicles.map(
            (vehicle) => (
              <Link
                key={
                  vehicle._id
                }
                href={`/vehicles/${vehicle._id}`}
                className="flex items-center justify-between px-5 py-4 hover:bg-slate-50"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {
                      vehicle.brand
                    }{" "}
                    {
                      vehicle.model
                    }
                  </p>

                  <p className="text-xs text-slate-400">
                    {vehicle.variant ||
                      "No variant"}
                  </p>
                </div>

                <ArrowRight
                  size={16}
                  className="text-slate-300"
                />
              </Link>
            )
          )
        )}
      </div>
    </div>
  );
}