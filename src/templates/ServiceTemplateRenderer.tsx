import { DEFAULT_SERVICE_TEMPLATE_ID, type ServiceTemplateId } from "@/config/serviceTemplates";
import type { Service } from "@/types/service";
import ServiceTemplate from "@/templates/ServiceTemplate";
import ServiceTemplateModern from "@/templates/ServiceTemplateModern";
import ServiceTemplateMinimal from "@/templates/ServiceTemplateMinimal";
import ServiceTemplateExecutive from "@/templates/ServiceTemplateExecutive";
import ServiceTemplateElegant from "@/templates/ServiceTemplateElegant";

export default function ServiceTemplateRenderer({ service }: { service: Service }) {
  const templateId = (service.templateId ?? DEFAULT_SERVICE_TEMPLATE_ID) as ServiceTemplateId;

  switch (templateId) {
    case "modern":
      return <ServiceTemplateModern service={service} />;
    case "minimal":
      return <ServiceTemplateMinimal service={service} />;
    case "executive":
      return <ServiceTemplateExecutive service={service} />;
    case "elegant":
      return <ServiceTemplateElegant service={service} />;
    case "classic":
    default:
      return <ServiceTemplate service={service} />;
  }
}
