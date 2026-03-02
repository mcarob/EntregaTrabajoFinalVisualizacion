import React from "react";
import { Code2, Download, ExternalLink, Eye } from "lucide-react";
import { Card, Pill, SectionTitle } from "../components/ui";
import NotebookViewer from "../components/NotebookViewer";

export default function PythonPage() {
    const NOTEBOOK_PATH = `${import.meta.env.BASE_URL}codigo/transformaciones.ipynb`;

    return (
        <div className="space-y-6">
            <SectionTitle
                icon={Code2}
                title="Python (Notebook)"
                desc="Notebook de transformaciones en Python (formato .ipynb)."
                right={<Pill tone="brand">.ipynb</Pill>}
            />

            <Card
                title="transformaciones.ipynb"
                subtitle="Puedes visualizarlo en la web o descargarlo."
                right={
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Visualizar (abre nueva pestaña) */}
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

                        {/* Descargar */}
                        <a
                            href={NOTEBOOK_PATH}
                            download
                            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                            title="Descargar el archivo .ipynb"
                        >
                            <Download className="h-4 w-4" />
                            Descargar
                        </a>

                        {/* Extra opcional (si tienes link al repo/archivo) */}
                        {/* <a
              href="https://github.com/...."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
              title="Ver en GitHub"
            >
              <ExternalLink className="h-4 w-4" />
              GitHub
            </a> */}
                    </div>
                }
            >
                <NotebookViewer path={NOTEBOOK_PATH} />
            </Card>
        </div>
    );
}