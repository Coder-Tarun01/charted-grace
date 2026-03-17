import { ArrowRight } from "lucide-react";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";

function Badge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.26em] text-white/90 backdrop-blur-xl shadow-[0_18px_60px_-40px_rgba(0,0,0,0.55)]">
      <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
      Trusted CA desk
    </div>
  );
}

export default function Hero() {
  const [query, setQuery] = useState("");

  return (
    <section
      className="relative flex min-h-[calc(100vh-5rem)] items-start justify-center overflow-hidden bg-slate-950 pt-8"
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/image.png')",
        }}
      />

      {/* Readability overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/90"
      />

      <div className="container relative z-10 mx-auto px-4 py-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto max-w-4xl">
            <Badge />
            <div className="mt-5 rounded-[2rem] border border-white/15 bg-white/10 px-5 py-5 backdrop-blur-2xl shadow-[0_28px_90px_-55px_rgba(0,0,0,0.70)] md:px-8 md:py-7">
              <h1 className="text-2xl font-bold leading-[1.08] tracking-[-0.03em] text-white md:text-4xl lg:text-5xl drop-shadow-[0_18px_50px_rgba(0,0,0,0.55)]">
                Professional CA services,
                <span className="block">
                  <span className="bg-gradient-to-r from-orange-200 via-primary to-orange-300 bg-clip-text text-transparent">
                    clearly delivered
                  </span>
                  .
                </span>
              </h1>
              <p className="mx-auto mt-3 max-w-3xl text-xs leading-relaxed text-white/85 md:text-sm drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
                Registrations, GST/ROC filings, accounts, audits—handled end-to-end with transparent timelines.
              </p>
            </div>
          </div>

          <div className="mt-7">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={(v) => {
                setQuery(v);
              }}
            />
          </div>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#pricing"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-white shadow-[0_16px_60px_-35px_rgba(249,115,22,0.45)] transition-shadow hover:shadow-[0_18px_70px_-35px_rgba(249,115,22,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:w-auto"
            >
              Get started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-900/15 bg-white px-7 py-3 text-sm font-bold text-slate-900 shadow-sm transition-colors hover:bg-orange-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:w-auto"
            >
              Talk to a CA
            </a>
          </div>

          <div className="mt-10">
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-900/10 bg-white px-5 py-4">
                <div className="text-sm font-black text-slate-950">24–48h</div>
                <div className="mt-1 text-xs font-semibold text-slate-600">Typical turnaround</div>
              </div>
              <div className="rounded-2xl border border-slate-900/10 bg-white px-5 py-4">
                <div className="text-sm font-black text-slate-950">1:1</div>
                <div className="mt-1 text-xs font-semibold text-slate-600">Dedicated manager</div>
              </div>
              <div className="rounded-2xl border border-slate-900/10 bg-white px-5 py-4">
                <div className="text-sm font-black text-slate-950">Always-on</div>
                <div className="mt-1 text-xs font-semibold text-slate-600">Compliance reminders</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </section>
  );
}

