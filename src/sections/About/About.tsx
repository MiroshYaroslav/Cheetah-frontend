import { useTranslation } from "react-i18next";
import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import styles from "./About.module.css";

export default function About() {
    const { t } = useTranslation();

    return (
        <section id="about" className={styles.section}>
            <div className={styles.bg}>
                <img src="/about-bg.png" alt="About us" className={styles.bgImage} />
                <div className={styles.overlay} />
            </div>

            <Container className={styles.inner}>
                <div className={styles.content}>
                    <SectionHeader
                        title="ABOUT US" // Залишаємо англійською для дизайну
                        subtitle={t('about.text')} // Перекладаємо опис
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