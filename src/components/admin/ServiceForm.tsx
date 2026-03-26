import { type FormEvent, useEffect, useMemo, useState } from "react";
import { menuSeed } from "@/data/menuSeed";
import { slugify } from "@/lib/slug";
import type { Service, ServiceInput } from "@/types/service";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

type ServiceFormProps = {
  initial?: Service | null;
  moduleOptions: { value: string; label: string }[];
  onCancel?: () => void;
  isSubmitting?: boolean;
  onSubmit: (input: ServiceInput) => Promise<void> | void;
};

function parseModuleTitle(moduleSlug: string) {
  return moduleSlug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function DynamicListInput({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
}) {
  const updateValue = (index: number, value: string) => {
    onChange(values.map((item, idx) => (idx === index ? value : item)));
  };

  const removeAt = (index: number) => {
    onChange(values.filter((_, idx) => idx !== index));
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      {values.map((item, index) => (
        <div className="flex gap-2" key={`${label}-${index}`}>
          <input
            value={item}
            onChange={(e) => updateValue(index, e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <Button type="button" variant="outline" onClick={() => removeAt(index)}>
            Remove
          </Button>
        </div>
      ))}
      <Button type="button" variant="secondary" onClick={() => onChange([...values, ""])}>
        Add {label.slice(0, -1)}
      </Button>
    </div>
  );
}

async function readFileAsDataUrl(file: File) {
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.readAsDataURL(file);
  });
}

export default function ServiceForm({
  initial,
  moduleOptions,
  onCancel,
  isSubmitting = false,
  onSubmit,
}: ServiceFormProps) {
  const moduleSeedMap = useMemo(
    () =>
      new Map(
        menuSeed.map((moduleEntry) => [slugify(moduleEntry.title), moduleEntry] as const),
      ),
    [],
  );

  const [title, setTitle] = useState(initial?.title ?? "");
  const [moduleSlug, setModuleSlug] = useState(initial?.module ?? moduleOptions[0]?.value ?? "");
  const [sectionLabel, setSectionLabel] = useState(initial?.categoryLabel ?? "");
  const [subModuleTitle, setSubModuleTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [introduction, setIntroduction] = useState(initial?.introduction ?? "");
  const [overview, setOverview] = useState(initial?.overview ?? "");
  const [features, setFeatures] = useState<string[]>(initial?.features ?? [""]);
  const [benefits, setBenefits] = useState<string[]>(initial?.benefits ?? [""]);
  const [process, setProcess] = useState<string[]>(initial?.process ?? [""]);
  const [heroBannerImage, setHeroBannerImage] = useState(initial?.heroBannerImage ?? "/images/hero-ca-3.svg");
  const [heroRightImage, setHeroRightImage] = useState(initial?.heroRightImage ?? "/images/hero-ca.svg");
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    if (!initial) {
      setSlug(slugify(title));
    }
  }, [initial, title]);

  useEffect(() => {
    if (!initial && !moduleSlug && moduleOptions[0]) {
      setModuleSlug(moduleOptions[0].value);
    }
  }, [initial, moduleOptions, moduleSlug]);

  const mode = initial ? "Update Service Content" : "Upload Service Content";
  const effectiveModule = moduleSlug;
  const selectedModuleSeed = moduleSeedMap.get(effectiveModule);
  const availableSections = selectedModuleSeed?.sections ?? [];
  const selectedSection =
    availableSections.find((section) => (section.title ?? "General") === sectionLabel) ??
    availableSections[0];
  const availableSubModules = selectedSection?.items ?? [];
  const moduleTitle = useMemo(
    () => moduleOptions.find((item) => item.value === effectiveModule)?.label || parseModuleTitle(effectiveModule),
    [effectiveModule, moduleOptions],
  );

  useEffect(() => {
    if (!selectedSection) return;
    const nextLabel = selectedSection.title ?? "General";
    if (!sectionLabel) {
      setSectionLabel(nextLabel);
    }
  }, [sectionLabel, selectedSection]);

  useEffect(() => {
    if (!availableSubModules.length) return;
    if (!subModuleTitle || !availableSubModules.includes(subModuleTitle)) {
      setSubModuleTitle(availableSubModules[0]);
    }
  }, [availableSubModules, subModuleTitle]);

  useEffect(() => {
    if (!subModuleTitle) return;
    setTitle(subModuleTitle);
    if (!initial) {
      setSlug(slugify(subModuleTitle));
    }
  }, [initial, subModuleTitle]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const finalCategory = sectionLabel || "General";
    onSubmit({
      title,
      module: effectiveModule,
      moduleTitle,
      category: slugify(finalCategory || "general"),
      categoryLabel: finalCategory,
      slug,
      introduction,
      overview,
      features,
      benefits,
      process,
      heroBannerImage,
      heroRightImage,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-border bg-background p-6">
      <Heading level={3}>{mode}</Heading>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Module</label>
          <select
            required
            value={moduleSlug}
            onChange={(e) => setModuleSlug(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="" disabled>
              Select module
            </option>
            {moduleOptions.map((moduleOption) => (
              <option value={moduleOption.value} key={moduleOption.value}>
                {moduleOption.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Section</label>
          <select
            value={sectionLabel}
            onChange={(e) => {
              setSectionLabel(e.target.value);
            }}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            disabled={!availableSections.length}
          >
            {!availableSections.length ? (
              <option value="">No sections available</option>
            ) : (
              availableSections.map((section) => {
                const value = section.title ?? "General";
                return (
                  <option value={value} key={value}>
                    {value}
                  </option>
                );
              })
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Page</label>
          <select
            value={subModuleTitle}
            onChange={(e) => setSubModuleTitle(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            disabled={!availableSubModules.length}
          >
            {!availableSubModules.length ? (
              <option value="">No sub modules available</option>
            ) : (
              availableSubModules.map((name) => (
                <option value={name} key={name}>
                  {name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Title</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            readOnly
            className="w-full rounded-md border border-border bg-muted/30 px-3 py-2 text-sm"
          />
          <p className="text-xs text-muted-foreground">Title is auto-filled from selected page.</p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-foreground">Introduction</label>
          <textarea
            required
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            rows={3}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-foreground">Overview</label>
          <textarea
            required
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            rows={4}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>

      </div>

      <DynamicListInput label="Features" values={features} onChange={setFeatures} />
      <DynamicListInput label="Benefits" values={benefits} onChange={setBenefits} />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Images - Hero Banner (Upload 1)</label>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                setImageError(null);
                const url = await readFileAsDataUrl(file);
                setHeroBannerImage(url);
              } catch (err) {
                setImageError(err instanceof Error ? err.message : "Failed to upload image.");
              }
            }}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={() => setHeroBannerImage("/images/hero-ca-3.svg")}>
              Use default
            </Button>
            <Button type="button" variant="secondary" onClick={() => setHeroBannerImage("")}>
              Clear
            </Button>
          </div>
          <div className="overflow-hidden rounded-lg border border-border bg-muted/20">
            <img
              src={heroBannerImage || "/images/hero-ca-3.svg"}
              alt="Hero banner preview"
              className="h-28 w-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Images - Right Image (Upload 2)</label>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                setImageError(null);
                const url = await readFileAsDataUrl(file);
                setHeroRightImage(url);
              } catch (err) {
                setImageError(err instanceof Error ? err.message : "Failed to upload image.");
              }
            }}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={() => setHeroRightImage("/images/hero-ca.svg")}>
              Use default
            </Button>
            <Button type="button" variant="secondary" onClick={() => setHeroRightImage("")}>
              Clear
            </Button>
          </div>
          <div className="flex items-center justify-center rounded-lg border border-border bg-muted/20 p-4">
            <img
              src={heroRightImage || "/images/hero-ca.svg"}
              alt="Hero right image preview"
              className="h-28 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {imageError && <p className="text-sm font-semibold text-destructive">{imageError}</p>}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              {initial ? "Saving..." : "Uploading..."}
            </span>
          ) : initial ? (
            "Save changes"
          ) : (
            "Upload content"
          )}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

