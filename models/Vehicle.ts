import {
  Schema,
  model,
  models,
} from "mongoose";

const serviceItemSchema =
  new Schema(
    {
      serviceName: {
        type: String,
        required: true,
        trim: true,
      },

      replacementRequired: {
        type: String,
        enum: ["yes", "no"],
        default: "no",
      },

      notes: {
        type: String,
        default: "",
      },
    },
    {
      _id: true,
    }
  );

const pmsSchema =
  new Schema(
    {
      interval: {
        type: Number,
        required: true,
      },

      serviceItems: {
        type: [serviceItemSchema],
        default: [],
      },
    },
    {
      _id: false,
    }
  );

const vehicleSchema =
  new Schema(
    {
      vehicleImage: {
        type: String,
        default: "",
      },

      brand: {
        type: String,
        required: true,
        trim: true,
      },

      model: {
        type: String,
        required: true,
        trim: true,
      },

      variant: {
        type: String,
        default: "",
        trim: true,
      },

      productionYear: {
        type: Number,
      },

      engineCode: {
        type: String,
        default: "",
        trim: true,
      },

      engineCapacity: {
        type: String,
        default: "",
      },

      fuelType: {
        type: String,
        default: "",
      },

      transmission: {
        type: String,
        default: "",
      },

      driveType: {
        type: String,
        default: "",
      },

      vehicleSegment: {
        type: String,
        default: "",
      },

      country: {
        type: String,
        default: "India",
      },

      status: {
        type: String,
        enum: [
          "active",
          "inactive",
        ],
        default: "active",
      },

      technicalSpecifications: {
        engineOilCapacity: {
          type: String,
          default: "",
        },

        engineOilGrade: {
          type: String,
          default: "",
        },

        gearOilCapacity: {
          type: String,
          default: "",
        },

        gearOilGrade: {
          type: String,
          default: "",
        },

        coolantCapacity: {
          type: String,
          default: "",
        },

        brakeFluidType: {
          type: String,
          default: "",
        },

        powerSteeringOil: {
          type: String,
          default: "",
        },

        batterySpecification: {
          type: String,
          default: "",
        },

        tyrePressureFront: {
          type: String,
          default: "",
        },

        tyrePressureRear: {
          type: String,
          default: "",
        },

        sparkPlugGap: {
          type: String,
          default: "",
        },
      },

      filtersAndParts: {
        oilFilter: {
          type: String,
          default: "",
        },

        airFilter: {
          type: String,
          default: "",
        },

        cabinFilter: {
          type: String,
          default: "",
        },

        fuelFilter: {
          type: String,
          default: "",
        },

        driveBeltNumber: {
          type: String,
          default: "",
        },

        timingBeltNumber: {
          type: String,
          default: "",
        },

        timingChain: {
          type: String,
          enum: ["yes", "no"],
          default: "no",
        },

        waterPumpPartNumber: {
          type: String,
          default: "",
        },

        drainPlugPartNumber: {
          type: String,
          default: "",
        },

        drainWasherPartNumber: {
          type: String,
          default: "",
        },
      },

      pmsSchedule: {
        type: [pmsSchema],
        default: [],
      },

      additionalNotes: {
        specialNotes: {
          type: String,
          default: "",
        },

        commonProblems: {
          type: String,
          default: "",
        },

        workshopInstructions: {
          type: String,
          default: "",
        },
      },
    },
    {
      timestamps: true,
    }
  );

vehicleSchema.index({
  brand: 1,
  model: 1,
  variant: 1,
});

vehicleSchema.index({
  engineCode: 1,
});

vehicleSchema.index({
  fuelType: 1,
});

vehicleSchema.index({
  status: 1,
});

export const Vehicle =
  models.Vehicle ||
  model("Vehicle", vehicleSchema);