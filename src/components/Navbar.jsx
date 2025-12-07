import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLang = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="logo">DemographIQ Analytics</div>

      <ul className="nav-links">
        <li><Link className="nav-item" to="/">{t("menu.home")}</Link></li>
        <li><Link className="nav-item" to="/simulador">{t("menu.simulator")}</Link></li>
        <li><Link className="nav-item" to="/servicios">{t("menu.services")}</Link></li>
        <li><Link className="nav-item" to="/casos">{t("menu.cases")}</Link></li>
        <li><Link className="nav-item" to="/precios">{t("menu.plans")}</Link></li>
        <li><Link className="nav-item" to="/por-que-elegirnos">{t("menu.why")}</Link></li>
        <li><Link className="nav-item" to="/nosotros">{t("menu.about")}</Link></li>
        <li><Link className="nav-item" to="/contacto">{t("menu.contact")}</Link></li>
      </ul>

      {/* ==== SELECTOR DE IDIOMA PREMIUM ==== */}
      <select className="lang-selector" onChange={changeLang} value={i18n.language}>
        <option value="es">🇦🇷 ES</option>
        <option value="pt">🇧🇷 PT</option>
        <option value="en">🇺🇸 EN</option>
      </select>
    </nav>
  );
}
