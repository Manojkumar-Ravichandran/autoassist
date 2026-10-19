import AppLayout from "@/components/layout/AppLayout";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Settings
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage AutoAssist database and
            mobile synchronization settings.
          </p>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-bold text-slate-900">
              Database
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Setting
                label="Current Database Version"
                value="1.0.0"
              />

              <Setting
                label="Current Mobile Version"
                value="1.0.0"
              />

              <Setting
                label="Last Sync"
                value="Not synced"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-bold text-slate-900">
              Mobile App
            </h2>

            <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div>
                <p className="font-semibold text-slate-800">
                  Force Update
                </p>

                <p className="text-sm text-slate-500">
                  Require mobile users to
                  update their application.
                </p>
              </div>

              <div className="h-6 w-11 rounded-full bg-slate-300 p-1">
                <div className="h-4 w-4 rounded-full bg-white shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function Setting({
  label,
  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}