import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceTemplateRenderer from "@/templates/ServiceTemplateRenderer";
import SiteLayout from "@/components/SiteLayout";
import { fetchServiceDetail } from "@/lib/serviceStore";
import ServiceComingSoon from "@/components/service/ServiceComingSoon";
import type { Service } from "@/types/service";

type LoadState =
  | { kind: "loading" }
  | { kind: "ok"; service: Service }
  | { kind: "not_found" }
  | { kind: "error"; message: string };

function isDefaultPlaceholder(service: Service) {
  return service.introduction.trim().toLowerCase() === "coming soon.";
}

export default function ServicePage() {
  const { module, slug } = useParams<{ module: string; slug: string }>();
  const [state, setState] = useState<LoadState>({ kind: "loading" });

  useEffect(() => {
    if (!module || !slug) return;

    let cancelled = false;
    setState({ kind: "loading" });

    fetchServiceDetail(module, slug).then((result) => {
      if (cancelled) return;
      if (result.kind === "ok") {
        setState({ kind: "ok", service: result.service });
        return;
      }
      if (result.kind === "not_found") {
        setState({ kind: "not_found" });
        return;
      }
      setState({ kind: "error", message: result.message });
    });

    return () => {
      cancelled = true;
    };
  }, [module, slug]);

  if (!module || !slug) {
    return (
      <SiteLayout>
        <div className="flex min-h-[50vh] flex-col items-center justify-center bg-muted/50 px-4">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Invalid service URL</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </a>
        </div>
      </SiteLayout>
    );
  }

  if (state.kind === "loading") {
    return (
      <SiteLayout>
        <div className="flex min-h-[40vh] items-center justify-center px-4 text-sm text-muted-foreground">
          Loading…
        </div>
      </SiteLayout>
    );
  }

  if (state.kind === "not_found") {
    return (
      <SiteLayout>
        <div className="flex min-h-[50vh] flex-col items-center justify-center bg-muted/50 px-4">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">This service page is not in the database</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </a>
        </div>
      </SiteLayout>
    );
  }

  if (state.kind === "error") {
    return (
      <SiteLayout>
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-2 text-xl font-semibold">Could not load this page</h1>
          <p className="text-sm text-muted-foreground">{state.message}</p>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      {isDefaultPlaceholder(state.service) ? (
        <ServiceComingSoon title={state.service.title} />
      ) : (
        <ServiceTemplateRenderer service={state.service} />
      )}
    </SiteLayout>
  );
}
