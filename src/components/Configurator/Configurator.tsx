import { useState } from "react";
import styles from "./Configurator.module.css";
import Button from "../Button/Button.tsx";

interface Option {
    id: string;
    label: string;
    color: string;
}

const frameOptions: Option[] = [
    { id: "frame-black", label: "Чорний", color: "#7B7B7B" },
    { id: "frame-purple", label: "Фіолетовий", color: "#8B5CF6" },
    { id: "frame-white", label: "Білий", color: "#FFFFFF" },
];

const plasticOptions: Option[] = [
    { id: "plastic-black", label: "Чорний", color: "#7B7B7B" },
    { id: "plastic-graphite", label: "Графітовий", color: "#4B4B4B" },
    { id: "plastic-white", label: "Білий", color: "#FFFFFF" },
];

const tireOptions: Option[] = [
    { id: "tire-black", label: "Чорний", color: "#000000" },
    { id: "tire-white", label: "Білий", color: "#000000" },
    { id: "tire-graphite", label: "Графітовий", color: "#000000" },
];

interface ConfiguratorProps {
    onClose: () => void;
}

type Tab = "specs" | "colors";

export default function Configurator({ onClose }: ConfiguratorProps) {
    const [activeTab, setActiveTab] = useState<Tab>("colors");
    const [frame, setFrame] = useState(frameOptions[0].id);
    const [plastic, setPlastic] = useState(plasticOptions[0].id);
    const [tires, setTires] = useState(tireOptions[0].id);

    const renderOptions = (options: Option[], selected: string, onChange: (id: string) => void) => (
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
                            {renderOptions(frameOptions, frame, setFrame)}
                        </div>
                        <div className={styles.section}>
                            <h1 className={styles.sectionTitle}>Колір пластику</h1>
                            {renderOptions(plasticOptions, plastic, setPlastic)}
                        </div>
                        <div className={styles.section}>
                            <h1 className={styles.sectionTitle}>Малюнки покришок</h1>
                            {renderOptions(tireOptions, tires, setTires)}
                        </div>
                    </div>

                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.price}>150 000₴</div>
                <Button className={styles.buyBtn} variant="primary">
                    Купити
                </Button>
            </div>
        </div>
    );
}