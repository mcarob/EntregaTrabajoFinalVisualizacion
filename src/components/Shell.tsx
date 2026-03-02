import React, { useEffect, useState } from "react";
import { LayoutDashboard, FileText, Code2, Sparkles, SlidersHorizontal } from "lucide-react";
import { Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { classNames, Pill, TOKENS } from "./ui";
import DashboardPage from "../pages/Dashboard";
import DocsPage from "../pages/Docs";
import PythonPage from "../pages/Python";

function NavButton({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(
          "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold border transition",
          isActive
            ? "bg-indigo-600 text-white border-indigo-600"
            : "bg-white text-slate-800 border-slate-200 hover:bg-slate-50"
        )
      }
    >
      {label}
    </NavLink>
  );
}

function NavItem({
  active,
  icon: Icon,
  label,
  onClick,
  badge,
}: {
  active: boolean;
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
        active ? "border-indigo-600/25 bg-indigo-600/10" : "border-slate-200 bg-white hover:bg-slate-50"
      )}
    >
      <span className="flex items-center gap-3">
        <span
          className={classNames(
            "rounded-2xl border p-2",
            active ? "border-indigo-600/25 bg-indigo-600/10" : "border-slate-200 bg-white"
          )}
        >
          <Icon className="h-4 w-4 text-slate-800" />
        </span>
        <span className={classNames("text-sm font-semibold", active ? "text-slate-900" : "text-slate-800")}>
          {label}
        </span>
      </span>
      {badge}
    </button>
  );
}

function PageHeader() {
  const { pathname } = useLocation();
 // const title = pathname === "/" ? "Dashboard Proyecto Visualización y storytelling: Grupo 16" : pathname === "/docs" ? "Documentación" : "Python";
  const title =  "Dashboard Proyecto Visualización y storytelling: Grupo 16" ;
  return (
    <div className={classNames("rounded-3xl border p-5", TOKENS.surface, TOKENS.border, TOKENS.shadow)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xl font-semibold text-slate-900">{title}</div>
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
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-2 text-slate-800 hover:bg-slate-50 lg:hidden"
              aria-label="Abrir menú"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-2">
                <Sparkles className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">Proyecto Visualización y storytelling: Grupo 16</div>
                <div className="text-xs text-slate-500"> Dashboard Looker · Docs · Notebook</div>
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-2 lg:flex">
            <NavButton to="/" label="Visualización del Dashboard" />
            <NavButton to="/docs" label="Documentación" />
            <NavButton to="/python" label="Transformaciones" />
          </nav>
        </div>
      </header>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[320px] border-r border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-900">Menú</div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 hover:bg-slate-50"
              >
                Cerrar
              </button>
            </div>
            <div className="mt-4 space-y-2">
              <NavItem
                active={pathname === "/"}
                icon={LayoutDashboard}
                label="Dashboard"
                onClick={() => (window.location.hash = "#/")}
              />
              <NavItem
                active={pathname === "/docs"}
                icon={FileText}
                label="Docs"
                onClick={() => (window.location.hash = "#/docs")}
              />
              <NavItem
                active={pathname === "/python"}
                icon={Code2}
                label="Python"
                onClick={() => (window.location.hash = "#/python")}
                badge={<Pill>.ipynb</Pill>}
              />
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="space-y-4">
          <PageHeader />

          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/python" element={<PythonPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <footer className="pb-6 pt-2 text-center text-xs text-slate-500">
            El notebook se puede encontrar en:  {" "}
            <span className="font-semibold">/codigo/transformaciones.ipynb</span>.
          </footer>
        </div>
      </div>
    </div>
  );
}
