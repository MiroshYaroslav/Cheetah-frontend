import Container from "../../components/Container/Container";
import { navLinks } from "../../data/siteData";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Container className={styles.inner}>
                <div className={styles.brand}>
                    <div className={styles.logo}>🦁</div>
                    <div>
                        <div className={styles.name}>CHEETAH</div>
                        <div className={styles.muted}>Electric motorcycles</div>
                    </div>
                </div>

                <nav className={styles.nav}>
                    {navLinks.map((l) => (
                        <a key={l.href} href={l.href} className={styles.link}>
                            {l.label}
                        </a>
                    ))}
                </nav>

                <div className={styles.copy}>© {new Date().getFullYear()} Cheetah. All rights reserved.</div>
            </Container>
        </footer>
    );
}