import React, { useEffect, useState } from "react";
import { Pill } from "./ui";
type NbCell = {
  cell_type: "markdown" | "code" | string;
  source?: string[] | string;
  outputs?: any[];
  execution_count?: number | null;
};
type Notebook = {
  cells?: NbCell[];
};
function normalizeSource(src?: string[] | string) {
  if (!src) return "";
  return Array.isArray(src) ? src.join("") : src;
}
function safeText(x: unknown) {
  if (typeof x === "string") return x;
  if (Array.isArray(x)) return x.map((v) => (typeof v === "string" ? v : "")).join("");
  return "";
}
function OutputBlock({ output }: { output: any }) {
  if (!output) return null;
  if (output.output_type === "stream") {
    const text = safeText(output.text);
    if (!text.trim()) return null;
    return (
      <pre className="mt-2 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-5 text-slate-800">
        {text}
      </pre>
    );
  }
  const data = output.data || {};
  if (data["image/png"]) {
    const b64 = data["image/png"];
    const src = `data:image/png;base64,${typeof b64 === "string" ? b64 : safeText(b64)}`;
    return (
      <div className="mt-2 overflow-auto rounded-xl border border-slate-200 bg-white p-3">
        <img src={src} alt="notebook output" className="max-w-full" />
      </div>
    );
  }
  const text = safeText(data["text/plain"] || output.text || output.evalue);
  if (!text.trim()) return null;
  return (
    <pre className="mt-2 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-5 text-slate-800">
      {text}
    </pre>
  );
}
function NotebookCell({ cell }: { cell: NbCell }) {
  const src = normalizeSource(cell.source);
  if (cell.cell_type === "markdown") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="whitespace-pre-wrap text-sm leading-6 text-slate-800">{src}</div>
      </div>
    );
  }
  if (cell.cell_type === "code") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <Pill>Code</Pill>
          <div className="text-xs text-slate-500">
            {typeof cell.execution_count === "number" ? `In [${cell.execution_count}]` : "In [ ]"}
          </div>
        </div>
        <pre className="overflow-auto rounded-xl border border-slate-200 bg-slate-900 p-3 text-xs leading-5 text-slate-50">
          {src}
        </pre>
        {Array.isArray(cell.outputs) && cell.outputs.length > 0 ? (
          <div className="mt-3">
            {cell.outputs.map((o, idx) => (
              <OutputBlock key={idx} output={o} />
            ))}
          </div>
        ) : null}
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-xs font-semibold text-slate-600">{cell.cell_type}</div>
      <pre className="mt-2 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-5 text-slate-800">
        {src}
      </pre>
    </div>
  );
}
export default function NotebookViewer({ path }: { path: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nb, setNb] = useState<Notebook | null>(null);
  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError(null);
      setNb(null);
      try {
        const res = await fetch(path, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status} al cargar ${path}`);
        const json = (await res.json()) as Notebook;
        if (!cancelled) setNb(json);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Error cargando notebook");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [path]);
  const cells = nb?.cells || [];
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
        Cargando notebook…
      </div>
    );
  }
  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
        No se pudo cargar el notebook: {error}
        <div className="mt-2 text-xs text-rose-700">
          Verifica que exista en GitHub Pages en: <b>{path}</b> (extensión <b>.ipynb</b>)
        </div>
      </div>
    );
  }
  if (cells.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
        Notebook cargado, pero no se encontraron celdas.
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {cells.map((c, i) => (
        <NotebookCell key={i} cell={c} />
      ))}
    </div>
  );
}
