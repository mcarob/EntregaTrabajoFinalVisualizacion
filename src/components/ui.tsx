import React from "react";
export const TOKENS = {
  bg: "bg-slate-50",
  surface: "bg-white",
  border: "border-slate-200",
  text: "text-slate-900",
  subtle: "text-slate-500",
  shadow: "shadow-[0_12px_40px_-24px_rgba(15,23,42,0.25)]",
};
export function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}
export function Pill({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "brand" | "cyan";
}) {
  const styles =
    tone === "brand"
      ? "bg-indigo-600/10 text-indigo-700 border-indigo-600/20"
      : tone === "cyan"
      ? "bg-cyan-600/10 text-cyan-700 border-cyan-600/20"
      : "bg-slate-100 text-slate-700 border-slate-200";
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        styles
      )}
    >
      {children}
    </span>
  );
}
export function Card({
  title,
  subtitle,
  right,
  children,
}: {
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        "rounded-2xl border p-5",
        TOKENS.surface,
        TOKENS.border,
        TOKENS.shadow
      )}
    >
      {(title || subtitle || right) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && (
              <div className={classNames("text-sm font-semibold", TOKENS.text)}>
                {title}
              </div>
            )}
            {subtitle && (
              <div className={classNames("mt-1 text-xs", TOKENS.subtle)}>
                {subtitle}
              </div>
            )}
          </div>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}
export function SectionTitle({
  icon: Icon,
  title,
  desc,
  right,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-2">
          <Icon className="h-5 w-5 text-slate-800" />
        </div>
        <div>
          <div className="text-lg font-semibold text-slate-900">{title}</div>
          <div className="mt-1 text-sm text-slate-600">{desc}</div>
        </div>
      </div>
      {right}
    </div>
  );
}
