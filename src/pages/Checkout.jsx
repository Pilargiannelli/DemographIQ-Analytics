import { useParams } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Checkout.css";

export default function Checkout() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [paid, setPaid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPaid(true);

    setTimeout(() => {
      alert(t("checkout.alert_success"));
    }, 500);
  };

  return (
    <div className="checkout-fullpage">
      <div className="checkout-card">

        {paid ? (
          <div className="success-box">
            <div className="success-check">✔</div>
            <h2>{t("checkout.success_title")}</h2>
            <p>{t("checkout.success_text")}</p>
          </div>
        ) : (
          <>
            <h1>{t("checkout.title")} — {id}</h1>
            <p className="subtitle">{t("checkout.subtitle")}</p>

            <form className="checkout-form" onSubmit={handleSubmit}>

              <div className="row">
                <input type="text" placeholder={t("checkout.fullName")} required />
                <input type="email" placeholder={t("checkout.email")} required />
              </div>

              <div className="row">
                <input type="text" placeholder={t("checkout.country")} required />
                <input type="text" placeholder={t("checkout.address")} required />
              </div>

              <div className="row">
                <input type="text" placeholder={t("checkout.cardNumber")} required />
                <input type="text" placeholder={t("checkout.expiration")} required />
              </div>

              <div className="row">
                <input type="text" placeholder="CVV" required />
              </div>

              <button className="pay-btn" type="submit">
                {t("checkout.payBtn")}
              </button>

            </form>
          </>
        )}
      </div>
    </div>
  );
}
