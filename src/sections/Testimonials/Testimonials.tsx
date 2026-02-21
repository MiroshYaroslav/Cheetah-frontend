import Container from "../../components/Container/Container";
import { testimonials } from "../../data/siteData";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
    return (
        <section className={`section ${styles.section}`}>
            <Container>
                <div className={styles.grid}>
                    {testimonials.map((t, idx) => (
                        <article className={styles.card} key={`${t.name}-${idx}`}>
                            <div className={styles.quote}>“</div>
                            <p className={styles.text}>{t.text}</p>
                            <div className={styles.user}>
                                <div className={styles.avatar} aria-hidden="true" />
                                <div>
                                    <div className={styles.name}>{t.name}</div>
                                    <div className={styles.role}>{t.role}</div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );
}