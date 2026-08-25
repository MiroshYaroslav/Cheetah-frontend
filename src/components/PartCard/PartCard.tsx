import { useState } from "react";
import Button from "../../components/Button/Button";
import type { PartItem } from "../../data/types";
import styles from "./PartCard.module.css";

type Props = {
    part: PartItem;
    onAddToCart: (part: PartItem, selectedColorIndex: number) => void;
};

export default function PartCard({ part, onAddToCart }: Props) {
    const [selectedColor, setSelectedColor] = useState(0);
    const colors = part.colors ?? [];
    const hasColors = colors.length > 0;

    return (
        <article className={styles.card}>
            {/* 1. Верхня частина - Фото */}
            <div className={styles.imageWrap}>
                <img src={part.image} alt={part.title} loading="lazy" draggable={false} />
            </div>

            {/* 2. Нижня частина - Інформація */}
            <div className={styles.infoWrap}>
                <h2 className={styles.title}>{part.title}</h2>

                {/* Блок з кольорами */}
                {hasColors && (
                    <div className={styles.colorSection}>
                        {/* Універсальний напис замість part.subtitle */}
                        <p className={styles.colorLabel}>Colour</p>

                        <div className={styles.swatches}>
                            {colors.map((c, i) => (
                                <button
                                    key={`${part.id}-c-${i}`}
                                    type="button"
                                    className={`${styles.swatch} ${i === selectedColor ? styles.swatchActive : ""}`}
                                    style={{ backgroundColor: c }}
                                    aria-label={`Color ${i + 1}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedColor(i);
                                    }}
                                />
                            ))}
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
                                className={styles.buyBtn} // Залишаємо клас для Flex-позиціонування
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAddToCart(part, selectedColor);
                                }}
                            >
                                BUY
                            </Button>
                        </>
                    ) : (
                        <div className={styles.outOfStock}>Out of stock</div>
                    )}
                </div>
            </div>
        </article>
    );
}