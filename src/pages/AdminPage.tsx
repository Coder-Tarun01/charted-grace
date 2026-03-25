import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import ServiceForm from "@/components/admin/ServiceForm";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import type { Service } from "@/types/service";
import { useServices } from "@/context/ServicesContext";

export default function AdminPage() {
  const { services, moduleOptions, createService, updateService, seedServices, refreshServices } = useServices();
  const [editing, setEditing] = useState<Service | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(new Date());
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
                    await refreshServices();
                    setLastSyncedAt(new Date());
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
                  await seedServices(false);
                  setLastSyncedAt(new Date());
                }}
                className="rounded-md border border-border px-3 py-2 text-sm font-semibold hover:bg-accent"
              >
                Seed Missing Pages
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (!window.confirm("Replace all DB services with default pages?")) return;
                  await seedServices(true);
                  setLastSyncedAt(new Date());
                }}
                className="rounded-md border border-destructive/40 px-3 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10"
              >
                Reset DB from Seed
              </button>
            </div>
          </div>

          <div className="max-w-4xl">
            <ServiceForm
              initial={editing}
              moduleOptions={moduleOptions}
              onSubmit={async (input) => {
                if (editing) {
                  const updated = await updateService(editing.id, input);
                  setEditing(null);
                  setLastSyncedAt(new Date());
                  if (updated) {
                    navigate(`/services/${updated.module}/${updated.slug}`);
                  }
                  return;
                }

                const created = await createService(input);
                setLastSyncedAt(new Date());
                navigate(`/services/${created.module}/${created.slug}`);
              }}
              onCancel={editing ? () => setEditing(null) : undefined}
            />
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
}

