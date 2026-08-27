import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import { enduroBike } from "../../data/motorcycleData";
import type { ConfigOption, BikeVariant } from "../../data/types";
import styles from "./Configurator.module.css";
import Button from "../Button/Button";

interface ConfiguratorProps {
    onClose: () => void;
    variant: BikeVariant;
    isOpen: boolean; // Додаємо новий пропс
}

type Tab = "specs" | "colors";

// --- Внутрішній компонент для ковзного перемикача ---
interface OptionSelectorProps {
    options: ConfigOption[];
    selectedId: string;
    onChange: (id: string) => void;
}

function OptionSelector({ options, selectedId, onChange }: OptionSelectorProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const selectedIdRef = useRef(selectedId);
    selectedIdRef.current = selectedId;

    const [sliderStyle, setSliderStyle] = useState({
        width: 0,
        transform: "translateX(0px)",
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
                transform: `translateX(${activeItem.offsetLeft}px)`,
                opacity: 1,
                transition: animate
                    ? "transform 300ms cubic-bezier(0.4, 0, 0.2, 1), width 300ms cubic-bezier(0.4, 0, 0.2, 1)"
                    : "none",
            });
        }
    }, []);

    const isFirstRender = useRef(true);

    // 1. АНІМАЦІЯ ПРИ КЛІКУ
    useEffect(() => {
        // Блокуємо анімацію при найпершому рендері, щоб ковзанка не вилітала збоку
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        updateSliderPosition(true);
    }, [selectedId, updateSliderPosition]);

    // 2. БЕЗ АНІМАЦІЇ ПРИ РЕСАЙЗІ/ВІДКРИТТІ
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
                            <img
                                src={opt.icon}
                                alt=""
                                className={styles.optionIcon}
                            />
                        )}

                        {opt.color && !opt.icon && (
                            <span
                                className={styles.colorCircle}
                                style={{
                                    backgroundColor: opt.color,
                                    border:
                                        opt.color === "#FFFFFF"
                                            ? "1px solid #E5E5E5"
                                            : opt.color === "#000000" && !isActive
                                                ? "1px solid transparent"
                                                : "1px solid rgba(255,255,255,0.2)",
                                }}
                            />
                        )}
                        <span className={styles.optionLabel}>{opt.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

// --- ГОЛОВНИЙ КОМПОНЕНТ CONFIGURATOR ---
export default function Configurator({ onClose, variant, isOpen }: ConfiguratorProps) {
    const navigate = useNavigate();
    const addItem = useCartStore((state) => state.addItem);

    const [activeTab, setActiveTab] = useState<Tab>("colors");

    // Завжди скидаємо таб на "colors", коли панель ВІДКРИВАЄТЬСЯ
    useEffect(() => {
        if (isOpen) {
            setActiveTab("colors");
        }
    }, [isOpen]);

    // Ініціалізація стейту характеристик
    const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>(() => {
        const initialSpecs: Record<string, string> = {};
        variant.specs.forEach(specCat => {
            if (specCat.options.length > 0) {
                initialSpecs[specCat.id] = specCat.options[0].id;
            }
        });
        return initialSpecs;
    });

    // Патерн "Derived State": безпечно оновлюємо характеристики, якщо змінився мотоцикл
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
        const frameLabel = enduroBike.configOptions.frame.find(o => o.id === frame)?.label || "";
        const plasticLabel = enduroBike.configOptions.plastic.find(o => o.id === plastic)?.label || "";
        const tiresLabel = enduroBike.configOptions.tires.find(o => o.id === tires)?.label || "";

        const specsLabels = variant.specs.map(specCat => {
            const opt = specCat.options.find(o => o.id === selectedSpecs[specCat.id]);
            return `${specCat.title}: ${opt?.label}`;
        }).join("; ");

        addItem({
            id: `${enduroBike.id}-${variant.id}-${frame}-${plastic}-${tires}`,
            name: variant.name,
            price: enduroBike.basePrice,
            image: variant.image.src,
            quantity: 1,
            config: {
                frameLabel,
                plasticLabel,
                tiresLabel,
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
                <h1 className={styles.title}>Configurator</h1>
                <button
                    className={styles.closeBtn}
                    onClick={onClose}
                    type="button"
                >
                    <img src="/close.svg" alt="Close" />
                </button>
            </div>

            <div className={styles.tools}>
                <button
                    className={`${styles.toolBtn} ${
                        activeTab === "specs" ? styles.toolBtnActive : ""
                    }`}
                    onClick={() => setActiveTab("specs")}
                    type="button"
                >
                    <img src="/settings-sliders.svg" alt="Specs" />
                </button>
                <button
                    className={`${styles.toolBtn} ${
                        activeTab === "colors" ? styles.toolBtnActive : ""
                    }`}
                    onClick={() => setActiveTab("colors")}
                    type="button"
                >
                    <img src="/colors.svg" alt="Colors" />
                </button>
            </div>

            <div className={styles.body}>
                <div className={styles.tabsWrapper}>

                    {/* Вкладка 1: SPECS (Динамічна, залежить від варіанту мотоцикла) */}
                    <div
                        className={`${styles.tabContent} ${styles.tabSpecs} ${
                            activeTab === "specs"
                                ? styles.tabContentActive
                                : ""
                        }`}
                    >
                        {/* МАГІЯ ТУТ: Обгортка з анімацією та key застосовується ТІЛЬКИ до характеристик */}
                        <div key={variant.id} className={styles.animatedContent}>
                            {variant.specs.map(specCat => (
                                <div className={styles.section} key={specCat.id}>
                                    <h1 className={styles.sectionTitle}>{specCat.title}</h1>
                                    <OptionSelector
                                        options={specCat.options}
                                        selectedId={selectedSpecs[specCat.id]}
                                        onChange={(id) => setSelectedSpecs(prev => ({ ...prev, [specCat.id]: id }))}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Вкладка 2: COLORS (Статична, спільна для всіх мотоциклів) */}
                    <div
                        className={`${styles.tabContent} ${styles.tabColors} ${
                            activeTab === "colors"
                                ? styles.tabContentActive
                                : ""
                        }`}
                    >
                        {/* ТУТ НЕМАЄ key={variant.id}, тому при гортанні каруселі тут нічого не смикається і не оновлюється */}
                        <div className={styles.section}>
                            <h1 className={styles.sectionTitle}>
                                Motorcycle frame colour
                            </h1>
                            <OptionSelector
                                options={enduroBike.configOptions.frame}
                                selectedId={frame}
                                onChange={setFrame}
                            />
                        </div>
                        <div className={styles.section}>
                            <h1 className={styles.sectionTitle}>
                                Plastic colour
                            </h1>
                            <OptionSelector
                                options={enduroBike.configOptions.plastic}
                                selectedId={plastic}
                                onChange={setPlastic}
                            />
                        </div>
                        <div className={styles.section}>
                            <h1 className={styles.sectionTitle}>
                                Tyre pattern
                            </h1>
                            <OptionSelector
                                options={enduroBike.configOptions.tires}
                                selectedId={tires}
                                onChange={setTires}
                            />
                        </div>
                    </div>

                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.priceRow}>
                    <span className={styles.priceLabel}>Price:</span>
                    <span className={styles.priceValue}>
                        {enduroBike.basePrice
                            .toLocaleString("en-US")
                            .replace(",", " ")}{" "}
                        $
                    </span>
                </div>

                <Button
                    className={styles.buyBtn}
                    variant="primary"
                    fullWidth
                    onClick={handleBuyClick}
                >
                    BUY
                </Button>

                <p className={styles.leadTime}>
                    The lead time for this motorcycle with these configurations
                    is 3 months.
                </p>
            </div>
        </div>
    );
}