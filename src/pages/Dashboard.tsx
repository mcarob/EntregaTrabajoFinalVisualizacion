import React, { useMemo } from "react";
import { LayoutDashboard, Download, ExternalLink } from "lucide-react";
import { Card, Pill, SectionTitle } from "../components/ui";

const LOOKER_EMBED_URL =
    "https://lookerstudio.google.com/embed/reporting/bd00f8cb-445b-4d9b-8518-5e5b0756bcae/page/1M";

function getEmbedError(url: string) {
  const clean = (url || "").trim();
  if (!clean) return "Falta la URL del embed.";

  if (!clean.includes("lookerstudio.google.com/embed/reporting/")) {
    return "La URL no parece ser un embed de Looker Studio (debe contener /embed/reporting/).";
  }

  // Evitar autoincrustación por error
  if (typeof window !== "undefined") {
    try {
      const parsed = new URL(clean, window.location.origin);
      const sameOrigin = parsed.origin === window.location.origin;
      const samePath = parsed.pathname === window.location.pathname;
      const embedsThisApp = parsed.hash === "" || parsed.hash.startsWith("#/");

      if (sameOrigin && samePath && embedsThisApp) {
        return "La URL del iframe apunta a esta misma app, por eso se muestra la página dentro del dashboard.";
      }
    } catch {
      return "La URL de Looker no tiene un formato válido.";
    }
  }

  return null;
}

export default function DashboardPage() {
  const embedError = useMemo(() => getEmbedError(LOOKER_EMBED_URL), []);

  // Archivos en public/
  const CSV_PATH = `${import.meta.env.BASE_URL}datos.csv`;
  const XLSX_PATH = `${import.meta.env.BASE_URL}datos.xlsx`;

  return (
      <div className="space-y-6">
        <SectionTitle
            icon={LayoutDashboard}
            title="Dashboard"
            desc="Determinantes del salario real en Estados Unidos: experiencia vs contexto socioeconómico."
            right={<Pill tone="brand">Looker Studio</Pill>}
        />

        {/* Intro panel */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.18)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="brand">Introducción</Pill>
                <Pill tone="cyan">Cómo leer</Pill>
              </div>

              <h2 className="mt-3 text-lg font-semibold text-slate-900">
                ¿Qué muestra este dashboard?
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Este dashboard explora cómo cambia el “valor real” de un salario según el lugar donde vives.
                Muchas veces comparamos ingresos solo por el número (salario nominal), pero ese número no cuenta
                toda la historia: el costo de vida y el contexto económico pueden hacer que un salario “alto”
                rinda menos, y que uno “moderado” alcance más. Aquí podrás comparar regiones y perfiles (por ejemplo,
                nivel educativo y años de experiencia) y ver cómo se reordenan los resultados cuando ajustamos por
                poder adquisitivo. La idea no es solo informar, sino invitarte a mirar el mercado laboral con más contexto.
              </p>

              {/* Descarga datos */}
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">¿Quieres ver los datos?</div>
                <div className="mt-1 text-sm text-slate-700">
                  Descárgalos para explorar, filtrar y replicar los resultados.
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                      href={CSV_PATH}
                      download
                      className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    <Download className="h-4 w-4" />
                    Descargar CSV
                  </a>

                  <a
                      href={XLSX_PATH}
                      download
                      className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    <Download className="h-4 w-4" />
                    Descargar Excel
                  </a>
                </div>

                <div className="mt-2 text-xs text-slate-500">
                  Archivos: <b>datos.csv</b> y <b>datos.xlsx</b> (en <b>public/</b>).
                </div>
              </div>
            </div>

            {/* Guía rápida */}
            <div className="w-full lg:w-[360px]">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold text-slate-600">Guía rápida</div>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-600" />
                    <span>Empieza mirando la vista general y el mapa.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-600" />
                    <span>Aplica filtros para comparar grupos.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-600" />
                    <span>Explora casos extremos y revisa detalle.</span>
                  </li>
                </ul>

                <button
                    onClick={() =>
                        document.getElementById("looker-embed")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ir al dashboard
                </button>

                <a
                    href={LOOKER_EMBED_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 text-xs font-semibold text-indigo-700 underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  Abrir dashboard en nueva pestaña
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Iframe */}
        <Card title="Visualización del Dashboard" subtitle="Looker Studio (embed)" right={<Pill tone="cyan">Iframe</Pill>}>
          <div id="looker-embed" className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
              <div className="text-sm font-semibold text-slate-900">Dashboard</div>
              <div className="text-xs text-slate-500">Looker Studio embed</div>
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
                      style={{ border: 0 }}
                      allowFullScreen
                      allow="fullscreen"
                      referrerPolicy="strict-origin-when-cross-origin"
                  />
              )}
            </div>
          </div>
        </Card>
      </div>
  );
}