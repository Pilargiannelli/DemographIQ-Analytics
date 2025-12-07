import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Contacto.css";

export default function Contacto() {
  const { t } = useTranslation();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: ""
  });

  const [valid, setValid] = useState({
    nombre: null,
    email: null,
    mensaje: null
  });

  const [sent, setSent] = useState(false);

  // === VALIDACIONES ===
  const validate = (field, value) => {
    let isValid = true;

    if (field === "nombre") isValid = value.trim().length >= 3;
    if (field === "email") isValid = /\S+@\S+\.\S+/.test(value);
    if (field === "mensaje") isValid = value.trim().length >= 10;

    setValid((prev) => ({ ...prev, [field]: isValid }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validate(name, value);
  };

  // === PASOS ===
  const nextStep = () => {
    if (step === 1 && valid.nombre && valid.email) setStep(2);
    else if (step === 2 && valid.mensaje) setStep(3);
  };

  // === ENVÍO FINAL ===
  const handleSubmit = () => {
    setSent(true);

    setTimeout(() => {
      setSent(false);
      setStep(1);
      setForm({ nombre: "", email: "", mensaje: "" });
      setValid({ nombre: null, email: null, mensaje: null });
    }, 2500);
  };

  return (
    <section className="contact-section">
      <div className="contact-container">

        {/* IZQUIERDA */}
        <div className="contact-info">
          <h2>{t("contact.title")}</h2>
          <p>{t("contact.subtitle")}</p>

          <div className="info-item">📞 221 872 3647</div>
          <div className="info-item">📧 contacto@demograph.com</div>
          <div className="info-item">{t("contact.hours")}</div>

          {/* BLOQUE INSTAGRAM */}
<div className="contact-ig-box">
  <h4>{t("social.followUs")}</h4>


  <a
    href="https://www.instagram.com/demographiq?igsh=aDlndW1pNnUzNnRn&utm_source=qr"
    target="_blank"
    className="contact-ig-btn"
  >
    🌐 @demographiq
  </a>
</div>

        </div>

        {/* FORMULARIO */}
        <div className="contact-form">

          {/* PASO 1 */}
          {step === 1 && (
            <>
              <h3>{t("contact.step1_title")}</h3>

              <div className="input-group">
                <input
                  type="text"
                  name="nombre"
                  placeholder=" "
                  className={valid.nombre === null ? "" : valid.nombre ? "valid" : "invalid"}
                  value={form.nombre}
                  onChange={handleChange}
                />
                <label>{t("contact.fullName")}</label>
              </div>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder=" "
                  className={valid.email === null ? "" : valid.email ? "valid" : "invalid"}
                  value={form.email}
                  onChange={handleChange}
                />
                <label>{t("contact.email")}</label>
              </div>

              <button className="contact-btn" onClick={nextStep}>
                {t("contact.next")} →
              </button>
            </>
          )}

          {/* PASO 2 */}
          {step === 2 && (
            <>
              <h3>{t("contact.step2_title")}</h3>

              <div className="input-group">
                <textarea
                  name="mensaje"
                  placeholder=" "
                  rows="6"
                  className={valid.mensaje === null ? "" : valid.mensaje ? "valid" : "invalid"}
                  value={form.mensaje}
                  onChange={handleChange}
                />
                <label>{t("contact.message")}</label>

                {!valid.mensaje && form.mensaje.length > 0 && (
                  <p className="input-error">{t("contact.error_message")}</p>
                )}
              </div>

              <button className="contact-btn" onClick={nextStep}>
                {t("contact.continue")} →
              </button>
            </>
          )}

          {/* PASO 3 */}
          {step === 3 && (
            <>
              <h3>{t("contact.step3_title")}</h3>
              <p>{t("contact.review")}</p>

              <div className="summary-box">
                <strong>{t("contact.fullName")}:</strong> {form.nombre} <br />
                <strong>{t("contact.email")}:</strong> {form.email} <br />
                <strong>{t("contact.message")}:</strong> {form.mensaje}
              </div>

              <button className="contact-btn" onClick={handleSubmit}>
                {t("contact.send")} ✔
              </button>

              {sent && (
                <div className="success-msg">
                  ✔ {t("contact.success")}
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </section>
  );
}
