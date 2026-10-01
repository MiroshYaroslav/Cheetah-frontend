import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ДОДАЛИ ХУК
import Container from "../../components/Container/Container";
import styles from "./Footer.module.css";

export default function Footer() {
    const location = useLocation();
    const { t } = useTranslation(); // ІНІЦІАЛІЗАЦІЯ ПЕРЕКЛАДУ

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert(`${t('footer.copied')}${text}`);
        });
    };

    const handleSamePageScroll = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
        if (location.pathname === "/") {
            const isModelSection = ["#enduro", "#cross", "#street", "#configurator"].includes(hash);

            if (isModelSection) {
                if (location.hash === hash) {
                    e.preventDefault();
                    const el = document.getElementById("model");
                    if (el) {
                        const offsetPosition = el.getBoundingClientRect().top + window.scrollY - 77;
                        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                    }
                }
            } else {
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

    return (
        <footer className={styles.footer}>
            <Container className={styles.footerContainer}>
                <div className={styles.topRow}>
                    <div className={styles.colContacts}>
                        <p className={styles.address}>{t('footer.address')}</p>
                        <div className={styles.contactItem}>
                            <span className={styles.contactLabel}>Email:</span>
                            <a href="mailto:cheetah@gmail.com" className={styles.contactLink}>cheetah@gmail.com</a>
                            <button className={styles.copyBtn} onClick={() => handleCopy("cheetah@gmail.com")} title="Copy email">
                                <img src="/copy.svg" alt="Copy" className={styles.copyIcon} />
                            </button>
                        </div>
                        <div className={styles.contactItem}>
                            <span className={styles.contactLabel}>{t('support.phonePlaceholder')}:</span>
                            <a href="tel:+3809347777866" className={styles.contactLink}>+38 09347777866</a>
                            <button className={styles.copyBtn} onClick={() => handleCopy("+38 09347777866")} title="Copy phone">
                                <img src="/copy.svg" alt="Copy" className={styles.copyIcon} />
                            </button>
                        </div>
                        <div className={styles.socials}>
                            <a href="#" aria-label="Facebook" className={styles.iconLink}>
                                <img src="/facebook.svg" alt="Facebook" className={styles.icon} />
                            </a>
                            <a href="#" aria-label="Instagram" className={styles.iconLink}>
                                <img src="/instagram.svg" alt="Instagram" className={styles.icon} />
                            </a>
                            <a href="#" aria-label="YouTube" className={styles.iconLink}>
                                <img src="/youtube.svg" alt="YouTube" className={styles.icon} />
                            </a>
                        </div>
                    </div>

                    <div className={styles.colLinks}>
                        <h3 className={styles.colTitle}>{t('footer.products')}</h3>
                        <nav className={styles.navGroup}>
                            <Link to="/#enduro" className={styles.link} onClick={(e) => handleSamePageScroll(e, "#enduro")}>{t('nav.enduro')}</Link>
                            <Link to="/#cross" className={styles.link} onClick={(e) => handleSamePageScroll(e, "#cross")}>{t('nav.cross')}</Link>
                            <Link to="/#street" className={styles.link} onClick={(e) => handleSamePageScroll(e, "#street")}>{t('nav.street')}</Link>
                            <Link to="/#parts" className={styles.link} onClick={(e) => handleSamePageScroll(e, "#parts")}>{t('nav.parts')}</Link>
                            <Link to="/#configurator" className={styles.link} onClick={(e) => handleSamePageScroll(e, "#configurator")}>{t('nav.configurator')}</Link>
                        </nav>
                    </div>

                    <div className={styles.colLinks}>
                        <h3 className={styles.colTitle}>{t('footer.info')}</h3>
                        <nav className={styles.navGroup}>
                            <Link to="/#about" className={styles.link} onClick={(e) => handleSamePageScroll(e, "#about")}>{t('nav.about')}</Link>
                            <Link to="/#faq" className={styles.link} onClick={(e) => handleSamePageScroll(e, "#faq")}>{t('nav.faq')}</Link>
                            <Link to="/cart" className={styles.link}>{t('nav.bag')}</Link>
                        </nav>
                    </div>

                    <div className={styles.colLinks}>
                        <h3 className={styles.colTitle}>{t('footer.legal')}</h3>
                        <nav className={styles.navGroup}>
                            <Link to="/privacy-policy" className={styles.link}>{t('nav.privacy')}</Link>
                        </nav>
                    </div>
                </div>

                <div className={styles.bottomSection}>
                    <div className={styles.copy}>
                        {t('footer.rights')}
                    </div>
                </div>
            </Container>

            <div className={styles.giantLogoWrap}>
                <img src="/cheetah-huge.svg" alt="CHEETAH" className={styles.giantLogo} />
            </div>
        </footer>
    );
}