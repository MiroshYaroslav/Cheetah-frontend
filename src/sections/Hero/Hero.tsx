import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import styles from "./Hero.module.css";
import SectionHeader from "../../components/SectionHeader/SectionHeader";

export default function Hero() {
    const { t } = useTranslation();
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        videoRef.current?.play().catch(() => {});
    }, []);

    const toggleVideo = () => {
        const v = videoRef.current;
        if (!v) return;

        if (v.paused) {
            v.play();
            setPaused(false);
        } else {
            v.pause();
            setPaused(true);
        }
    };

    const scrollToEnduro = () => {
        const enduroSection = document.getElementById("model");
        if (enduroSection) {
            enduroSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="top" className={styles.hero}>
            <div className={styles.bg} aria-hidden="true">
                <video ref={videoRef} className={styles.video} autoPlay muted loop playsInline preload="metadata">
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
                <div className={styles.overlay} />
            </div>

            <Container className={styles.inner}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <SectionHeader
                            title={<span className={styles.giantTitleLogo} aria-label="CHEETAH" />}
                            subtitle={t('hero.subtitle')} // Переклад
                            align="left"
                            titleColor="var(--bg)"
                            subtitleColor="var(--bg)"
                            subtitleAlign="left"
                        />

                        <div className={styles.ctaRow}>
                            <Button
                                className={styles.heroBtn}
                                variant="secondary"
                                fullWidth
                                iconRight={<span className={styles.arrowIcon} />}
                                onClick={scrollToEnduro}
                            >
                                {t('ui.viewModels')} {/* Переклад */}
                            </Button>
                        </div>
                    </div>

                    <div className={styles.bottom}>
                        <div className={styles.bottomText}>
                            {t('hero.chargeText')} {/* Переклад */}
                        </div>

                        <div className={styles.bottomBtn}>
                            <button
                                className={styles.videoToggle}
                                type="button"
                                onClick={toggleVideo}
                                aria-label={paused ? "Play video" : "Pause video"}
                            >
                                <img src={paused ? "/play-icon.svg" : "/pause-icon.svg"} alt="Toggle" />
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}