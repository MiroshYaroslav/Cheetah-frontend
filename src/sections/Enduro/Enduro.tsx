import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import { enduroBike } from "../../data/motorcycleData";
import styles from "./Enduro.module.css";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Configurator from "../../components/Configurator/Configurator";

export default function Enduro() {
    const navigate = useNavigate();
    const addItem = useCartStore((state) => state.addItem);

    const [index, setIndex] = useState(0);
    const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

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

    const toggleConfigurator = () => {
        const willOpen = !isConfiguratorOpen;
        setIsConfiguratorOpen(willOpen);

        if (willOpen && window.innerWidth <= 1024) {
            setTimeout(() => {
                if (configuratorRef.current) {
                    const offset = 120;
                    const elementPosition = configuratorRef.current.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }, 100);
        }
    };

    // Логіка швидкої покупки (коли купують прямо з головного екрана без налаштувань)
    const handleQuickBuy = () => {
        const frame = enduroBike.configOptions.frame[0];
        const plastic = enduroBike.configOptions.plastic[0];
        const tires = enduroBike.configOptions.tires[0];

        const specsLabels = currentVariant.specs.map(specCat => {
            const opt = specCat.options[0]; // Беремо першу (базову) опцію
            return `${specCat.title}: ${opt?.label}`;
        }).join("; ");

        addItem({
            id: `${enduroBike.id}-${currentVariant.id}-default`,
            name: currentVariant.name,
            price: enduroBike.basePrice,
            image: currentVariant.image.src,
            quantity: 1,
            config: {
                frameLabel: frame.label,
                plasticLabel: plastic.label,
                tiresLabel: tires.label,
                specs: specsLabels
            },
            stats: {
                weight: enduroBike.stats.find((s) => s.label === "Weight")?.value || "114 kg",
                speed: enduroBike.stats.find((s) => s.label === "Maximum speed")?.value || "40 km/h",
                cooling: enduroBike.stats.find((s) => s.label === "Cooling")?.value || "Liquid",
            },
        });

        navigate("/cart");
    };

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

                            {/* МАГІЯ ТУТ: Обгортка для кнопок */}
                            <div className={styles.actionsWrap}>
                                {/* Блок ціни з плавним зникненням */}
                                <div className={`${styles.quickBuyRow} ${isConfiguratorOpen ? styles.quickBuyRowHidden : ''}`}>
                                    <span className={styles.quickBuyPrice}>
                                        {enduroBike.basePrice.toLocaleString("en-US").replace(",", " ")} $
                                    </span>
                                    <Button
                                        variant="primary"
                                        className={styles.quickBuyBtn}
                                        onClick={handleQuickBuy}
                                    >
                                        BUY
                                    </Button>
                                </div>

                                {renderConfiguratorBtn()}
                            </div>
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

                        <div
                            ref={configuratorRef}
                            className={`${styles.configuratorPanel} ${isConfiguratorOpen ? styles.configuratorPanelOpen : ''}`}
                        >
                            <div className={styles.configuratorContent}>
                                <Configurator onClose={() => setIsConfiguratorOpen(false)} variant={currentVariant} isOpen={isConfiguratorOpen} />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}