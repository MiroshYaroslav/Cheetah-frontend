import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // ДОДАЛИ ХУК
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import { faqs } from "../../data/siteData";
import styles from "./Support.module.css";

type FormState = {
    phone: string;
    email: string;
    type: "consultation" | "pre-order";
};

export default function Support() {
    const { t } = useTranslation(); // ІНІЦІАЛІЗАЦІЯ ПЕРЕКЛАДУ
    const [openIndex, setOpenIndex] = useState<number>(0);

    const [form, setForm] = useState<FormState>({
        phone: "+380",
        email: "",
        type: "consultation",
    });

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let digits = e.target.value.replace(/\D/g, "");

        if (digits.startsWith("0") && digits.length >= 10) {
            digits = "38" + digits;
        }
        else if (!digits.startsWith("38") && digits.length >= 9) {
            digits = "380" + digits;
        }

        if (!digits.startsWith("380")) {
            digits = "380";
        }

        digits = digits.slice(0, 12);
        setForm({ ...form, phone: "+" + digits });
    };

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        const isPhoneEmpty = form.phone === "+380";
        const isEmailEmpty = form.email.trim() === "";
        const hasValidPhone = form.phone.length === 13;

        if (isPhoneEmpty && isEmailEmpty) {
            alert(t('support.alertEmpty')); // Переклад алерту
            return;
        }

        if (!isPhoneEmpty && !hasValidPhone) {
            alert(t('support.alertPhone')); // Переклад алерту
            return;
        }

        console.log("Support form submitted:", form);
        alert(t('support.alertSuccess')); // Переклад алерту
        setForm({ phone: "+380", email: "", type: "consultation" });
    }

    const isPhoneRequired = form.email.trim() === "";
    const isEmailRequired = form.phone === "+380";

    return (
        <section id="support" className={styles.section}>
            <Container>
                <div className={styles.layout}>

                    {/* ЛІВА ЧАСТИНА: Форма */}
                    <form className={styles.formCol} onSubmit={onSubmit}>

                        <p className={styles.formIntro}>
                            {t('support.intro')} {/* ПЕРЕКЛАД */}
                        </p>

                        <div className={styles.fieldsWrap}>
                            <div className={styles.inputWrap}>
                                <span className={styles.flag} aria-hidden="true">
                                    <img src="/ukraine-flag.svg" alt="Flag" className={styles.flagImage} />
                                </span>
                                <input
                                    className={styles.input}
                                    value={form.phone}
                                    onChange={handlePhoneChange}
                                    placeholder={t('support.phonePlaceholder')} /* ПЕРЕКЛАД */
                                    type="tel"
                                    name="phone"
                                    autoComplete="tel"
                                    required={isPhoneRequired}
                                />
                            </div>

                            <div className={styles.divider}>
                                <span className={styles.line} />
                                <span className={styles.orText}>{t('support.or')}</span> {/* ПЕРЕКЛАД */}
                                <span className={styles.line} />
                            </div>

                            <div className={styles.inputWrap}>
                                <input
                                    className={styles.input}
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder={t('support.emailPlaceholder')} /* ПЕРЕКЛАД */
                                    type="email"
                                    required={isEmailRequired}
                                />
                            </div>

                            <div className={styles.radioGroup}>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="requestType"
                                        value="consultation"
                                        checked={form.type === "consultation"}
                                        onChange={() => setForm({ ...form, type: "consultation" })}
                                        className={styles.radioInput}
                                    />
                                    <span className={styles.radioCustom}></span>
                                    {t('support.consultation')} {/* ПЕРЕКЛАД */}
                                </label>

                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="requestType"
                                        value="pre-order"
                                        checked={form.type === "pre-order"}
                                        onChange={() => setForm({ ...form, type: "pre-order" })}
                                        className={styles.radioInput}
                                    />
                                    <span className={styles.radioCustom}></span>
                                    {t('support.preOrder')} {/* ПЕРЕКЛАД */}
                                </label>
                            </div>
                        </div>

                        <Button type="submit" variant="primary" fullWidth>
                            {t('support.send')} {/* ПЕРЕКЛАД */}
                        </Button>
                    </form>

                    {/* ПРАВА ЧАСТИНА: FAQ */}
                    <div className={styles.faqCol}>
                        <div className={styles.faqList}>
                            {faqs.map((it, i) => {
                                const isOpen = i === openIndex;

                                return (
                                    <div className={styles.item} key={i}>
                                        <div className={styles.header} onClick={() => setOpenIndex(isOpen ? -1 : i)}>
                                            {/* ПЕРЕКЛАД ПИТАННЯ */}
                                            <span className={styles.q}>
                                                {(it as any).qKey ? t((it as any).qKey) : it.q}
                                            </span>
                                            <button
                                                className={`${styles.iconBtn} ${isOpen ? styles.open : ""}`}
                                                aria-expanded={isOpen}
                                                type="button"
                                                aria-label="Toggle answer"
                                            >
                                                <img
                                                    src={isOpen ? "/minus.svg" : "/plus.svg"}
                                                    alt={isOpen ? "Collapse" : "Expand"}
                                                    className={styles.icon}
                                                />
                                            </button>
                                        </div>

                                        <div className={`${styles.body} ${isOpen ? styles.bodyOpen : ""}`}>
                                            {/* ПЕРЕКЛАД ВІДПОВІДІ */}
                                            <div className={styles.inner}>
                                                {(it as any).aKey ? t((it as any).aKey) : it.a}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
}