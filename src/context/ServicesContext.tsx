import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  buildNavServicesMenu,
  createService as storeCreateService,
  deleteService as storeDeleteService,
  getAllServices,
  getModuleOptions,
  seedServices as storeSeedServices,
  updateService as storeUpdateService,
} from "@/lib/serviceStore";
import type { Service, ServiceInput } from "@/types/service";

type ServicesContextValue = {
  services: Service[];
  moduleOptions: { value: string; label: string }[];
  navServicesMenu: ReturnType<typeof buildNavServicesMenu>;
  getService: (moduleSlug: string, serviceSlug: string) => Service | undefined;
  createService: (input: ServiceInput) => Promise<Service>;
  updateService: (serviceId: string, input: ServiceInput) => Promise<Service | undefined>;
  deleteService: (serviceId: string) => Promise<void>;
  seedServices: (replace?: boolean) => Promise<void>;
  refreshServices: () => Promise<void>;
};

const ServicesContext = createContext<ServicesContextValue | null>(null);

export function ServicesProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);

  const refreshServices = async () => {
    const rows = await getAllServices();
    setServices(rows);
  };

  useEffect(() => {
    refreshServices();
  }, []);

  const navServicesMenu = useMemo(() => buildNavServicesMenu(services), [services]);
  const moduleOptions = useMemo(() => getModuleOptions(services), [services]);

  const value = useMemo<ServicesContextValue>(
    () => ({
      services,
      moduleOptions,
      navServicesMenu,
      getService: (moduleSlug, serviceSlug) =>
        services.find((service) => service.module === moduleSlug && service.slug === serviceSlug),
      createService: async (input) => {
        const created = await storeCreateService(input);
        await refreshServices();
        return created;
      },
      updateService: async (serviceId, input) => {
        const updated = await storeUpdateService(serviceId, input);
        await refreshServices();
        return updated;
      },
      deleteService: async (serviceId) => {
        await storeDeleteService(serviceId);
        await refreshServices();
      },
      seedServices: async (replace = false) => {
        await storeSeedServices(replace);
        await refreshServices();
      },
      refreshServices,
    }),
    [moduleOptions, navServicesMenu, services],
  );

  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>;
}

export function useServices() {
  const ctx = useContext(ServicesContext);
  if (!ctx) {
    throw new Error("useServices must be used within ServicesProvider.");
  }
  return ctx;
}

