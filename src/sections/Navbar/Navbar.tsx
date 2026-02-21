import { useState } from "react";
import Container from "../../components/Container/Container";
import { navLinks } from "../../data/siteData";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className={styles.header}>
            <Container className={styles.inner}>
                <a className={styles.logo} href="#top" aria-label="Cheetah home">
                    <span className={styles.logoMark}>🦁</span>
                    <span className={styles.logoText}>CHEETAH</span>
                </a>

                <nav className={`${styles.nav} ${open ? styles.navOpen : ""}`}>
                    {navLinks.map((l) => (
                        <a key={l.href} href={l.href} className={styles.link} onClick={() => setOpen(false)}>
                            {l.label}
                        </a>
                    ))}
                </nav>

                <div className={styles.actions}>
                    <div className={styles.lang}>
                        <button className={styles.langBtn} type="button">UA</button>
                        <span className={styles.dot} />
                        <button className={styles.langBtnMuted} type="button">EN</button>
                    </div>

                    <button className={styles.burger} type="button" aria-label="Menu" onClick={() => setOpen(v => !v)}>
                        <span />
                        <span />
                    </button>
                </div>
            </Container>
        </header>
    );
}