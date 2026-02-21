import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import styles from "./About.module.css";

export default function About() {
    return (
        <section id="about" className={`section ${styles.section}`}>
            <Container>
                <SectionHeader
                    title="ABOUT US"
                    subtitle="We are a team that manufactures motorcycles according to your wishes."
                />
                <div className={styles.textBox}>
                    <p>
                        We build electric motorcycles with an emphasis on reliability, control, and custom configuration.
                        Тут ти потім підставиш реальний текст про бренд, команду і технологію.
                    </p>
                </div>
            </Container>
        </section>
    );
}