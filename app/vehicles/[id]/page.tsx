"use client";

import {
  use,
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
  CarFront,
} from "lucide-react";

import AppLayout from "@/components/layout/AppLayout";

import StatusBadge from "@/components/common/StatusBadge";

import type {
  Vehicle,
} from "@/types/vehicle";

import {
  getVehicle,
} from "@/services/vehicle.service";

function Info({
  label,
  value,
}: {
  label: string;

  value?: string | number;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value ||
          "-"}
      </p>
    </div>
  );
}

export default function VehicleViewPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } =
    use(params);

  const [
    vehicle,
    setVehicle,
  ] = useState<Vehicle | null>(
    null
  );

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    getVehicle(id)
      .then(setVehicle)
      .catch((error) =>
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load"
        )
      );
  }, [id]);

  if (error) {
    return (
      <AppLayout>
        <div className="rounded-2xl bg-red-50 p-6 text-red-600">
          {error}
        </div>
      </AppLayout>
    );
  }

  if (!vehicle) {
    return (
      <AppLayout>
        <div className="p-10 text-center text-slate-400">
          Loading vehicle...
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-6">
        <Link
          href="/vehicles"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft size={16} />

          Back to Vehicle
          Master
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* HERO */}

        <section className="grid gap-6 border-b border-slate-100 p-5 md:grid-cols-[240px_1fr] md:p-7">
          <div className="grid h-52 place-items-center overflow-hidden rounded-2xl bg-slate-100">
            {vehicle.vehicleImage ? (
              <img
                src={
                  vehicle.vehicleImage
                }
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <CarFront
                size={60}
                className="text-slate-300"
              />
            )}
          </div>

          <div className="flex flex-col justify-center">
            <StatusBadge
              status={
                vehicle.status
              }
            />

            <h1 className="mt-3 text-3xl font-bold text-slate-900">
              {vehicle.brand}{" "}
              {vehicle.model}
            </h1>

            <p className="mt-1 text-slate-500">
              {vehicle.variant ||
                "Standard variant"}{" "}
              ·{" "}
              {vehicle.productionYear ||
                "-"}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              <Info
                label="Engine"
                value={
                  vehicle.engineCode
                }
              />

              <Info
                label="Fuel"
                value={
                  vehicle.fuelType
                }
              />

              <Info
                label="Transmission"
                value={
                  vehicle.transmission
                }
              />

              <Info
                label="Drive"
                value={
                  vehicle.driveType
                }
              />
            </div>
          </div>
        </section>

        {/* TECHNICAL */}

        <section className="border-b border-slate-100 p-5 md:p-7">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            Technical
            Specifications
          </h2>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {Object.entries(
              vehicle.technicalSpecifications ||
                {}
            ).map(
              ([
                key,
                value,
              ]) => (
                <Info
                  key={key}
                  label={key.replace(
                    /([A-Z])/g,
                    " $1"
                  )}
                  value={
                    String(value)
                  }
                />
              )
            )}
          </div>
        </section>

        {/* PARTS */}

        <section className="border-b border-slate-100 p-5 md:p-7">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            Filters & Parts
          </h2>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {Object.entries(
              vehicle.filtersAndParts ||
                {}
            ).map(
              ([
                key,
                value,
              ]) => (
                <Info
                  key={key}
                  label={key.replace(
                    /([A-Z])/g,
                    " $1"
                  )}
                  value={
                    String(value)
                  }
                />
              )
            )}
          </div>
        </section>

        {/* PMS */}

        <section className="border-b border-slate-100 p-5 md:p-7">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            PMS Schedule
          </h2>

          <div className="space-y-4">
            {vehicle.pmsSchedule.map(
              (pms) => (
                <div
                  key={
                    pms.interval
                  }
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <h3 className="font-bold text-slate-800">
                    PMS
                    {
                      pms.interval
                    }
                  </h3>

                  {pms
                    .serviceItems
                    .length ===
                  0 ? (
                    <p className="mt-3 text-sm text-slate-400">
                      No service
                      items
                      configured.
                    </p>
                  ) : (
                    <div className="mt-3 grid gap-2 md:grid-cols-2">
                      {pms.serviceItems.map(
                        (
                          item
                        ) => (
                          <div
                            key={
                              item._id ||
                              item.serviceName
                            }
                            className="rounded-lg bg-slate-50 px-3 py-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-slate-700">
                                {
                                  item.serviceName
                                }
                              </span>

                              <span className="text-xs text-slate-400">
                                {item.replacementRequired ===
                                "yes"
                                  ? "Replacement"
                                  : "Inspection"}
                              </span>
                            </div>

                            {item.notes && (
                              <p className="mt-1 text-xs text-slate-400">
                                {
                                  item.notes
                                }
                              </p>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </section>

        {/* NOTES */}

        <section className="p-5 md:p-7">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            Additional Notes
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <Info
              label="Special Notes"
              value={
                vehicle
                  .additionalNotes
                  .specialNotes
              }
            />

            <Info
              label="Common Problems"
              value={
                vehicle
                  .additionalNotes
                  .commonProblems
              }
            />

            <Info
              label="Workshop Instructions"
              value={
                vehicle
                  .additionalNotes
                  .workshopInstructions
              }
            />
          </div>
        </section>
      </div>
    </AppLayout>
  );
}