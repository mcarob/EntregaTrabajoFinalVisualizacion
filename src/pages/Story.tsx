import React from "react";
import DashboardPage from "./Dashboard";
import DocsPage from "./Docs";
import PythonPage from "./Python";
import ComoLoHicimosPage from "./ComoLoHicimos";
import IntroSlide from "./IntroSlide";
import ScrollSection from "../components/ScrollSection";

const BG = {
    hero: `${import.meta.env.BASE_URL}images/hero.jpg`,
    dashboard: `${import.meta.env.BASE_URL}images/bg-dashboard.jpg`,
    docs: `${import.meta.env.BASE_URL}images/bg-docs.jpg`,
    python: `${import.meta.env.BASE_URL}images/bg-python.jpg`,
    como: `${import.meta.env.BASE_URL}images/bg-como.jpg`,
};

export default function StoryPage() {
    return (
        <div>
            <ScrollSection id="top" index={0} bgImage={BG.hero}>
                <IntroSlide />
            </ScrollSection>

            <ScrollSection
                id="dashboard"
                title="Dashboard"
                subtitle="Visualización principal (Looker Studio)"
                index={1}
                bgImage={BG.dashboard}
            >
                <DashboardPage />
            </ScrollSection>

            <ScrollSection
                id="docs"
                title="Documentación"
                subtitle="Modelado, decisiones y diccionario de datos"
                index={2}
                bgImage={BG.docs}
            >
                <DocsPage />
            </ScrollSection>

            <ScrollSection
                id="python"
                title="Transformaciones"
                subtitle="Notebook + informe técnico"
                index={3}
                bgImage={BG.python}
            >
                <PythonPage />
            </ScrollSection>

            <ScrollSection
                id="como"
                title="¿Cómo lo hicimos?"
                subtitle="Plan de trabajo + fuente del dataset"
                index={4}
                bgImage={BG.como}
            >
                <ComoLoHicimosPage />
            </ScrollSection>
        </div>
    );
}