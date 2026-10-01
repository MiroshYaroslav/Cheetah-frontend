import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ДОДАЛИ ХУК
import { useCartStore } from "../../store/cartStore";
import { enduroBike } from "../../data/motorcycleData";
import type { ConfigOption, BikeVariant } from "../../data/types";
import styles from "./Configurator.module.css";
import Button from "../Button/Button";

interface ConfiguratorProps {
    onClose: () => void;
    variant: BikeVariant;
    isOpen: boolean;
}

type Tab = "specs" | "colors";

interface OptionSelectorProps {
    options: ConfigOption[];
    selectedId: string;
    onChange: (id: string) => void;
}

function OptionSelector({ options, selectedId, onChange }: OptionSelectorProps) {
    const { t } = useTranslation(); // ПЕРЕКЛАД У ВНУТРІШНЬОМУ КОМПОНЕНТІ
    const containerRef = useRef<HTMLDivElement>(null);
    const selectedIdRef = useRef(selectedId);

    useLayoutEffect(() => {
        selectedIdRef.current = selectedId;
    }, [selectedId]);

    const [sliderStyle, setSliderStyle] = useState({
        width: 0,
        height: 0,
        transform: "translate(0px, 0px)",
        opacity: 0,
        transition: "none",
    });

    const updateSliderPosition = useCallback((animate: boolean) => {
        if (!containerRef.current) return;

        const activeItem = containerRef.current.querySelector(
            `[data-option-id="${selectedIdRef.current}"]`
        ) as HTMLElement;

        if (activeItem && activeItem.offsetWidth > 0) {
            setSliderStyle({
                width: activeItem.offsetWidth,
                height: activeItem.offsetHeight,
                transform: `translate(${activeItem.offsetLeft}px, ${activeItem.offsetTop}px)`,
                opacity: 1,
                transition: animate
                    ? "transform 300ms cubic-bezier(0.4, 0, 0.2, 1), width 300ms cubic-bezier(0.4, 0, 0.2, 1), height 300ms cubic-bezier(0.4, 0, 0.2, 1)"
                    : "none",
            });
        }
    }, []);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        updateSliderPosition(true);
    }, [selectedId, updateSliderPosition]);

    useEffect(() => {
        if (!containerRef.current) return;
        let lastWidth = -1;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const newWidth = entry.contentRect.width;
                if (newWidth !== lastWidth && newWidth > 0) {
                    lastWidth = newWidth;
                    requestAnimationFrame(() => {
                        updateSliderPosition(false);
                    });
                }
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [updateSliderPosition]);

    return (
        <div className={styles.optionsGrid} ref={containerRef}>
            <div className={styles.sliderBg} style={sliderStyle}></div>
            {options.map((opt) => {
                const isActive = selectedId === opt.id;
                return (
                    <button
                        key={opt.id}
                        data-option-id={opt.id}
                        className={`${styles.optionBtn} ${
                            isActive ? styles.optionActive : ""
                        }`}
                        onClick={() => onChange(opt.id)}
                        type="button"
                    >
                        {opt.icon && (
                            <img src={opt.icon} alt="" className={styles.optionIcon} />
                        )}
                        {opt.color && !opt.icon && (
                            <span className={styles.colorCircle} style={{ backgroundColor: opt.color }} />
                        )}
                        {/* ПЕРЕКЛАД ОПЦІЇ */}
                        <span className={styles.optionLabel}>
                            {opt.labelKey ? t(opt.labelKey) : opt.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

export default function Configurator({ onClose, variant, isOpen }: ConfiguratorProps) {
    const navigate = useNavigate();
    const { t } = useTranslation(); // ІНІЦІАЛІЗАЦІЯ ПЕРЕКЛАДУ
    const addItem = useCartStore((state) => state.addItem);

    const [activeTab, setActiveTab] = useState<Tab>("colors");
    const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

    if (isOpen !== prevIsOpen) {
        setPrevIsOpen(isOpen);
        if (isOpen) {
            setActiveTab("colors");
        }
    }

    const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>(() => {
        const initialSpecs: Record<string, string> = {};
        variant.specs.forEach(specCat => {
            if (specCat.options.length > 0) {
                initialSpecs[specCat.id] = specCat.options[0].id;
            }
        });
        return initialSpecs;
    });

    const [currentVariantId, setCurrentVariantId] = useState(variant.id);
    if (variant.id !== currentVariantId) {
        setCurrentVariantId(variant.id);
        const initialSpecs: Record<string, string> = {};
        variant.specs.forEach(specCat => {
            if (specCat.options.length > 0) {
                initialSpecs[specCat.id] = specCat.options[0].id;
            }
        });
        setSelectedSpecs(initialSpecs);
    }

    const [frame, setFrame] = useState(enduroBike.configOptions.frame[0].id);
    const [plastic, setPlastic] = useState(enduroBike.configOptions.plastic[0].id);
    const [tires, setTires] = useState(enduroBike.configOptions.tires[0].id);

    const handleBuyClick = () => {
        const frameOpt = enduroBike.configOptions.frame.find(o => o.id === frame);
        const plasticOpt = enduroBike.configOptions.plastic.find(o => o.id === plastic);
        const tiresOpt = enduroBike.configOptions.tires.find(o => o.id === tires);

        const specsLabels = variant.specs.map(specCat => {
            const opt = specCat.options.find(o => o.id === selectedSpecs[specCat.id]);
            const catTitle = specCat.titleKey ? t(specCat.titleKey) : specCat.title;
            const optLabel = opt?.labelKey ? t(opt.labelKey) : opt?.label;
            return `${catTitle}: ${optLabel}`;
        }).join("; ");

        addItem({
            id: `${enduroBike.id}-${variant.id}-${frame}-${plastic}-${tires}`,
            name: variant.name,
            price: enduroBike.basePrice,
            image: variant.image.src,
            quantity: 1,
            config: {
                frameLabel: frameOpt?.labelKey ? t(frameOpt.labelKey) : (frameOpt?.label || ""),
                plasticLabel: plasticOpt?.labelKey ? t(plasticOpt.labelKey) : (plasticOpt?.label || ""),
                tiresLabel: tiresOpt?.labelKey ? t(tiresOpt.labelKey) : (tiresOpt?.label || ""),
                specs: specsLabels
            },
            stats: {
                weight: enduroBike.stats.find((s) => s.label === "Weight")?.value || "114 kg",
                speed: enduroBike.stats.find((s) => s.label === "Maximum speed")?.value || "40 km/h",
                cooling: enduroBike.stats.find((s) => s.label === "Cooling")?.value || "Liquid",
            },
        });

        onClose();
        navigate("/cart");
    };

    return (
        <div className={styles.configurator}>
            <div className={styles.header}>
                <h1 className={styles.title}>{t('nav.configurator')}</h1> {/* ПЕРЕКЛАД */}
                <button className={styles.closeBtn} onClick={onClose} type="button">
                    <img src="/close.svg" alt="Close" />
                </button>
            </div>

            <div className={styles.tools}>
                <button
                    className={`${styles.toolBtn} ${activeTab === "specs" ? styles.toolBtnActive : ""}`}
                    onClick={() => setActiveTab("specs")}
                    type="button"
                >
                    <img src="/settings-sliders.svg" alt="Specs" />
                </button>
                <button
                    className={`${styles.toolBtn} ${activeTab === "colors" ? styles.toolBtnActive : ""}`}
                    onClick={() => setActiveTab("colors")}
                    type="button"
                >
                    <img src="/colors.svg" alt="Colors" />
                </button>
            </div>

            <div className={styles.body}>
                <div className={styles.tabsWrapper}>
                    <div className={`${styles.tabContent} ${styles.tabSpecs} ${activeTab === "specs" ? styles.tabContentActive : ""}`}>
                        <div key={variant.id} className={styles.animatedContent}>
                            {variant.specs.map(specCat => (
                                <div className={styles.section} key={specCat.id}>
                                    <h1 className={styles.sectionTitle}>
                                        {specCat.titleKey ? t(specCat.titleKey) : specCat.title} {/* ПЕРЕКЛАД */}
                                    </h1>
                                    <OptionSelector
                                        options={specCat.options}
                                        selectedId={selectedSpecs[specCat.id]}
                                        onChange={(id) => setSelectedSpecs(prev => ({ ...prev, [specCat.id]: id }))}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`${styles.tabContent} ${styles.tabColors} ${activeTab === "colors" ? styles.tabContentActive : ""}`}>
                        <div className={styles.section}>
                            <h1 className={styles.sectionTitle}>{t('models.frameColor')}</h1> {/* ПЕРЕКЛАД */}
                            <OptionSelector options={enduroBike.configOptions.frame} selectedId={frame} onChange={setFrame} />
                        </div>
                        <div className={styles.section}>
                            <h1 className={styles.sectionTitle}>{t('models.plasticColor')}</h1> {/* ПЕРЕКЛАД */}
                            <OptionSelector options={enduroBike.configOptions.plastic} selectedId={plastic} onChange={setPlastic} />
                        </div>
                        <div className={styles.section}>
                            <h1 className={styles.sectionTitle}>{t('models.tyrePattern')}</h1> {/* ПЕРЕКЛАД */}
                            <OptionSelector options={enduroBike.configOptions.tires} selectedId={tires} onChange={setTires} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.priceRow}>
                    <span className={styles.priceLabel}>{t('models.price')}</span> {/* ПЕРЕКЛАД */}
                    <span className={styles.priceValue}>
                        {enduroBike.basePrice.toLocaleString("en-US").replace(",", " ")} $
                    </span>
                </div>

                <Button className={styles.buyBtn} variant="primary" fullWidth onClick={handleBuyClick}>
                    {t('ui.buy')} {/* ПЕРЕКЛАД */}
                </Button>

                <p className={styles.leadTime}>
                    {t('models.leadTime')} {/* ПЕРЕКЛАД */}
                </p>
            </div>
        </div>
    );
}