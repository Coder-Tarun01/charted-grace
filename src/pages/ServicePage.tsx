import { useParams } from "react-router-dom";
import ServiceTemplate from "@/templates/ServiceTemplate";
import SiteLayout from "@/components/SiteLayout";
import NotFound from "@/pages/NotFound.tsx";
import { useServices } from "@/context/ServicesContext";

export default function ServicePage() {
  const { module, slug } = useParams<{ module: string; slug: string }>();
  const { getService } = useServices();

  if (!module || !slug) {
    return <NotFound />;
  }

  const service = getService(module, slug);
  if (!service) {
    return <NotFound />;
  }

  return (
    <SiteLayout>
      <ServiceTemplate service={service} />
    </SiteLayout>
  );
}
