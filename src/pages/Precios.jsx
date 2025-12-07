import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Precios.css";

export default function Precios() {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const planes = [
    {
      id: "Basic",
      titulo: t("pricing.basic_title"),
      precio: t("pricing.basic_price"),
      ventajas: t("pricing.basic_benefits", { returnObjects: true })
    },
    {
      id: "Professional",
      titulo: t("pricing.pro_title"),
      precio: t("pricing.pro_price"),
      ventajas: t("pricing.pro_benefits", { returnObjects: true })
    },
    {
      id: "Institutional",
      titulo: t("pricing.inst_title"),
      precio: t("pricing.inst_price"),
      ventajas: t("pricing.inst_benefits", { returnObjects: true })
    },
    {
      id: "Premium",
      titulo: t("pricing.premium_title"),
      precio: t("pricing.premium_price"),
      ventajas: t("pricing.premium_benefits", { returnObjects: true })
    }
  ];

  return (
    <section className="precios-section">
      <h2 className="precios-title">{t("pricing.title")}</h2>
      <p className="precios-subtitle">{t("pricing.subtitle")}</p>

      <div className="precios-grid">
        {planes.map(plan => (
          <div
            key={plan.id}
            className={`precio-card ${selectedPlan === plan.id ? "selected" : ""}`}
            onClick={() => {
              setSelectedPlan(plan.id);

              if (plan.id === "Premium") {
                window.location.href = "/contacto";
              } else {
                window.open(`/checkout/${plan.id}`, "_blank");
              }
            }}
          >
            <div className="precio-header">
              <h3>{plan.titulo}</h3>
              <span className="precio-valor">{plan.precio}</span>
            </div>

            <ul className="precio-ventajas">
              {plan.ventajas.map((v, i) => (
                <li key={i}>✔ {v}</li>
              ))}
            </ul>

            {selectedPlan === plan.id && <div className="precio-tick">✓</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
