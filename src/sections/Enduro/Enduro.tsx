import { useMemo, useState } from "react";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import { enduroStats } from "../../data/siteData";
import styles from "./Enduro.module.css";

type Slide = { src: string; alt: string };

export default function Enduro() {
    const images: Slide[] = useMemo(
        () => [
            { src: "/enduro-1.png", alt: "Enduro view 1" },
            { src: "/enduro-1.png", alt: "Enduro view 2" },
            { src: "/enduro-1.png", alt: "Enduro view 3" },
        ],
        []
    );

    const [index, setIndex] = useState(0);

    const isFirst = index === 0;
    const isLast = index === images.length - 1;

    const prev = () => {
        if (!isFirst) setIndex((i) => i - 1);
    };

    const next = () => {
        if (!isLast) setIndex((i) => i + 1);
    };

    return (
        <section id="model" className={`section ${styles.section}`}>
            <Container>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.left}>
                            <h2 className={styles.title}>ENDURO</h2>
                            <p className={styles.text}>
                                Experience the future of mobility with our lightweight, powerful electric motorcycles.
                                Engineered for those who demand excellence.
                            </p>

                            <Button href="#contact" variant="primary" className={styles.btn}>
                                <span className={styles.text_btn}>Configurator</span>
                                <span className={styles.icon}>
                  <img src="/arrow.svg" alt="arrow" />
                </span>
                            </Button>
                        </div>

                        <div className={styles.right}>
                            {enduroStats.map((s) => (
                                <div key={s.label} className={styles.stat}>
                                    <h2 className={styles.statLabel}>{s.label}</h2>
                                    <h2 className={styles.statValue}>{s.value}</h2>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.bikeWrap}>
                        <button className={styles.threeD} type="button" aria-label="3D view">
                            <img src="/gis_cube-3d.svg" alt="" />
                        </button>

                        <div className={styles.viewport}>
                            <div className={styles.track} style={{ transform: `translateX(-${index * 100}%)` }}>
                                {images.map((img, i) => (
                                    <div className={styles.slide} key={`${img.src}-${i}`}>
                                        <img className={styles.bike} src={img.src} alt={img.alt} loading="lazy" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.controls}>
                            <div className={styles.indicators} aria-label="Slide indicators">
                                {images.map((_, i) => (
                                    <span key={i} className={`${styles.dot} ${i === index ? styles.dotActive : ""}`} />
                                ))}
                            </div>

                            <div className={styles.arrows}>
                                <button
                                    className={`${styles.arrowBtn} ${isFirst ? styles.arrowDisabled : ""}`}
                                    type="button"
                                    onClick={prev}
                                    aria-label="Previous image"
                                    disabled={isFirst}
                                >
                                    <img src="/btn-arrow.svg" alt="" className={styles.arrowIcon} />
                                </button>

                                <button
                                    className={`${styles.arrowBtn} ${isLast ? styles.arrowDisabled : ""}`}
                                    type="button"
                                    onClick={next}
                                    aria-label="Next image"
                                    disabled={isLast}
                                >
                                    <img src="/btn-arrow.svg" alt="" className={`${styles.arrowIcon} ${styles.arrowRight}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}