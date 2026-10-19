export type VehicleStatus =
  | "active"
  | "inactive";

export type YesNo = "yes" | "no";

export interface ServiceItem {
  _id?: string;

  serviceName: string;

  replacementRequired: YesNo;

  notes: string;
}

export interface PMSSchedule {
  interval: number;

  serviceItems: ServiceItem[];
}

export interface Vehicle {
  _id?: string;

  vehicleImage: string;

  brand: string;

  model: string;

  variant: string;

  productionYear?: number;

  engineCode: string;

  engineCapacity: string;

  fuelType: string;

  transmission: string;

  driveType: string;

  vehicleSegment: string;

  country: string;

  status: VehicleStatus;

  technicalSpecifications: {
    engineOilCapacity: string;

    engineOilGrade: string;

    gearOilCapacity: string;

    gearOilGrade: string;

    coolantCapacity: string;

    brakeFluidType: string;

    powerSteeringOil: string;

    batterySpecification: string;

    tyrePressureFront: string;

    tyrePressureRear: string;

    sparkPlugGap: string;
  };

  filtersAndParts: {
    oilFilter: string;

    airFilter: string;

    cabinFilter: string;

    fuelFilter: string;

    driveBeltNumber: string;

    timingBeltNumber: string;

    timingChain: YesNo;

    waterPumpPartNumber: string;

    drainPlugPartNumber: string;

    drainWasherPartNumber: string;
  };

  pmsSchedule: PMSSchedule[];

  additionalNotes: {
    specialNotes: string;

    commonProblems: string;

    workshopInstructions: string;
  };

  createdAt?: string;

  updatedAt?: string;
}

export const createEmptyPMS = (
  interval: number
): PMSSchedule => ({
  interval,

  serviceItems: [],
});

export const emptyVehicle: Vehicle = {
  vehicleImage: "",

  brand: "",

  model: "",

  variant: "",

  productionYear:
    new Date().getFullYear(),

  engineCode: "",

  engineCapacity: "",

  fuelType: "",

  transmission: "",

  driveType: "",

  vehicleSegment: "",

  country: "India",

  status: "active",

  technicalSpecifications: {
    engineOilCapacity: "",
    engineOilGrade: "",
    gearOilCapacity: "",
    gearOilGrade: "",
    coolantCapacity: "",
    brakeFluidType: "",
    powerSteeringOil: "",
    batterySpecification: "",
    tyrePressureFront: "",
    tyrePressureRear: "",
    sparkPlugGap: "",
  },

  filtersAndParts: {
    oilFilter: "",
    airFilter: "",
    cabinFilter: "",
    fuelFilter: "",
    driveBeltNumber: "",
    timingBeltNumber: "",
    timingChain: "no",
    waterPumpPartNumber: "",
    drainPlugPartNumber: "",
    drainWasherPartNumber: "",
  },

  pmsSchedule: Array.from(
    { length: 10 },
    (_, index) =>
      createEmptyPMS((index + 1) * 10)
  ),

  additionalNotes: {
    specialNotes: "",
    commonProblems: "",
    workshopInstructions: "",
  },
};