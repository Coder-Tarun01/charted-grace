import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type ServiceSectionProps = {
  heading?: string;
  content: string | string[];
  image: string;
  imagePosition: "left" | "right";
  listItems?: string[];
};

export default function ServiceSection({
  heading,
  content,
  image,
  imagePosition,
  listItems,
}: ServiceSectionProps) {
  const isImageLeft = imagePosition === "left";
  const contentArray = Array.isArray(content) ? content : [content];

  return (
    <section className="py-6 md:py-8">
      <div className={`grid gap-6 rounded-2xl border border-border bg-card p-5 md:p-7 lg:grid-cols-2 ${isImageLeft ? "" : ""}`}>
        <motion.div
          className={`${isImageLeft ? "lg:order-1" : "lg:order-2"}`}
          initial={{ opacity: 0, x: isImageLeft ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="overflow-hidden rounded-xl border border-border bg-muted/20">
            <img src={image} alt={heading || "Service illustration"} className="h-56 w-full object-cover md:h-72" />
          </div>
        </motion.div>

        <motion.div
          className={`${isImageLeft ? "lg:order-2" : "lg:order-1"} flex flex-col justify-center`}
          initial={{ opacity: 0, x: isImageLeft ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          {heading && <h2 className="text-2xl font-display font-bold text-foreground md:text-3xl">{heading}</h2>}
          {contentArray.map((paragraph, index) => (
            <p key={index} className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              {paragraph}
            </p>
          ))}
          {listItems && listItems.length > 0 && (
            <ul className="mt-5 space-y-2 text-sm text-foreground/90">
              {listItems.map((item, index) => (
                <li key={index} className="rounded-md border border-border/70 bg-background/80 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/#contact"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Contact Us
            </Link>
            <Link
              to="/#contact"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-accent"
            >
              Get Quote
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

