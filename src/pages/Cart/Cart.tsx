import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PartCard from "../../components/PartCard/PartCard";
import { parts } from "../../data/partsData";
import { useCartStore, type CartItemType } from "../../store/cartStore";
import type { PartItem } from "../../data/types";
import styles from "./Cart.module.css";

// --- КОМПОНЕНТ ДЛЯ КЕРУВАННЯ КІЛЬКІСТЮ ТА АНІМАЦІЄЮ ---
function QuantitySelector({ item, updateQuantity }: { item: CartItemType, updateQuantity: (id: string, amount: number) => void }) {
    const [prevQty, setPrevQty] = useState(item.quantity);
    const [direction, setDirection] = useState<'up' | 'down'>('up');

    if (item.quantity !== prevQty) {
        setDirection(item.quantity > prevQty ? 'up' : 'down');
        setPrevQty(item.quantity);
    }

    return (
        <div className={styles.quantityControl}>
            <button
                className={styles.qtyBtn}
                onClick={() => updateQuantity(item.id, -1)}
                disabled={item.quantity <= 1}
            >
                <img src="/minus.svg" alt="minus" className={styles.qtyIcon} />
            </button>
            <div className={styles.qtyNumberWrap}>
                <span
                    key={item.quantity}
                    className={`${styles.qtyAnimated} ${direction === 'up' ? styles.qtyUp : styles.qtyDown}`}
                >
                    {item.quantity}
                </span>
            </div>
            <button
                className={styles.qtyBtn}
                onClick={() => updateQuantity(item.id, 1)}
            >
                <img src="/plus.svg" alt="plus" className={styles.qtyIcon} />
            </button>
        </div>
    );
}

// --- ОСНОВНИЙ КОМПОНЕНТ КОШИКА ---
export default function Cart() {
    const { items, updateQuantity, removeItem, addItem } = useCartStore();
    const [uncheckedIds, setUncheckedIds] = useState<Set<string>>(new Set());
    const navigate = useNavigate();

    const totalPrice = useMemo(() => {
        return items.reduce((sum, item) => {
            if (!uncheckedIds.has(item.id)) {
                return sum + item.price * item.quantity;
            }
            return sum;
        }, 0);
    }, [items, uncheckedIds]);

    const isAllSelected = useMemo(() => {
        return items.length > 0 && items.every((item) => !uncheckedIds.has(item.id));
    }, [items, uncheckedIds]);

    const hasSelectedItems = useMemo(() => {
        return items.some((item) => !uncheckedIds.has(item.id));
    }, [items, uncheckedIds]);

    const handleItemToggle = (id: string) => {
        setUncheckedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const handleSelectAllToggle = () => {
        if (isAllSelected) {
            setUncheckedIds(new Set(items.map((item) => item.id)));
        } else {
            setUncheckedIds(new Set());
        }
    };

    const formatPrice = (price: number) => {
        return price.toLocaleString('en-US').replace(/,/g, ' ');
    };

    // === ЛОГІКА ДЛЯ СЛАЙДЕРА ЗАПЧАСТИН ===
    const visibleParts = useMemo(() => {
        return parts.filter(p => !items.some(item => item.id === p.id || item.id.startsWith(`${p.id}-`)));
    }, [items]);

    const handleAddPart = (part: PartItem, selectedColorIndex: number) => {
        const color = part.colors && part.colors.length > 0 ? part.colors[selectedColorIndex] : null;
        const uniqueId = color ? `${part.id}-${color}` : part.id;
        const numericPrice = typeof part.price === 'string' ? parseInt(part.price.replace(/\D/g, ''), 10) : part.price;

        addItem({
            id: uniqueId,
            name: part.title,
            price: numericPrice,
            image: part.image,
            quantity: 1,
            partColor: color || undefined,
            partSubtitle: part.subtitle || undefined
        });
    };

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        dragFree: true,
        containScroll: "trimSnaps"
    });

    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        setTimeout(() => {
            onInit(emblaApi);
            onSelect(emblaApi);
        }, 0);

        emblaApi.on("reInit", onInit);
        emblaApi.on("reInit", onSelect);
        emblaApi.on("select", onSelect);
    }, [emblaApi, onInit, onSelect]);

    return (
        <div className={styles.cartPage}>
            <Container>
                {/* МАГІЯ ТУТ: ПРОСТО ВИКЛИКАЄМО БЕЗ ПРОПСІВ */}
                <Breadcrumbs />

                {/* ХЕДЕР СТОРІНКИ */}
                <div className={styles.pageHeader}>
                    <SectionHeader title="BAG" align="left" />

                    <p className={styles.headerSubtitle}>
                        Place your order quickly and securely. Please note: once you have<br/>
                        purchased a motorbike, we will call or email you to confirm the order details.
                    </p>

                    <p className={styles.headerSubtitle}>
                        Please read our privacy policy
                    </p>

                    <Button
                        href="/privacy-policy"
                        variant="outline"
                        className={styles.privacyBtn}
                        iconRight={<img src="/CaretRight.svg" alt="arrow right" />}
                    >
                        PRIVACY POLICY
                    </Button>
                </div>

                <div className={styles.layout}>
                    {/* ЛІВА КОЛОНКА: ТОВАРИ */}
                    <div className={styles.itemsColumn}>
                        {items.length === 0 ? (
                            <div className={styles.emptyCart}>Ваш кошик порожній</div>
                        ) : (
                            items.map((item: CartItemType) => {
                                const isChecked = !uncheckedIds.has(item.id);

                                return (
                                    <div key={item.id} className={styles.cartCard}>
                                        <div className={styles.left}>
                                            <div className={styles.cardActions}>
                                                <input
                                                    type="checkbox"
                                                    className={styles.checkbox}
                                                    checked={isChecked}
                                                    onChange={() => handleItemToggle(item.id)}
                                                />
                                                <button
                                                    className={styles.actionBtn}
                                                    onClick={() => {
                                                        removeItem(item.id);
                                                        setUncheckedIds((prev) => {
                                                            const next = new Set(prev);
                                                            next.delete(item.id);
                                                            return next;
                                                        });
                                                    }}
                                                >
                                                    <img src="/trash.svg" alt="delete" className={styles.deleteIcon} />
                                                </button>
                                            </div>
                                            <div className={styles.cardImageWrap}>
                                                <img src={item.image} alt={item.name} className={styles.cardImage} />
                                            </div>
                                        </div>

                                        <div className={styles.right}>
                                            <h2 className={styles.itemName}>{item.name}</h2>

                                            {/* ДИНАМІЧНИЙ БЛОК ХАРАКТЕРИСТИК (Мотоцикл) */}
                                            {item.stats && (
                                                <div className={styles.infoBlock}>
                                                    <h3 className={styles.infoTitle}>Specifications</h3>
                                                    <div className={styles.specsRow}>
                                                        {Object.entries(item.stats).map(([key, value], index, array) => (
                                                            <React.Fragment key={key}>
                                                                <span className={styles.specText}>
                                                                    {key.toUpperCase()} {String(value).toUpperCase()}
                                                                </span>
                                                                {index < array.length - 1 && <div className={styles.dividerV} />}
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* ДИНАМІЧНИЙ БЛОК КОНФІГУРАТОРА (Мотоцикл) */}
                                            {item.config && (() => {
                                                const configOptions = [
                                                    { id: 'frame', label: item.config.frameLabel, hasDot: true },
                                                    { id: 'plastic', label: item.config.plasticLabel },
                                                    { id: 'tires', label: item.config.tiresLabel }
                                                ].filter(opt => Boolean(opt.label));

                                                return (
                                                    <div className={styles.infoBlock}>
                                                        <h3 className={styles.infoTitle}>Configurator</h3>
                                                        <div className={styles.specsRow}>
                                                            {configOptions.map((opt, index, array) => (
                                                                <React.Fragment key={opt.id}>
                                                                    <span className={styles.specText}>
                                                                        {opt.hasDot && <span className={styles.colorDot} style={{ background: '#000' }}></span>}
                                                                        {opt.label.toUpperCase()}
                                                                    </span>
                                                                    {index < array.length - 1 && <div className={styles.dividerV} />}
                                                                </React.Fragment>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })()}

                                            {/* БЛОК ІНФОРМАЦІЇ ДЛЯ ЗАПЧАСТИН */}
                                            {(!item.config && (item.partColor || item.partSubtitle)) && (
                                                <div className={styles.infoBlock}>
                                                    <h3 className={styles.infoTitle}>Configurator</h3>
                                                    <div className={styles.specsRow}>
                                                        <span className={styles.specText}>
                                                            {item.partColor && <span className={styles.colorDot} style={{ background: item.partColor }}></span>}
                                                            {item.partSubtitle ? item.partSubtitle.toUpperCase() : "SELECTED"}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            <div className={styles.cardFooter}>
                                                <div className={styles.qtySection}>
                                                    <span className={styles.qtyLabel}>Quantity</span>
                                                    <QuantitySelector item={item} updateQuantity={updateQuantity} />
                                                </div>
                                                <div className={styles.itemPrice}>
                                                    <span className={styles.priceLabel}>Price:</span>
                                                    <span className={styles.priceValue}>{formatPrice(item.price * item.quantity)} $</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* ПРАВА КОЛОНКА: ОФОРМЛЕННЯ */}
                    <div className={styles.summaryColumn}>
                        <div className={styles.summaryCard}>
                            <label className={styles.selectAll}>
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    checked={isAllSelected}
                                    onChange={handleSelectAllToggle}
                                    disabled={items.length === 0}
                                />
                                Select all
                            </label>

                            <div className={styles.summaryHeader}>
                                <h2 className={styles.summaryTitle}>Placing an order</h2>
                                <p className={styles.deliveryNote}>
                                    Production time: 3 months after payment.
                                </p>
                            </div>

                            <div className={styles.divider} />

                            <div className={styles.receiptList}>
                                {items.filter(item => !uncheckedIds.has(item.id)).map(item => (
                                    <div key={item.id} className={styles.receiptRow}>
                                        <span>Motorcycle {item.name}:</span>
                                        <span className={styles.rowPrice}>{formatPrice(item.price * item.quantity)} $</span>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.receiptTotal}>
                                <span className={styles.totalLabel}>Price:</span>
                                <span className={styles.totalValue}>{formatPrice(totalPrice)} $</span>
                            </div>

                            <Button
                                variant="primary"
                                className={styles.checkoutBtn}
                                disabled={!hasSelectedItems}
                                onClick={() => {
                                    // Передаємо на сторінку чекауту тільки ті товари, які вибрані
                                    const selectedItemsToBuy = items.filter(item => !uncheckedIds.has(item.id));
                                    navigate("/checkout", { state: { selectedItems: selectedItemsToBuy } });
                                }}
                            >
                                BUY
                            </Button>
                        </div>
                    </div>
                </div>

                {/* СЛАЙДЕР ЗАПЧАСТИН ДЛЯ КОШИКА */}
                {visibleParts.length > 0 && (
                    <div className={styles.partsSection}>
                        <div className={styles.partsHeader}>
                            <SectionHeader
                                title="PARTS"
                                subtitle="You might need this for this motorcycle"
                                align="left"
                                subtitleAlign="left"
                            />
                        </div>

                        <div className={styles.embla} ref={emblaRef}>
                            <div className={styles.emblaContainer}>
                                {visibleParts.map((p) => (
                                    <div key={p.id} className={styles.emblaSlide}>
                                        <PartCard part={p} onAddToCart={handleAddPart} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* НАВІГАЦІЯ СЛАЙДЕРА */}
                        {scrollSnaps.length > 1 && (
                            <div className={styles.partsControls}>
                                <div className={styles.partsDots}>
                                    {scrollSnaps.map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className={`${styles.partsDot} ${index === selectedIndex ? styles.partsDotActive : ""}`}
                                            onClick={() => scrollTo(index)}
                                            aria-label={`Scroll to group ${index + 1}`}
                                        />
                                    ))}
                                </div>

                                <div className={styles.partsArrows}>
                                    <button
                                        type="button"
                                        className={styles.partsArrowBtn}
                                        onClick={scrollPrev}
                                        disabled={prevBtnDisabled}
                                        aria-label="Previous items"
                                    >
                                        <span className={styles.partsArrowIconImg} />
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.partsArrowBtn}
                                        onClick={scrollNext}
                                        disabled={nextBtnDisabled}
                                        aria-label="Next items"
                                    >
                                        <span className={`${styles.partsArrowIconImg} ${styles.partsArrowRight}`} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Container>
        </div>
    );
}