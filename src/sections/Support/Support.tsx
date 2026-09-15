import React, { useState } from "react";
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
    const [openIndex, setOpenIndex] = useState<number>(0);

    const [form, setForm] = useState<FormState>({
        phone: "+380", // За замовчуванням код України
        email: "",
        type: "consultation",
    });

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 1. Витягуємо з інпуту ВСІ цифри (ігноруємо плюси, пробіли, дужки, які міг вставити браузер)
        let digits = e.target.value.replace(/\D/g, "");

        // 2. Якщо автозаповнення вставило номер, що починається з "0" (наприклад 096...)
        if (digits.startsWith("0") && digits.length >= 10) {
            digits = "38" + digits;
        }
        // 3. Якщо автозаповнення вставило номер без коду взагалі (наприклад 96...)
        else if (!digits.startsWith("38") && digits.length >= 9) {
            digits = "380" + digits;
        }

        // 4. Залізобетонний захист: користувач не може стерти "380"
        if (!digits.startsWith("380")) {
            digits = "380";
        }

        // 5. Обмежуємо довжину: 12 цифр (380 + 9 цифр вашого номеру)
        digits = digits.slice(0, 12);

        // Записуємо в стейт, повертаючи плюс на початок
        setForm({ ...form, phone: "+" + digits });
    };

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        // --- НОВА ЛОГІКА ВАЛІДАЦІЇ ---
        const isPhoneEmpty = form.phone === "+380";
        const isEmailEmpty = form.email.trim() === "";
        const hasValidPhone = form.phone.length === 13;

        // 1. Якщо нічого не ввели
        if (isPhoneEmpty && isEmailEmpty) {
            alert("Please provide either a phone number or an email address.");
            return;
        }

        // 2. Якщо почали вводити телефон, але не дописали (менше 13 символів)
        if (!isPhoneEmpty && !hasValidPhone) {
            alert("Please enter a valid full phone number (+380XXXXXXXXX)");
            return;
        }

        console.log("Support form submitted:", form);
        alert("Sent! (demo)");
        setForm({ phone: "+380", email: "", type: "consultation" });
    }

    // --- ДИНАМІЧНІ required ---
    // Телефон обов'язковий, якщо email порожній
    const isPhoneRequired = form.email.trim() === "";
    // Email обов'язковий, якщо телефон порожній (дорівнює тільки "+380")
    const isEmailRequired = form.phone === "+380";

    return (
        <section id="support" className={styles.section}>
            <Container>
                <div className={styles.layout}>

                    {/* ЛІВА ЧАСТИНА: Форма */}
                    <form className={styles.formCol} onSubmit={onSubmit}>

                        <p className={styles.formIntro}>
                            If you would like to place a pre-order or get a consultation, please provide
                            your phone number if you prefer a call, or your email address for correspondence.
                        </p>

                        <div className={styles.fieldsWrap}>
                            <div className={styles.inputWrap}>
                                <span className={styles.flag} aria-hidden="true">
                                    <img src="/ukraine-flag.svg" alt="Flag" className={styles.flagImage} />
                                </span>
                                <input
                                    className={styles.input} /* ВИПРАВЛЕНО ТУТ: було inputPhone */
                                    value={form.phone}
                                    onChange={handlePhoneChange}
                                    placeholder="Phone"
                                    type="tel"
                                    name="phone"
                                    autoComplete="tel"
                                    required={isPhoneRequired}
                                />
                            </div>

                            <div className={styles.divider}>
                                <span className={styles.line} />
                                <span className={styles.orText}>or</span>
                                <span className={styles.line} />
                            </div>

                            <div className={styles.inputWrap}>
                                <input
                                    className={styles.input}
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="Email"
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
                                    Consultation
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
                                    Pre-order
                                </label>
                            </div>
                        </div>

                        <Button type="submit" variant="primary" fullWidth>
                            SEND
                        </Button>
                    </form>

                    {/* ПРАВА ЧАСТИНА: FAQ (залишається без змін) */}
                    <div className={styles.faqCol}>
                        <div className={styles.faqList}>
                            {faqs.map((it, i) => {
                                const isOpen = i === openIndex;

                                return (
                                    <div className={styles.item} key={i}>
                                        <div className={styles.header} onClick={() => setOpenIndex(isOpen ? -1 : i)}>
                                            <span className={styles.q}>{it.q}</span>
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
                                            <div className={styles.inner}>{it.a}</div>
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