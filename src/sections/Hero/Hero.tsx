import { useEffect, useRef, useState } from "react";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import styles from "./Hero.module.css";
import SectionHeader from "../../components/SectionHeader/SectionHeader";

export default function Hero() {
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
                <video
                    ref={videoRef}
                    className={styles.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                >
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </video>

                <div className={styles.overlay} />
            </div>

            <Container className={styles.inner}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <SectionHeader
                            title={
                                /* Замінили img на span для використання CSS-маски */
                                <span
                                    className={styles.giantTitleLogo}
                                    aria-label="CHEETAH"
                                />
                            }
                            subtitle={
                                <>
                                    Experience the future of mobility with our lightweight, powerful electric motorcycles.<br />
                                    Engineered for those who demand excellence.
                                </>
                            }
                            align="left"
                            titleColor="var(--bg)"
                            subtitleColor="var(--bg)"
                            subtitleAlign="left"
                        />

                        <div className={styles.ctaRow}>
                            <div className={styles.ctaRow}>
                                <Button
                                    className={styles.heroBtn}
                                    variant="secondary"
                                    fullWidth
                                    iconRight={<span className={styles.arrowIcon} />}
                                    onClick={scrollToEnduro} /* <--- Додано сюди */
                                >
                                    VIEW MODELS
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.bottom}>
                        {/* НОВИЙ БЛОК ТЕКСТУ */}
                        <div className={styles.bottomText}>
                            Charge: The battery capacity is sufficient for active driving
                        </div>

                        <div className={styles.bottomBtn}>
                            <button
                                className={styles.videoToggle}
                                type="button"
                                onClick={toggleVideo}
                                aria-label={paused ? "Play video" : "Pause video"}
                                title={paused ? "Play" : "Pause"}
                            >
                                {paused ? (
                                    <img src="/play-icon.svg" alt="Play"/>
                                ) : (
                                    <img src="/pause-icon.svg" alt="Pause"/>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}