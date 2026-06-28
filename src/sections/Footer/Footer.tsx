import Container from "../../components/Container/Container";
import { navLinks } from "../../data/siteData";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.topSection}>
                    <div className={styles.leftBlock}>
                        <img src="/logo.svg" alt="Cheetah logo" className={styles.logoImg} />

                        <div className={styles.socials}>
                            <a href="#" aria-label="Instagram" className={styles.iconLink}>
                                <img src="/instagram.svg" alt="" className={styles.icon} />
                            </a>
                            <a href="#" aria-label="TikTok" className={styles.iconLink}>
                                <img src="/tiktok.svg" alt="" className={styles.icon} />
                            </a>
                        </div>

                        <div className={styles.locationBlock}>
                            <span className={styles.locationTitle}>Локація:</span>
                            <span className={styles.locationText}>м. Львів вул. Степана бандери 6</span>
                        </div>
                    </div>

                    <nav className={styles.nav}>
                        <a href="/" className={styles.link}>Home</a>
                        {navLinks.map((l) => (
                            <a key={l.href} href={l.href} className={styles.link}>
                                {l.label}
                            </a>
                        ))}
                    </nav>
                </div>

                <div className={styles.bottomSection}>
                    <div className={styles.copy}>
                        © «CHEETAH», 2025. Розроблено UI/UX дизайнером <span>Сачук Валерією</span>, 3D дизайнером <span>Бачкало Вікторією.</span>
                    </div>
                </div>
            </Container>
        </footer>
    );
}