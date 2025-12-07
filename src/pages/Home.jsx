import "./Home.css";
import { Link } from "react-router-dom";
import logo from "../assets/Pilar.png";
import { useTranslation } from "react-i18next";
import logo1 from "../assets/uruIni.png";
import logo2 from "../assets/argeINI.png";
import logo3 from "../assets/paraINI.png";
import logo4 from "../assets/braINI.png";
import logo5 from "../assets/argINI.png";


export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="home">

      {/* ========== HERO ========== */}
      <section className="hero">

        {/* Logo */}
        <div className="hero-logo-container">
          <img src={logo} alt="DemographIQ Analytics Logo" className="hero-logo" />
        </div>

        <h1 className="hero-title">{t("home.hero_title")}</h1>

        <h2 className="hero-subtitle">
          {t("home.hero_subtitle")}
        </h2>

        <Link to="/simulador" className="hero-btn small">
          {t("home.hero_btn")} ▸
        </Link>
      </section>


      {/* ========== QUÉ HACEMOS ========== */}
      <section className="que-hacemos">
        <div className="qh-item">{t("home.qh1")}</div>
        <div className="qh-item">{t("home.qh2")}</div>
        <div className="qh-item">{t("home.qh3")}</div>
        <div className="qh-item">{t("home.qh4")}</div>
      </section>


      {/* ========== DIFERENCIALES ========== */}
      <section className="difs">
        <div className="dif-card">
          <h3>{t("home.dif1_title")}</h3>
          <p>{t("home.dif1_text")}</p>
        </div>

        <div className="dif-card">
          <h3>{t("home.dif2_title")}</h3>
          <p>{t("home.dif2_text")}</p>
        </div>

        <div className="dif-card">
          <h3>{t("home.dif3_title")}</h3>
          <p>{t("home.dif3_text")}</p>
        </div>
      </section>


      {/* ========== DEMO ========== */}
      <section className="demo">
        <div className="demo-box">
          <h2>{t("home.demo_title")}</h2>
          <p>{t("home.demo_text")}</p>

          <Link to="/simulador" className="demo-btn">
            {t("home.demo_btn")}
          </Link>
        </div>
      </section>


      {/* ========== TRUST ========== */}
<section className="trust">
  <h2>{t("home.trust_title")}</h2>

  <div className="trust-logos">
    <div className="trust-card" style={{ backgroundImage: `url(${logo1})` }}></div>
    <div className="trust-card" style={{ backgroundImage: `url(${logo2})` }}></div>
    <div className="trust-card" style={{ backgroundImage: `url(${logo3})` }}></div>
    <div className="trust-card" style={{ backgroundImage: `url(${logo4})` }}></div>
    <div className="trust-card" style={{ backgroundImage: `url(${logo5})` }}></div>
  </div>
</section>



      {/* ========== CTA FINAL ========== */}
      <section className="cta-final">
        <h2>{t("home.cta_title")}</h2>
        <p>{t("home.cta_text")}</p>
      </section>

    </div>
  );
}
