export type ServiceStatus = { name: string; status: string };

export const getSystemServices = (): ServiceStatus[] => {
  return [
    { name: "Service A", status: "Running" },
    { name: "Service B", status: "Stopped" },
    { name: "Service C", status: "Running" },
  ];
};
