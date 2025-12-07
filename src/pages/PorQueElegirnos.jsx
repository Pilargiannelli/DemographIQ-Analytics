import "./PorQueElegirnos.css";
import { useTranslation } from "react-i18next";

export default function PorQueElegirnos() {
  const { t } = useTranslation();

  return (
    <section className="pq-section">

      <h2 className="pq-title">{t("why.title")}</h2>
      <p className="pq-subtitle">{t("why.subtitle")}</p>

      <div className="pq-grid">

        <div className="pq-card">
          <h3>{t("why.card1_title")}</h3>
          <p>{t("why.card1_text")}</p>
        </div>

        <div className="pq-card">
          <h3>{t("why.card2_title")}</h3>
          <p>{t("why.card2_text")}</p>
        </div>

        <div className="pq-card">
          <h3>{t("why.card3_title")}</h3>
          <p>{t("why.card3_text")}</p>
        </div>

        <div className="pq-card">
          <h3>{t("why.card4_title")}</h3>
          <p>{t("why.card4_text")}</p>
        </div>

        <div className="pq-card">
          <h3>{t("why.card5_title")}</h3>
          <p>{t("why.card5_text")}</p>
        </div>

        <div className="pq-card">
          <h3>{t("why.card6_title")}</h3>
          <p>{t("why.card6_text")}</p>
        </div>

      </div>

      <div className="pq-diferencial">
        <h3>{t("why.diff_title")}</h3>
        <p>{t("why.diff_text")}</p>

        <ul>
          {t("why.diff_list", { returnObjects: true }).map((item, i) => (
            <li key={i}>✔ {item}</li>
          ))}
        </ul>
      </div>

    </section>
  );
}
