import type { Vehicle } from "@/types/vehicle";

export async function getVehicles(
  params: Record<string, string> = {}
) {
  const query = new URLSearchParams(
    params
  );

  const response = await fetch(
    `/api/vehicles?${query.toString()}`,
    {
      cache: "no-store",
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      json.message ||
        "Failed to load vehicles"
    );
  }

  return json;
}

export async function getVehicle(
  id: string
) {
  const response = await fetch(
    `/api/vehicles/${id}`,
    {
      cache: "no-store",
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      json.message ||
        "Failed to load vehicle"
    );
  }

  return json.data as Vehicle;
}

export async function createVehicle(
  data: Vehicle
) {
  const response = await fetch(
    "/api/vehicles",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(data),
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      json.message ||
        "Failed to create vehicle"
    );
  }

  return json.data;
}

export async function updateVehicle(
  id: string,
  data: Vehicle
) {
  const response = await fetch(
    `/api/vehicles/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(data),
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      json.message ||
        "Failed to update vehicle"
    );
  }

  return json.data;
}

export async function deleteVehicle(
  id: string
) {
  const response = await fetch(
    `/api/vehicles/${id}`,
    {
      method: "DELETE",
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      json.message ||
        "Failed to delete vehicle"
    );
  }

  return json;
}