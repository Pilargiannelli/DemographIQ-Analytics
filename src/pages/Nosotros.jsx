import "./Nosotros.css";
import { useTranslation } from "react-i18next";
import piliFoto from "../assets/equipo/pili.jpg";
import berniFoto from "../assets/equipo/berni.jpg";
import tomiFoto from "../assets/equipo/tomi.jpg";
import martiFoto from "../assets/equipo/marti.jpg";


export default function Nosotros() {
  const { t } = useTranslation();

  return (
    <section className="nos-section">

      {/* HERO */}
      <div className="nos-hero">
        <h1>{t("about.title")}</h1>
        <p>{t("about.subtitle")}</p>
      </div>

      {/* VIDEO PRESENTACIÓN (versión pequeña) */}
<div className="nos-video-wrapper">
  <iframe
    className="nos-video-small"
    src="https://www.youtube.com/embed/eBOvmrCwB9g"
    title="DemographIQ video"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>


      {/* HISTORIA */}
      <div className="nos-historia">
        <h2>{t("about.history_title")}</h2>
        <p>{t("about.history_text")}</p>
      </div>

      {/* EQUIPO */}
      <div className="nos-equipo">
        <p className="equipo-subtitle">{t("about.team_intro")}</p>

        <div className="equipo-grid">

          <div className="equipo-card">
            <img src={piliFoto} className="foto" />
            <h3 className="equipo-nombre">Pilar Giannelli</h3>
            <p className="equipo-puesto">{t("about.role_strategy")}</p>
          </div>

          <div className="equipo-card">
            <img src={berniFoto} className="foto" />
            <h3 className="equipo-nombre">Bernardo La Gioiosa</h3>
            <p className="equipo-puesto">{t("about.role_executive")}</p>
          </div>

          <div className="equipo-card">
            <img src={tomiFoto} className="foto" />
            <h3 className="equipo-nombre">Tomás Terruli</h3>
            <p className="equipo-puesto">{t("about.role_tech")}</p>
          </div>

          <div className="equipo-card">
            <img src={martiFoto} className="foto" />
            <h3 className="equipo-nombre">Martina Castellani</h3>
            <p className="equipo-puesto">{t("about.role_ops")}</p>
          </div>

        </div>
      </div>

      {/* VALORES */}
      <div className="nos-valores-container">
        <h2>{t("about.values_title")}</h2>

        <div className="nos-valores-grid">
          <div className="valor-card"><h3>{t("about.value1_title")}</h3><p>{t("about.value1_text")}</p></div>
          <div className="valor-card"><h3>{t("about.value2_title")}</h3><p>{t("about.value2_text")}</p></div>
          <div className="valor-card"><h3>{t("about.value3_title")}</h3><p>{t("about.value3_text")}</p></div>
          <div className="valor-card"><h3>{t("about.value4_title")}</h3><p>{t("about.value4_text")}</p></div>
        </div>
      </div>

      {/* 🔥 INSTAGRAM DESTACADO */}
      <div className="ig-highlight-nos">
        <h3>{t("social.followUs")}</h3>
        <p>{t("social.igText")}</p>

        <a
          href="https://www.instagram.com/demographiq?igsh=aDlndW1pNnUzNnRn&utm_source=qr"
          className="ig-button"
          target="_blank"
        >
          <span className="ig-icon">📊</span> @demographiq
        </a>
      </div>

    </section>
  );
}
