"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Controller,
  useFieldArray,
  useForm,
} from "react-hook-form";

import {
  X,
  Plus,
  Trash2,
  Save,
} from "lucide-react";

import type {
  Vehicle,
} from "@/types/vehicle";

import {
  emptyVehicle,
} from "@/types/vehicle";

import {
  createVehicle,
  updateVehicle,
} from "@/services/vehicle.service";

const tabs = [
  "Basic Information",
  "Technical Specifications",
  "Filters & Parts",
  "PMS Schedule",
  "Additional Notes",
];

interface Props {
  open: boolean;

  vehicle: Vehicle | null;

  onClose: () => void;

  onSaved: () => void;
}

function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
    />
  );
}

function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement>
) {
  return (
    <select
      {...props}
      className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
    />
  );
}

function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
    />
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;

  required?: boolean;

  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </span>

      {children}
    </label>
  );
}

export default function VehicleModal({
  open,
  vehicle,
  onClose,
  onSaved,
}: Props) {
  const [activeTab, setActiveTab] =
    useState(0);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const {
    control,
    register,
    handleSubmit,
    reset,
  } = useForm<Vehicle>({
    defaultValues:
      emptyVehicle,
  });

  const pmsFieldArray =
    useFieldArray({
      control,
      name: "pmsSchedule",
    });

  useEffect(() => {
    if (!open) {
      return;
    }

    if (vehicle) {
      reset({
        ...emptyVehicle,

        ...vehicle,

        technicalSpecifications:
          {
            ...emptyVehicle.technicalSpecifications,
            ...vehicle.technicalSpecifications,
          },

        filtersAndParts: {
          ...emptyVehicle.filtersAndParts,
          ...vehicle.filtersAndParts,
        },

        additionalNotes: {
          ...emptyVehicle.additionalNotes,
          ...vehicle.additionalNotes,
        },

        pmsSchedule:
          vehicle.pmsSchedule?.length
            ? vehicle.pmsSchedule
            : emptyVehicle.pmsSchedule,
      });
    } else {
      reset(emptyVehicle);
    }

    setActiveTab(0);

    setError("");
  }, [
    open,
    vehicle,
    reset,
  ]);

  async function submit(
    data: Vehicle
  ) {
    try {
      setSaving(true);

      setError("");

      if (vehicle?._id) {
        await updateVehicle(
          vehicle._id,
          data
        );
      } else {
        await createVehicle(data);
      }

      onSaved();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to save vehicle"
      );
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm md:p-6">
      <div className="flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {vehicle
                ? "Edit Vehicle"
                : "Add Vehicle"}
            </h2>

            <p className="text-xs text-slate-400">
              Maintain workshop master
              data
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}

        <div className="overflow-x-auto border-b border-slate-200">
          <div className="flex min-w-max px-4">
            {tabs.map(
              (tab, index) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() =>
                    setActiveTab(
                      index
                    )
                  }
                  className={`border-b-2 px-4 py-3 text-xs font-semibold ${
                    activeTab ===
                    index
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500"
                  }`}
                >
                  {index + 1}.{" "}
                  {tab}
                </button>
              )
            )}
          </div>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(
            submit
          )}
          className="min-h-0 flex-1 overflow-y-auto p-5 md:p-6"
        >
          {/* BASIC */}

          {activeTab === 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Field
                label="Brand"
                required
              >
                <Input
                  {...register(
                    "brand",
                    {
                      required: true,
                    }
                  )}
                  placeholder="Hyundai"
                />
              </Field>

              <Field
                label="Model"
                required
              >
                <Input
                  {...register(
                    "model",
                    {
                      required: true,
                    }
                  )}
                  placeholder="Creta"
                />
              </Field>

              <Field label="Variant">
                <Input
                  {...register(
                    "variant"
                  )}
                  placeholder="SX(O)"
                />
              </Field>

              <Field label="Production Year">
                <Input
                  type="number"
                  {...register(
                    "productionYear",
                    {
                      valueAsNumber:
                        true,
                    }
                  )}
                />
              </Field>

              <Field label="Engine Code">
                <Input
                  {...register(
                    "engineCode"
                  )}
                  placeholder="G4NA"
                />
              </Field>

              <Field label="Engine Capacity">
                <Input
                  {...register(
                    "engineCapacity"
                  )}
                  placeholder="1497 cc"
                />
              </Field>

              <Field label="Fuel Type">
                <Select
                  {...register(
                    "fuelType"
                  )}
                >
                  <option value="">
                    Select fuel
                  </option>

                  <option value="Petrol">
                    Petrol
                  </option>

                  <option value="Diesel">
                    Diesel
                  </option>

                  <option value="CNG">
                    CNG
                  </option>

                  <option value="Electric">
                    Electric
                  </option>

                  <option value="Hybrid">
                    Hybrid
                  </option>
                </Select>
              </Field>

              <Field label="Transmission">
                <Select
                  {...register(
                    "transmission"
                  )}
                >
                  <option value="">
                    Select transmission
                  </option>

                  <option value="Manual">
                    Manual
                  </option>

                  <option value="Automatic">
                    Automatic
                  </option>

                  <option value="AMT">
                    AMT
                  </option>

                  <option value="CVT">
                    CVT
                  </option>

                  <option value="DCT">
                    DCT
                  </option>
                </Select>
              </Field>

              <Field label="Drive Type">
                <Select
                  {...register(
                    "driveType"
                  )}
                >
                  <option value="">
                    Select drive
                  </option>

                  <option value="FWD">
                    FWD
                  </option>

                  <option value="RWD">
                    RWD
                  </option>

                  <option value="AWD">
                    AWD
                  </option>

                  <option value="4WD">
                    4WD
                  </option>
                </Select>
              </Field>

              <Field label="Vehicle Segment">
                <Select
                  {...register(
                    "vehicleSegment"
                  )}
                >
                  <option value="">
                    Select segment
                  </option>

                  <option value="Hatchback">
                    Hatchback
                  </option>

                  <option value="Sedan">
                    Sedan
                  </option>

                  <option value="SUV">
                    SUV
                  </option>

                  <option value="MUV">
                    MUV
                  </option>

                  <option value="Pickup">
                    Pickup
                  </option>
                </Select>
              </Field>

              <Field label="Country">
                <Input
                  {...register(
                    "country"
                  )}
                />
              </Field>

              <Field label="Status">
                <Select
                  {...register(
                    "status"
                  )}
                >
                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>
                </Select>
              </Field>

              <div className="md:col-span-2 lg:col-span-3">
                <Field label="Vehicle Image URL">
                  <Input
                    {...register(
                      "vehicleImage"
                    )}
                    placeholder="https://example.com/car.jpg"
                  />
                </Field>
              </div>
            </div>
          )}

          {/* TECHNICAL */}

          {activeTab === 1 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Field label="Engine Oil Capacity">
                <Input
                  {...register(
                    "technicalSpecifications.engineOilCapacity"
                  )}
                  placeholder="4.0 L"
                />
              </Field>

              <Field label="Engine Oil Grade">
                <Input
                  {...register(
                    "technicalSpecifications.engineOilGrade"
                  )}
                  placeholder="5W30"
                />
              </Field>

              <Field label="Gear Oil Capacity">
                <Input
                  {...register(
                    "technicalSpecifications.gearOilCapacity"
                  )}
                />
              </Field>

              <Field label="Gear Oil Grade">
                <Input
                  {...register(
                    "technicalSpecifications.gearOilGrade"
                  )}
                />
              </Field>

              <Field label="Coolant Capacity">
                <Input
                  {...register(
                    "technicalSpecifications.coolantCapacity"
                  )}
                />
              </Field>

              <Field label="Brake Fluid Type">
                <Input
                  {...register(
                    "technicalSpecifications.brakeFluidType"
                  )}
                  placeholder="DOT 4"
                />
              </Field>

              <Field label="Power Steering Oil">
                <Input
                  {...register(
                    "technicalSpecifications.powerSteeringOil"
                  )}
                />
              </Field>

              <Field label="Battery Specification">
                <Input
                  {...register(
                    "technicalSpecifications.batterySpecification"
                  )}
                  placeholder="12V 60Ah"
                />
              </Field>

              <Field label="Tyre Pressure Front">
                <Input
                  {...register(
                    "technicalSpecifications.tyrePressureFront"
                  )}
                  placeholder="33 PSI"
                />
              </Field>

              <Field label="Tyre Pressure Rear">
                <Input
                  {...register(
                    "technicalSpecifications.tyrePressureRear"
                  )}
                  placeholder="33 PSI"
                />
              </Field>

              <Field label="Spark Plug Gap">
                <Input
                  {...register(
                    "technicalSpecifications.sparkPlugGap"
                  )}
                />
              </Field>
            </div>
          )}

          {/* PARTS */}

          {activeTab === 2 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Field label="Oil Filter">
                <Input
                  {...register(
                    "filtersAndParts.oilFilter"
                  )}
                />
              </Field>

              <Field label="Air Filter">
                <Input
                  {...register(
                    "filtersAndParts.airFilter"
                  )}
                />
              </Field>

              <Field label="Cabin Filter">
                <Input
                  {...register(
                    "filtersAndParts.cabinFilter"
                  )}
                />
              </Field>

              <Field label="Fuel Filter">
                <Input
                  {...register(
                    "filtersAndParts.fuelFilter"
                  )}
                />
              </Field>

              <Field label="Drive Belt Number">
                <Input
                  {...register(
                    "filtersAndParts.driveBeltNumber"
                  )}
                />
              </Field>

              <Field label="Timing Belt Number">
                <Input
                  {...register(
                    "filtersAndParts.timingBeltNumber"
                  )}
                />
              </Field>

              <Field label="Timing Chain">
                <Select
                  {...register(
                    "filtersAndParts.timingChain"
                  )}
                >
                  <option value="yes">
                    Yes
                  </option>

                  <option value="no">
                    No
                  </option>
                </Select>
              </Field>

              <Field label="Water Pump Part Number">
                <Input
                  {...register(
                    "filtersAndParts.waterPumpPartNumber"
                  )}
                />
              </Field>

              <Field label="Drain Plug Part Number">
                <Input
                  {...register(
                    "filtersAndParts.drainPlugPartNumber"
                  )}
                />
              </Field>

              <Field label="Drain Washer Part Number">
                <Input
                  {...register(
                    "filtersAndParts.drainWasherPartNumber"
                  )}
                />
              </Field>
            </div>
          )}

          {/* PMS */}

          {activeTab === 3 && (
            <div className="space-y-5">
              {pmsFieldArray.fields.map(
                (
                  pms,
                  index
                ) => (
                  <PMSBlock
                    key={pms.id}
                    index={index}
                    control={
                      control
                    }
                    register={
                      register
                    }
                    interval={
                      pms.interval
                    }
                    onRemove={() =>
                      pmsFieldArray.remove(
                        index
                      )
                    }
                  />
                )
              )}
            </div>
          )}

          {/* NOTES */}

          {activeTab === 4 && (
            <div className="space-y-5">
              <Field label="Special Notes">
                <Textarea
                  rows={5}
                  {...register(
                    "additionalNotes.specialNotes"
                  )}
                  placeholder="Special notes..."
                />
              </Field>

              <Field label="Common Problems">
                <Textarea
                  rows={5}
                  {...register(
                    "additionalNotes.commonProblems"
                  )}
                  placeholder="Known/common problems..."
                />
              </Field>

              <Field label="Workshop Instructions">
                <Textarea
                  rows={5}
                  {...register(
                    "additionalNotes.workshopInstructions"
                  )}
                  placeholder="Instructions for workshop technicians..."
                />
              </Field>
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Footer */}

          <div className="mt-6 flex flex-col-reverse justify-between gap-3 border-t border-slate-100 pt-5 sm:flex-row">
            <div className="flex gap-2">
              {activeTab >
                0 && (
                <button
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      activeTab - 1
                    )
                  }
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600"
                >
                  Previous
                </button>
              )}

              {activeTab <
                tabs.length -
                  1 && (
                <button
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      activeTab + 1
                    )
                  }
                  className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Next
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              >
                <Save size={17} />

                {saving
                  ? "Saving..."
                  : vehicle
                  ? "Update Vehicle"
                  : "Create Vehicle"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function PMSBlock({
  index,
  control,
  register,
  interval,
  onRemove,
}: {
  index: number;

  control: any;

  register: any;

  interval: number;

  onRemove: () => void;
}) {
  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,

    name: `pmsSchedule.${index}.serviceItems` as `pmsSchedule.${number}.serviceItems`,
  });

  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-800">
            PMS{interval}
          </h3>

          <p className="text-xs text-slate-400">
            Service interval
          </p>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="text-xs font-semibold text-red-500"
        >
          Remove
        </button>
      </div>

      <div className="space-y-3">
        {fields.map(
          (
            item,
            serviceIndex
          ) => (
            <div
              key={item.id}
              className="grid grid-cols-1 gap-3 rounded-xl bg-slate-50 p-3 md:grid-cols-[1.2fr_190px_1fr_40px]"
            >
              <Input
                {...register(
                  `pmsSchedule.${index}.serviceItems.${serviceIndex}.serviceName`
                )}
                placeholder="Service name"
              />

              <Select
                {...register(
                  `pmsSchedule.${index}.serviceItems.${serviceIndex}.replacementRequired`
                )}
              >
                <option value="yes">
                  Replacement Required
                </option>

                <option value="no">
                  Inspection / No
                </option>
              </Select>

              <Input
                {...register(
                  `pmsSchedule.${index}.serviceItems.${serviceIndex}.notes`
                )}
                placeholder="Notes"
              />

              <button
                type="button"
                onClick={() =>
                  remove(
                    serviceIndex
                  )
                }
                className="grid h-10 place-items-center rounded-lg text-red-500 hover:bg-red-50"
              >
                <Trash2 size={17} />
              </button>
            </div>
          )
        )}

        <button
          type="button"
          onClick={() =>
            append({
              serviceName: "",
              replacementRequired:
                "no",
              notes: "",
            })
          }
          className="flex items-center gap-2 text-sm font-semibold text-blue-600"
        >
          <Plus size={16} />

          Add Service Item
        </button>
      </div>
    </div>
  );
}