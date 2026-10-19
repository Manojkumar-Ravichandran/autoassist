import Link from "next/link";

import {
  Eye,
  Pencil,
  Trash2,
  CarFront,
} from "lucide-react";

import type {
  Vehicle,
} from "@/types/vehicle";

import StatusBadge from "@/components/common/StatusBadge";

interface Props {
  vehicles: Vehicle[];

  loading: boolean;

  onEdit: (
    vehicle: Vehicle
  ) => void;

  onDelete: (
    vehicle: Vehicle
  ) => void;
}

export default function VehicleTable({
  vehicles,
  loading,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1050px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
            <th className="px-5 py-3">
              Vehicle
            </th>

            <th className="px-4 py-3">
              Engine
            </th>

            <th className="px-4 py-3">
              Fuel
            </th>

            <th className="px-4 py-3">
              Transmission
            </th>

            <th className="px-4 py-3">
              Year
            </th>

            <th className="px-4 py-3">
              Status
            </th>

            <th className="px-4 py-3">
              Updated
            </th>

            <th className="px-5 py-3 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={8}
                className="px-5 py-16 text-center text-slate-400"
              >
                Loading vehicles...
              </td>
            </tr>
          ) : vehicles.length ===
            0 ? (
            <tr>
              <td
                colSpan={8}
                className="px-5 py-16 text-center text-slate-400"
              >
                No vehicles found.
              </td>
            </tr>
          ) : (
            vehicles.map(
              (vehicle) => (
                <tr
                  key={
                    vehicle._id
                  }
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-slate-100">
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
                            size={20}
                            className="text-slate-400"
                          />
                        )}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
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
                    </div>
                  </td>

                  <td className="px-4 py-4 text-slate-600">
                    {vehicle.engineCode ||
                      "-"}
                  </td>

                  <td className="px-4 py-4 text-slate-600">
                    {vehicle.fuelType ||
                      "-"}
                  </td>

                  <td className="px-4 py-4 text-slate-600">
                    {vehicle.transmission ||
                      "-"}
                  </td>

                  <td className="px-4 py-4 text-slate-600">
                    {vehicle.productionYear ||
                      "-"}
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge
                      status={
                        vehicle.status
                      }
                    />
                  </td>

                  <td className="px-4 py-4 text-slate-500">
                    {vehicle.updatedAt
                      ? new Date(
                          vehicle.updatedAt
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/vehicles/${vehicle._id}`}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                      >
                        <Eye size={17} />
                      </Link>

                      <button
                        onClick={() =>
                          onEdit(
                            vehicle
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Pencil
                          size={17}
                        />
                      </button>

                      <button
                        onClick={() =>
                          onDelete(
                            vehicle
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2
                          size={17}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
}