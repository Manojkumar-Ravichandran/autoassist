import AppLayout from "@/components/layout/AppLayout";

export default function LogsPage() {
  return (
    <AppLayout>
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Update Logs
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Vehicle master-data changes and
          synchronization history will
          appear here.
        </p>
      </div>
    </AppLayout>
  );
}