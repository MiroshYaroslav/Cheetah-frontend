import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ДОДАЛИ ХУК
import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import styles from "./PrivacyPolicy.module.css";

export default function PrivacyPolicy() {
    const { t } = useTranslation(); // ІНІЦІАЛІЗАЦІЯ ПЕРЕКЛАДУ

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const privacySubtitle = (
        <div className={styles.headerTextWrap}>
            <p style={{ paddingBottom: "8px" }}>{t('privacy.sub1')}</p>
            <p>{t('privacy.sub2')}</p>
        </div>
    );

    return (
        <div className={styles.page}>
            <Container>
                <div className={styles.layout}>
                    <div className={styles.headerWrap}>
                        <SectionHeader title={t('privacy.title')} subtitle={privacySubtitle} align="left" subtitleAlign="left" /> {/* ПЕРЕКЛАД */}
                    </div>

                    <div className={styles.content}>
                        <section className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTitle}><span className={styles.bullet}>•</span> {t('privacy.sec1Title')}</h2>
                                <p className={styles.text}>{t('privacy.sec1Text1')}</p>
                            </div>
                            <div className={styles.subSection}>
                                <h3 className={styles.subTitle}>{t('privacy.sec1Sub1')}</h3>
                                <ul className={styles.list}>
                                    <li>{t('privacy.sec1Li1')}</li>
                                    <li>{t('privacy.sec1Li2')}</li>
                                </ul>
                            </div>
                            <div className={styles.subSection}>
                                <h3 className={styles.subTitle}>{t('privacy.sec1Sub2')}</h3>
                                <p className={styles.text}>{t('privacy.sec1Text2')}</p>
                                <ul className={styles.list}>
                                    <li>{t('privacy.sec1Li3')}</li>
                                    <li>{t('privacy.sec1Li4')}</li>
                                    <li>{t('privacy.sec1Li5')}</li>
                                    <li>{t('privacy.sec1Li6')}</li>
                                </ul>
                                <p className={styles.text}>{t('privacy.sec1Text3')}</p>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTitle}><span className={styles.bullet}>•</span> {t('privacy.sec2Title')}</h2>
                                <p className={styles.text}>{t('privacy.sec2Text')}</p>
                            </div>
                            <ul className={styles.list}>
                                <li>{t('privacy.sec2Li1')}</li>
                                <li>{t('privacy.sec2Li2')}</li>
                            </ul>
                        </section>

                        <section className={styles.sectionTight}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTitle}><span className={styles.bullet}>•</span> {t('privacy.sec3Title')}</h2>
                                <p className={styles.text}>{t('privacy.sec3Text1')}</p>
                            </div>
                            <ul className={styles.list}>
                                <li>{t('privacy.sec3Li1')}</li>
                                <li>{t('privacy.sec3Li2')}</li>
                            </ul>
                            <p className={styles.text}>{t('privacy.sec3Text2')}</p>
                        </section>

                        <section className={styles.sectionTight}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTitle}><span className={styles.bullet}>•</span> {t('privacy.sec4Title')}</h2>
                                <p className={styles.text}>{t('privacy.sec4Text')}</p>
                            </div>
                            <ul className={styles.list}>
                                <li>{t('privacy.sec4Li1')}</li>
                                <li>{t('privacy.sec4Li2')}</li>
                                <li>{t('privacy.sec4Li3')}</li>
                                <li>{t('privacy.sec4Li4')}</li>
                                <li>{t('privacy.sec4Li5')}</li>
                            </ul>
                            <p className={styles.text}>
                                {t('privacy.sec4End')} <Link to="/#support" className={styles.link}>{t('privacy.sec4Link')}</Link>
                            </p>
                        </section>
                    </div>
                </div>
            </Container>
        </div>
    );
}