import { useState } from "react";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import { enduroBike } from "../../data/motorcycleData";
import styles from "./Enduro.module.css";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Configurator from "../../components/Configurator/Configurator";

export default function Enduro() {
    const [index, setIndex] = useState(0);
    const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

    const images = enduroBike.images;
    const isFirst = index === 0;
    const isLast = index === images.length - 1;

    const prev = () => {
        if (!isFirst) setIndex((i) => i - 1);
    };

    const next = () => {
        if (!isLast) setIndex((i) => i + 1);
    };

    const toggleConfigurator = () => {
        setIsConfiguratorOpen(!isConfiguratorOpen);
    };

    // Оновлена кнопка конфігуратора
    const renderConfiguratorBtn = (className: string) => (
        <Button
            onClick={toggleConfigurator}
            variant="outline" // Прозорий фон, чорний текст і чорний бордер
            fullWidth         // Розтягуємо на всю ширину батька
            className={className}
            iconRight={
                <span className={`${styles.arrowIcon} ${isConfiguratorOpen ? styles.arrowIconOpen : ''}`} />
            }
        >
            {isConfiguratorOpen ? 'CLOSE CONFIGURATOR' : 'CONFIGURATOR'}
        </Button>
    );

    return (
        <section id="model" className={`section ${styles.section}`}>
            <Container>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.left}>
                            <SectionHeader
                                title={enduroBike.name}
                                subtitle={
                                    <>
                                        Experience the future of mobility with our lightweight, powerful electric motorcycles.<br />
                                        Engineered for those who demand excellence.
                                    </>
                                }
                                align="left"
                                subtitleAlign="left"
                            />
                            {renderConfiguratorBtn(styles.desktopBtn)}
                        </div>

                        <div className={styles.right}>
                            {enduroBike.stats.map((s) => (
                                <div key={s.label} className={styles.stat}>
                                    <h2 className={styles.statLabel}>{s.label}</h2>
                                    <h2 className={styles.statValue}>{s.value}</h2>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`${styles.mainRow} ${isConfiguratorOpen ? styles.mainRowOpen : ''}`}>
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
                                        className={styles.arrowBtn}
                                        type="button"
                                        onClick={prev}
                                        aria-label="Previous image"
                                        disabled={isFirst}
                                    >
                                        <span className={styles.arrowIconImg} />
                                    </button>

                                    <button
                                        className={styles.arrowBtn}
                                        type="button"
                                        onClick={next}
                                        aria-label="Next image"
                                        disabled={isLast}
                                    >
                                        <span className={`${styles.arrowIconImg} ${styles.arrowRight}`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.configuratorPanel} ${isConfiguratorOpen ? styles.configuratorPanelOpen : ''}`}>
                            <div className={styles.configuratorContent}>
                                <Configurator onClose={() => setIsConfiguratorOpen(false)} />
                            </div>
                        </div>
                    </div>

                    {renderConfiguratorBtn(styles.mobileBtn)}
                </div>
            </Container>
        </section>
    );
}