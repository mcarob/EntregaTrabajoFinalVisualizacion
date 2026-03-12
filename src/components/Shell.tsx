import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Code2,
  Sparkles,
  SlidersHorizontal,
  Wrench,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { classNames, Pill, TOKENS } from "./ui";
import StoryPage from "../pages/Story";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function NavButton({ id, label }: { id: string; label: string }) {
  return (
      <button
          onClick={() => scrollToId(id)}
          className={classNames(
              "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold border transition",
              "bg-white text-slate-800 border-slate-200 hover:bg-slate-50"
          )}
          type="button"
      >
        {label}
      </button>
  );
}

function NavItem({
                   icon: Icon,
                   label,
                   onClick,
                   badge,
                 }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  badge?: React.ReactNode;
}) {
  return (
      <button
          onClick={onClick}
          className={classNames(
              "group flex w-full items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-left transition",
              "border-slate-200 bg-white hover:bg-slate-50"
          )}
          type="button"
      >
      <span className="flex items-center gap-3">
        <span className={classNames("rounded-2xl border p-2", "border-slate-200 bg-white")}>
          <Icon className="h-4 w-4 text-slate-800" />
        </span>
        <span className="text-sm font-semibold text-slate-800">{label}</span>
      </span>
        {badge}
      </button>
  );
}

function PageHeader() {
  const title =
      "Determinantes del salario real en Estados Unidos: una comparación entre experiencia individual y contexto socioeconómico";

  return (
      // ✅ Full-bleed background para que el header se integre con el estilo “slides”
      <div
          className="w-screen bg-gradient-to-b from-indigo-100 via-white to-cyan-100 py-10"
          style={{
            marginLeft: "calc(50% - 50vw)",
            marginRight: "calc(50% - 50vw)",
          }}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div
              className={classNames(
                  "rounded-3xl border p-5",
                  "border-slate-200 bg-white/75 backdrop-blur",
                  "shadow-[0_18px_60px_-44px_rgba(15,23,42,0.35)]"
              )}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xl font-semibold text-slate-900">{title}</div>
                <div className="mt-1 text-sm text-slate-600">
                  Desplázate hacia abajo para ver el dashboard, documentación, transformaciones y el plan de trabajo.
                </div>
              </div>
              <Pill tone="brand">Scroll story</Pill>
            </div>
          </div>
        </div>
      </div>
  );
}

export default function Shell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
      <div className={classNames("min-h-screen", TOKENS.bg)}>
        {/* Navbar */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
            <div className="flex items-center gap-3">
              <button
                  onClick={() => setSidebarOpen(true)}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-2 text-slate-800 hover:bg-slate-50 lg:hidden"
                  aria-label="Abrir menú"
                  type="button"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-2">
                  <Sparkles className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Determinantes del salario real en Estados Unidos
                  </div>
                  <div className="hidden text-xs text-slate-600 sm:block">
                    Experiencia individual vs contexto socioeconómico
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-2 lg:flex">
              <NavButton id="dashboard" label="Dashboard" />
              <NavButton id="docs" label="Documentación" />
              <NavButton id="python" label="Transformaciones" />
              <NavButton id="como" label="¿Cómo lo hicimos?" />
            </nav>
          </div>
        </header>

        {/* Mobile drawer */}
        {sidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
              <div className="absolute left-0 top-0 h-full w-[320px] border-r border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900">Menú</div>
                  <button
                      onClick={() => setSidebarOpen(false)}
                      className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 hover:bg-slate-50"
                      type="button"
                  >
                    Cerrar
                  </button>
                </div>

                <div className="mt-4 space-y-2">
                  <NavItem icon={LayoutDashboard} label="Dashboard" onClick={() => scrollToId("dashboard")} />
                  <NavItem icon={FileText} label="Documentación" onClick={() => scrollToId("docs")} />
                  <NavItem
                      icon={Code2}
                      label="Transformaciones"
                      onClick={() => scrollToId("python")}
                      badge={<Pill>.ipynb</Pill>}
                  />
                  <NavItem icon={Wrench} label="¿Cómo lo hicimos?" onClick={() => scrollToId("como")} />
                </div>
              </div>
            </div>
        )}

        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
          <div className="space-y-4">
            <StoryPage />
          </div>
        </div>
      </div>
  );
}