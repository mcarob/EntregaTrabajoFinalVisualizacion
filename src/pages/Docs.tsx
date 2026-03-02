import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { Card, Pill, SectionTitle } from "../components/ui";

type DictRow = { variable: string; tipo: string; descripcion: string };

function parseMarkdownTable(md: string): DictRow[] {
  // Tomamos solo líneas tipo tabla: empiezan y terminan con |
  const lines = md
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.startsWith("|") && l.endsWith("|"));

  // Esperamos: header + separator + data...
  if (lines.length < 3) return [];

  const dataLines = lines.slice(2);

  return dataLines
      .map((line) =>
          line
              .split("|")
              .slice(1, -1)
              .map((c) => c.trim())
      )
      .filter((cells) => cells.length >= 3 && cells[0] && cells[1])
      .map((cells) => ({
        variable: cells[0],
        tipo: cells[1],
        descripcion: cells.slice(2).join(" | "), // por si el texto contiene '|'
      }));
}

export default function DocsPage() {
  // IMPORTANTE: coloca el archivo en public/docs/diccionario_datos.md
  const MD_PATH = `${import.meta.env.BASE_URL}docs/diccionario_datos.md`;

  const [dictRows, setDictRows] = useState<DictRow[]>([]);
  const [loadingDict, setLoadingDict] = useState(true);
  const [dictError, setDictError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoadingDict(true);
      setDictError(null);

      try {
        const res = await fetch(MD_PATH, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const md = await res.text();
        const rows = parseMarkdownTable(md);
        if (!cancelled) setDictRows(rows);
      } catch (e: any) {
        if (!cancelled) setDictError(e?.message || "Error cargando diccionario");
      } finally {
        if (!cancelled) setLoadingDict(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [MD_PATH]);

  return (
      <div className="space-y-6">
        <SectionTitle
            icon={FileText}
            title="Documentación"
            desc="Soporte del modelado: diccionario de variables, decisiones y pasos replicables."
            right={<Pill tone="brand">Docs</Pill>}
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <Card
              title="Diccionario de variables"
              subtitle="Variables clave (cargadas desde .md)"
              right={
                <a
                    href={MD_PATH}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-indigo-700 underline"
                    title="Abrir archivo .md"
                >
                  Schema
                </a>
              }
          >
            {loadingDict ? (
                <div className="text-sm text-slate-600">Cargando diccionario…</div>
            ) : dictError ? (
                <div className="text-sm text-rose-700">
                  No se pudo cargar el diccionario: {dictError}. Revisa que exista en{" "}
                  <b className="break-all">{MD_PATH}</b>
                </div>
            ) : dictRows.length === 0 ? (
                <div className="text-sm text-slate-600">
                  El archivo se cargó, pero no se encontró una tabla Markdown válida.
                  Asegúrate de que el `.md` tenga una tabla con columnas: Variable | Tipo | Descripción.
                </div>
            ) : (
                <div className="space-y-3 text-sm text-slate-700">
                  {dictRows.map((row, i) => (
                      <div
                          key={`${row.variable}-${i}`}
                          className="rounded-2xl border border-slate-200 bg-white p-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="font-semibold text-slate-900">{row.variable}</div>
                          <Pill>{row.tipo}</Pill>
                        </div>
                        <div className="mt-1 text-xs text-slate-500">{row.descripcion}</div>
                      </div>
                  ))}
                </div>
            )}
          </Card>

          <Card title="Decisiones" subtitle="Reglas que impactan visualizaciones">
            <ol className="space-y-3 text-sm text-slate-700">
              <li className="rounded-2xl border border-slate-200 bg-white p-4">
                <b className="text-slate-900">1) Reglas de Decisión 1</b>
                <div className="mt-1">detalle de regla de decisión 1</div>
              </li>
              <li className="rounded-2xl border border-slate-200 bg-white p-4">
                <b className="text-slate-900">2) Reglas de Decisión 2</b>
                <div className="mt-1">detalle de regla de decisión 2</div>
              </li>
              <li className="rounded-2xl border border-slate-200 bg-white p-4">
                <b className="text-slate-900">3) Reglas de Decisión 3</b>
                <div className="mt-1">detalle de regla de decisión 3.</div>
              </li>
            </ol>
          </Card>
        </div>
      </div>
  );
}