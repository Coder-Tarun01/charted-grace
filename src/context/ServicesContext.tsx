import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  buildEffectiveNavMenu,
  clearAllServices as storeClearAllServices,
  createService as storeCreateService,
  deleteService as storeDeleteService,
  getAllServices,
  getCachedServicesForHydration,
  getModuleOptions,
  seedServices as storeSeedServices,
  updateService as storeUpdateService,
} from "@/lib/serviceStore";
import type { NavMenuModule, Service, ServiceInput } from "@/types/service";

type ServicesContextValue = {
  services: Service[];
  /** False until the first `getAllServices()` run finishes (success or error). */
  servicesReady: boolean;
  moduleOptions: { value: string; label: string }[];
  navServicesMenu: NavMenuModule[];
  getService: (moduleSlug: string, serviceSlug: string) => Service | undefined;
  createService: (input: ServiceInput) => Promise<Service>;
  updateService: (serviceId: string, input: ServiceInput) => Promise<Service | undefined>;
  deleteService: (serviceId: string) => Promise<void>;
  seedServices: (replace?: boolean) => Promise<void>;
  clearAllServices: () => Promise<void>;
  refreshServices: () => Promise<void>;
};

const ServicesContext = createContext<ServicesContextValue | null>(null);

const SERVICES_LIST_TIMEOUT_MS = 15_000;

export function ServicesProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<Service[]>(() => getCachedServicesForHydration());
  const [servicesReady, setServicesReady] = useState(false);

  const refreshServices = async () => {
    try {
      const rows = await Promise.race([
        getAllServices(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("services-list-timeout")), SERVICES_LIST_TIMEOUT_MS),
        ),
      ]);
      setServices(rows);
    } catch {
      setServices(getCachedServicesForHydration());
    } finally {
      setServicesReady(true);
    }
  };

  useEffect(() => {
    refreshServices();
  }, []);

  const navServicesMenu = useMemo(() => buildEffectiveNavMenu(services), [services]);
  const moduleOptions = useMemo(() => getModuleOptions(services), [services]);

  const value = useMemo<ServicesContextValue>(
    () => ({
      services,
      servicesReady,
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
      clearAllServices: async () => {
        await storeClearAllServices();
        await refreshServices();
      },
      refreshServices,
    }),
    [moduleOptions, navServicesMenu, services, servicesReady],
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

