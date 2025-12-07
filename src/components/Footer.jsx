import "./Footer.css";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* COLUMNA 1 */}
        <div className="footer-col">
          <h3 className="footer-logo">DemographIQ Analytics</h3>
          <p className="footer-desc">{t("footer.desc")}</p>

          

          <div className="footer-contact">
            <span>📞 221 872 3647</span>
            <span>✉ contacto@demosight.com</span>
            <a href="/contacto">{t("footer.contact_form")}</a>
          </div>
        </div>

        {/* COLUMNA 2 */}
        <div className="footer-col">
          <h4>{t("footer.company")}</h4>
          <a href="/nosotros">{t("footer.about")}</a>
          <a href="/por-que-elegirnos">{t("footer.why")}</a>
          <a href="/casos">{t("footer.cases")}</a>
        </div>

        {/* COLUMNA 3 */}
        <div className="footer-col">
          <h4>{t("footer.services")}</h4>
          <a href="/simulador">{t("footer.simulator")}</a>
          <a href="/servicios">{t("footer.what_we_do")}</a>
          <a href="/precios">{t("footer.pricing")}</a>
        </div>

        {/* COLUMNA 4 */}
        <div className="footer-col">
          <h4>{t("footer.legal")}</h4>
          <a href="#">{t("footer.terms")}</a>
          <a href="#">{t("footer.privacy")}</a>
          <a href="#">{t("footer.data")}</a>
        </div>

      </div>

      <div className="footer-legal">
        <p>© 2025 DemographIQ Analytics.</p>
        <p>{t("footer.source")}</p>
      </div>

    </footer>
  );
}
