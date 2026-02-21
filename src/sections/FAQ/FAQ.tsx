import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Accordion from "../../components/Accordion/Accordion";
import { faqs } from "../../data/siteData";
import styles from "./FAQ.module.css";

export default function FAQ() {
    return (
        <section id="qa" className={`section ${styles.section}`}>
            <Container>
                <SectionHeader title="Q&A" align="left" />
                <div className={styles.wrap}>
                    <Accordion items={faqs} />
                </div>
            </Container>
        </section>
    );
}