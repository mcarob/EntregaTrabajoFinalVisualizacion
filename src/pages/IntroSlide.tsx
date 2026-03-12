import React from "react";
import { Pill } from "../components/ui";

export default function IntroSlide() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold leading-snug text-slate-900">
        Determinantes del salario real en Estados Unidos: una comparación entre experiencia individual y
        contexto socioeconómico
      </h1>

      <p className="text-sm text-slate-700">
        Desplázate hacia abajo para ver el dashboard, documentación, transformaciones y el plan de trabajo.
      </p>

      <div className="flex flex-wrap gap-2 pt-2">
        <Pill tone="brand">Desplázate y Descubre</Pill>
      </div>
    </div>
  );
}