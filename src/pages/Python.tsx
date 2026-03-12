import React from "react";
import { Code2, Download, Eye, FileText } from "lucide-react";
import { Card, Pill, SectionTitle } from "../components/ui";
import NotebookViewer from "../components/NotebookViewer";
import useFileExists from "../components/useFileExists";

export default function PythonPage() {
  const NOTEBOOK_PATH = `${import.meta.env.BASE_URL}codigo/transformaciones.ipynb`;
  const INFORME_PATH = `${import.meta.env.BASE_URL}docs/informeTecnico.pdf`;

  const nbExists = useFileExists(NOTEBOOK_PATH);
  const pdfExists = useFileExists(INFORME_PATH);

  return (
    <div className="space-y-6">
      <SectionTitle
        icon={Code2}
        title="Python (Notebook)"
        desc="Notebook de transformaciones en Python (formato .ipynb)."
        right={<Pill tone="brand">.ipynb</Pill>}
      />

      {/* Informe técnico */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.18)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-2">
              <FileText className="h-5 w-5 text-slate-800" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">INFORME TÉCNICO</div>
              <div className="mt-1 text-sm text-slate-600">
                Documento que explica las transformaciones realizadas sobre los datos.
              </div>
              <div className="mt-2 text-xs text-slate-500">
                Archivo: <b>public/docs/informeTecnico.pdf</b>
              </div>
              {pdfExists === false ? (
                <div className="mt-2 text-xs text-amber-800">
                  No se encontró el PDF. Si no existe, GitHub Pages puede devolver el index.html.
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={INFORME_PATH}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              title="Abrir el PDF en una nueva pestaña"
            >
              <Eye className="h-4 w-4" />
              Ver PDF
            </a>

            <a
              href={INFORME_PATH}
              download
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              title="Descargar el PDF"
            >
              <Download className="h-4 w-4" />
              Descargar
            </a>
          </div>
        </div>
      </div>

      {/* Notebook (con scroll interno para que no sea eterno) */}
      <Card
        title="transformaciones.ipynb"
        subtitle="Puedes visualizarlo en la web o descargarlo."
        right={
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={NOTEBOOK_PATH}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
              title="Abrir el archivo en una nueva pestaña"
            >
              <Eye className="h-4 w-4" />
              Visualizar
            </a>

            <a
              href={NOTEBOOK_PATH}
              download
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
              title="Descargar el archivo .ipynb"
            >
              <Download className="h-4 w-4" />
              Descargar
            </a>
          </div>
        }
      >
        {nbExists === false ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            No se encontró el notebook en <b>public/codigo/transformaciones.ipynb</b>.
            <div className="mt-2 text-xs text-amber-800">
              Si el archivo no existe, GitHub Pages devuelve el index.html y el visor no puede leer el JSON del notebook.
            </div>
          </div>
        ) : (
          <div className="max-h-[78vh] overflow-auto rounded-2xl border border-slate-200 bg-white p-4">
            <NotebookViewer path={NOTEBOOK_PATH} />
          </div>
        )}
      </Card>
    </div>
  );
}
