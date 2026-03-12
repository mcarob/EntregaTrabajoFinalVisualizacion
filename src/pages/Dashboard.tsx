import React, { useMemo, useState } from "react";
import { Download, ExternalLink, Info } from "lucide-react";
import { Card, Pill } from "../components/ui";
const LOOKER_EMBED_URL =
    "https://lookerstudio.google.com/embed/reporting/185c7a38-cfb9-450a-822d-244d3c40af07/page/1M";
function isValidEmbed(url: string) {
  return (url || "").includes("lookerstudio.google.com/embed/reporting/");
}
function SmallTab({
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
          type="button"
          className={[
            "rounded-2xl border px-3 py-2 text-sm font-semibold transition",
            active
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
          ].join(" ")}
      >
        {label}
      </button>
  );
}
export default function DashboardPage() {
  // Sección de texto dinámica (3 botones)
  const [focus, setFocus] = useState<"general" | "experiencia" | "industria">("general");
  const CSV_PATH = `${import.meta.env.BASE_URL}datos.csv`;
  const XLSX_PATH = `${import.meta.env.BASE_URL}datos.xlsx`;
  const embedError = useMemo(() => {
    if (!isValidEmbed(LOOKER_EMBED_URL)) {
      return "La URL no parece ser un embed válido de Looker Studio (debe contener /embed/reporting/).";
    }
    return null;
  }, []);
  const scrollToDashboard = () => {
    document.getElementById("looker-embed")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const content = useMemo(() => {
    if (focus === "general") {
      return {
        title: "¿Qué muestra este dashboard?",
        text: `Este dashboard explora cómo cambia el “valor real” de un salario según el lugar donde vives.
Muchas veces comparamos ingresos solo por el número (salario nominal), pero ese número no cuenta toda la historia:
el costo de vida y el contexto económico pueden hacer que un salario “alto” rinda menos, y que uno “moderado” alcance más.
Aquí podrás comparar regiones y perfiles (por ejemplo, nivel educativo y años de experiencia) y ver cómo se reordenan los resultados
cuando ajustamos por poder adquisitivo.`,
      };
    }
    if (focus === "experiencia") {
      return {
        title: "Experiencia individual",
        text: `En esta sección se enfatiza el rol de la trayectoria individual.
El mapa de Estados Unidos permite identificar patrones geográficos en el salario real promedio y ver cómo cambian las diferencias entre estados.
Usa los filtros (por ejemplo: nivel educativo y experiencia) para comparar perfiles y observar cómo el contexto regional modifica el poder adquisitivo.`,
      };
    }
    // industria y contexto (placeholder para que tú lo completes)
    return {
      title: "Industria y contexto",
      text: `Aquí iremos agregando la explicación de la segunda página del dashboard
(relación entre industria, condiciones del mercado laboral y variables de contexto).
[Espacio reservado para tu texto final].`,
    };
  }, [focus]);
  return (
      <div className="space-y-6">
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
        {/* (C) ¿QUÉ MUESTRA? (con 3 botones) + CTA */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.18)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="brand">Introducción</Pill>
                <Pill tone="cyan">Cómo leer</Pill>
              </div>
              {/* Botones */}
              <div className="mt-4 flex flex-wrap gap-2">
                <SmallTab
                    active={focus === "general"}
                    label="Descripción general"
                    onClick={() => setFocus("general")}
                />
                <SmallTab
                    active={focus === "experiencia"}
                    label="Experiencia individual"
                    onClick={() => setFocus("experiencia")}
                />
                <SmallTab
                    active={focus === "industria"}
                    label="Industria y contexto"
                    onClick={() => setFocus("industria")}
                />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-slate-700" />
                <h2 className="text-lg font-semibold text-slate-900">{content.title}</h2>
              </div>
              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                {content.text}
              </p>
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
                    onClick={scrollToDashboard}
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
        {/* (D) IFRAME (1 solo dashboard) */}
        <Card
            title="Dashboard principal"
            subtitle="Comparación y lectura del salario real ajustado"
            right={<Pill tone="cyan">Iframe</Pill>}
        >
          <div id="looker-embed" className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
              <div className="text-sm font-semibold text-slate-900">Dashboard</div>
              <div className="text-xs text-slate-500">Looker Studio embed</div>
            </div>
            <div className="h-[82vh] min-h-[650px]">
              {embedError ? (
                  <div className="flex h-full items-center justify-center bg-slate-50 p-6 text-center">
                    <div className="max-w-xl rounded-2xl border border-amber-200 bg-amber-50 p-5">
                      <p className="text-sm font-semibold text-amber-900">No se pudo cargar el embed</p>
                      <p className="mt-2 text-sm text-amber-800">{embedError}</p>
                      <a
                          href={LOOKER_EMBED_URL}
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
                      title="looker-dashboard"
                      src={LOOKER_EMBED_URL}
                      className="h-full w-full"
                      frameBorder={0}
                      style={{ border: 0 }}
                      allowFullScreen
                      // Nota: el sandbox oficial puede quedarse fuera si te da problemas.
                      // sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                      referrerPolicy="strict-origin-when-cross-origin"
                  />
              )}
            </div>
          </div>
        </Card>
      </div>
  );
}