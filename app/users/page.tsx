import AppLayout from "@/components/layout/AppLayout";

export default function UsersPage() {
  return (
    <AppLayout>
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Users
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          User management will be
          implemented here.
        </p>
      </div>
    </AppLayout>
  );
}