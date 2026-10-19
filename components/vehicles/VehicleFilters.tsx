import {
  Search,
  RotateCcw,
} from "lucide-react";

interface Props {
  search: string;

  setSearch: (
    value: string
  ) => void;

  brand: string;

  setBrand: (
    value: string
  ) => void;

  fuelType: string;

  setFuelType: (
    value: string
  ) => void;

  transmission: string;

  setTransmission: (
    value: string
  ) => void;

  status: string;

  setStatus: (
    value: string
  ) => void;

  onReset: () => void;
}

export default function VehicleFilters({
  search,
  setSearch,
  brand,
  setBrand,
  fuelType,
  setFuelType,
  transmission,
  setTransmission,
  status,
  setStatus,
  onReset,
}: Props) {
  return (
    <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6">
      <div className="relative xl:col-span-2">
        <Search
          size={17}
          className="absolute left-3 top-3.5 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search brand, model, variant, engine..."
          className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />
      </div>

      <input
        value={brand}
        onChange={(e) =>
          setBrand(e.target.value)
        }
        placeholder="Brand"
        className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      />

      <select
        value={fuelType}
        onChange={(e) =>
          setFuelType(
            e.target.value
          )
        }
        className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      >
        <option value="">
          All Fuel
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
      </select>

      <select
        value={transmission}
        onChange={(e) =>
          setTransmission(
            e.target.value
          )
        }
        className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      >
        <option value="">
          All Transmission
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
      </select>

      <div className="flex gap-2">
        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
          className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        >
          <option value="">
            All Status
          </option>

          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>
        </select>

        <button
          onClick={onReset}
          title="Reset filters"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
        >
          <RotateCcw size={17} />
        </button>
      </div>
    </div>
  );
}