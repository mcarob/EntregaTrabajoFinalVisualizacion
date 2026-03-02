import React from "react";
import { FileText } from "lucide-react";
import { Card, Pill, SectionTitle } from "../components/ui";

export default function DocsPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        icon={FileText}
        title="Documentación"
        desc="Soporte del modelado: diccionario de variables, decisiones y pasos replicables."
        right={<Pill tone="brand">Docs</Pill>}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Diccionario de variables" subtitle="Variables clave" right={<Pill>Schema</Pill>}>
          <div className="space-y-3 text-sm text-slate-700">
            {[
              ["variable", "tipo", "Descripción clara + ejemplo de uso."],
              ["…", "…", "…"],
            ].map((row, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold text-slate-900">{row[0]}</div>
                  <Pill>{row[1] as string}</Pill>
                </div>
                <div className="mt-1 text-xs text-slate-500">{row[2] as string}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Decisiones" subtitle="Reglas que impactan visualizaciones" >
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
              <b className="text-slate-900">3) Reglas de Decisión 2</b>
              <div className="mt-1">detalle de regla de decisión 3.</div>
            </li>
          </ol>
        </Card>
      </div>
    </div>
  );
}
