export type ServiceTemplateId = "classic" | "modern" | "minimal" | "executive" | "elegant";
import type { SectionImageKey } from "@/config/serviceTemplateImages";

export const DEFAULT_SERVICE_TEMPLATE_ID: ServiceTemplateId = "classic";

export const SERVICE_TEMPLATE_OPTIONS: Array<{
  id: ServiceTemplateId;
  name: string;
  description: string;
  imageKeys: SectionImageKey[];
}> = [
  {
    id: "classic",
    name: "Classic",
    description: "Balanced layout with highlights and sections.",
    imageKeys: ["overviewImage", "featuresImage", "benefitsImage"],
  },
  {
    id: "modern",
    name: "Modern",
    description: "Metric-led cards with animated performance blocks.",
    imageKeys: ["overviewImage", "benefitsImage"],
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean editorial style with minimal media.",
    imageKeys: ["overviewImage"],
  },
  {
    id: "executive",
    name: "Executive",
    description: "Premium dark layout with boardroom visual language.",
    imageKeys: ["overviewImage", "benefitsImage"],
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Polished gradient style with rich visual gallery.",
    imageKeys: ["overviewImage", "featuresImage", "benefitsImage"],
  },
];
