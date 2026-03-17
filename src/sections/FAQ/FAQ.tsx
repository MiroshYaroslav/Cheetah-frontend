import { useState } from "react";
import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { faqs } from "../../data/siteData";
import styles from "./FAQ.module.css";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number>(0);

    return (
        <section id="qa" className={styles.section}>
            <Container>
                <SectionHeader title="Q&A" align="left" />

                <div className={styles.faqList}>
                    {faqs.map((it, i) => {
                        const isOpen = i === openIndex;

                        return (
                            <div className={styles.item} key={i}>
                                <div className={styles.header}>
                                    <span className={styles.q}>{it.q}</span>

                                    <button
                                        className={`${styles.iconBtn} ${isOpen ? styles.open : ""}`}
                                        onClick={() => setOpenIndex(isOpen ? -1 : i)}
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
            </Container>
        </section>
    );
}