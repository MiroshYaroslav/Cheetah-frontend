import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import { navLinks } from "../../data/siteData";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled((prev) => {
                if (!prev && y > 80) return true;
                if (prev && y < 40) return false;
                return prev;
            });
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={`${styles.header} ${scrolled ? styles.headerSolid : ""}`}>
            <Container className={styles.inner}>
                <div className={styles.left}>
                    <a className={styles.logo} href="#top" aria-label="Cheetah home">
                        <img src="/logo.svg" alt="logo" />
                    </a>

                    <nav className={`${styles.nav} ${open ? styles.navOpen : ""}`}>
                        {navLinks.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                className={styles.link}
                                onClick={() => setOpen(false)}
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>
                </div>

                <div className={styles.right}>
                    <div className={styles.langSwitch}>
                        <button className={`${styles.langBtn} ${styles.langInactive}`} type="button">
                            EN
                        </button>
                        <span className={styles.langDivider} />
                        <button className={`${styles.langBtn} ${styles.langActive}`} type="button">
                            UA
                        </button>
                    </div>

                    <button className={styles.cartBtn} type="button" aria-label="Cart">
                        <img src="/cart.svg" alt="cart" />
                    </button>

                    <button
                        className={styles.burger}
                        type="button"
                        aria-label="Menu"
                        onClick={() => setOpen((v) => !v)}
                    >
                        <span />
                        <span />
                    </button>
                </div>
            </Container>
        </header>
    );
}