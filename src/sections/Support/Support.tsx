import { useState } from "react";
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
        phone: "",
        email: "",
        type: "consultation",
    });

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log("Support form submitted:", form);
        alert("Sent! (demo)");
        setForm({ phone: "", email: "", type: "consultation" });
    }

    return (
        <section id="support" className={styles.section}>
            <Container>
                <div className={styles.layout}>

                    {/* ЛІВА ЧАСТИНА: Форма */}
                    <form className={styles.formCol} onSubmit={onSubmit}>

                        {/* 1. Текст */}
                        <p className={styles.formIntro}>
                            If you would like to place a pre-order or get a consultation, please provide
                            your phone number if you prefer a call, or your email address for correspondence.
                        </p>

                        {/* 2. Блок з усіма полями */}
                        <div className={styles.fieldsWrap}>
                            <div className={styles.inputWrap}>
                                <span className={styles.flag} aria-hidden="true">
                                    <img src="/ukraine-flag.svg" alt="Flag" className={styles.flagImage} />
                                </span>
                                <input
                                    className={styles.input}
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    placeholder="Phone"
                                    type="tel"
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

                        {/* 3. Кнопка */}
                        <Button type="submit" variant="primary" fullWidth>
                            SEND
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