export const DEFAULT_HERO_BANNER_IMAGE = "/images/hero-ca-3.svg";
export const DEFAULT_SECTION_IMAGE = "/images/hero-ca.svg";

export const SERVICE_TEMPLATE_IMAGE_SLOT_META = {
  overviewImage: { key: "overviewImage", label: "Overview Image (Left)" },
  featuresImage: { key: "featuresImage", label: "Features Image (Right)" },
  benefitsImage: { key: "benefitsImage", label: "Benefits Image (Left)" },
} as const;

export type SectionImageKey = keyof typeof SERVICE_TEMPLATE_IMAGE_SLOT_META;
