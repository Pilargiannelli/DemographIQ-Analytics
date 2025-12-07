import "./Servicios.css";
import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation();

  return (
    <section className="serv-section">

      
      {/* TÍTULO PRINCIPAL */}
      <div className="serv-hero">
        <h1>{t("services.hero_title")}</h1>
        <p>{t("services.hero_text")}</p>
      </div>

      {/* GRID DE SERVICIOS */}
      <div className="serv-grid">

        <div className="serv-card">
          <div className="serv-icon">📊</div>
          <h3>{t("services.card1_title")}</h3>
          <p>{t("services.card1_text")}</p>
        </div>

        <div className="serv-card">
          <div className="serv-icon">🌎</div>
          <h3>{t("services.card2_title")}</h3>
          <p>{t("services.card2_text")}</p>
        </div>

        <div className="serv-card">
          <div className="serv-icon">⚡</div>
          <h3>{t("services.card3_title")}</h3>
          <p>{t("services.card3_text")}</p>
        </div>

        <div className="serv-card">
          <div className="serv-icon">🏛️</div>
          <h3>{t("services.card4_title")}</h3>
          <p>{t("services.card4_text")}</p>
        </div>

        <div className="serv-card">
          <div className="serv-icon">🏢</div>
          <h3>{t("services.card5_title")}</h3>
          <p>{t("services.card5_text")}</p>
        </div>

        <div className="serv-card">
          <div className="serv-icon">🎯</div>
          <h3>{t("services.card6_title")}</h3>
          <p>{t("services.card6_text")}</p>
        </div>

      </div>

      {/* CTA FINAL */}
      <div className="serv-cta">
        <h2>{t("services.cta_title")}</h2>
        <p>{t("services.cta_text")}</p>

        <a href="/contacto" className="serv-btn">
          {t("services.cta_btn")} ▸
        </a>
      </div>

    </section>
  );
}
