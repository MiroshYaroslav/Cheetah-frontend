import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // 1. ДОДАЛИ ІМПОРТ ХУКА
import Container from "../../components/Container/Container";
import { navLinks } from "../../data/siteData";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    // 2. ІНІЦІАЛІЗУЄМО ПЕРЕКЛАД
    const { t, i18n } = useTranslation();

    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const headerRef = useRef<HTMLElement>(null);

    const isAlwaysLight =
        location.pathname === "/cart" ||
        location.pathname === "/checkout" ||
        location.pathname === "/order-placed" ||
        location.pathname === "/privacy-policy";

    useEffect(() => {
        if (location.pathname === "/") {
            const hash = location.hash.toLowerCase();

            if (!hash) {
                window.scrollTo(0, 0);
                return;
            }

            if (["#enduro", "#cross", "#street", "#configurator"].includes(hash)) return;

            const targetId = hash === "#faq" ? "support" : hash.replace("#", "");

            setTimeout(() => {
                const el = document.getElementById(targetId);
                if (el) {
                    const offsetPosition = el.getBoundingClientRect().top + window.scrollY - 77;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
            }, 100);
        }
    }, [location]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setOpen(false);

        const hash = href.replace("/", "");
        if (!hash.startsWith("#")) return;

        if (location.pathname === "/") {
            const isModelSection = ["#enduro", "#cross", "#street", "#configurator"].includes(hash);

            if (location.hash === hash) {
                e.preventDefault();
                const targetId = isModelSection ? "model" : (hash === "#faq" ? "support" : hash.replace("#", ""));
                const el = document.getElementById(targetId);
                if (el) {
                    const offsetPosition = el.getBoundingClientRect().top + window.scrollY - 77;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
            } else if (!isModelSection) {
                const targetId = hash === "#faq" ? "support" : hash.replace("#", "");
                setTimeout(() => {
                    const el = document.getElementById(targetId);
                    if (el) {
                        const offsetPosition = el.getBoundingClientRect().top + window.scrollY - 77;
                        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                    }
                }, 10);
            }
        }
    };

    const handleLogoClick = () => {
        if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            if (location.hash) {
                navigate("/", { replace: true });
            }
        } else {
            navigate("/");
        }
    };

    useEffect(() => {
        const updateHeaderHeight = () => {
            if (headerRef.current) {
                const height = headerRef.current.offsetHeight;
                document.documentElement.style.setProperty('--header-height', `${height}px`);
            }
        };
        updateHeaderHeight();
        window.addEventListener("resize", updateHeaderHeight);
        return () => window.removeEventListener("resize", updateHeaderHeight);
    }, []);

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

    const headerClasses = [
        styles.header,
        (isAlwaysLight || scrolled || open) ? styles.headerScrolled : "",
        open ? styles.headerMenuOpen : ""
    ].filter(Boolean).join(" ");

    return (
        <header ref={headerRef} className={headerClasses}>
            <Container className={styles.inner}>
                <div className={styles.left}>
                    <button className={styles.logo} onClick={handleLogoClick} aria-label="Cheetah home" style={{background: 'none', border: 'none', cursor: 'pointer', padding: 0}}>
                        <img src="/logo.svg" alt="logo" />
                    </button>

                    <nav className={`${styles.nav} ${open ? styles.navOpen : ""}`}>
                        {navLinks.map((l) => (
                            <Link
                                key={l.href}
                                to={l.href.startsWith("#") ? `/${l.href}` : l.href}
                                className={styles.link}
                                onClick={(e) => handleNavClick(e, l.href)}
                            >
                                {/* 3. МАГІЯ ТУТ: Якщо є ключ перекладу — перекладаємо, інакше показуємо оригінал */}
                                {(l as any).labelKey ? t((l as any).labelKey) : l.label}
                            </Link>
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
                    {/* 4. ОЖИВЛЯЄМО ПЕРЕМИКАЧ МОВ */}
                    <div className={styles.langSwitch}>
                        <button
                            className={`${styles.langBtn} ${i18n.language === 'en' ? styles.langActive : styles.langInactive}`}
                            type="button"
                            onClick={() => i18n.changeLanguage('en')}
                        >
                            EN
                        </button>
                        <button
                            className={`${styles.langBtn} ${i18n.language === 'uk' ? styles.langActive : styles.langInactive}`}
                            type="button"
                            onClick={() => i18n.changeLanguage('uk')}
                        >
                            UA
                        </button>
                    </div>

                    <button className={styles.cartBtn} type="button" aria-label="Cart" onClick={() => navigate("/cart")}>
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.burgerSvg}>
            <path className={styles.lineTop} d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path className={styles.lineMiddle} d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path className={styles.lineBottom} d="M4 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}