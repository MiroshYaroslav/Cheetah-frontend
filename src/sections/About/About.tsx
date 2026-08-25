import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import styles from "./About.module.css";

export default function About() {
    return (
        <section id="about" className={styles.section}>
            {/* Задній фон з картинкою та затемненням */}
            <div className={styles.bg}>
                <img src="/about-bg.png" alt="About us" className={styles.bgImage} />
                <div className={styles.overlay} />
            </div>

            <Container className={styles.inner}>
                <div className={styles.content}>
                    <SectionHeader
                        title="ABOUT US"
                        subtitle="The main uniqueness of our company is our own innovative frame, created using special technology. It provides increased rigidity, lightness of construction, and maximum controllability, making each of our motorcycles stable and reliable at any speed."
                        align="left"
                        subtitleAlign="left"
                        titleColor="#FFFFFF"
                        subtitleColor="rgba(255, 255, 255, 0.70)"
                    />
                </div>
            </Container>
        </section>
    );
}