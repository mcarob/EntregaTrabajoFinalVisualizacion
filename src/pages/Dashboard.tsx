import React, { useMemo, useState } from "react";
import { Download, ExternalLink, Layers, LayoutDashboard, Info } from "lucide-react";
import { Card, Pill, SectionTitle } from "../components/ui";

const DASHBOARD_PRINCIPAL_URL =
    "https://lookerstudio.google.com/embed/reporting/bd00f8cb-445b-4d9b-8518-5e5b0756bcae/page/1M";

const DASHBOARD_HALLAZGOS_URL =
    "https://lookerstudio.google.com/embed/reporting/3cb7d34e-734d-48bf-bf04-0becc755263c/page/p_79amiucn1d";

function isValidEmbed(url: string) {
  return (url || "").includes("lookerstudio.google.com/embed/reporting/");
}

function TabButton({
                     active,
                     label,
                     onClick,
                   }: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
      <button
          onClick={onClick}
          className={[
            "rounded-2xl border px-4 py-2 text-sm font-semibold transition",
            active
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
          ].join(" ")}
          type="button"
      >
        {label}
      </button>
  );
}

export default function DashboardPage() {
  const [active, setActive] = useState<"principal" | "hallazgos">("principal");

  const CSV_PATH = `${import.meta.env.BASE_URL}datos.csv`;
  const XLSX_PATH = `${import.meta.env.BASE_URL}datos.xlsx`;

  const activeUrl = active === "principal" ? DASHBOARD_PRINCIPAL_URL : DASHBOARD_HALLAZGOS_URL;
  const activeTitle = active === "principal" ? "Dashboard principal" : "Dashboard hallazgos";
  const activeSubtitle =
      active === "principal"
          ? "Comparación nominal vs salario real ajustado"
          : "Interpretación y explicación de los hallazgos";

  const whatTitle =
      active === "principal"
          ? "¿Qué muestra este dashboard?"
          : "¿Qué explica este dashboard de hallazgos?";

  const whatText =
      active === "principal"
          ? `Este dashboard explora cómo cambia el “valor real” de un salario según el lugar donde vives.
Muchas veces comparamos ingresos solo por el número (salario nominal), pero ese número no cuenta toda la historia:
el costo de vida y el contexto económico pueden hacer que un salario “alto” rinda menos, y que uno “moderado” alcance más.
Aquí podrás comparar regiones y perfiles (por ejemplo, nivel educativo y años de experiencia) y ver cómo se reordenan los resultados
cuando ajustamos por poder adquisitivo.`
          : `Este dashboard complementa la visualización principal: resume y explica patrones encontrados.
Destaca comparaciones clave (qué cambia al pasar de salario nominal a salario real), casos extremos por estado
y lecturas que ayudan a interpretar el tablero.`;

  const embedError = useMemo(() => {
    if (!isValidEmbed(activeUrl)) {
      return "La URL no parece ser un embed válido de Looker Studio (debe contener /embed/reporting/).";
    }
    return null;
  }, [activeUrl]);

  const scrollToActiveDashboard = () => {
    document.getElementById("looker-embed")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
      <div className="space-y-6">
        {/* ✅ SectionTitle más simple para que NO se vea raro */}
        <SectionTitle
            icon={LayoutDashboard}
            title="Visualización del Dashboard"
            desc="Explora el tablero principal y el panel de hallazgos."
            right={<Pill tone="brand">Looker Studio</Pill>}
        />

        {/* (A) HERO / TÍTULO GRANDE */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.18)]">
          <h1 className="text-xl font-semibold leading-snug text-slate-900">
            Determinantes del salario real en Estados Unidos: una comparación entre experiencia individual y contexto socioeconómico
          </h1>
        </div>

        {/* (B) DATOS (general) */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.18)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">¿Quieres ver los datos?</div>
              <div className="mt-1 text-sm text-slate-700">
                Descárgalos para explorar, filtrar y replicar los resultados.
              </div>
              <div className="mt-2 text-xs text-slate-500">
                Archivos: <b>datos.csv</b> y <b>datos.xlsx</b> (en <b>public/</b>).
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
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
          </div>
        </div>

        {/* (C) CAMBIAR VISTA */}
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.18)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-2">
                <Layers className="h-5 w-5 text-slate-800" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">Cambiar vista de dashboard</div>
                <div className="text-xs text-slate-500">Visualización principal y panel de hallazgos.</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <TabButton
                  active={active === "principal"}
                  label="Dashboard principal"
                  onClick={() => setActive("principal")}
              />
              <TabButton
                  active={active === "hallazgos"}
                  label="Dashboard hallazgos"
                  onClick={() => setActive("hallazgos")}
              />
            </div>
          </div>
        </div>

        {/* (D) ¿QUÉ MUESTRA? (dinámico) + CTA */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.18)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="brand">Introducción</Pill>
                <Pill tone="cyan">Cómo leer</Pill>
                <Pill>{activeTitle}</Pill>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <Info className="h-5 w-5 text-slate-700" />
                <h2 className="text-lg font-semibold text-slate-900">{whatTitle}</h2>
              </div>

              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">{whatText}</p>
            </div>

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
                    onClick={scrollToActiveDashboard}
                    className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ir al dashboard
                </button>

                <a
                    href={activeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 text-xs font-semibold text-indigo-700 underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  Abrir el dashboard actual en nueva pestaña
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Iframe */}
        <Card title={activeTitle} subtitle={activeSubtitle} right={<Pill tone="cyan">Iframe</Pill>}>
          <div id="looker-embed" className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
              <div className="text-sm font-semibold text-slate-900">{activeTitle}</div>
              <div className="text-xs text-slate-500">Looker Studio embed</div>
            </div>

            <div className="h-[82vh] min-h-[600px]">
              {embedError ? (
                  <div className="flex h-full items-center justify-center bg-slate-50 p-6 text-center">
                    <div className="max-w-xl rounded-2xl border border-amber-200 bg-amber-50 p-5">
                      <p className="text-sm font-semibold text-amber-900">No se pudo cargar el embed</p>
                      <p className="mt-2 text-sm text-amber-800">{embedError}</p>
                      <a
                          href={activeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center justify-center gap-2 text-xs font-semibold text-indigo-700 underline"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Abrir en nueva pestaña
                      </a>
                    </div>
                  </div>
              ) : (
                  <iframe
                      title={`looker-${active}`}
                      src={activeUrl}
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