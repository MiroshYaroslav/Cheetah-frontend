import { useState, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Collapse from "../../components/Collapse/Collapse";
import { parts } from "../../data/partsData"; // Прибрав .ts
import { useCartStore } from "../../store/cartStore";
import styles from "./Parts.module.css";
import type { PartItem } from "../../data/types";

export default function Parts() {
    const [collapsed, setCollapsed] = useState(false);
    const [colorIndexById, setColorIndexById] = useState<Record<string, number>>({});

    const items = useCartStore(state => state.items);
    const addItem = useCartStore(state => state.addItem);

    const visibleParts = useMemo(() => {
        return parts.filter(p => !items.some(item => item.id === p.id || item.id.startsWith(`${p.id}-`)));
    }, [items]);

    const handleAddPart = (part: PartItem, selectedColorIndex: number) => {
        const color = part.colors && part.colors.length > 0
            ? part.colors[selectedColorIndex]
            : null;

        const uniqueId = color ? `${part.id}-${color}` : part.id;

        const numericPrice = typeof part.price === 'string'
            ? parseInt(part.price.replace(/\D/g, ''), 10)
            : part.price;

        addItem({
            id: uniqueId,
            name: part.title,
            price: numericPrice,
            image: part.image,
            quantity: 1
        });
    };

    const [emblaRef] = useEmblaCarousel({
        dragFree: true,
        align: "start",
        containScroll: "trimSnaps"
    });

    if (visibleParts.length === 0) return null;

    return (
        <section id="parts" className={styles.section}>
            <Container>
                <SectionHeader
                    title="PARTS"
                    subtitle="Components of our motorcycles"
                    collapsible
                    collapsed={collapsed}
                    onToggle={() => setCollapsed((v) => !v)}
                />
            </Container>

            <Collapse isOpen={!collapsed}>
                <div className={styles.fullBleed}>
                    <div className={styles.embla} ref={emblaRef}>
                        <div className={styles.embla__container}>
                            {visibleParts.map((p) => {
                                const colors = p.colors ?? [];
                                const selected = colorIndexById[p.id] ?? 0;

                                return (
                                    <article key={p.id} className={styles.card}>
                                        <div className={styles.cardTop}>
                                            <div className={styles.swatches}>
                                                {colors.map((c, i) => (
                                                    <button
                                                        key={`${p.id}-c-${i}`}
                                                        type="button"
                                                        className={`${styles.swatch} ${i === selected ? styles.swatchActive : ""}`}
                                                        style={{ backgroundColor: c }}
                                                        aria-label={`Color ${i + 1}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setColorIndexById((prev) => ({ ...prev, [p.id]: i }));
                                                        }}
                                                    />
                                                ))}
                                            </div>

                                            {p.inStock ? (
                                                <button
                                                    className={styles.cartBtn}
                                                    type="button"
                                                    aria-label="Add to cart"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddPart(p, selected);
                                                    }}
                                                >
                                                    <img src="/cart.svg" alt="" className={styles.cartIcon} />
                                                </button>
                                            ) : (
                                                <span className={styles.stockPill}>Немає в наявності</span>
                                            )}
                                        </div>

                                        <div className={styles.imageWrap}>
                                            <img src={p.image} alt={p.title} loading="lazy" draggable={false} />
                                        </div>

                                        <div className={styles.bottom}>
                                            <h2 className={styles.title}>{p.title}</h2>
                                            <p className={styles.subtitle}>{p.subtitle}</p>
                                            <div className={styles.price}>{p.price}</div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Collapse>
        </section>
    );
}