import { useState } from "react";
import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Collapse from "../../components/Collapse/Collapse";
import styles from "./About.module.css";

export default function About() {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <section id="about" className={`section ${styles.section}`}>
            <Container>
                <SectionHeader
                    title="ABOUT US"
                    subtitle="We are a team that manufactures motorcycles according to your wishes."
                    collapsible
                    collapsed={collapsed}
                    onToggle={() => setCollapsed((v) => !v)}
                />

                <Collapse isOpen={!collapsed}>
                    <div className="textBox">
                        <p>The main uniqueness of our company is our own innovative frame, created using special technology. It provides increased rigidity, lightness of construction, and maximum controllability, making each of our motorcycles stable and reliable at any speed.</p>
                    </div>
                </Collapse>
            </Container>
        </section>
    );
}