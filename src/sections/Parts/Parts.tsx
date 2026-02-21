import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { parts } from "../../data/siteData";
import styles from "./Parts.module.css";

export default function Parts() {
    return (
        <section id="parts" className={`section ${styles.section}`}>
            <Container>
                <SectionHeader title="PARTS" subtitle="Components of our motorcycles" />

                <div className={styles.grid}>
                    {parts.map((p) => (
                        <article key={p.title} className={styles.card}>
                            <div className={styles.cardTop}>
                                {p.badge ? <span className={styles.badge}>{p.badge}</span> : <span />}
                                <button className={styles.cartBtn} type="button" aria-label="Add to cart">
                                    🛒
                                </button>
                            </div>

                            <div className={styles.imageWrap}>
                                <img src={p.image} alt={p.title} loading="lazy" />
                            </div>

                            <h3 className={styles.title}>{p.title}</h3>
                            <p className={styles.subtitle}>{p.subtitle}</p>
                            <div className={styles.priceRow}>
                                <span className={styles.price}>{p.price}</span>
                            </div>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );
}