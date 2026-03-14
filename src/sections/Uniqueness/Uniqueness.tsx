import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import styles from "./Uniqueness.module.css";

export default function Uniqueness() {
    return (
        <section id="uniqueness" className={`section ${styles.section}`}>
            <Container>
                <SectionHeader
                    title="UNIQUENESS"
                    subtitle="This unique frame, developed by us, is the basis for all our motorcycles."
                />
                <div className="textBox">
                    <p>
                        The main uniqueness of our company is our own innovative frame, created using special technology. It provides increased rigidity, lightness of construction, and maximum controllability, making each of our motorcycles stable and reliable at any speed.
                    </p>
                </div>
            </Container>
        </section>
    );
}