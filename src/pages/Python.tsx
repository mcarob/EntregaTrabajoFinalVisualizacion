import React from "react";
import { Code2 } from "lucide-react";
import { Card, Pill, SectionTitle } from "../components/ui";
import NotebookViewer from "../components/NotebookViewer";

export default function PythonPage() {
  // GitHub Pages serves static assets from the repository root.
  // Place the notebook at: /codigo/transformaciones.ipynb
  const NOTEBOOK_PATH = `${import.meta.env.BASE_URL}codigo/transformaciones.ipynb`;

  return (
    <div className="space-y-6">
      <SectionTitle
        icon={Code2}
        title="Python (Notebook)"
        desc="Notebook  de transformaciones por python."
        right={<Pill tone="brand">.ipynb</Pill>}
      />

      <Card
        title="transformaciones.ipynb"
        right={
          <a className="text-xs font-semibold text-indigo-700 underline" href={NOTEBOOK_PATH} target="_blank" rel="noreferrer">
            Abrir archivo
          </a>
        }
      >
        <NotebookViewer path={NOTEBOOK_PATH} />
      </Card>
    </div>
  );
}
