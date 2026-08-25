import Container from "../../components/Container/Container";
import styles from "./Footer.module.css";

export default function Footer() {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert(`Copied: ${text}`);
        });
    };

    return (
        <footer className={styles.footer}>
            <Container className={styles.footerContainer}>
                {/* --- ВЕРХНЯ ЧАСТИНА (Сітка 4 колонки) --- */}
                <div className={styles.topRow}>

                    {/* Колонка 1: Контакти */}
                    <div className={styles.colContacts}>
                        <p className={styles.address}>Lviv, 6 Stepan Bandera Street</p>

                        <div className={styles.contactItem}>
                            <span className={styles.contactLabel}>Email:</span>
                            <a href="mailto:cheetah@gmail.com" className={styles.contactLink}>cheetah@gmail.com</a>
                            <button className={styles.copyBtn} onClick={() => handleCopy("cheetah@gmail.com")} title="Copy email">
                                <img src="/copy.svg" alt="Copy" className={styles.copyIcon} />
                            </button>
                        </div>

                        <div className={styles.contactItem}>
                            <span className={styles.contactLabel}>Phone:</span>
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

                    {/* Колонка 2: Products */}
                    <div className={styles.colLinks}>
                        <h3 className={styles.colTitle}>Products</h3>
                        <nav className={styles.navGroup}>
                            <a href="#enduro" className={styles.link}>ENDURO</a>
                            <a href="#cross" className={styles.link}>CROSS</a>
                            <a href="#street" className={styles.link}>STREET</a>
                            <a href="#parts" className={styles.link}>PARTS</a>
                            <a href="#configurator" className={styles.link}>CONFIGURATOR</a>
                        </nav>
                    </div>

                    {/* Колонка 3: Info */}
                    <div className={styles.colLinks}>
                        <h3 className={styles.colTitle}>Info</h3>
                        <nav className={styles.navGroup}>
                            <a href="#about" className={styles.link}>ABOUT US</a>
                            <a href="#faq" className={styles.link}>FAQ</a>
                            <a href="#bag" className={styles.link}>BAG</a>
                        </nav>
                    </div>

                    {/* Колонка 4: Legal */}
                    <div className={styles.colLinks}>
                        <h3 className={styles.colTitle}>Legal</h3>
                        <nav className={styles.navGroup}>
                            <a href="#privacy" className={styles.link}>PRIVACY POLICY</a>
                        </nav>
                    </div>

                </div>

                {/* --- СЕРЕДНЯ ЧАСТИНА (Лінія та копірайт) --- */}
                <div className={styles.bottomSection}>
                    <div className={styles.copy}>
                        © CHEETAH, 2026. Design by Valeriia Sachuk | Frontend: Yaroslav | Backend: Volodymyr.
                    </div>
                </div>
            </Container>

            {/* --- НИЖНЯ ЧАСТИНА (Величезний логотип на всю ширину екрана) --- */}
            <div className={styles.giantLogoWrap}>
                <img src="/cheetah-huge.svg" alt="CHEETAH" className={styles.giantLogo} />
            </div>
        </footer>
    );
}