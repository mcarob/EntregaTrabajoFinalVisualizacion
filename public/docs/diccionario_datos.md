# Diccionario de datos — Base: Análisis Salarial

**Total de observaciones:** 18.883

| Variable | Tipo técnico | Tipo analítico | Descripción | Rango / Categorías (resumen) | Nulos |
|---|---|---|---|---|---|
| Fecha_registro | datetime | Temporal continua | Fecha en la que el encuestado registró su información salarial. | 27/04/2021 – 02/02/2026 | 0% |
| rango_edad | Object | Categórica ordinal | Rango de edad del encuestado. | 25-34, 35-44, 45-54, 18-24, 55-64 | 0% |
| industria | Object | Categórica nominal (alta cardinalidad) | Industria específica en la que trabaja el encuestado. | 918 categorías | 0% |
| nombre_trabajo | Object | Categórica nominal (muy alta cardinalidad) | Cargo o título específico del puesto de trabajo. | 10.211 categorías | 0% |
| experiencia_general | Object | Categórica ordinal | Años de experiencia laboral total. | 11–20, 8–10, 5–7, 21–30 años | 0% |
| experiencia_campo | Object | Categórica ordinal | Años de experiencia en el campo específico de trabajo. | (no especificado) | 0% |
| nivel_educacion | Object | Categórica ordinal | Nivel educativo alcanzado por el encuestado. | College, Master’s, Some college, PhD | 0% |
| genero | Object | Categórica nominal | Género con el que se identifica el encuestado. | Woman, Man, Non-binary | 0% |
| etnia | Object | Categórica nominal | Identificación étnica del encuestado. | (no especificado) | 0% |
| pais | Object | Constante | País de residencia del encuestado. | United States (único) | 0% |
| estado | Object | Categórica nominal | Estado de residencia del encuestado. | 51 categorías | 0% |
| ciudad | Object | Categórica nominal (alta cardinalidad) | Ciudad de residencia del encuestado. | 1.531 categorías | 0% |
| ciudad_capital | Boolean | Binaria | Indica si la ciudad es capital del estado. | True / False | 0% |
| industria_grupo | Object | Categórica nominal | Agrupación general de la industria. | 17 categorías | 0,86% |
| salario_anual | Integer | Numérica continua | Salario anual base en moneda original. | Media 77.441; 0 – 192.000 | 0% |
| salario_adicional_anual | Integer | Numérica continua | Compensación adicional anual (bonos, incentivos). | Media 17.786 | 0% |
| moneda | Object | Categórica nominal | Moneda en la que se reporta el salario original. | USD (principal) | 0,02% |
| FX_TO_COP | Float | Numérica continua | Tasa de cambio usada para convertir a COP. | (no especificado) | 0,02% |
| FX_date | Datetime | Temporal constante | Fecha de referencia del tipo de cambio aplicado. | 01/03/2026 (único) | 0% |
| salario_anual_cop | Float | Numérica continua | Salario anual convertido a COP. | (derivado) | 0,02% |
| salario_adicional_anual_cop | Float | Numérica continua | Compensación adicional anual convertida a COP. | (derivado) | 0,02% |
| salario_total_anual_cop | Float | Numérica continua | Suma salario base + adicional anual en COP. | (derivado) | 0,02% |
| salario_mensual_total_cop | Float | Numérica continua | Salario total mensual en COP. | (derivado) | 0,02% |
| anio | Integer | Temporal discreta | Año del registro salarial. | 2021 – 2026 | 0% |
| anio_trimestre | Object | Categórica temporal | Año y trimestre del registro. | (no especificado) | 0% |
| rpp | Float | Numérica continua | Regional Price Parity (índice de paridad regional de precios). | 86,22 – 112,59 | 0,21% |
| salario_mensual_real_ajustado | Float | Numérica continua | Salario mensual ajustado por paridad regional de precios. | (derivado) | 0,23% |
| salario_anual_real_ajustado | Float | Numérica continua | Salario anual ajustado por paridad regional de precios. | (derivado) | 0,23% |
| gdp | Float | Numérica continua | Producto Interno Bruto asociado a la región o periodo. | (no especificado) | 0,12% |
| gdp_cop | Float | Numérica continua | Producto Interno Bruto convertido a COP. | (derivado) | 0,13% |