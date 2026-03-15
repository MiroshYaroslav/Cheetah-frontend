import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Collapse from "../../components/Collapse/Collapse";
import { parts } from "../../data/siteData";
import styles from "./Parts.module.css";

export default function Parts() {
    const [collapsed, setCollapsed] = useState(false);
    const [colorIndexById, setColorIndexById] = useState<Record<string, number>>({});

    const [emblaRef] = useEmblaCarousel({
        dragFree: true,
        align: "start",
        containScroll: "trimSnaps"
    });

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
                            {parts.map((p) => {
                                const colors = p.colors ?? [];
                                const selected = colorIndexById[p.id] ?? 0;

                                return (
                                    <article key={p.id} className={styles.card}>
                                        <button
                                            type="button"
                                            className={styles.cardLink}
                                            onClick={() => alert(`Open product page: ${p.slug}`)}
                                            aria-label={`Open product ${p.title}`}
                                        />

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
                                                    onClick={(e) => e.stopPropagation()}
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