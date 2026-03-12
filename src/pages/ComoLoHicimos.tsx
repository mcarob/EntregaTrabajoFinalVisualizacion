import React from "react";
import { Download, ExternalLink } from "lucide-react";
import { Card, Pill } from "../components/ui";
import useFileExists from "../components/useFileExists";

export default function ComoLoHicimosPage() {
  const PDF_PATH = `${import.meta.env.BASE_URL}docs/planDeTrabajo.pdf`;
  const exists = useFileExists(PDF_PATH);

  return (
    <div className="space-y-6">
      <Card
        title="Plan de trabajo"
        subtitle="Documento PDF"
        right={
          <div className="flex flex-wrap gap-2">
            <a
              href={PDF_PATH}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
            >
              <ExternalLink className="h-4 w-4" />
              Ver PDF
            </a>
            <a
              href={PDF_PATH}
              download
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
            >
              <Download className="h-4 w-4" />
              Descargar
            </a>
          </div>
        }
      >
        {exists === false ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            No se encontró el PDF en <b>public/docs/planDeTrabajo.pdf</b>.
            <div className="mt-2 text-xs text-amber-800">
              En GitHub Pages, si el archivo no existe, el servidor devuelve la app (index.html) y por eso puede verse “la página dentro del PDF”.
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="h-[72vh] min-h-[560px]">
              <iframe title="Plan de trabajo" src={PDF_PATH} className="h-full w-full" style={{ border: 0 }} />
            </div>
          </div>
        )}

        <div className="mt-3 text-xs text-slate-500">
          Coloca el archivo en: <b>public/docs/planDeTrabajo.pdf</b>
        </div>
      </Card>

      <Card title="Fuente de datos" subtitle="Origen del dataset utilizado" right={<Pill>Fuente</Pill>}>
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            La base de datos usada proviene de la encuesta salarial publicada en <b>Ask a Manager</b>.
          </p>
          <a
            href="https://www.askamanager.org/2021/04/how-much-money-do-you-make-4.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 underline"
          >
            <ExternalLink className="h-4 w-4" />
            Ver publicación (How much money do you make? 2021)
          </a>
          <p className="text-xs text-slate-500">
            Nota: la publicación explica el contexto de la encuesta y enlaza el archivo base.
          </p>
        </div>
      </Card>
    </div>
  );
}
