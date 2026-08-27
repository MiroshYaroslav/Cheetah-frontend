import { useState, useRef } from "react";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import { enduroBike } from "../../data/motorcycleData";
import styles from "./Enduro.module.css";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Configurator from "../../components/Configurator/Configurator";

export default function Enduro() {
    const [index, setIndex] = useState(0);
    const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

    // 1. Створюємо Ref для панелі конфігуратора
    const configuratorRef = useRef<HTMLDivElement>(null);

    const variants = enduroBike.variants;
    const currentVariant = variants[index];

    const isFirst = index === 0;
    const isLast = index === variants.length - 1;

    const prev = () => {
        if (!isFirst) setIndex((i) => i - 1);
    };

    const next = () => {
        if (!isLast) setIndex((i) => i + 1);
    };

    // 2. Оновлюємо логіку перемикання з додаванням скролу
    const toggleConfigurator = () => {
        const willOpen = !isConfiguratorOpen;
        setIsConfiguratorOpen(willOpen);

        if (willOpen && window.innerWidth <= 1024) {
            setTimeout(() => {
                if (configuratorRef.current) {
                    // 1. Вкажи висоту вашого хедера + бажаний відступ у пікселях
                    const offset = 120;

                    // 2. Вираховуємо точну позицію елемента
                    const elementPosition = configuratorRef.current.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - offset;

                    // 3. Плавно скролимо туди
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }, 100); // Можливо, тут доведеться збільшити затримку до 200-300, якщо CSS анімація довга
        }
    };

    // 3. Спрощуємо кнопку (більше не передаємо класи типу mobileBtn)
    const renderConfiguratorBtn = () => (
        <Button
            onClick={toggleConfigurator}
            variant="outline"
            fullWidth
            className={isConfiguratorOpen ? styles.configuratorBtnOpen : ''}
            iconRight={
                <span className={`${styles.arrowIcon} ${isConfiguratorOpen ? styles.arrowIconOpen : ''}`} />
            }
        >
            CONFIGURATOR
        </Button>
    );

    return (
        <section id="model" className={`section ${styles.section}`}>
            <Container>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.left}>
                            <div key={currentVariant.id} className={styles.animatedTitleWrapper}>
                                <SectionHeader
                                    title={currentVariant.name}
                                    subtitle={
                                        <>
                                            Experience the future of mobility with our lightweight, powerful electric motorcycles.<br />
                                            Engineered for those who demand excellence.
                                        </>
                                    }
                                    align="left"
                                    subtitleAlign="left"
                                />
                            </div>
                            {/* 4. Кнопка тепер ОДНА і завжди знаходиться тут! */}
                            {renderConfiguratorBtn()}
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
                                    {variants.map((v, i) => (
                                        <div className={styles.slide} key={`${v.id}-${i}`}>
                                            <img className={styles.bike} src={v.image.src} alt={v.image.alt} loading="lazy" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.controls}>
                                <div className={styles.indicators} aria-label="Slide indicators">
                                    {variants.map((_, i) => (
                                        <span key={i} className={`${styles.dot} ${i === index ? styles.dotActive : ""}`} />
                                    ))}
                                </div>

                                <div className={styles.arrows}>
                                    <button
                                        className={styles.arrowBtn}
                                        type="button"
                                        onClick={prev}
                                        disabled={isFirst}
                                    >
                                        <span className={styles.arrowIconImg} />
                                    </button>

                                    <button
                                        className={styles.arrowBtn}
                                        type="button"
                                        onClick={next}
                                        disabled={isLast}
                                    >
                                        <span className={`${styles.arrowIconImg} ${styles.arrowRight}`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 5. Чіпляємо наш Ref на обгортку конфігуратора */}
                        <div
                            ref={configuratorRef}
                            className={`${styles.configuratorPanel} ${isConfiguratorOpen ? styles.configuratorPanelOpen : ''}`}
                        >
                            <div className={styles.configuratorContent}>
                                <Configurator onClose={() => setIsConfiguratorOpen(false)} variant={currentVariant} isOpen={isConfiguratorOpen} />
                            </div>
                        </div>
                    </div>
                    {/* Видалено дублюючу мобільну кнопку звідси */}
                </div>
            </Container>
        </section>
    );
}