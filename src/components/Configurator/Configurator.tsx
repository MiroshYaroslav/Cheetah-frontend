import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import { enduroBike } from "../../data/motorcycleData";
import type { ConfigOption } from "../../data/types";
import styles from "./Configurator.module.css";
import Button from "../Button/Button";

interface ConfiguratorProps {
    onClose: () => void;
}

type Tab = "specs" | "colors";

export default function Configurator({ onClose }: ConfiguratorProps) {
    const navigate = useNavigate();
    const addItem = useCartStore((state) => state.addItem);

    const [activeTab, setActiveTab] = useState<Tab>("colors");

    // Беремо дефолтні значення з об'єкта enduroBike
    const [frame, setFrame] = useState(enduroBike.configOptions.frame[0].id);
    const [plastic, setPlastic] = useState(enduroBike.configOptions.plastic[0].id);
    const [tires, setTires] = useState(enduroBike.configOptions.tires[0].id);

    const handleBuyClick = () => {
        // Динамічно шукаємо вибрані назви
        const selectedFrame = enduroBike.configOptions.frame.find(o => o.id === frame)?.label || '';
        const selectedPlastic = enduroBike.configOptions.plastic.find(o => o.id === plastic)?.label || '';
        const selectedTires = enduroBike.configOptions.tires.find(o => o.id === tires)?.label || '';

        addItem({
            id: `${enduroBike.id}-${frame}-${plastic}-${tires}`,
            name: enduroBike.name,
            price: enduroBike.basePrice,
            image: enduroBike.images[0].src, // Беремо перше фото з масиву
            quantity: 1,
            config: {
                frameLabel: selectedFrame,
                plasticLabel: selectedPlastic,
                tiresLabel: selectedTires,
            },
            stats: {
                // Витягуємо характеристики прямо з об'єкта
                weight: enduroBike.stats.find(s => s.label === "Weight")?.value || "114 kg",
                speed: enduroBike.stats.find(s => s.label === "Maximum speed")?.value || "40 km/h",
                cooling: enduroBike.stats.find(s => s.label === "Cooling")?.value || "Liquid"
            }
        });

        onClose();
        navigate("/cart");
    };

    const renderOptions = (options: ConfigOption[], selected: string, onChange: (id: string) => void) => (
        <div className={styles.optionsGrid}>
            {options.map((opt) => (
                <button
                    key={opt.id}
                    className={`${styles.optionBtn} ${selected === opt.id ? styles.optionActive : ""}`}
                    onClick={() => onChange(opt.id)}
                    type="button"
                >
                    <span
                        className={styles.colorCircle}
                        style={{
                            backgroundColor: opt.color,
                            border: opt.color === "#FFFFFF" ? "1px solid #121212" : "none"
                        }}
                    />
                    <span className={styles.optionLabel}>{opt.label}</span>
                </button>
            ))}
        </div>
    );

    return (
        <div className={styles.configurator}>
            <div className={styles.header}>
                <div className={styles.titleWrap}>
                    <img src="/settings.svg" alt="" className={styles.titleIcon} />
                    <h1 className={styles.title}>CONFIGURATOR</h1>
                </div>
                <button className={styles.closeBtn} onClick={onClose} type="button">
                    <img src="/plus.svg" alt="" />
                </button>
            </div>

            <div className={styles.tools}>
                <button
                    className={`${styles.toolBtn} ${activeTab === "specs" ? styles.toolBtnActive : ""}`}
                    onClick={() => setActiveTab("specs")}
                    type="button"
                >
                    <img src="/Faders.svg" alt="Specs" />
                </button>
                <button
                    className={`${styles.toolBtn} ${activeTab === "colors" ? styles.toolBtnActive : ""}`}
                    onClick={() => setActiveTab("colors")}
                    type="button"
                >
                    <img src="/PaintRoller.svg" alt="Colors" />
                </button>
            </div>

            <div className={styles.body}>
                <div className={styles.tabsWrapper}>
                    <div className={`${styles.tabContent} ${styles.tabSpecs} ${activeTab === "specs" ? styles.tabContentActive : ""}`}>
                        <div className={styles.section}>
                            <h1 className={styles.sectionTitle}>Технічні характеристики</h1>
                            <p className={styles.placeholderText}>Тут будуть налаштування батареї, підвіски та потужності.</p>
                        </div>
                    </div>

                    <div className={`${styles.tabContent} ${styles.tabColors} ${activeTab === "colors" ? styles.tabContentActive : ""}`}>
                        <div className={styles.section}>
                            <h1 className={styles.sectionTitle}>Колір рами</h1>
                            {/* Передаємо масиви опцій безпосередньо з enduroBike */}
                            {renderOptions(enduroBike.configOptions.frame, frame, setFrame)}
                        </div>
                        <div className={styles.section}>
                            <h1 className={styles.sectionTitle}>Колір пластику</h1>
                            {renderOptions(enduroBike.configOptions.plastic, plastic, setPlastic)}
                        </div>
                        <div className={styles.section}>
                            <h1 className={styles.sectionTitle}>Малюнки покришок</h1>
                            {renderOptions(enduroBike.configOptions.tires, tires, setTires)}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.price}>{enduroBike.basePrice.toLocaleString('uk-UA')}₴</div>
                <Button className={styles.buyBtn} variant="primary" onClick={handleBuyClick}>
                    Купити
                </Button>
            </div>
        </div>
    );
}