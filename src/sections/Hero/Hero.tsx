import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div
                className={styles.bg}
                aria-hidden="true"
                style={{
                    backgroundImage:
                        "linear-gradient(90deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.0) 100%), url(/images/hero.jpg)",
                }}
            />

            <Container className={styles.inner}>
                <div className={styles.content}>
                    <h1 className={styles.title}>CHEETAH</h1>
                    <p className={styles.text}>
                        Experience the future of mobility with our lightweight, powerful electric motorcycles.
                        <br />
                        Engineered for those who demand excellence.
                    </p>

                    <div className={styles.ctaRow}>
                        <Button href="#model" variant="secondary" size="lg">
                            View models
                        </Button>
                    </div>

                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <div className={styles.featureTitle}>Charge</div>
                            <div className={styles.featureText}>Battery capacity is enough for 60+ km.</div>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureTitle}>Quick and easy</div>
                            <div className={styles.featureText}>Easy to drive.</div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}