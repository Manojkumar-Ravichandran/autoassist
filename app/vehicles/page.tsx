"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Plus,
} from "lucide-react";

import AppLayout from "@/components/layout/AppLayout";

import PageHeader from "@/components/common/PageHeader";

import VehicleFilters from "@/components/vehicles/VehicleFilters";

import VehicleTable from "@/components/vehicles/VehicleTable";

import VehicleModal from "@/components/vehicles/VehicleModal";

import type {
  Vehicle,
} from "@/types/vehicle";

import {
  deleteVehicle,
  getVehicles,
} from "@/services/vehicle.service";

export default function VehiclesPage() {
  const [
    vehicles,
    setVehicles,
  ] = useState<Vehicle[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    modalOpen,
    setModalOpen,
  ] = useState(false);

  const [
    editingVehicle,
    setEditingVehicle,
  ] = useState<Vehicle | null>(
    null
  );

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    brand,
    setBrand,
  ] = useState("");

  const [
    fuelType,
    setFuelType,
  ] = useState("");

  const [
    transmission,
    setTransmission,
  ] = useState("");

  const [
    status,
    setStatus,
  ] = useState("");

  async function loadVehicles() {
    try {
      setLoading(true);

      const result =
        await getVehicles({
          search,
          brand,
          fuelType,
          transmission,
          status,
          limit: "100",
        });

      setVehicles(
        result.data
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVehicles();
  }, [
    search,
    brand,
    fuelType,
    transmission,
    status,
  ]);

  async function handleDelete(
    vehicle: Vehicle
  ) {
    if (!vehicle._id) {
      return;
    }

    const confirmed =
      window.confirm(
        `Delete ${vehicle.brand} ${vehicle.model}?`
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteVehicle(
        vehicle._id
      );

      await loadVehicles();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Delete failed"
      );
    }
  }

  function handleAdd() {
    setEditingVehicle(null);
    setModalOpen(true);
  }

  function handleEdit(
    vehicle: Vehicle
  ) {
    setEditingVehicle(vehicle);
    setModalOpen(true);
  }

  function handleClose() {
    setModalOpen(false);
    setEditingVehicle(null);
  }

  return (
    <AppLayout>
      <PageHeader
        title="Vehicle Master"
        description="Manage vehicle specifications, parts and PMS schedules."
        action={
          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            <Plus size={18} />

            Add Vehicle
          </button>
        }
      />

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4 md:p-5">
          <VehicleFilters
            search={search}
            setSearch={setSearch}
            brand={brand}
            setBrand={setBrand}
            fuelType={fuelType}
            setFuelType={setFuelType}
            transmission={
              transmission
            }
            setTransmission={
              setTransmission
            }
            status={status}
            setStatus={setStatus}
            onReset={() => {
              setSearch("");
              setBrand("");
              setFuelType("");
              setTransmission("");
              setStatus("");
            }}
          />
        </div>

        <VehicleTable
          vehicles={vehicles}
          loading={loading}
          onEdit={handleEdit}
          onDelete={
            handleDelete
          }
        />
      </div>

      <VehicleModal
        open={modalOpen}
        vehicle={
          editingVehicle
        }
        onClose={
          handleClose
        }
        onSaved={() => {
          handleClose();
          loadVehicles();
        }}
      />
    </AppLayout>
  );
}