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

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <header className={`${styles.header} ${scrolled || open ? styles.headerSolid : ""} ${open ? styles.headerMenuOpen : ""}`}>
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

                        <div
                            className={styles.overlay}
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen(false);
                            }}
                        />
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
                        className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
                        type="button"
                        aria-label="Menu"
                        onClick={() => setOpen((v) => !v)}
                    >
                        <BurgerSvg styles={styles} />
                    </button>
                </div>
            </Container>
        </header>
    );
}

function BurgerSvg({ styles }: { styles: Record<string, string> }) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.burgerSvg}
        >
            <path
                className={styles.lineTop}
                d="M4 6H20"
                stroke="#F6F6F6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                className={styles.lineMiddle}
                d="M4 12H20"
                stroke="#F6F6F6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                className={styles.lineBottom}
                d="M4 18H20"
                stroke="#F6F6F6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}