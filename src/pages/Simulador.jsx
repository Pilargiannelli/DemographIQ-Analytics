import { useState, useEffect } from "react";
import { loadPopulationData } from "../utils/loadPopulation";
import { fitExponential, predict } from "../models/exponentialFit";
import { useTranslation } from "react-i18next";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceArea
} from "recharts";

import "./Simulador.css";

const COLORES = {
  Argentina: "#6EB5FF",
  Brasil: "#8FFF8B",
  Uruguay: "#F7D774",
  Paraguay: "#FF8A8A",
  MERCOSUR: "#C29FFF",
};

const LAST_REAL = 2025;

export default function Simulador() {
  const { t } = useTranslation();

  const [data, setData] = useState(null);
  const [paisesSeleccionados, setPaisesSeleccionados] = useState([]);
  const [anioInicio, setAnioInicio] = useState(1900);
  const [anioFin, setAnioFin] = useState(2050);
  const [series, setSeries] = useState({});

  useEffect(() => {
    async function cargar() {
      const res = await loadPopulationData();
      setData(res);
      setPaisesSeleccionados(["Argentina"]);
    }
    cargar();
  }, []);

  const togglePais = (pais) => {
    setPaisesSeleccionados((prev) =>
      prev.includes(pais) ? prev.filter((x) => x !== pais) : [...prev, pais]
    );
  };

  const generarSerie = (pais) => {
    const hist = data[pais];
    const { a, b } = fitExponential(hist);
    let serie = [];

    for (let anio = anioInicio; anio <= anioFin; anio++) {
      if (anio <= LAST_REAL) {
        const real = hist.find((o) => o.anio === anio);
        if (real) {
          serie.push({ anio, poblacion: real.poblacion, tipo: "real", pais });
        }
      } else {
        const proyeccion = predict(a, b, anio);
        let valor = Math.round(proyeccion);
        if (isNaN(valor) || valor < 1) valor = null;
        serie.push({ anio, poblacion: valor, tipo: "proyectado", pais });
      }
    }
    return serie;
  };

  const combinarSeries = () => {
    const years = [...new Set(Object.values(series).flat().map(s => s.anio))]
      .sort((a, b) => a - b);

    return years.map((anio) => {
      const fila = { anio };
      Object.keys(series).forEach((pais) => {
        const punto = series[pais].find((v) => v.anio === anio);
        fila[pais] = punto ? punto.poblacion : null;
      });
      return fila;
    });
  };

  const generarCurvas = () => {
    if (!data) return;
    const nuevas = {};
    paisesSeleccionados.forEach((pais) => {
      nuevas[pais] = generarSerie(pais);
    });
    setSeries(nuevas);
  };

  const dataset = Object.keys(series).length > 0 ? combinarSeries() : [];

  const getPreviousValue = (pais, anioActual) => {
    const filaAnterior = dataset.find(row => row.anio === Number(anioActual) - 1);
    return filaAnterior && filaAnterior[pais] ? filaAnterior[pais] : null;
  };

  const getMaxPoblacion = () => {
    if (dataset.length === 0) return 1000000;
    let maxVal = 0;

    dataset.forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (key !== "anio" && row[key] && row[key] > maxVal) {
          maxVal = row[key];
        }
      });
    });

    return maxVal * 1.15;
  };

  const yMax = getMaxPoblacion();

  const generarTicks = () => {
    const ticks = [];
    for (let y = anioInicio; y <= anioFin; y += 5) ticks.push(y);
    return ticks;
  };

  // ============================================
  // CUSTOM TOOLTIP (con error corregido)
  // ============================================
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null;

    const resultados = [];

    payload.forEach((punto) => {
      const pais = punto.dataKey;
      const poblacionActual = punto.value;

      if (poblacionActual !== null) {
        const poblacionAnterior = getPreviousValue(pais, label);
        let crecimiento = null;

        if (poblacionAnterior) {
          crecimiento = ((poblacionActual - poblacionAnterior) / poblacionAnterior) * 100;
        }

        resultados.push({ pais, poblacion: poblacionActual, crecimiento });
      }
    });

    return (
      <div
        style={{
          background: "rgba(0,0,0,0.85)",
          padding: "12px",
          borderRadius: "8px",
          color: "#fff",
          border: "1px solid #555",
        }}
      >
        <strong>{t("simulator.year")} {label}</strong>
        <hr style={{ borderColor: "#555", margin: "8px 0" }} />

        {resultados.map((res) => (
          <div key={res.pais} style={{ marginBottom: "5px" }}>
            <span style={{ color: COLORES[res.pais], fontWeight: "bold" }}>
              {res.pais}
            </span>
            <br />
            {t("simulator.population")}: {res.poblacion.toLocaleString()}
            {res.crecimiento !== null && (
              <>
                <br />
                {t("simulator.growthIndex")}:
                <span
                  style={{
                    color: res.crecimiento >= 0 ? COLORES.Brasil : COLORES.Paraguay,
                    fontWeight: "bold",
                    marginLeft: "5px",
                  }}
                >
                  {res.crecimiento.toFixed(2)}%
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  // =======================================
  // DESCARGA PDF DEL GRÁFICO
  // =======================================
  const exportPDF = () => {
    const chart = document.getElementById("chart-container");

    html2canvas(chart, { scale: 2, backgroundColor: "#1a1a1a" }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 20, pdfWidth, pdfHeight);
      pdf.save("simulador-poblacional.pdf");
    });
  };

  // =====================================================
  // NUEVOS CÁLCULOS — NO MODIFICAN EL SIMULADOR
  // =====================================================
  const calcularCrecimiento = () => {
    if (!dataset || dataset.length === 0) return [];

    const inicio = dataset.find((d) => d.anio === anioInicio);
    const fin = dataset.find((d) => d.anio === anioFin);

    if (!inicio || !fin) return [];

    return paisesSeleccionados.map((pais) => {
      const valorInicio = inicio[pais] ?? null;
      const valorFin = fin[pais] ?? null;

      if (valorInicio === null || valorFin === null) {
        return {
          pais,
          inicio: null,
          fin: null,
          crecimientoAbs: null,
          crecimientoPct: 0,
        };
      }

      const crecimientoAbs = valorFin - valorInicio;
      const crecimientoPct =
        valorInicio > 0 ? (crecimientoAbs / valorInicio) * 100 : 0;

      return {
        pais,
        inicio: valorInicio,
        fin: valorFin,
        crecimientoAbs,
        crecimientoPct,
      };
    });
  };

  const resultadosCrec = calcularCrecimiento();

  return (
    <div className="simulador-page">
      <h1>{t("simulator.title")}</h1>

      <div className="sim-layout">

        {/* LEFT CARD */}
        <div className="sim-left">
          <div className="sim-form">

            <label>{t("simulator.selectCountries")}</label>

            <div className="pills-container">
              {data &&
                Object.keys(data).map((p) => {
                  const activo = paisesSeleccionados.includes(p);
                  return (
                    <div
                      key={p}
                      className={`pill ${activo ? "pill-active" : ""}`}
                      style={{ borderColor: COLORES[p] }}
                      onClick={() => togglePais(p)}
                    >
                      <span className="pill-dot" style={{ background: COLORES[p] }}></span>
                      <span>{p}</span>
                      {activo && <span className="pill-check">✓</span>}
                    </div>
                  );
                })}
            </div>

            <label>{t("simulator.startYear")}</label>
            <input
              type="number"
              value={anioInicio}
              onChange={(e) => setAnioInicio(Number(e.target.value))}
            />

            <label>{t("simulator.endYear")}</label>
            <input
              type="number"
              value={anioFin}
              onChange={(e) => setAnioFin(Number(e.target.value))}
            />

            <button onClick={generarCurvas}>
              {t("simulator.generate")}
            </button>

            <button
              onClick={exportPDF}
              style={{
                marginTop: "12px",
                padding: "10px 20px",
                backgroundColor: "#444",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              Descargar PDF del gráfico
            </button>

          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="sim-right">
          {dataset.length > 0 && (
            <div className="chart-box" id="chart-container">
              <h2>{t("simulator.chartTitle")}</h2>

              <ResponsiveContainer width="100%" height={650}>
                <LineChart
                  data={dataset}
                  margin={{ top: 40, right: 60, left: 40, bottom: 50 }}
                >
                  <CartesianGrid stroke="#333" strokeDasharray="4 4" opacity={0.5} />

                  <XAxis
                    dataKey="anio"
                    type="number"
                    ticks={generarTicks()}
                    stroke="#fff"
                    tick={{ fontSize: 15 }}
                  />

                  <YAxis
                    domain={[0, yMax]}
                    stroke="#fff"
                    tickFormatter={(v) =>
                      v >= 1_000_000 ? (v / 1_000_000).toFixed(1) + " M" : v.toLocaleString()
                    }
                    tick={{ fontSize: 15 }}
                  />

                  <Tooltip content={<CustomTooltip />} activeDot={{ r: 6 }} />

                  <ReferenceArea
                    x1={anioInicio}
                    x2={anioFin}
                    fill="#ffb766"
                    fillOpacity={0.15}
                  />

                  {Object.keys(series).map((pais, index) => (
                    <Line
                      key={pais}
                      type="monotone"
                      dataKey={pais}
                      stroke={COLORES[pais]}
                      strokeWidth={4}
                      dot={false}
                      isAnimationActive={false}
                      activeDot={{
                        r: 8,
                        stroke: COLORES[pais],
                        strokeWidth: 2,
                        fill: "#000",
                        zIndex: 2000 - index,
                      }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* ===============================================
    NUEVA CARD DE ANÁLISIS — TRADUCIDA A 3 IDIOMAS
================================================ */}
<div className="analysis-wrapper">
  <div className="analysis-card">
    <h2 className="analysis-title">{t("analysis.title")}</h2>

    {resultadosCrec.length === 0 ? (
      <p>{t("analysis.noData")}</p>
    ) : (
      <table className="analysis-table">
        <thead>
          <tr>
            <th>{t("analysis.country")}</th>
            <th>{t("analysis.startPop")} {anioInicio}</th>
            <th>{t("analysis.endPop")} {anioFin}</th>
            <th>{t("analysis.absGrowth")}</th>
            <th>{t("analysis.pctGrowth")}</th>
          </tr>
        </thead>

        <tbody>
          {resultadosCrec.map((row) => (
            <tr key={row.pais}>
              <td>{row.pais}</td>
              <td>{row.inicio?.toLocaleString() ?? "-"}</td>
              <td>{row.fin?.toLocaleString() ?? "-"}</td>
              <td>{row.crecimientoAbs?.toLocaleString() ?? "-"}</td>
              <td
                className={
                  row.crecimientoAbs >= 0
                    ? "growth-positive"
                    : "growth-negative"
                }
              >
                {row.crecimientoPct.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>

    </div>
  );
}
