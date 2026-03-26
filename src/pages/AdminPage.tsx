import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import ServiceForm from "@/components/admin/ServiceForm";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { toast } from "@/components/ui/sonner";
import type { Service } from "@/types/service";
import { useServices } from "@/context/ServicesContext";

export default function AdminPage() {
  const { services, moduleOptions, createService, updateService, seedServices, clearAllServices, refreshServices } =
    useServices();
  const [editing, setEditing] = useState<Service | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(new Date());
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const navigate = useNavigate();

  return (
    <SiteLayout>
      <Section className="bg-muted/20">
        <Container>
          <div className="mb-8">
            <Heading level={1} className="mb-3">
              Services Admin
            </Heading>
            <div className="mb-4 rounded-lg border border-border bg-background p-4">
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <p className="font-semibold text-foreground">DB Services: {services.length}</p>
                <p className="text-muted-foreground">
                  Last sync: {lastSyncedAt ? lastSyncedAt.toLocaleString() : "Not synced yet"}
                </p>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await refreshServices();
                      setLastSyncedAt(new Date());
                      toast.success("Services refreshed successfully.");
                    } catch (e) {
                      const message = e instanceof Error ? e.message : "Refresh failed";
                      setSubmitError(message);
                      toast.error(message);
                    }
                  }}
                  className="rounded-md border border-border px-2.5 py-1.5 font-semibold hover:bg-accent"
                >
                  Refresh
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={async () => {
                  if (!window.confirm("Delete every service row? The site will have no pages until you seed again.")) return;
                  try {
                    await clearAllServices();
                    setLastSyncedAt(new Date());
                    setFormKey((prev) => prev + 1);
                    toast.success("Database emptied successfully.");
                  } catch (e) {
                    const message = e instanceof Error ? e.message : "Clear failed";
                    setSubmitError(message);
                    toast.error(message);
                  }
                }}
                className="rounded-md border border-destructive/50 px-3 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10"
              >
                Empty database
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await seedServices(false);
                    setLastSyncedAt(new Date());
                    toast.success("Missing pages added as Coming soon.");
                  } catch (e) {
                    const message = e instanceof Error ? e.message : "Seed failed";
                    setSubmitError(message);
                    toast.error(message);
                  }
                }}
                className="rounded-md border border-border px-3 py-2 text-sm font-semibold hover:bg-accent"
              >
                Add missing “Coming soon” pages
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (
                    !window.confirm(
                      "Replace ALL pages with default “Coming soon” content? This removes every custom upload.",
                    )
                  )
                    return;
                  try {
                    await seedServices(true);
                    setLastSyncedAt(new Date());
                    setFormKey((prev) => prev + 1);
                    toast.success("All pages reset to Coming soon.");
                  } catch (e) {
                    const message = e instanceof Error ? e.message : "Reset failed";
                    setSubmitError(message);
                    toast.error(message);
                  }
                }}
                className="rounded-md border border-destructive/40 px-3 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10"
              >
                Reset all pages to “Coming soon”
              </button>
            </div>
          </div>

          <div className="max-w-4xl">
            <ServiceForm
              key={formKey}
              initial={editing}
              moduleOptions={moduleOptions}
              isSubmitting={isSubmitting}
              onSubmit={async (input) => {
                try {
                  setIsSubmitting(true);
                  setSubmitError(null);
                  if (editing) {
                    const updated = await updateService(editing.id, input);
                    setEditing(null);
                    setLastSyncedAt(new Date());
                    setFormKey((prev) => prev + 1);
                    if (updated) {
                      toast.success("Content updated successfully.");
                      navigate(`/services/${updated.module}/${updated.slug}`);
                    }
                    return;
                  }

                  const created = await createService(input);
                  setLastSyncedAt(new Date());
                  setFormKey((prev) => prev + 1);
                  toast.success("Content uploaded successfully.");
                  navigate(`/services/${created.module}/${created.slug}`);
                } catch (error) {
                  const message =
                    error instanceof Error ? error.message : "Failed to save service content.";
                  setSubmitError(message);
                  toast.error(message);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              onCancel={editing ? () => setEditing(null) : undefined}
            />
            {submitError && <p className="mt-3 text-sm font-semibold text-destructive">{submitError}</p>}
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
}

