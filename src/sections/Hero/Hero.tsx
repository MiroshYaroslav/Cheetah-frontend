import { useEffect, useRef, useState } from "react";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import styles from "./Hero.module.css";

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

    return (
        <section className={styles.hero}>
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
                        <h1 className={styles.title}>CHEETAH</h1>
                        <p className={styles.text}>
                            Experience the future of mobility with our lightweight, powerful electric motorcycles.
                            <br />
                            Engineered for those who demand excellence.
                        </p>

                        <div className={styles.ctaRow}>
                            <Button className={styles.heroBtn} variant="secondary">
                                View models
                            </Button>
                        </div>
                    </div>

                    <div className={styles.bottom}>
                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <div className={styles.featureTitle}>Charge</div>
                                <div className={styles.featureText}>Battery capacity is enough for 60+ km.</div>
                            </div>
                            <div className={styles.feature}>
                                <div className={styles.featureTitle}>Quick and easy</div>
                                <div className={styles.featureText}>Easy to drive.</div>
                            </div>
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