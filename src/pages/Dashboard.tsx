import React from "react";
import { LayoutDashboard } from "lucide-react";
import { Card, Pill, SectionTitle } from "../components/ui";

export default function DashboardPage() {
  // Define this in .env as VITE_LOOKER_EMBED_URL for easier changes by environment.
  const LOOKER_EMBED_URL = (import.meta.env.VITE_LOOKER_EMBED_URL ?? "##########").trim();

  const getEmbedError = (url: string) => {
    if (!url || url === "##########") {
      return "error seteando VITE_LOOKER_EMBED_URL.";
    }

    try {
      const parsed = new URL(url, window.location.origin);
      const sameOrigin = parsed.origin === window.location.origin;
      const samePath = parsed.pathname === window.location.pathname;
      const embedsThisApp = parsed.hash === "" || parsed.hash.startsWith("#/");

      if (sameOrigin && samePath && embedsThisApp) {
        return "La URL del iframe apunta a esta misma app, por eso se muestra la página dentro del dashboard.";
      }
    } catch {
      return "La URL de Looker no tiene un formato válido.";
    }

    return null;
  };

  const embedError = getEmbedError(LOOKER_EMBED_URL);

  return (
    <div className="space-y-6">
      <SectionTitle
        icon={LayoutDashboard}
        title="Dashboard"
        desc="Dashboard Grupo 16: Nombre......."
      />

      {/* Intro panel (horizontal) */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.18)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="brand">Introducción</Pill>
              <Pill tone="cyan">Cómo leer el Dashboard</Pill>
            </div>
            <h2 className="mt-3 text-lg font-semibold text-slate-900">
              ¿Qué muestra este dashboard?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
               ##### Descripcción del proyecto ######
            </p>

          </div>

          <div className="w-full lg:w-[360px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-xs font-semibold text-slate-600">Guía Rapida: </div>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  <span>Empieza por la vista general (arriba del dashboard).</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-600" />
                  <span>Usa filtros  para poder ...... </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-600" />
                  <span>Analiza los resultados, y si es necesario sigue usando los filtros.</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  const el = document.getElementById("looker-embed");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Ir al dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <Card
        title="Dashboard (NOMBREEEEEEE)"
        subtitle=" SUBTITULOOOO"
        right={<Pill tone="cyan">Iframe</Pill>}
      >
        <div id="looker-embed" className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
            <div className="text-sm font-semibold text-slate-900">Dashboard</div>
            <div className="text-xs text-slate-500">Looker embed</div>
          </div>
          <div className="h-[82vh] min-h-[600px]">
            {embedError ? (
              <div className="flex h-full items-center justify-center bg-slate-50 p-6 text-center">
                <div className="max-w-xl rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <p className="text-sm font-semibold text-amber-900">No se pudo cargar el embed</p>
                  <p className="mt-2 text-sm text-amber-800">{embedError}</p>
                </div>
              </div>
            ) : (
              <iframe
                title="looker-dashboard"
                src={LOOKER_EMBED_URL}
                className="h-full w-full"
                frameBorder={0}
                allow="fullscreen"
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
