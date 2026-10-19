"use client";

import {
  RefreshCw,
  UploadCloud,
  CheckCircle2,
} from "lucide-react";

import AppLayout from "@/components/layout/AppLayout";

export default function SyncPage() {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          Sync Status
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage published master data
          for the AutoAssist mobile app.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Current Database Version
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            v1.0.0
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Mobile Version
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            v1.0.0
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Sync Status
          </p>

          <div className="mt-3 flex items-center gap-2 text-emerald-600">
            <CheckCircle2
              size={20}
            />

            <span className="font-semibold">
              Up to date
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <UploadCloud
            className="text-blue-600"
            size={24}
          />

          <div>
            <h2 className="font-bold text-slate-900">
              Publish Updates
            </h2>

            <p className="text-sm text-slate-500">
              Publish the latest vehicle
              master data to the mobile
              application.
            </p>
          </div>
        </div>

        <button
          disabled
          className="mt-5 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white opacity-50"
        >
          <RefreshCw size={17} />

          Publish Updates
        </button>
      </div>
    </AppLayout>
  );
}