export type Service = {
  id: string;
  module: string;
  moduleTitle: string;
  category: string;
  categoryLabel: string;
  slug: string;
  title: string;
  introduction: string;
  overview: string;
  features: string[];
  benefits: string[];
  process: string[];
  ctaHeadline: string;
  ctaSubtext: string;
  ctaButtonLabel: string;
  heroBannerImage: string;
  heroRightImage: string;
};

export type ServiceInput = {
  title: string;
  module: string;
  moduleTitle?: string;
  category?: string;
  categoryLabel?: string;
  slug?: string;
  introduction: string;
  overview: string;
  features: string[];
  benefits: string[];
  process: string[];
  heroBannerImage?: string;
  heroRightImage?: string;
};

export type NavMenuItem = { name: string; href: string };
export type NavMenuSection = { title?: string; items: NavMenuItem[] };
export type NavMenuModule = { title: string; sections: NavMenuSection[] };

