import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next"; // ДОДАЛИ ХУК
import Button from "../../components/Button/Button";
import type { PartItem } from "../../data/types";
import styles from "./PartCard.module.css";

type Props = {
    part: PartItem;
    onAddToCart: (part: PartItem, selectedColorIndex: number) => void;
};

export default function PartCard({ part, onAddToCart }: Props) {
    const { t } = useTranslation(); // ІНІЦІАЛІЗАЦІЯ ПЕРЕКЛАДУ
    const [selectedColor, setSelectedColor] = useState(0);
    const colors = part.colors ?? [];
    const hasColors = colors.length > 0;

    const containerRef = useRef<HTMLDivElement>(null);
    const selectedIdRef = useRef(selectedColor);

    useLayoutEffect(() => {
        selectedIdRef.current = selectedColor;
    }, [selectedColor]);

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
            `[data-color-index="${selectedIdRef.current}"]`
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
    }, [selectedColor, updateSliderPosition]);

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
        <article className={styles.card}>
            <div className={styles.imageWrap}>
                <img src={part.image} alt={part.title} loading="lazy" draggable={false} />
            </div>

            <div className={styles.infoWrap}>
                <h2 className={styles.title}>
                    {part.titleKey ? t(part.titleKey) : part.title} {/* ПЕРЕКЛАД */}
                </h2>

                {hasColors && (
                    <div className={styles.colorSection}>
                        <p className={styles.colorLabel}>
                            {part.subtitleKey ? t(part.subtitleKey) : (part.subtitle || t('parts.colour'))} {/* ПЕРЕКЛАД */}
                        </p>

                        <div className={styles.optionsGrid} ref={containerRef}>
                            <div className={styles.sliderBg} style={sliderStyle}></div>
                            {colors.map((c, i) => {
                                const isActive = i === selectedColor;
                                return (
                                    <button
                                        key={`${part.id}-c-${i}`}
                                        data-color-index={i}
                                        type="button"
                                        className={`${styles.optionBtn} ${isActive ? styles.optionActive : ""}`}
                                        aria-label={`Color ${i + 1}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedColor(i);
                                        }}
                                    >
                                        <span
                                            className={styles.colorCircle}
                                            style={{ backgroundColor: c }}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className={styles.footer}>
                    {part.inStock ? (
                        <>
                            <div className={styles.price}>{part.price}</div>
                            <Button
                                variant="primary"
                                size="sm"
                                className={styles.buyBtn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAddToCart(part, selectedColor);
                                }}
                            >
                                {t('ui.buy')} {/* ПЕРЕКЛАД */}
                            </Button>
                        </>
                    ) : (
                        <div className={styles.outOfStock}>
                            {t('parts.outOfStock')} {/* ПЕРЕКЛАД */}
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}