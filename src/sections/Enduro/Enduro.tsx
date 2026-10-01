import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ДОДАЛИ ХУК
import { useCartStore } from "../../store/cartStore";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import { enduroBike } from "../../data/motorcycleData";
import styles from "./Enduro.module.css";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Configurator from "../../components/Configurator/Configurator";

export default function Enduro() {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation(); // ІНІЦІАЛІЗАЦІЯ ПЕРЕКЛАДУ
    const addItem = useCartStore((state) => state.addItem);

    const [index, setIndex] = useState(0);
    const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

    const configuratorRef = useRef<HTMLDivElement>(null);

    const variants = enduroBike.variants;
    const currentVariant = variants[index];

    const isFirst = index === 0;
    const isLast = index === variants.length - 1;

    useEffect(() => {
        const hash = location.hash.replace("#", "").toLowerCase();
        if (!hash) return;

        const modelElement = document.getElementById("model");
        const headerOffset = 77;

        if (["enduro", "cross", "street"].includes(hash)) {
            const variantIndex = variants.findIndex(
                (v) => v.id.toLowerCase().includes(hash) || v.name.toLowerCase().includes(hash)
            );

            if (variantIndex !== -1) {
                setIndex(variantIndex);
            }
            setIsConfiguratorOpen(false);

            setTimeout(() => {
                if (modelElement) {
                    const elementPosition = modelElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
            }, 100);
        } else if (hash === "configurator") {
            setIsConfiguratorOpen(true);

            setTimeout(() => {
                if (configuratorRef.current) {
                    const elementPosition = configuratorRef.current.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                } else if (modelElement) {
                    const elementPosition = modelElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
            }, 300);
        }
    }, [location.hash, variants]);

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
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
            }, 100);
        }
    };

    const handleQuickBuy = () => {
        const frameOpt = enduroBike.configOptions.frame[0];
        const plasticOpt = enduroBike.configOptions.plastic[0];
        const tiresOpt = enduroBike.configOptions.tires[0];

        // Зберігаємо перекладені характеристики в кошик
        const specsLabels = currentVariant.specs.map(specCat => {
            const opt = specCat.options[0];
            const catTitle = specCat.titleKey ? t(specCat.titleKey) : specCat.title;
            const optLabel = opt?.labelKey ? t(opt.labelKey) : opt?.label;
            return `${catTitle}: ${optLabel}`;
        }).join("; ");

        addItem({
            id: `${enduroBike.id}-${currentVariant.id}-default`,
            name: currentVariant.name,
            price: enduroBike.basePrice,
            image: currentVariant.image.src,
            quantity: 1,
            config: {
                frameLabel: frameOpt.labelKey ? t(frameOpt.labelKey) : frameOpt.label,
                plasticLabel: plasticOpt.labelKey ? t(plasticOpt.labelKey) : plasticOpt.label,
                tiresLabel: tiresOpt.labelKey ? t(tiresOpt.labelKey) : tiresOpt.label,
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
            {t('nav.configurator')} {/* ПЕРЕКЛАД */}
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
                                    subtitle={t('hero.subtitle')} // ПЕРЕКЛАД
                                    align="left"
                                    subtitleAlign="left"
                                />
                            </div>

                            <div className={styles.actionsWrap}>
                                <div className={`${styles.quickBuyRow} ${isConfiguratorOpen ? styles.quickBuyRowHidden : ''}`}>
                                    <span className={styles.quickBuyPrice}>
                                        {enduroBike.basePrice.toLocaleString("en-US").replace(",", " ")} $
                                    </span>
                                    <Button
                                        variant="primary"
                                        className={styles.quickBuyBtn}
                                        onClick={handleQuickBuy}
                                    >
                                        {t('ui.buy')} {/* ПЕРЕКЛАД */}
                                    </Button>
                                </div>

                                {renderConfiguratorBtn()}
                            </div>
                        </div>

                        <div className={styles.right}>
                            {enduroBike.stats.map((s) => (
                                <div key={s.label} className={styles.stat}>
                                    <h2 className={styles.statLabel}>
                                        {s.labelKey ? t(s.labelKey) : s.label} {/* ПЕРЕКЛАД */}
                                    </h2>
                                    <h2 className={styles.statValue}>
                                        {s.valueKey ? t(s.valueKey) : s.value} {/* ПЕРЕКЛАД */}
                                    </h2>
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