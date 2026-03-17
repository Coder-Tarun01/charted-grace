import { Search } from "lucide-react";
import { useMemo, useRef, useState } from "react";

type Suggestion = {
  label: string;
  sublabel?: string;
};

const SUGGESTIONS: Suggestion[] = [
  { label: "Income Tax", sublabel: "ITR filing, notices, tax planning" },
  { label: "GST Filing", sublabel: "GSTR-1, GSTR-3B, annual return" },
  { label: "GST Registration", sublabel: "New GSTIN, amendments" },
  { label: "TDS Returns", sublabel: "24Q/26Q compliance" },
  { label: "ROC Filing", sublabel: "Annual filings, compliance" },
  { label: "Audit Support", sublabel: "Statutory & internal audits" },
];

export type SearchBarProps = {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "Search services (GST, ROC, Audit...)",
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [uncontrolledValue, setUncontrolledValue] = useState("");
  const value = controlledValue ?? uncontrolledValue;
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return SUGGESTIONS;
    return SUGGESTIONS.filter((s) => s.label.toLowerCase().includes(q));
  }, [value]);

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="relative mx-auto flex items-center gap-3 rounded-full border border-white/18 bg-white/[0.08] px-4 py-2.5 shadow-[0_20px_70px_-50px_rgba(0,0,0,0.75)] backdrop-blur-2xl outline-none transition-all focus-within:border-primary/40 focus-within:bg-white/[0.10] focus-within:shadow-[0_22px_80px_-55px_rgba(249,115,22,0.35)] focus-within:ring-1 focus-within:ring-primary/35">
        <Search className="h-5 w-5 shrink-0 text-white/75" aria-hidden="true" />
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => {
            const next = e.target.value;
            if (controlledValue === undefined) setUncontrolledValue(next);
            onChange?.(next);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit?.(value.trim());
            }
          }}
          aria-label="Search services"
          placeholder={placeholder}
          className="h-11 w-full bg-transparent text-left text-base font-medium tracking-[-0.01em] text-white outline-none placeholder:text-white/55 placeholder:font-medium"
        />
        <div className="hidden md:block h-8 w-px bg-white/12" aria-hidden="true" />
        <button
          type="button"
          onClick={() => onSubmit?.(value.trim())}
          className="hidden shrink-0 rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-[0_16px_50px_-30px_rgba(249,115,22,0.7)] transition-all hover:bg-orange-deep hover:shadow-[0_18px_60px_-30px_rgba(249,115,22,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 md:inline-flex"
          aria-label="Search"
        >
          Search
        </button>
      </div>

      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-20 mx-auto">
          <div className="rounded-2xl border border-white/14 bg-slate-950/70 p-2 shadow-[0_30px_90px_-55px_rgba(0,0,0,0.75)] backdrop-blur-2xl">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60">
              Suggestions
            </div>
            <div className="max-h-72 overflow-auto">
              {filtered.length === 0 ? (
                <div className="px-3 py-3 text-sm font-medium text-white/75">
                  No matches. Try “GST filing” or “Income tax”.
                </div>
              ) : (
                <ul role="listbox" className="space-y-1">
                  {filtered.map((s) => (
                    <li key={s.label} role="option" aria-selected={false}>
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          // keep input focused so dropdown doesn't close before click
                          e.preventDefault();
                        }}
                        onClick={() => {
                          if (controlledValue === undefined) setUncontrolledValue(s.label);
                          onChange?.(s.label);
                          onSubmit?.(s.label);
                          setOpen(false);
                          inputRef.current?.blur();
                        }}
                        className="flex w-full items-start gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
                      >
                        <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 bg-white/5 text-white/70">
                          <Search className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-white">
                            {s.label}
                          </span>
                          {s.sublabel ? (
                            <span className="block truncate text-xs font-medium text-white/70">
                              {s.sublabel}
                            </span>
                          ) : null}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

