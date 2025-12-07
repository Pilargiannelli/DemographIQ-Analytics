import "./Casos.css";
import { useTranslation } from "react-i18next";

export default function Casos() {
  const { t } = useTranslation();

  return (
    <section className="casos-section">

      <h2 className="casos-title">{t("casos.title")}</h2>
      <p className="casos-subtitle">{t("casos.subtitle")}</p>

      {/* CASO 1 */}
      <div className="caso-row right">
        <div className="caso-panel caso-logo-1"></div>

        <div className="caso-text">
          <h3>{t("casos.c1_title")}</h3>
          <p>{t("casos.c1_text")}</p>
          <ul>
            <li>{t("casos.c1_li1")}</li>
            <li>{t("casos.c1_li2")}</li>
            <li>{t("casos.c1_li3")}</li>
          </ul>
        </div>
      </div>

      {/* CASO 2 */}
      <div className="caso-row right">
        <div className="caso-panel caso-logo-2"></div>

        <div className="caso-text">
          <h3>{t("casos.c2_title")}</h3>
          <p>{t("casos.c2_text")}</p>
          <ul>
            <li>{t("casos.c2_li1")}</li>
            <li>{t("casos.c2_li2")}</li>
            <li>{t("casos.c2_li3")}</li>
          </ul>
        </div>
      </div>

      {/* CASO 3 */}
      <div className="caso-row left">
        <div className="caso-text">
          <h3>{t("casos.c3_title")}</h3>
          <p>{t("casos.c3_text")}</p>
          <ul>
            <li>{t("casos.c3_li1")}</li>
            <li>{t("casos.c3_li2")}</li>
            <li>{t("casos.c3_li3")}</li>
          </ul>
        </div>
        <div className="caso-panel caso-logo-3"></div>
      </div>

      {/* CASO 4 */}
      <div className="caso-row right">
        <div className="caso-panel caso-logo-4"></div>

        <div className="caso-text">
          <h3>{t("casos.c4_title")}</h3>
          <p>{t("casos.c4_text")}</p>
          <ul>
            <li>{t("casos.c4_li1")}</li>
            <li>{t("casos.c4_li2")}</li>
            <li>{t("casos.c4_li3")}</li>
          </ul>
        </div>
      </div>

      {/* CASO 5 */}
      <div className="caso-row left">
        <div className="caso-text">
          <h3>{t("casos.c5_title")}</h3>
          <p>{t("casos.c5_text")}</p>
          <ul>
            <li>{t("casos.c5_li1")}</li>
            <li>{t("casos.c5_li2")}</li>
            <li>{t("casos.c5_li3")}</li>
          </ul>
        </div>
        <div className="caso-panel caso-logo-5"></div>
      </div>

    </section>
  );
}
