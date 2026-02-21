import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import { enduroStats } from "../../data/siteData";
import styles from "./Enduro.module.css";

export default function Enduro() {
    return (
        <section id="model" className={`section ${styles.section}`}>
            <Container>
                <div className={styles.top}>
                    <div className={styles.left}>
                        <h2 className={styles.title}>ENDURO</h2>
                        <p className={styles.text}>
                            Lightweight, powerful electric motorcycle.
                            <br />
                            Engineered for those who demand excellence.
                        </p>

                        <Button href="#contact" variant="primary" size="lg" className={styles.btn}>
                            Configurator →
                        </Button>
                    </div>

                    <div className={styles.right}>
                        {enduroStats.map((s) => (
                            <div key={s.label} className={styles.stat}>
                                <div className={styles.statLabel}>{s.label}</div>
                                <div className={styles.statValue}>{s.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.bikeWrap}>
                    <img className={styles.bike} src="/images/enduro.png" alt="Enduro motorcycle" loading="lazy" />
                </div>
            </Container>
        </section>
    );
}