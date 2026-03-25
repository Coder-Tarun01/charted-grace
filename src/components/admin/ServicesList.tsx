import { Link } from "react-router-dom";
import type { Service } from "@/types/service";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

type ServicesListProps = {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
};

export default function ServicesList({ services, onEdit, onDelete }: ServicesListProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Heading level={3}>All Services</Heading>
        <span className="text-sm text-muted-foreground">{services.length} items</span>
      </div>

      <div className="overflow-x-auto">
        {services.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
            No services found. Create your first service using the form.
          </div>
        ) : (
          <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="py-3 pr-4">Title</th>
              <th className="py-3 pr-4">Module</th>
              <th className="py-3 pr-4">Category</th>
              <th className="py-3 pr-4">Slug</th>
              <th className="py-3 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b border-border/70">
                <td className="py-3 pr-4 font-medium text-foreground">{service.title}</td>
                <td className="py-3 pr-4 text-muted-foreground">{service.moduleTitle}</td>
                <td className="py-3 pr-4 text-muted-foreground">{service.categoryLabel}</td>
                <td className="py-3 pr-4 text-muted-foreground">{service.slug}</td>
                <td className="py-3 pr-4">
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" size="sm" variant="outline" onClick={() => onEdit(service)}>
                      Edit
                    </Button>
                    <Button type="button" size="sm" variant="destructive" onClick={() => onDelete(service)}>
                      Delete
                    </Button>
                    <Button asChild type="button" size="sm" variant="secondary">
                      <Link to={`/services/${service.module}/${service.slug}`}>View</Link>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

