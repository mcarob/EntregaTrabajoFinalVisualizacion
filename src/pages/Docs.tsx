import React, { useEffect, useMemo, useState } from "react";
import { FileText } from "lucide-react";
import { Card, Pill, SectionTitle } from "../components/ui";
type DictRow = {
  variable: string;
  tipoTecnico?: string;
  tipoAnalitico?: string;
  descripcion?: string;
  rangoCategorias?: string;
  nulos?: string;
};
function parseMarkdownTable(md: string): DictRow[] {
  // captura líneas de tabla markdown
  const lines = md
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.startsWith("|") && l.endsWith("|"));
  // header + separator + data...
  if (lines.length < 3) return [];
  const headerCells = lines[0]
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim().toLowerCase());
  const dataLines = lines.slice(2);
  const idx = (name: string) =>
      headerCells.findIndex((h) => h === name || h.includes(name));
  const iVar = idx("variable");
  const iTec = idx("tipo técnico");
  const iAna = idx("tipo analítico");
  const iDesc = idx("descripción");
  const iRango = idx("rango");
  const iNulos = idx("nulos");
  return dataLines
      .map((line) =>
          line
              .split("|")
              .slice(1, -1)
              .map((c) => c.trim())
      )
      .filter((cells) => cells.length >= 3)
      .map((cells) => {
        // fallback por si el header no coincide 100%
        const variable = iVar >= 0 ? cells[iVar] : cells[0];
        const tipoTecnico = iTec >= 0 ? cells[iTec] : cells[1];
        const tipoAnalitico = iAna >= 0 ? cells[iAna] : cells[2];
        const descripcion =
            iDesc >= 0 ? cells[iDesc] : cells.length >= 4 ? cells[3] : "";
        const rangoCategorias =
            iRango >= 0 ? cells[iRango] : cells.length >= 5 ? cells[4] : "";
        const nulos = iNulos >= 0 ? cells[iNulos] : cells.length >= 6 ? cells[5] : "";
        return {
          variable: variable || "",
          tipoTecnico: tipoTecnico || "",
          tipoAnalitico: tipoAnalitico || "",
          descripcion: descripcion || "",
          rangoCategorias: rangoCategorias || "",
          nulos: nulos || "",
        };
      })
      .filter((r) => r.variable);
}
export default function DocsPage() {
  // archivos en public/docs/
  const MD_PATH = `${import.meta.env.BASE_URL}docs/diccionario_datos.md`;
  const PDF_PATH = `${import.meta.env.BASE_URL}docs/diccionario.pdf`;
  const [rows, setRows] = useState<DictRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(MD_PATH, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const md = await res.text();
        const parsed = parseMarkdownTable(md);
        if (!cancelled) setRows(parsed);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || "Error cargando diccionario");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [MD_PATH]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => {
      const hay =
          `${r.variable} ${r.tipoTecnico} ${r.tipoAnalitico} ${r.descripcion} ${r.rangoCategorias} ${r.nulos}`.toLowerCase();
      return hay.includes(q);
    });
  }, [rows, query]);
  return (
      <div className="space-y-6">
        <SectionTitle
            icon={FileText}
            title="Documentación"
            desc="Soporte del modelado: reglas, decisiones y diccionario de datos."
            right={<Pill tone="brand">Docs</Pill>}
        />
        {/* 1) Reglas de decisión ARRIBA */}
        <Card
            title="Reglas y decisiones de modelado"
            subtitle="Qué transformaciones hicimos y por qué (para interpretar bien el dashboard)."
            right={<Pill tone="cyan">Decisiones</Pill>}
        >
          <ol className="space-y-3 text-sm text-slate-700">
            <li className="rounded-2xl border border-slate-200 bg-white p-4">
              <b className="text-slate-900">1) Conversión de moneda (FX → COP)</b>
              <div className="mt-1">
                Los salarios se convierten a COP usando <b>FX_TO_COP</b> y la fecha <b>FX_date</b>, para comparar en una misma moneda.
              </div>
            </li>
            <li className="rounded-2xl border border-slate-200 bg-white p-4">
              <b className="text-slate-900">2) Salario total</b>
              <div className="mt-1">
                Se calcula <b>salario_total_anual_cop</b> = salario base + salario adicional, y su equivalente mensual.
              </div>
            </li>
            <li className="rounded-2xl border border-slate-200 bg-white p-4">
              <b className="text-slate-900">3) Ajuste por poder adquisitivo (RPP)</b>
              <div className="mt-1">
                Se generan variables “reales ajustadas” usando <b>rpp</b>, para comparar el valor real del salario según el contexto regional.
              </div>
            </li>
          </ol>
        </Card>
        {/* 2) Diccionario ABAJO */}
        <Card
            title="Diccionario de datos"
            subtitle="Cargado dinámicamente desde diccionario_datos.md (y PDF disponible para lectura completa)."
            right={
              <a
                  href={PDF_PATH}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-indigo-700 underline"
                  title="Abrir diccionario.pdf"
              >
                Abrir PDF
              </a>
            }
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="brand">{filtered.length} variables</Pill>
              <Pill>Fuente: diccionario_datos.md</Pill>
            </div>
            <div className="w-full sm:w-[360px]">
              <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar variable, tipo, descripción…"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
          <div className="mt-4">
            {loading ? (
                <div className="text-sm text-slate-600">Cargando diccionario…</div>
            ) : err ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
                  No se pudo cargar el diccionario: <b>{err}</b>
                  <div className="mt-2 text-xs text-rose-700">
                    Verifica que exista en: <b className="break-all">{MD_PATH}</b>
                  </div>
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-sm text-slate-600">
                  No hay resultados para tu búsqueda.
                </div>
            ) : (
                <div className="overflow-auto rounded-2xl border border-slate-200">
                  <table className="min-w-[1100px] w-full text-left text-sm">
                    <thead className="sticky top-0 bg-slate-50">
                    <tr className="text-slate-700">
                      <th className="px-4 py-3 font-semibold">Variable</th>
                      <th className="px-4 py-3 font-semibold">Tipo técnico</th>
                      <th className="px-4 py-3 font-semibold">Tipo analítico</th>
                      <th className="px-4 py-3 font-semibold">Descripción</th>
                      <th className="px-4 py-3 font-semibold">Rango / categorías</th>
                      <th className="px-4 py-3 font-semibold">Nulos</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((r, i) => (
                        <tr key={`${r.variable}-${i}`} className="border-t border-slate-200 bg-white">
                          <td className="px-4 py-3 font-semibold text-slate-900">{r.variable}</td>
                          <td className="px-4 py-3 text-slate-700">{r.tipoTecnico || "—"}</td>
                          <td className="px-4 py-3 text-slate-700">{r.tipoAnalitico || "—"}</td>
                          <td className="px-4 py-3 text-slate-700">{r.descripcion || "—"}</td>
                          <td className="px-4 py-3 text-slate-700">{r.rangoCategorias || "—"}</td>
                          <td className="px-4 py-3 text-slate-700">{r.nulos || "—"}</td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
            )}
          </div>
          <div className="mt-3 text-xs text-slate-500">
            Tip: Si el diccionario es largo, usa el buscador. Para lectura completa y formato original, usa <b>Abrir PDF</b>.
          </div>
        </Card>
      </div>
  );
}